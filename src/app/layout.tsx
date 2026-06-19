import type { Metadata } from "next";
import "./globals.css";
import { TorchCursor } from "@/components/TorchCursor";

export const metadata: Metadata = {
  title: "Hemanth Kumar Bandari | AI/ML Engineer & Full-Stack Developer",
  description: "Portfolio of Hemanth Kumar Bandari, AI/ML Engineer and Full-Stack Developer specializing in deep learning architectures, scalable pipelines, and high-performance digital systems.",
  keywords: ["AI/ML Engineer", "Full-Stack Developer", "Deep Learning", "Next.js", "FastAPI", "React", "Portfolio"],
  authors: [{ name: "Hemanth Kumar Bandari" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col">
        <TorchCursor />
        {children}
      </body>
    </html>
  );
}
