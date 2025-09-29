class GomPreview extends HTMLElement {
	constructor() {
		super()
		this.attachShadow({ mode: 'open' })

		this._direction = 'row'
		this._align = 'flex-start'
	}

	copyPreviewRenderCode() {
		const slot = this.shadowRoot.querySelector('slot')
		const assignedElements = slot.assignedNodes({ flatten: true })

		const htmlToCopy = assignedElements
			.map((node) => {
				if (node.nodeType === Node.ELEMENT_NODE) {
					return node.outerHTML
				} else if (node.nodeType === Node.TEXT_NODE) {
					return node.textContent.trim()
				}
				return ''
			})
			.filter(Boolean)
			.join('\n')

		return navigator.clipboard.writeText(htmlToCopy)
	}

	render() {
		return /*html*/ `
            <style>                
				:host {
					display: flex;
					gap: 1rem;
					align-items: center;
					justify-content: center;
					border-radius: 10px;
					background-color: #191E22;
					padding: 2.5rem 2.5rem 3.5rem 2.5rem;
					border: 1px solid #272d39;
					position: relative;

					> div {
						width: 100%;
						display: flex;
						align-items: ${this._align};					
						flex-direction: column;
						gap: 1rem;


						> ::slotted(div){
							display: flex;
							gap: 1rem;
							flex-direction: ${this._direction};
						}
					}
				}

				.copy-code {
					position: absolute;
					bottom: 7px;
					right: 7px;
					border: 1px solid ;
					border-color: var(--gom-color-highlight);
					background: var(--gom-color-background-secondary);
					color: white;
					border-radius: 7px;
					cursor: pointer;
					padding: 0.2rem 0.6rem;
					display: flex;
					align-items: center;
					gap: 0.3rem;

					&:hover {
						background: var(--gom-color-highlight);
						border-color: var(--gom-color-highlight-focus);

					}

					&::after {
						content: attr(data-tooltip);
						position: absolute;
						bottom: 160%;
						left: 50%;
						transform: translateX(-50%) scale(0.95);
						background: var(--gom-color-highlight-focus);
						color: #fff;
						padding: 4px 14px;
						border-radius: 4px;
						font-size: 12px;
						white-space: nowrap;
						opacity: 0;
						pointer-events: none;
						transition: opacity 0.3s ease, transform 0.3s ease;
						z-index: 10;
					}

					&::before {
						content: '';
						position: absolute;
						bottom: 105%;
						left: 50%;
						transform: translateX(-50%);
						border: 6px solid transparent;
						border-top-color: var(--gom-color-highlight-focus);
						opacity: 0;
						transition: opacity 0.3s ease;
						pointer-events: none;
						z-index: 10;
					}

					&.show-tooltip::after,&.show-tooltip::before {
						opacity: 1;
						transform: translateX(-50%) scale(1);
					}
				}
            </style>

            <div>
				<slot></slot>
				
				<button id="copy-code" class="copy-code">
					<ion-icon name="copy-outline"></ion-icon>
					Copiar Código
				</button>
            </div>
        `
	}

	connectedCallback() {
		if (this.hasAttribute('direction'))
			this._direction = this.getAttribute('direction')

		if (this.hasAttribute('align')) this._align = this.getAttribute('align')

		this.shadowRoot.innerHTML = this.render()

		const button = this.shadowRoot.querySelector('#copy-code')

		if (button) {
			button.addEventListener('click', () =>
				this.copyPreviewRenderCode()
					.then(() => {
						button.setAttribute('data-tooltip', 'Copiado!')
						button.classList.add('show-tooltip')

						setTimeout(() => {
							button.classList.remove('show-tooltip')
						}, 1700)
					})
					.catch(() => {
						button.setAttribute('data-tooltip', 'Erro ao copiar!')
						button.classList.add('show-tooltip')

						setTimeout(() => {
							button.classList.remove('show-tooltip')
						}, 1700)
					})
			)
		}
	}
}

customElements.define('gom-preview', GomPreview)
