# MalemolencIA

Player de músicas locais, minimalista e sem anúncios. PWA **local-first**
(sem backend, sem login), pensado para Android.

> Em construção. O plano por etapas está em [`docs/roadmap.md`](docs/roadmap.md).

## Stack

- Next.js 16 (App Router + Turbopack) · TypeScript
- Tailwind CSS 4 · shadcn/ui · Lucide · Motion · Sonner
- Dexie (IndexedDB) e Zustand — entram na Etapa 2
- Vitest · ESLint + Prettier · lefthook + commitlint · CI no GitHub Actions

## Começando

Pré-requisitos: **Node 24** e **pnpm 10** (`corepack enable`).

```bash
pnpm install
cp .env.example .env
pnpm dev          # http://localhost:3000
```

## Scripts

```bash
pnpm dev            # desenvolvimento
pnpm build          # build de produção
pnpm start          # servir o build
pnpm lint           # ESLint
pnpm typecheck      # tsc --noEmit
pnpm test           # Vitest (test:watch para o modo watch)
pnpm format         # Prettier --write (format:check só verifica)
```

## Documentação

Em [`docs/`](docs/README.md): arquitetura, regras de código, decisões e roadmap.

## Contribuição

Commits seguem [Conventional Commits](https://www.conventionalcommits.org/)
(validados pelo commitlint); os git hooks formatam, rodam lint, typecheck e
testes.

## Licença

MIT
