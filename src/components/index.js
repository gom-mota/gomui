const expose = {
	button: 'gom-button',
	alert: 'gom-alert',
	accordion: 'gom-accordion',
}

const components = {
	internal: { ...expose, color: 'gom-color', preview: 'gom-preview' },
	expose,
}

const componentsStyle = new Map()
const styleLoadPromises = new Map()

class GomElement extends HTMLElement {
	constructor() {
		super()
		this.attachShadow({ mode: 'open' })
	}

	async loadStyles(stylePath) {
		try {
			if (this.shadowRoot.adoptedStyleSheets.length > 0) return

			let loadStylePromise = styleLoadPromises.get(stylePath)

			if (!loadStylePromise) {
				loadStylePromise = (async () => {
					try {
						const componentStyle = componentsStyle.get(stylePath)
						if (componentStyle) return componentStyle

						const response = await fetch(
							new URL(stylePath, import.meta.url)
						)
						const cssText = await response.text()

						const newStyle = new CSSStyleSheet()
						await newStyle.replace(cssText)

						componentsStyle.set(stylePath, newStyle)
						return newStyle
					} catch (error) {
						styleLoadPromises.delete(stylePath)
						throw error
					}
				})()

				styleLoadPromises.set(stylePath, loadStylePromise)
			}

			const componentStyle = await loadStylePromise
			this.shadowRoot.adoptedStyleSheets = [componentStyle]
		} catch (error) {
			console.error(`Failed to load styles for ${this.tagName}: `, error)
		}
	}
}

export { GomElement }

export default components
