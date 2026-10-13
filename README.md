# CareerConnect Frontend

React and TypeScript client built with Vite. The frontend communicates with the ASP.NET Core API.

## Run locally

```bash
npm install
npm run dev
```

The API base URL defaults to `https://localhost:7203/api`. To override it, create a local `.env.local` file:

```env
VITE_API_BASE_URL=https://localhost:7203/api
```

## Checks

```bash
npm run lint
npm run build
```

## Source layout

- `src/api`: API clients and response types.
- `src/components`: reusable UI grouped by feature and user role.
- `src/layouts`: page shells for candidates, employers, and administrators.
- `src/pages`: route-level screens.
- `src/utils`: shared helpers and form schemas.
