const ComponentSetting = (props) => {
	const { tag, config } = props

	const inputTypes = {
		text: (prop, key) => {
			return /*html*/ `
                <input name="${key}" type="text" placeholder="Digite aqui." value="${
				prop.default || ''
			}" oninput="updateComponent('${key}', this.value)">
            `
		},
		check: (prop, key) => {
			return /*html*/ `
                <input name="${key}" type="checkbox" id="${key}" ${
				prop.default ? 'checked' : ''
			} onchange="updateComponent('${key}', this.checked)">
            `
		},
		radio: (prop, key) => {
			return prop.options
				.map(
					(option) => /*html*/ `
						<input type="radio" name="${key}" id="${option}" value="${option}" ${
						prop.default === option ? 'checked' : ''
					} onclick="updateComponent('${key}', this.value)">
                        
						<label for="${option}">${option}</label>
                    `
				)
				.join('')
		},
		select: (prop, key) => {
			const options = prop.options
				.map(
					(option) =>
						/*html*/ `<option value="${option}">${option}</option>`
				)
				.join('')

			return /*html*/ `
                <select onchange="updateComponent('${key}', this.value)">
                    ${options}
                </select>
            `
		},
	}

	const render = /*html*/ `
             <table class='component-setting'>
				<thead>
					<tr>
						<th>Name</th>
						<th>Description</th>
						<th>Default</th>
						<th>Control</th>
					</tr>
				</thead>

				<tbody>
					${Object.entries(config.properties)
						.map(([key, prop]) => {
							const defaultContent =
								prop.type === 'function' ||
								prop.type === 'check'
									? '-'
									: prop.default || '-'

							return `<tr>
										<td>${key}</td>
										<td>${prop.description}</td>
										<td>${defaultContent}</td>
										<td>${inputTypes[prop.type] ? inputTypes[prop.type](prop, key) : '-'}</td>
									</tr>`
						})
						.join('')}
						
						${
							config.slots
								? Object.entries(config.slots)
										.map(([key, prop]) => {
											const slotKeyContent =
												key === 'children'
													? key
													: `<span class='slot-badge'>slot</span> ${key}`

											return `<tr>
														<td>${slotKeyContent}</td>
														<td>${prop.description}</td>
														<td>-</td>
														<td>-</td>
													</tr>`
										})
										.join('')
								: ''
						}
				</tbody>
			</table>
        `

	const after_render = () => {
		const renderedComponent = document.querySelector(tag)

		window.updateComponent = (propName, value) => {
			if (value === true || value === false) {
				value
					? renderedComponent.setAttribute(propName, '')
					: renderedComponent.removeAttribute(propName)
			} else renderedComponent.setAttribute(propName, value)
		}

		const setInitialProps = () => {
			Object.entries(config.properties).forEach(([key, prop]) => {
				if (prop.type !== 'function' && prop.default !== undefined)
					updateComponent(key, prop.default)
			})
		}

		setInitialProps()
	}

	return { render, after_render }
}

const mount = (container, props) => {
	const { render, after_render } = ComponentSetting(props)

	container.innerHTML += render
	after_render()
}

export default mount
