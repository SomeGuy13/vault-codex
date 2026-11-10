import 'server-only'
import { JSX } from "react/jsx-runtime";
import { resolveSafe } from "./file-system";
import fs from "fs/promises";

export async function parseFile(file: string): Promise<JSX.Element> {
  const path = resolveSafe(file);
  const file_content = await fs.readFile(path, "utf-8");
  const split_content = file_content.split("\n");

  return (
    <div>{
        split_content.map((line) => {

          const hashCount = (line.slice(0, 6).match(/#/g) ?? []).length

          if (hashCount == 1) {
            return <h1>{line.slice(1)}</h1>
          } else if (hashCount == 2) {
            return <h2>{line.slice(2)}</h2>
          } else if (hashCount == 3) {
            return <h3>{line.slice(3)}</h3>
          } else if (hashCount == 4) {
            return <h4>{line.slice(4)}</h4>
          } else if (hashCount == 5) {
            return <h5>{line.slice(5)}</h5>
          } else if (hashCount == 6) {
            return <h5>{line.slice(5)}</h5>
          }
          
          return <p>{line}</p>
        })
    }</div>
  )
}


