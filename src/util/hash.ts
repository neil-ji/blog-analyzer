import { createHash } from "crypto";

export function getId(input = "", length = 8) {
  const hash = createHash("sha256");
  hash.update(input);
  return hash.digest("hex").slice(0, length);
}
