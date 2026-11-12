import { ComingSoonPage } from '../features/coming-soon/ComingSoonPage'

const debug = new URLSearchParams(window.location.search).has('debug')

export function App() {
  return <ComingSoonPage debug={debug} />
}
