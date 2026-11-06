'use client'

import { useState } from "react";
import { runCommand } from "@/app/actions";
import type { ChangeEvent } from "react";
import type { Ctx, Output } from "@/lib/registry";

export default function Terminal() {
  const [inputValue, setInputValue] = useState<string>("");
  const [history, setHistory] = useState<string[]>([]);
  const [ctx, setCtx] = useState<Ctx>({ cwd: "/"});

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setInputValue(event.target.value);
  }

  async function handleSubmit(event: ChangeEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!inputValue.trim()) return;

    setHistory((history) => [...history, ">>" + inputValue]);
    setInputValue("");

    let command_entry: string[] = inputValue.split(" ");
    let command_name: string = command_entry[0];
    let command_args: string[] = command_entry.length > 1 ? command_entry.slice(1) : [];

    if (command_name == "clear") {
      setHistory([]);
      return
    }

    let result: Output = await runCommand(command_entry[0], command_args, ctx);
    setHistory((history) => [...history, result.output]);
  }

  return (
    <div>
      <div>
        {history.map((entry, index) => (
            <li key={index}>{entry}</li>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input value={inputValue} onChange={handleChange} />
      </form>
    </div>
  );
}