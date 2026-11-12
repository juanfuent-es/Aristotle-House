# Aristotle House

React Three Fiber playground for the first Aristotle House digital study.

## Development

```bash
npm install
npm run dev
```

Open the local URL normally for the coming-soon experience. Add `?debug` to the
URL to expose the optical-material controls.

## Model handoff

The temporary subject lives in `src/experience/subjects/OpticalSubject.tsx`.
Once the final GLB/GLTF URL is available, set `VITE_MODEL_URL` and replace the
placeholder geometry inside that component while keeping the scene and material
modules intact.

The current model is based on [Aristotele bust](https://sketchfab.com/3d-models/aristotele-bust-8717fddd94c44498a5f91d652f866930)
by [nicola_scaramella](https://sketchfab.com/nicola_scaramella), licensed under
[CC BY 4.0](http://creativecommons.org/licenses/by/4.0/).

## Deployment

Pushes to `main` build and publish `dist/` through GitHub Pages. The workflow
currently passes `/Aristotle-House/` as the repository base path at build time.
