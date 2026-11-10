import 'server-only'
import { JSX } from "react/jsx-runtime";
import { resolveSafe } from "./file-system";
import fs from "fs/promises";

type Node = {
  type: string,
  children?: Node[],
  value?: string,
};

export async function parseFile(file: string): Promise<JSX.Element> {
  const path = resolveSafe(file);
  const file_content = await fs.readFile(path, "utf-8");
  const split_content = file_content.split("\n");
  const nodes: Node[] = [];

  for (let i = 0; i < split_content.length; i++) {
    let nodeType: string = "text";
    let nodeValue: string = "";
    let nodeChildren: Node[] = [];

    if (split_content[i] == "") {
      nodeType = ""
    }

    const headerRegex = /^#{1,6}/;

    if (headerRegex.test(split_content[i])) {
      const count = split_content[i].match(headerRegex)?.[0].length ?? 0;
      nodeType = "header " + count;
    }

    nodeValue = split_content[i];

    const new_node: Node = { type: nodeType, value: nodeValue, children: nodeChildren };
    nodes.push(new_node);
  }

  return (
    <div>{
        nodes.map((node, index) => {
          return <p key={index}>{node.type} {node.value}</p>
        })
    }</div>
  )
}


