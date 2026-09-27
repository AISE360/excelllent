import { cookies } from "next/headers";
import type { Lang } from "./strings";

export async function getLang(): Promise<Lang> {
  try {
    const v = (await cookies()).get("lang")?.value;
    return v === "hi" || v === "mr" ? v : "en";
  } catch {
    return "en";
  }
}
