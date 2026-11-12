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

## Deployment

Pushes to `main` build and publish `dist/` through GitHub Pages. The workflow
currently passes `/Aristotle-House/` as the repository base path at build time.
