const loadedComponents = new Set()

async function loadComponent(tag) {
	if (customElements.get(tag) || loadedComponents.has(tag)) return
	try {
		await import(`./src/components/${tag}/index.js`)
		loadedComponents.add(tag)
	} catch (error) {
		console.error(`Erro ao carregar ${tag}:`, error)
	}
}

export function loadComponents(componentMap) {
	const tags = Object.values(componentMap)
	tags.forEach((tagName) => {
		const elements = document.querySelectorAll(tagName)
		if (elements.length && !loadedComponents.has(tagName)) {
			loadComponent(tagName)
		}
	})
}
export function observeComponents(componentMap) {
	const allComponents = new Set(Object.values(componentMap))
	const observer = new MutationObserver((mutations) => {
		const nodesToLoad = []

		mutations.forEach((mutation) => {
			mutation.addedNodes.forEach((node) => {
				if (node.nodeType === Node.ELEMENT_NODE) {
					const tagName = node.tagName.toLowerCase()
					if (allComponents.has(tagName)) {
						nodesToLoad.push(tagName)
					}
					allComponents.forEach((internalTag) => {
						if (
							node.querySelector &&
							node.querySelector(internalTag)
						) {
							nodesToLoad.push(internalTag)
						}
					})
				}
			})
		})

		if (nodesToLoad.length > 0)
			requestIdleCallback(() =>
				[...new Set(nodesToLoad)].forEach(loadComponent)
			)
	})

	observer.observe(document.documentElement, {
		childList: true,
		subtree: true,
	})

	document.addEventListener('DOMContentLoaded', () => {
		Object.values(componentMap).forEach((tagName) => {
			const existingComponent = document.querySelector(tagName)
			if (existingComponent && !loadedComponents.has(tagName))
				loadComponent(tagName)
		})
	})
}
