import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vault Codex",
  description: "A vault of the mind",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full">
      <body>{children}</body>
    </html>
  );
}
