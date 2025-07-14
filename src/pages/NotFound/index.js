const NotFound = async () => {
	const render = () => {
		return /*html*/ `
			<div class='not-found-container'>
				<div class='logo-container'>
					<img src='/src/images/gomui-logo.png' width='36px'/>
					<h1>GOMUI</h1>
				</div>
				
				<div class='main-container'>
					<div class='code-container'>
						<span>4</span>
						<ion-icon name="sad-outline"></ion-icon>
						<span>4</span>
					</div>

					<div class='title-container'>
						<h1>Página não encontrada</h1>
						<p>Ops! A página que você está procurando não existe.</p>
					</div>

					<gom-button id='home' variant='secondary' label='Ir para a página inicial'></gom-button>
				</div>
			</div>
		`
	}

	return {
		title: 'Não Encontrado',
		description: 'Página não encontrada',
		render,
		after_render: () => {
			const button = document.getElementById('home')
			if (button) button.onClick = () => navigateToRoute('/')
		},
	}
}

export default NotFound
