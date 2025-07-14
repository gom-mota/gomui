class GomAlert extends HTMLElement {
	static get observedAttributes() {
		return ['content', 'type']
	}

	constructor() {
		super()
		this.attachShadow({ mode: 'open' })

		this._content = 'Alert!'
		this._type = 'info'
	}

	updateContent() {
		if (this._content) {
			const alertElement = this.shadowRoot.querySelector('#alert')

			if (alertElement) {
				alertElement.textContent = this._content
			}
		}
	}

	updateType() {
		const alertElement = this.shadowRoot.querySelector('#alert')
		if (alertElement) {
			if (this._type) {
				alertElement.setAttribute('type', this._type)
			} else {
				alertElement.removeAttribute('type')
			}
		}
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (oldValue === newValue) return

		switch (name) {
			case 'content':
				this._content = newValue
				this.updateContent()
				break
			case 'type':
				this._type = newValue
				this.updateType()
				break
		}
	}

	connectedCallback() {
		this.shadowRoot.innerHTML = this.render()
	}

	render() {
		return /*html*/ `
			<style>
                 @import url('/src/components/gom-alert/styles.css');
            </style>
			<div id="alert" class="alert" type="${this._type}">${this._content}</div>
		`
	}
}

customElements.define('gom-alert', GomAlert)
