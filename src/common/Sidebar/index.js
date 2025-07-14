import { ROUTES } from '../../app.js'
import components from '../../components/index.js'

export const handleSetActiveNavItem = () => {
	const navItems = document.querySelectorAll('#sidebar li[id^="nav-"]')

	navItems.forEach((item) => item.classList.remove('active'))

	const pathParts = window.location.pathname.split('/').filter(Boolean)

	const lastPathPart = pathParts.length
		? pathParts.pop()
		: ROUTES['/'].name.toLowerCase()

	const currentPathNavItemId = `nav-${lastPathPart}`

	const navItemElement = document.getElementById(currentPathNavItemId)

	if (navItemElement) navItemElement.classList.add('active')
}

const Sidebar = () => {
	const handleToggleSidebar = () => {
		const sidebar = document.getElementById('sidebar')
		const sidebarOverlay = document.getElementById('sidebar-overlay')
		const toggleSidebarButton = document.getElementById('toggle-sidebar')

		if (toggleSidebarButton) {
			toggleSidebarButton.addEventListener('click', () => {
				sidebar.classList.add('mobile')
			})

			sidebarOverlay.addEventListener('click', () => {
				sidebar.classList.remove('mobile')
			})
		}
	}

	window.handleClickNavItem = (route) => {
		const sidebar = document.getElementById('sidebar')
		navigateToRoute(route)

		if (sidebar && sidebar.classList.contains('mobile'))
			sidebar.classList.remove('mobile')
	}

	const render = /*html*/ `
    <div>
        <div class='sidebar-container' id='sidebar-container'>
           <header>
                <div class='logo-container'>
                    <img src='/src/images/gomui-logo.png' width='32px'/>
                    <div>
                        <h1>GOMUI</h1>
                        <span>web components</span>
                    </div>
                </div>

                <a href="https://github.com/gom-mota/gomui" target="_blank">
                    <ion-icon name="logo-github"></ion-icon>
                </a>
            </header>
            
            <nav>
                <ul>
                    <li>Ponto de Partida</li>

                    <ul>
                        ${Object.entries(ROUTES)
							.filter(([_, { nav }]) => nav === true)
							.map(
								([route, { name, label }]) => /*html*/ `
                                    <li 
                                        id="nav-${name.toLowerCase()}"
                                        onclick="handleClickNavItem('${route}')">
                                            ${label}
                                    </li>
                                `
							)
							.join('')}
                    </ul>

                    <li>Componentes</li>

                    <ul>
                        ${Object.keys(components.expose)
							.map(
								(name) => /*html*/ `
                                    <li id="nav-${name}" onclick="handleClickNavItem('/component/${name}')">
                                        ${name}
                                    </li>
                                `
							)
							.join('')}
                    </ul>
                </ul>
            </nav>
        </div>
        
        <div id="sidebar-overlay"></div>

        <div class='header-top'>
            <div class='content'>
               <div class='logo-container'>
                    <img src='/src/images/gomui-logo.png' width='32px'/>
                    <div>
                        <h1>GOMUI</h1>
                        <span>web components</span>
                    </div>
                </div>

                <div class='buttons-container'>
                    <a href="https://github.com/gom-mota/gomui" target="_blank">
                        <ion-icon name="logo-github"></ion-icon>
                    </a>

                    <button id='toggle-sidebar'> <ion-icon name="menu"></ion-icon></button>
                </div>
            </div>
        </div>
    </div>
    `

	const after_render = () => {
		handleToggleSidebar()
	}

	return { render, after_render }
}

const mount = (container) => {
	const { render, after_render } = Sidebar()

	container.innerHTML += render
	after_render()
}

export default mount
