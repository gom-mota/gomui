const Introduction = async () => {
	const render = () => {
		return /*html*/ `
		<div class='introduction-container'>
			<h1>Introdução</h1>
			
			<p>GOMUI é uma biblioteca de Web Components, uma tecnologia versátil no desenvolvimento web
			moderno. O objetivo é disponibilizar elementos HTML personalizados que mantenham um design consistente e
			funcionem bem em diversos contextos.</p>

			<h2>Como surgiu o projeto?</h2>

			<p>
			O projeto nasceu durante meus estudos sobre Web Components. A proposta foi criar um site simples, com conceitos
			nativos, onde fosse possível visualizar de forma prática o funcionamento dos componentes online. Ele serve
			como incentivo para continuar aprendendo e publicando novos componentes, além de ser um recurso
			para que outras pessoas também possam explorar, compreender o tema e contribuir com novas ideias e melhorias.
			</p>

			<p>Abaixo, confira alguns exemplos de sites que utilizam a biblioteca. Eles mostram como os Web Components
			podem ser aplicados em diferentes tipos de aplicações e como eles se comportam em ambientes de produção.</p>

			<div class='website-examples-container'>
				<a href='https://www.gommota.com/' class='website-card-container' target='_blank'>
					<img src='https://www.gommota.com/favicon.ico'>
					<div>
						<span>gommota</span>
						<span class='website-description'>portfólio pessoal</span>
					</div>
					<ion-icon name="open-outline"></ion-icon>
				</a>
			</div>

			<h2>Dê os primeiros passos!</h2>

			<p>
			O projeto está hospedado gratuitamente no GitHub Pages. Explore os conceitos usados no site e coloque suas ideias no ar
			de forma simples e acessível. Se você está começando com Web Components ou SPA, essa é uma ótima
			oportunidade para aprender na prática. 
			<gom-button id='repo-button' label="Acesse o repositório" variant="text"></gom-button>
			</p>

		</div>
		`
	}

	return {
		title: 'Introdução',
		description: 'Página de Introdução',
		render,
		after_render: async () => {
			const repoButton = document.getElementById('repo-button')

			repoButton.onclick = () =>
				window.open('https://github.com/gom-mota/gomui')
		},
	}
}

export default Introduction
