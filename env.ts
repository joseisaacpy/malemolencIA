import { z } from "zod";

/**
 * Validação centralizada das variáveis de ambiente.
 *
 * Importe `env` apenas em módulos server. No client, use
 * `process.env.NEXT_PUBLIC_*` diretamente — o Next.js inlina essas no bundle.
 *
 * Para pular a validação (ex.: build de CI sem variáveis):
 *   SKIP_ENV_VALIDATION=1 pnpm build
 */
const envSchema = z.object({
  // URL pública do app (metadata, manifest e CSP).
  NEXT_PUBLIC_BASE_URL: z.url(),

  // Nível mínimo dos logs (lib/logger.ts). Sem ele: info em produção, debug em dev.
  LOG_LEVEL: z.enum(["debug", "info", "warn", "error", "silent"]).optional(),

  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
});

function parseEnv(): z.infer<typeof envSchema> {
  if (process.env.SKIP_ENV_VALIDATION) {
    return process.env as unknown as z.infer<typeof envSchema>;
  }

  const parsed = envSchema.safeParse(process.env);

  if (!parsed.success) {
    const issues = parsed.error.issues
      .map(
        (issue) => `  • ${issue.path.join(".") || "(raiz)"}: ${issue.message}`,
      )
      .join("\n");

    throw new Error(
      `Variáveis de ambiente inválidas:\n${issues}\n\n` +
        "Copie .env.example para .env e preencha os valores.",
    );
  }

  return parsed.data;
}

export const env = parseEnv();
