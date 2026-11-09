import { parseFile } from "@/lib/markdown-parser";

export default async function Renderer({ file }: { file: string }) {
  const content = await parseFile(file)

  return content
}