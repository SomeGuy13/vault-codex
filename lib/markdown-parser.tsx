import 'server-only'
import { JSX } from "react/jsx-runtime";
import { resolveSafe } from "./file-system";
import fs from "fs/promises";

export function parseFile(file: string): JSX.Element {
  const path = resolveSafe(file);
  const content = fs.readFile(path, "utf-8")

  return <div>{content}</div>
}


