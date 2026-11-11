import { describe, expect, it } from "vitest";

import { routes, site } from "./nav.config";

describe("site", () => {
  it("mantém o shortName dentro do limite de ~12 caracteres do PWA", () => {
    expect(site.shortName.length).toBeLessThanOrEqual(12);
  });

  it("não termina a URL com barra", () => {
    expect(site.url.endsWith("/")).toBe(false);
  });
});

describe("routes", () => {
  it("registra caminho absoluto, nome e descrição em toda rota", () => {
    for (const route of Object.values(routes)) {
      expect(route.path.startsWith("/")).toBe(true);
      expect(route.label).not.toBe("");
      expect(route.description).not.toBe("");
    }
  });
});
