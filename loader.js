import components from './src/components/index.js'
import { loadGlobalStyle, loadComponents, observeComponents } from './index.js'

loadGlobalStyle()

loadComponents(components.expose)
observeComponents(components.expose)

export { loadComponents }
