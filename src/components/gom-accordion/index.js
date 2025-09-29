import { GomElement } from '/src/components/index.js'

class GomAccordion extends GomElement {
	static get observedAttributes() {
		return ['title', 'is-open']
	}

	constructor() {
		super()

		this._title = 'Title'
		this._isOpen = false

		this.loadStyles('/src/components/gom-accordion/styles.css')
	}

	render() {
		return /*html*/ `     
			<details id='accordion' class="item" ${this._isOpen ? `open` : ''}>
				<summary class="header">
					<div class='title'>${this._title}</div>
					
					<div id='header-description'></div>
				</summary>

				<div id='content-description'></div>

				<div id='content' class="content">
					
					<slot></slot>
				</div>

				<slot name="description" hidden></slot>
			</details>
		`
	}

	updateTitle() {
		const titleElement = this.shadowRoot.querySelector('.title')

		if (titleElement) titleElement.textContent = this._title
	}

	toggleOpen() {
		const accordionElement = this.shadowRoot.querySelector('details')

		if (accordionElement) accordionElement.open = this._isOpen
	}

	setDescriptionSlotContent() {
		const slotDescription = this.shadowRoot.querySelector(
			'slot[name="description"]'
		)
		const headerDescription = this.shadowRoot.querySelector(
			'.header #header-description'
		)
		const contentDescription = this.shadowRoot.querySelector(
			'details > #content-description'
		)

		if (!slotDescription) return

		slotDescription.addEventListener('slotchange', () => {
			const nodes = slotDescription.assignedNodes({ flatten: true })

			headerDescription.innerHTML = ''
			contentDescription.innerHTML = ''

			if (nodes.length > 0) {
				for (const node of nodes) {
					if (
						node.nodeType === Node.ELEMENT_NODE ||
						node.nodeType === Node.TEXT_NODE
					) {
						headerDescription.appendChild(node.cloneNode(true))
						contentDescription.appendChild(node.cloneNode(true))

						headerDescription.classList.add('description')
						contentDescription.classList.add('description')
					}
				}
			}
		})
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (oldValue === newValue) return

		switch (name) {
			case 'title':
				this._title = newValue
				this.updateTitle()
				break
			case 'is-open':
				this._isOpen = this.hasAttribute('is-open')
				this.toggleOpen()
				break
		}
	}

	connectedCallback() {
		this.shadowRoot.innerHTML = this.render()

		this.setDescriptionSlotContent()
	}
}

customElements.define('gom-accordion', GomAccordion)
