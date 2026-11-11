# Testes

Runner: **Vitest**, ambiente `node`. Hoje só há testes unitários — não existem
testes de componente nem e2e.

```bash
pnpm test         # roda uma vez
pnpm test:watch   # modo watch
```

O `pre-push` (lefthook) e o CI rodam `pnpm test`; um teste quebrado bloqueia o
push e o merge.

## Onde ficam

Ao lado do código, com sufixo `.test.ts`:

```txt
features/library/services/library.service.ts
features/library/services/library.service.test.ts
```

O `vitest.config.mts` só inclui `**/*.test.ts` — um `.test.tsx` **não roda**.

## Configuração que importa

- Alias `@/` aponta para a raiz, igual ao `tsconfig`.
- `server-only` lança erro fora do bundler do Next; nos testes ele é trocado por
  `vitest/stubs/server-only.ts`. Por isso dá para testar services normalmente.

## O que testar e como

| O que                  | Como                                                | Exemplo                             |
| ---------------------- | --------------------------------------------------- | ----------------------------------- |
| Schema Zod             | `safeParse` com entradas válidas e inválidas        | `features/*/schemas/*.test.ts`      |
| Lógica pura (fila etc) | chamada direta, sem mocks                           | `nav.config.test.ts`                |
| Service com repository | `vi.mock` do repository; checar o DTO devolvido     | `features/*/services/*.test.ts`     |
| Repository (Dexie)     | `fake-indexeddb` (dev dependency, entra na Etapa 2) | `features/*/repositories/*.test.ts` |

### Padrão de mock

Declare o `vi.mock` antes e importe o módulo testado **depois**, com `await import`
(os mocks são hoisted, mas o import dinâmico deixa a ordem explícita):

```ts
vi.mock("../repositories/song.repository", () => ({
  songRepository: { list: vi.fn() /* ... */ },
}));

const { songRepository } = await import("../repositories/song.repository");
const { libraryService } = await import("./library.service");
```

Chame `vi.clearAllMocks()` num `beforeEach`.

## O que ainda não existe

Testes de componente e e2e (o motor de áudio e a tela bloqueada serão
validados em aparelho real). Ver [roadmap.md](roadmap.md).
