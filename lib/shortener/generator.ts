import { encodeBase62 } from "./base62";
import { prisma } from "@/lib/prisma";

export async function generateCode() {
  while (true) {
    const raw = Date.now() + Math.floor(Math.random() * 1000);
    const code = encodeBase62(raw);

    const exists = await prisma.shortUrl.findUnique({ where: { code } });
    if (!exists) return code;
  }
}
