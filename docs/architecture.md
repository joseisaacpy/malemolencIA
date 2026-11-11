# Arquitetura

MalemolencIA é um app **local-first**: tudo roda no navegador, sem backend. Os
dados ficam no IndexedDB e as músicas são lidas de arquivos locais.

## Mapa do repositório (estado atual — Etapa 0)

```txt
app/
  page.tsx             placeholder da biblioteca
  layout.tsx           tema escuro fixo, fontes, metadata
  providers.tsx        transição de página + Toaster
  manifest.ts · icon.tsx · apple-icon.tsx
  error.tsx · global-error.tsx · not-found.tsx · loading.tsx
components/
  ui/                  primitivos shadcn (button, dialog, input, sheet, sonner)
  animations/ · providers/
lib/
  errors/              AppError e subclasses
  hooks/               use-mounted
  logger.ts            logger do servidor
  observability/       captureError() (navegador)
  security/            headers.ts (headers de segurança + CSP)
  metadata.ts          createMetadata()
nav.config.ts          identidade do site e registro de rotas
env.ts                 validação das variáveis de ambiente (Zod)
instrumentation.ts     onRequestError: loga erros de servidor
```

## Estrutura planejada

```txt
app/(app)/             shell: bottom nav + mini-player
features/              library · player · playlists · favorites · history · settings
lib/db/                schema Dexie (só cliente)
lib/audio/             interface PlaybackEngine + implementação web + Media Session
lib/files/             capacidades do navegador, seletores, permissões
lib/metadata/          leitura de tags e capas
lib/pwa/               registro do service worker
public/sw.js           service worker
```

## Camadas de uma feature

```txt
component → hook/store → service → repository (Dexie)
                     └→ engine (áudio)   └→ files / metadata
```

- **repository** — única camada que toca o Dexie.
- **service** — regras de negócio; devolve DTO.
- **store/hook** — estado (Zustand) e ponte para os componentes.
- **component** — UI; nunca importa `lib/db` nem `lib/files`.
- O motor de áudio é independente da UI, atrás da interface `PlaybackEngine`,
  para poder ser trocado por uma versão nativa (Capacitor ou Media3).

Ver [decisions.md](decisions.md), decisão 17.

## Segurança

`lib/security/headers.ts` aplica CSP estática e headers de segurança a toda
resposta. Nova origem ou tipo de mídia → editar a CSP ali (o áudio via `blob:`
precisa de `media-src`).

## Observabilidade

`lib/logger.ts` (servidor), `instrumentation.ts` e `captureError()` (navegador).
Detalhes em [logging.md](logging.md).

## Qualidade

- Testes: [testing.md](testing.md).
- Git hooks (lefthook): `pre-commit` formata e roda ESLint; `pre-push` roda
  `typecheck` e `test`; `commit-msg` valida Conventional Commits.
- CI: format → typecheck → lint → test → build.
