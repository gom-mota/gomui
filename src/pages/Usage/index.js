import { highlightHtmlBlockCode } from '../../utils.js'

const Usage = async () => {
	const render = () => {
		return /*html*/ `
		<div class='introduction-container'>
			<h1>Uso</h1>

			<p>Para inicializar a biblioteca em seu projeto, basta fazer a importação do "loader":</p>

            <pre><code class="language-html">&lt;script type="module" src="https://ui.gommota.com/loader.js"&gt;&lt;/script&gt;</code></pre>

			<h2>Como utilizar um componente?</h2>			

			<p>As tags dos componentes iniciam com "gom" seguido pelo nome do que representa.</p>
			<p>Abaixo temos um exemplo básico de como utilizar um componente:</p>
			
			<pre><code class="language-html">&lt;gom-button label="Clique Aqui" variant="primary"&gt;&lt;/gom-button&gt;</code></pre>
			
			<p>Na seção "Componentes" do menu, voce encontra a documentação de todos os componentes especificando as
			propriedades e mostrando o resultado em tela. É possível personalizar em tempo real as propriedades
			e copiar o código gerado para facilitar a implementação em seu projeto.</p>
		</div>
		`
	}

	return {
		title: 'Uso',
		description: 'Página de Uso',
		render,
		after_render: () => highlightHtmlBlockCode(),
	}
}

export default Usage
