const Introduction = async () => {
	const render = () => {
		return /*html*/ `
		<div class='introduction-container'>
			<h1>Introdução</h1>
			
			<p>GOMUI é uma biblioteca de Web Components, uma tecnologia versátil no desenvolvimento web
			moderno. O objetivo é oferecer elementos HTML personalizados que funcionem de forma consistente em
			diferentes ambientes.</p>

			<h2>Como surgiu o projeto?</h2>

			<p>O projeto surgiu durante minha jornada de aprendizado sobre Web Components. Resolvi compartilhar os
			resultados online para que, ao explorar o site/código, outras pessoas possam compreender de forma simples e
			prática como essa tecnologia funciona.</p>

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

			<h2>Gostou da ideia?</h2>

			<p>O site está hospedado sem custos no GitHub Pages. Se você deseja dar os primeiros passos para criar sua própria biblioteca ou
			reaproveitar o código de determinada parte, acesse o
			<a href='https://github.com/gom-mota/gomui' target='_blank'>repositório</a>.</p>
		</div>
		`
	}

	return {
		title: 'Introdução',
		description: 'Página de Introdução',
		render,
		after_render: () => {},
	}
}

export default Introduction
