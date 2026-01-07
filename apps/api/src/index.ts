import Fastify from "fastify";
import cors from "@fastify/cors";
import { z } from "zod";

const app = Fastify({ logger: true });

type Pharmacy = {
  id: string;
  name: string;
  address?: string;
  latitude: number;
  longitude: number;
  phone?: string;
  source?: string;
};

// TEMP mock list (we’ll replace with real “open pharmacies” later)
const OPEN_PHARMACIES: Pharmacy[] = [
  { id: "p1", name: "Pharmacy A (Syntagma)", latitude: 37.9755, longitude: 23.7348, source: "mock" },
  { id: "p2", name: "Pharmacy B (Monastiraki)", latitude: 37.9763, longitude: 23.7257, source: "mock" },
  { id: "p3", name: "Pharmacy C (Omonia)", latitude: 37.9842, longitude: 23.7286, source: "mock" },
];

async function main() {
  await app.register(cors, { origin: true });

  app.get("/health", async () => ({ ok: true }));

  app.get("/pharmacies/open", async (req) => {
    const querySchema = z.object({
      lat: z.coerce.number().optional(),
      lng: z.coerce.number().optional(),
    });

    const q = querySchema.parse((req as any).query);

    return {
      updatedAt: new Date().toISOString(),
      count: OPEN_PHARMACIES.length,
      pharmacies: OPEN_PHARMACIES,
      input: q,
    };
  });

  const port = Number(process.env.PORT ?? 4000);

  await app.listen({ port, host: "0.0.0.0" });
}

main().catch((err) => {
  app.log.error(err);
  process.exit(1);
});
