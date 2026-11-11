# Constitution

Regras de código do projeto. O **porquê** de cada uma está em
[decisions.md](decisions.md).

## Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind + shadcn/ui
- Dexie (IndexedDB) e Zustand — entram na Etapa 2
- Zod (validação)
- Vitest (testes)

## Regras

- App local-first: sem backend, auth nem banco remoto (decisão 17)
- `page.tsx` é um wrapper fino (Server Component) que renderiza o componente da feature
- Lógica das features roda no cliente; o motor de áudio é independente da UI
- Componente nunca importa `lib/db` nem `lib/files`: passa por hook/store → service → repository
- Dexie só em `repositories/`
- Erro esperado via `lib/errors` (`AppError` e subclasses); nunca `catch` vazio
- Zod em toda entrada externa (metadados, arquivos, estado salvo)
- Revogar com `URL.revokeObjectURL` toda URL criada com `createObjectURL`
- No servidor, `logger` (`lib/logger.ts`); no navegador, `captureError()`;
  nunca `console` (o ESLint avisa); nunca logue dados pessoais
- Barrel (`index.ts`) da feature só exporta o que é público
- Components desacoplados e pequenos
- Evitar lógica em `page.tsx`

## Estrutura

- features por domínio (`features/<nome>/`)
- camadas: repository → service → store/hook → component
- schemas, types, constants, utils separados
- arquivos em kebab-case com sufixo do papel: `.service.ts`, `.repository.ts`,
  `.schema.ts`, `.types.ts`, `.constants.ts`, `.test.ts`
- testes ao lado do código (`*.test.ts`)

## UI

- shadcn/ui, tema escuro fixo
- acessibilidade mínima
- loading, empty e error states
