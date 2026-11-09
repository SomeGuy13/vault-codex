'use server';

import Renderer from "@/components/renderer";
import Terminal from "@/components/terminal";
import { Suspense } from "react";

export default async function Home() {
  return (
    <div>
      <main>
        <Suspense>
          <Renderer file="home.md"/>
        </Suspense>
        <Terminal/>
      </main>
    </div>
  );
}
