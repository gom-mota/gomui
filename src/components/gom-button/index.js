class GomButton extends HTMLElement {
	static get observedAttributes() {
		return ['label', 'disabled', 'variant', 'color']
	}

	constructor() {
		super()
		this.attachShadow({ mode: 'open' })

		// Valores padrão
		this._label = 'Button'
		this._disabled = false
		this._variant = 'primary'
		this._color = 'default'
	}

	updateLabel() {
		if (this._label) {
			const labelElement = this.shadowRoot.querySelector('#label')

			if (labelElement) {
				labelElement.textContent = this._label
			}
		}
	}

	updateDisabled() {
		const buttonElement = this.shadowRoot.querySelector('button')
		if (buttonElement) {
			buttonElement.disabled = this._disabled
		}
	}

	updateVariant() {
		const buttonElement = this.shadowRoot.querySelector('#botao')
		if (buttonElement) {
			if (this._variant) {
				buttonElement.setAttribute('variant', this._variant)
			} else {
				buttonElement.removeAttribute('variant')
			}
		}
	}

	updateColor() {
		const buttonElement = this.shadowRoot.querySelector('#botao')
		if (buttonElement) {
			if (this._color) {
				buttonElement.setAttribute('color', this._color)
			} else {
				buttonElement.removeAttribute('color')
			}
		}
	}

	handleOnClick(button) {
		button.addEventListener('click', (e) => {
			// Executa o callback diretamente se existir
			if (typeof this.onClick === 'function') this.onClick(e)

			// Dispara um evento customizado
			this.dispatchEvent(
				new CustomEvent('gom-button-click', {
					bubbles: true,
					composed: true,
				})
			)
		})
	}

	render() {
		return /*html*/ `
            <style>
                @import url('/src/components/gom-button/styles.css');
            </style>
            <button id="botao" ${this._disabled ? 'disabled' : ''} color="${
			this._color
		}" variant="${this._variant}">
                <span id="label">${this._label}</span>
            </button>
        `
	}

	// Método chamado sempre que um atributo observado muda
	attributeChangedCallback(name, oldValue, newValue) {
		if (oldValue === newValue) return

		switch (name) {
			case 'label':
				this._label = newValue
				this.updateLabel()
				break
			case 'disabled':
				this._disabled = newValue === 'true'
				this.updateDisabled()
				break
			case 'variant':
				this._variant = newValue
				this.updateVariant()
				break
			case 'color':
				this._color = newValue
				this.updateColor()
				break
		}
	}

	handleCustomCallbacks() {
		const button = this.shadowRoot.querySelector('#botao')

		this.handleOnClick(button)
	}

	// Método chamado quando o componente é adicionado ao DOM
	connectedCallback() {
		this.shadowRoot.innerHTML = this.render()

		this.handleCustomCallbacks()
	}

	// Método chamado quando o componente é removido do DOM
	disconnectedCallback() {}
}

customElements.define('gom-button', GomButton)
