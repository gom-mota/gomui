export const markdownToHtml = (markdown) => {
	const lines = markdown.split('\n')
	const tagStack = []

	const tagMap = {
		'# ': (text) => `<h1>${text.slice(2)}</h1>`,
		'## ': (text) => `<h2>${text.slice(3)}</h2>`,
		'### ': (text) => `<h3>${text.slice(4)}</h3>`,
		'- ': (text) => `<li>${text.slice(2)}</li>`,
	}

	const patterns = {
		openTag: /^<([a-zA-Z][^\s/>]*)[^>]*>$/,
		closeTag: /^<\/([a-zA-Z][^\s/>]*)>$/,
		blank: /^\s*$/,
	}

	const handlers = {
		openTag: {
			test: (line) => patterns.openTag.exec(line),
			transform: (line, match) => {
				tagStack.push(match[1])
				return line
			},
		},
		closeTag: {
			test: (line) => patterns.closeTag.exec(line),
			transform: (line, match) => {
				if (tagStack.at(-1) === match[1]) tagStack.pop()
				return line
			},
		},
		insideTag: {
			test: () => tagStack.length > 0,
			transform: (line) => line,
		},
		tagPrefix: {
			test: (line) =>
				Object.keys(tagMap).find((prefix) => line.startsWith(prefix)),
			transform: (line, prefix) => tagMap[prefix](line),
		},
		blank: {
			test: (line) => patterns.blank.test(line),
			transform: () => '<br>',
		},
		default: {
			test: () => true,
			transform: (line) => `<p>${line}</p>`,
		},
	}

	return lines
		.map((line) => {
			for (const key in handlers) {
				const { test, transform } = handlers[key]

				const result = test(line)

				if (result) return transform(line, result)
			}
		})
		.join('')
}

export const highlightHtmlBlockCode = () => {
	const patterns = {
		escapeMap: { '<': '&lt;', '>': '&gt;' },
		tag: /(&lt;\/?)(\w[\w-]*)([^&]*?)(\/?&gt;)/g,
		attr: /([\w-:]+)=(".*?"|'.*?')/g,
	}

	const rules = {
		escapeHtml: (text) =>
			text.replace(/[<>]/g, (char) => patterns.escapeMap[char]),

		highlightTagAndProps: (text) =>
			text.replace(
				patterns.tag,
				(_, open, tag, attrs, close) =>
					`<span class="angle">${open}</span>` +
					`<span class="tag">${tag}</span>` +
					`<span class="attrs">${attrs}</span>` +
					`<span class="angle">${close}</span>`
			),

		highlightPropValue: (text) =>
			text.replace(
				patterns.attr,
				(_, key, val) =>
					` <span class="attr">${key}</span>=<span class="value">${val}</span>`
			),
	}

	document.querySelectorAll('pre code').forEach((block) => {
		const raw = block.textContent.trim()
		const escaped = rules.escapeHtml(raw.trim())
		const tagAndProps = rules.highlightTagAndProps(escaped)

		block.innerHTML = tagAndProps.replace(
			/<span class="attrs">(.*?)<\/span>/g,
			(_, attrs) =>
				`<span class="attrs">${rules.highlightPropValue(attrs)}</span>`
		)
	})
}
