import { lazy, Suspense } from 'react'

const ExperienceCanvas = lazy(() => import('../../experience/ExperienceCanvas'))

interface ComingSoonPageProps {
  debug: boolean
}

export function ComingSoonPage({ debug }: ComingSoonPageProps) {
  return (
    <main className="page-shell">
      <Suspense fallback={<div className="canvas-fallback" />}>
        <ExperienceCanvas debug={debug} />
      </Suspense>

      <header className="site-header">
        <a className="wordmark" href="./" aria-label="Aristotle House home">
          Aristotle House
        </a>
        <p className="edition">Digital study · 001</p>
      </header>

      <section className="hero-copy" aria-labelledby="page-title">
        <p className="eyebrow">An evolving space for thought and form</p>
        <h1 id="page-title">
          Coming
          <span>soon.</span>
        </h1>
      </section>

      <footer className="site-footer">
        <p>Mexico City</p>
        <p aria-hidden="true">Move to explore</p>
        <p>MMXXVI</p>
      </footer>
    </main>
  )
}
