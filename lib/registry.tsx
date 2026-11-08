'server only';

import fs from 'fs/promises';
import path, { resolve } from 'path';
import { resolveSafe, validName } from './file-system';
import { create } from 'domain';

export type Ctx = { cwd: string };
export type Output = { output: string; cwd?: string; refresh?: boolean; edit?: string };

const join = (cwd: string, p: string) => path.posix.join(cwd, p);

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
    async run(ctx: Ctx, [target = '/']: string[]): Promise<Output> {
      const next = target.startsWith('/') ? target : join(ctx.cwd, target);
      const stat = await fs.stat(resolveSafe(next));
      if (!stat.isDirectory()) throw new Error('not a directory');
      return { output: next,  cwd: path.posix.normalize(next) };
    }
  },
  // Creates a new directory
  mkdir: {
    async run(ctx: Ctx, args: string[]): Promise<Output> {
      if (args.length > 0) {
        const next = args[0][0] == "/" ? args[0] : "/" + args[0];
        await fs.mkdir(resolveSafe(ctx.cwd + next));

        let result: Output = { output: "created: " + next};
        return result;
      }

      let result: Output = { output: "error: can't create direcotry" };
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

      return { output: lines.join("\n") || '(empty)'}
    }
  },
  // Creates a file
  mkfile: {
    async run(ctx: Ctx, args: string[]): Promise<Output> {
      if (args.length > 0) {
        const name = validName(args[0])
        const path = resolveSafe(ctx.cwd + args[0])
        await fs.open(path + ".md", "w")

        let result: Output = { output: "file created: " + args[0] };
        return result;
      }

      let result: Output = { output: "error: file not removed" };
      return result;
    }
  },
  // Opens the editor of a file
  open: {
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
    async run(ctx: Ctx, args: string[]): Promise<Output> {
      if (args.length > 0) {
        const name = validName(args[0])
        const path = resolveSafe(ctx.cwd + args[0])
        await fs.unlink(path + ".md")

        let result: Output = { output: "removed: " + args[0] };
        return result;
      }

      let result: Output = { output: "error: file not removed" };
      return result;
    }
  },
  // Removes a directory
  rmdir: {
    async run(ctx: Ctx, args: string[]): Promise<Output> {
      if (args.length > 0) {
        const next = args[0][0] == "/" ? args[0] : "/" + args[0];
        await fs.rmdir(resolveSafe(ctx.cwd + next));

        let result: Output = { output: "removed " + next };
        return result;
      }

      let result: Output = { output: "error: can't remove direcotry" };
      return result;
    }
  },
};