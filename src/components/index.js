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

class GomElement extends HTMLElement {
	constructor() {
		super()
		this.attachShadow({ mode: 'open' })
	}

	async loadStyles(stylePath) {
		try {
			if (this.shadowRoot.adoptedStyleSheets.length > 0) return

			let componentStyle = componentsStyle.get(stylePath)

			if (!componentStyle) {
				const response = await fetch(
					new URL(stylePath, import.meta.url)
				)

				const cssText = await response.text()

				componentStyle = new CSSStyleSheet()
				await componentStyle.replace(cssText)

				componentsStyle.set(stylePath, componentStyle)
			}

			this.shadowRoot.adoptedStyleSheets = [componentStyle]
		} catch (error) {
			console.error(`Failed to load styles for ${this.tagName}: `, error)
		}
	}
}

export { GomElement }

export default components
