import type { LucideIcon } from "lucide-react";
import { MusicIcon } from "lucide-react";

/**
 * Configuração central de navegação e identidade do app.
 *
 * Fonte única de verdade para:
 * - nome / descrição / URL do site (consumidos em `lib/metadata.ts`);
 * - registro de rotas: cada página tem uma chave, um caminho e um "nome".
 *
 * Ao criar uma rota nova, registre-a aqui e use `createMetadata({ route })`.
 */

export const site = {
  name: "MalemolencIA",
  /** Nome curto p/ PWA (`short_name`) e telas pequenas. Máx. ~12 chars. */
  shortName: "MalemolencIA",
  /** Sufixo do `<title>` e fallback de `description`. */
  description: "Player de músicas locais, minimalista e sem anúncios.",
  /** URL pública, sem barra no final. */
  url: (process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000").replace(
    /\/$/,
    "",
  ),
  locale: "pt-BR",
  /**
   * Cor da barra do navegador e da splash PWA
   * (`<meta name="theme-color">` via `app/layout.tsx` + `theme_color` no manifest).
   * O app é escuro fixo. Formato hex.
   */
  themeColor: "#0a0a0a",
  /** Fundo da splash screen PWA (`background_color` no manifest). */
  backgroundColor: "#0a0a0a",
  /**
   * Imagem OG padrão em `/public` (ex.: `"/og.png"`).
   * Deixe `undefined` enquanto não houver arquivo — evita link quebrado.
   */
  ogImage: undefined as string | undefined,
} as const;

export type RouteKey = "library";

export interface RouteMeta {
  /** Caminho real da rota. */
  path: string;
  /** Nome da página: base do `<title>` e rótulo padrão no menu. */
  label: string;
  /** Descrição da página: vira `<meta name="description">` quando a page não define outra. */
  description: string;
  /** Ícone opcional para uso na navegação. */
  icon?: LucideIcon;
}

/** Registro de todas as rotas de página do app. */
export const routes: Record<RouteKey, RouteMeta> = {
  library: {
    path: "/",
    label: "Músicas",
    description: site.description,
    icon: MusicIcon,
  },
};
