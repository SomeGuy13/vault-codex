export type Ctx = { cwd: string };
export type Output = { output: string };

export const commands = {
  print: { 
    run: (ctx: Ctx, args: string[]): Output => {
      console.log("Printing from " + ctx + " with " + args + "as arguments.");
      let result: Output = { output: args[0]}
      return result
    }
  },
};