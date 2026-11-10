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
    const ulRegex = /^([ ]*)-/;
    const liRegex = /^([ ]*)\d\./;
    const tableRegex = /^\|/;
    const quoteRegex = /^>/;
    const codeRegex = /^```/;
    const linkRegex = /^\[\[.+\]\]?/;

    if (headerRegex.test(split_content[i])) {
      const count = split_content[i].match(headerRegex)?.[0].length ?? 0;
      nodeType = "header_" + count;
    } else if (liRegex.test(split_content[i])) {
      const count = split_content[i].match(liRegex)?.[1].length ?? 0;
      nodeType = "li_" + count;
    } else if (tableRegex.test(split_content[i])) {
      nodeType = "table";
    } else if (quoteRegex.test(split_content[i])) {
      nodeType = "quote";
    } else if (codeRegex.test(split_content[i])) {
      nodeType = "ml_code";
    } else if (split_content[i] == "---") {
      nodeType = "hr";
    } else if (ulRegex.test(split_content[i])) {
      const count = split_content[i].match(ulRegex)?.[1].length ?? 0;
      nodeType = "ul_" + count;
    } else if (linkRegex.test(split_content[i])) {
      nodeType = "link"
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


