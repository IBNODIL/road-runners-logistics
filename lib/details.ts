import raw from "@/data/details.json";

export type Block = { t: string; text?: string; id?: string; alt?: string };
const data = raw as unknown as Record<string, Block[]>;

export const getDetail = (kind: "services" | "industries" | "blog", slug: string): Block[] | null => data[`${kind}__${slug}`] ?? null;

export const find = (b: Block[], t: string, re?: RegExp, from = 0) =>
  b.findIndex((x, i) => i >= from && x.t === t && (!re || re.test(x.text ?? "")));

/** Slice blocks from a start marker up to (not including) the next marker of the given heading types. */
export function section(b: Block[], t: string, re: RegExp, stop: string[] = ["h2", "h3"]): Block[] {
  const s = find(b, t, re);
  if (s < 0) return [];
  let e = b.length;
  for (let i = s + 1; i < b.length; i++) if (stop.includes(b[i].t)) { e = i; break; }
  return b.slice(s + 1, e);
}

/** Collect consecutive (h6 → p) pairs. */
export function pairs(b: Block[]): { t: string; d: string }[] {
  const out: { t: string; d: string }[] = [];
  for (let i = 0; i < b.length; i++) {
    if (b[i].t === "h6" && b[i + 1]?.t === "p") out.push({ t: b[i].text!, d: b[i + 1].text! });
  }
  return out;
}

export const txt = (b: Block[], t: string) => b.find((x) => x.t === t)?.text ?? "";
export const imgOf = (b: Block[]) => b.find((x) => x.t === "img")?.id ?? "";
