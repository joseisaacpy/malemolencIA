# Roadmap

| #   | Etapa                               | Status   |
| --- | ----------------------------------- | -------- |
| 0   | Limpeza do template + rebrand       | feito    |
| 1   | Teste de viabilidade no aparelho    | pendente |
| 2   | Fundação (deps, Dexie, shell)       | pendente |
| 3   | Importação de músicas e metadados   | pendente |
| 4   | Biblioteca (lista, busca, artistas) | pendente |
| 5   | Player (motor, fila, Media Session) | pendente |
| 6   | Playlists, favoritos e histórico    | pendente |
| 7   | PWA (service worker, offline)       | pendente |
| 8   | Robustez e validação em aparelho    | pendente |

## Etapa 1 — teste de viabilidade

Página descartável que valida no Android: escolher pasta, guardar o handle,
reabrir o app, pedir permissão, tocar e manter a reprodução com a tela
bloqueada. O resultado decide entre guardar só a referência ao arquivo (handle)
ou copiar o áudio para o IndexedDB.

## Pendências futuras

- Observabilidade: provedor real em `instrumentation.ts` e `captureError`.
- Implementação nativa do `PlaybackEngine` (Capacitor ou Media3), se a Web não
  atender à reprodução em segundo plano.
