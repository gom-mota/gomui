const expose = { button: 'gom-button', alert: 'gom-alert' }

const components = {
	internal: { ...expose, color: 'gom-color', preview: 'gom-preview' },
	expose,
}

const componentsStyleCache = new Map()

class GomElement extends HTMLElement {
	constructor() {
		super()
		this.attachShadow({ mode: 'open' })
	}

	async loadStyles(stylePath) {
		try {
			let styles = componentsStyleCache.get(stylePath)

			if (!styles) {
				const response = await fetch(
					new URL(stylePath, import.meta.url)
				)

				const cssText = await response.text()

				styles = new CSSStyleSheet()
				await styles.replace(cssText)

				componentsStyleCache.set(stylePath, styles)
			}

			this.shadowRoot.adoptedStyleSheets = [styles]
		} catch (error) {
			console.error(`Failed to load styles for ${this.tagName}: `, error)
		}
	}
}

export { GomElement }

export default components
