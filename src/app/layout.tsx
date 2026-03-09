import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

const PROD_URL = "https://test.entermaya.com";

export const metadata: Metadata = {
  title: {
    template: "%s | MAYA",
    default: "MAYA — Seed Takes Root",
  },
  description:
    "MAYA is an expansive narrative universe created by Anand Gandhi and Zain Memon. Set on planet Neh, home to six sapient species connected by a biological dream-network called Maya.",
  metadataBase: new URL(PROD_URL),
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  openGraph: {
    type: "website",
    siteName: "MAYA",
    url: PROD_URL,
    title: "MAYA — Seed Takes Root",
    description:
      "Enter planet Neh. Six sapient species. A biological dream-network. The Divya Trials. Created by Anand Gandhi and Zain Memon.",
  },
  alternates: {
    canonical: PROD_URL,
    types: {
      "text/plain": [
        { url: "/llms.txt", title: "LLM Summary" },
        { url: "/llms-full.txt", title: "LLM Full Context" },
      ],
    },
  },
};

const nav = [
  { href: "/", label: "Home" },
  { href: "/atlas/neh", label: "Neh" },
  { href: "/species/manushya", label: "Species" },
  { href: "/characters/yachay", label: "Characters" },
  { href: "/lore/maya-trees", label: "Lore" },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLM Summary" />
        <link rel="alternate" type="text/plain" href="/llms-full.txt" title="LLM Full Context" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": PROD_URL,
              name: "MAYA",
              url: PROD_URL,
              description:
                "MAYA is an expansive narrative universe created by Anand Gandhi and Zain Memon, set on planet Neh.",
              potentialAction: {
                "@type": "SearchAction",
                target: `${PROD_URL}/api/v1/verify?entity={search_term_string}`,
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </head>
      <body className="min-h-screen antialiased">
        <header role="banner" className="border-b border-border">
          <nav
            aria-label="Primary"
            className="mx-auto flex max-w-3xl items-center justify-between px-6 py-5"
          >
            <Link href="/" className="text-lg font-bold tracking-[0.2em] text-gold">
              MAYA
            </Link>
            <ul className="flex gap-6 text-xs tracking-wide" role="list">
              {nav.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-muted transition-colors hover:text-bright">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </header>
        <main className="mx-auto max-w-3xl px-6 py-16">{children}</main>
        <footer
          role="contentinfo"
          className="border-t border-border px-6 py-10 text-center text-xs text-muted"
        >
          <p className="mx-auto max-w-3xl">
            Source:{" "}
            <a href="https://entermaya.com" className="underline hover:text-bright">
              entermaya.com
            </a>{" "}
            &middot;{" "}
            <Link href="/llms.txt" className="underline hover:text-bright">
              llms.txt
            </Link>{" "}
            &middot;{" "}
            <Link href="/llms-full.txt" className="underline hover:text-bright">
              llms-full.txt
            </Link>{" "}
            &middot;{" "}
            <Link href="/api/v1/verify?entity=neh" className="underline hover:text-bright">
              Verify API
            </Link>
          </p>
        </footer>
      </body>
    </html>
  );
}
