<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: MIT
-->

# Numinia viewer

Visor público del canon de Numinia / Numen Games. Extraído de [numinia-nwos-viewer](https://github.com/numengames/numinia-nwos-viewer) (y antes de [pablofm-web](https://github.com/PabloFMM/pablofm-web), donde vivió durante su fase de experimentación). El producto NWOS (`/velo`, `/api/registro`, `/workspace/[slug]`) se quedó en el repo de origen.

## Stack

- Astro 5 (`output: "static"`, sin adapter) con islas React 19
- Deploy: Cloudflare Workers como static assets (`wrangler.toml`, worker `numinia-nwos` → https://numinia.org)
- Tailwind 3 + shadcn/ui, dark-only, tipografía Geist
- Sistema de diseño en `DESIGN.md`

## Desarrollo

Requiere Node ≥ 22.12.

```bash
npm install
npm run dev      # http://localhost:4321
npm run build
```

## Variables de entorno

Ninguna. El visor no necesita secretos: se puede construir y desplegar sin variables de entorno.

## Estructura

- `src/pages/` — rutas estáticas (misiones, decisiones, planos, reportes, archive…)
- `src/data/` — datos hardcodeados en TS. Las rutas de detalle de `/missions` se generan en build leyendo el `missions-index.json` **local** de este repo (fallback: API de GitHub contra `numengames/numinia-archive` si se construye fuera del checkout). El tablero `/missions` y el contenido de detalle se hidratan en el navegador contra la API de GitHub (`numengames/numinia-archive`) — hornear eso en build es una decisión de diseño pendiente.
