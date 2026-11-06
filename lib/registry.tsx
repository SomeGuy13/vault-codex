'server only';

import fs from 'fs/promises'
import path, { resolve } from 'path'
import { resolveSafe, validName } from './file-system';

export type Ctx = { cwd: string };
export type Output = { output?: string; cwd?: string; refresh?: boolean; edit?: string };

export const commands = {
  // Prints the first argument
  print: { 
    run: (ctx: Ctx, args: string[]): Output => {
      let result: Output = { output: args[0]};
      return result;
    },
  },
  // Changes the current working directory
  cd: {
    run: (ctx: Ctx, args: string[]): Output => {
      let result: Output = { output: "" };
      return result;
    }
  },
  // Creates a new directory
  mkdir: {
    run: (ctx: Ctx, args: string[]): Output => {
      let result: Output = { output: "" };
      return result;
    }
  },
  // Lists all the files in the current directory
  ls: {
    async run(ctx: Ctx, args: string[]): Promise<Output> {
      const path = resolveSafe(ctx.cwd + (args.length > 0 ? args[0] : ""))
      const entries = await fs.readdir(path, { withFileTypes: true })
      const lines = entries
      .filter(e => !e.name.startsWith("."))
      .map(e => (e.isDirectory() ? '/' + e.name : e.name));

      // console.log("ctx:", ctx, "args:", args, "path:", path, "\n" + "entries:", entries, "lines:", lines)

      return { output: lines.join("\n") || '(empty)'}
    }
  },
  // Creates a file
  mkfile: {
    run: (ctx: Ctx, args: string[]): Output => {
      let result: Output = { output: "" };
      return result;
    }
  },
  // Opens the editor of a file
  ed: {
    run: (ctx: Ctx, args: string[]): Output => {
      let result: Output = { output: "" };
      return result;
    }
  },
  // Changes the name of a file or directory
  cn: {
    run: (ctx: Ctx, args: string[]): Output => {
      let result: Output = { output: "" };
      return result;
    }
  },
  // Removes a file
  rm: {
    run: (ctx: Ctx, args: string[]): Output => {
      let result: Output = { output: "" };
      return result;
    }
  },
  // Removes a directory
  rmdir: {
    run: (ctx: Ctx, args: string[]): Output => {
      let result: Output = { output: "" };
      return result;
    }
  },
};