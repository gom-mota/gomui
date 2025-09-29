class GomColor extends HTMLElement {
	constructor() {
		super()
		this.attachShadow({ mode: 'open' })

		this._color = '#ffffffba'
		this._text = 'color'
	}

	render() {
		return /*html*/ `
            <style>
               div {
					display: flex;
					align-items: flex-start;
					height: 50px;
					flex-direction: column;
					justify-content: space-between;
					width: 80px;
					color: #0d1318;
					line-height: 18px;
					font-size: 13px;
					padding: 0.5rem;
					background: ${this._color};

					.color-text {
						font-size: 12px;
						text-transform: uppercase;
					}
				}
            </style>

            <div>
                <span class='color-text'>${this._color}</span>
                <span>${this._text}</span>
            </div>
        `
	}

	connectedCallback() {
		if (this.hasAttribute('color')) this._color = this.getAttribute('color')
		if (this.hasAttribute('text')) this._text = this.getAttribute('text')

		this.shadowRoot.innerHTML = this.render()
	}
}

customElements.define('gom-color', GomColor)
