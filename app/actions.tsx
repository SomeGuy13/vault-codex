'use server';

import { commands } from "@/lib/registry";
import { Ctx, Output } from "@/lib/registry";

export async function runCommand(name: string, args: string[], ctx: Ctx): Promise<Output> {

  const cmd =  commands[name as keyof typeof commands];

  if (!cmd) return { output: `${name}: command not found`};
    
  try {
    return await cmd.run(ctx, args);
  } catch (e: any) {
    return { output: `error: ${e.message}`}
  }
}
