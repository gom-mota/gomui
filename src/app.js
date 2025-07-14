import Sidebar, { handleSetActiveNavItem } from './common/Sidebar/index.js'
import components from './components/index.js'
import { loadComponents, observeComponents } from '../index.js'

export const ROUTES = {
	'/': { name: 'Introduction', label: 'Introdução', nav: true },
	'/usage': { name: 'Usage', label: 'Uso', nav: true },
	'/component/:name': { name: 'Component', label: 'Componente' },
}

const handleGithubPages404File = () => {
	const search = window.location.search

	if (search && search[1] === '/') {
		const pathnameAndSearch = search.substring(1)
		const hash = window.location.hash

		window.history.replaceState(null, null, `${pathnameAndSearch}${hash}`)
	}
}

export const renderPageContent = async (name, params) => {
	const container = document.getElementById('container')
	const content = document.getElementById('content')
	const sidebar = document.getElementById('sidebar')

	try {
		sidebar.style.display = name === 'NotFound' ? 'none' : 'flex'

		const { default: Page } = await import(`./pages/${name}/index.js`)
		const { render, after_render, title, description } = await Page(params)

		loadComponents(components.internal)

		content.innerHTML = await render()
		await after_render()

		if (container) container.scrollTop = 0

		document.title = `${title} | GOMUI`
		document
			.querySelector('meta[name="description"]')
			.setAttribute('content', description)
	} catch (error) {
		throw error
	}
}

export const handleMatchRoute = (pathname) =>
	Object.keys(ROUTES).find((route) => {
		const pattern = `^${route.replace(/:\w+/g, '([^/]+)')}$`
		const regex = new RegExp(pattern)

		return regex.test(pathname)
	})

const getRouteParams = (pathname, route) => {
	const pattern = `^${route.replace(/:\w+/g, '([^/]+)')}$`
	const matchRoute = pathname.match(pattern)

	const params = {}

	if (matchRoute) {
		const paramKeys = route.match(/:\w+/g) || []

		paramKeys.forEach(
			(param, index) => (params[param.slice(1)] = matchRoute[index + 1])
		)
	}

	return params
}

const handleRouteChange = async () => {
	const pathname = window.location.pathname
	const currentRoute = handleMatchRoute(pathname)

	try {
		if (currentRoute) {
			handleSetActiveNavItem()

			const params = getRouteParams(pathname, currentRoute)

			await renderPageContent(ROUTES[currentRoute].name, params)
		} else renderPageContent('NotFound')
	} catch ({ message }) {
		if (message === 'NotFoundPage') await renderPageContent('NotFound')
	}
}

window.navigateToRoute = (pathname) => {
	if (pathname !== window.location.pathname) {
		window.history.pushState(null, null, pathname)
		handleRouteChange()
	}
}

const init = () => {
	observeComponents(components.internal)
	handleGithubPages404File()
	Sidebar(document.getElementById('sidebar'))
	handleRouteChange()
	window.addEventListener('popstate', handleRouteChange)
}

init()
