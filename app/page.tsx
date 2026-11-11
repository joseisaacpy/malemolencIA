import { createMetadata } from "@/lib/metadata";
import { site } from "@/nav.config";

export const metadata = createMetadata({ route: "library" });

// Placeholder da Etapa 0: a biblioteca real entra na fundação (Etapa 2).
export default function HomePage() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-2 px-6 text-center">
      <h1 className="font-display text-3xl font-semibold tracking-tight">
        {site.name}
      </h1>
      <p className="text-muted-foreground text-sm">{site.description}</p>
    </main>
  );
}
