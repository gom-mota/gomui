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
						.map(
							([key, prop]) =>
								`<tr>
									<td>${key}</td>
									<td>${prop.description}</td>
									<td>${prop.type === 'function' ? '-' : prop.default || '-'}</td>
									<td>${inputTypes[prop.type] ? inputTypes[prop.type](prop, key) : '-'}</td>
								</tr>`
						)
						.join('')}
				</tbody>
			</table>
        `

	const after_render = () => {
		const renderedComponent = document.querySelector(tag)

		window.updateComponent = (propName, value) =>
			renderedComponent.setAttribute(propName, value)

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
