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
          AH / 001
        </a>
        <p className="edition">Where experience becomes understanding.</p>
      </header>

      <section className="hero-copy" aria-labelledby="page-title">
        <p className="eyebrow">Nothing reaches the mind without first passing through the senses.</p>
        <h1 id="page-title">
          <span>Aristotle</span>
          <span>House</span>
        </h1>
        <div className="brand-star" aria-hidden="true" />
      </section>

      <footer className="site-footer">
        <p>Dubai / Move to explore</p>
        <p className="model-credit">
          3D: <a href="https://sketchfab.com/nicola_scaramella">Nicola Scaramella</a> · CC BY 4.0
        </p>
        <p>MMXXVI</p>
      </footer>
    </main>
  )
}
