import components from './src/components/index.js'
import { loadComponents, observeComponents } from './index.js'

loadComponents(components.expose)
observeComponents(components.expose)

export { loadComponents }
