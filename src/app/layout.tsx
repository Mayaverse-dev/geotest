import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

const PROD_URL = "https://geotest-production.up.railway.app";

export const metadata: Metadata = {
  title: {
    template: "%s | MAYA — Enter the Universe",
    default: "MAYA — Enter the Universe of Neh",
  },
  description:
    "The verifiable knowledge graph of the MAYA universe: six sapient species, the planet Neh, and the Divya Trials. Machine-readable lore for the Rule of the Mind era.",
  metadataBase: new URL(PROD_URL),
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: "website",
    siteName: "MAYA",
    url: PROD_URL,
    title: "MAYA — Enter the Universe of Neh",
    description:
      "Explore the six sapient species of planet Neh through a verifiable epistemological knowledge graph.",
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

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/atlas/neh", label: "Planet Neh" },
  { href: "/species/manushya", label: "Species" },
  { href: "/characters/yachay", label: "Characters" },
  { href: "/lore/divya-trials", label: "Lore" },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="alternate"
          type="text/plain"
          href="/llms.txt"
          title="LLM Summary"
        />
        <link
          rel="alternate"
          type="text/plain"
          href="/llms-full.txt"
          title="LLM Full Context"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": PROD_URL,
              name: "MAYA — Enter the Universe",
              url: PROD_URL,
              description:
                "The verifiable knowledge graph of the MAYA universe on planet Neh. Six sapient species, the Divya Trials, and the Maya tree biological internet.",
              potentialAction: {
                "@type": "SearchAction",
                target: `${PROD_URL}/api/v1/verify?entity={search_term_string}`,
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </head>
      <body className="min-h-screen bg-maya-void text-maya-text antialiased">
        <header role="banner">
          <nav
            aria-label="Primary navigation"
            className="mx-auto flex max-w-5xl items-center justify-between border-b border-maya-border px-6 py-4"
          >
            <Link
              href="/"
              className="text-xl font-bold tracking-widest text-maya-gold"
            >
              MAYA
            </Link>
            <ul className="flex gap-6 text-sm" role="list">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-maya-muted transition-colors hover:text-maya-text"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </header>
        <main className="mx-auto max-w-5xl px-6 py-12">{children}</main>
        <footer
          role="contentinfo"
          className="mx-auto max-w-5xl border-t border-maya-border px-6 py-8 text-center text-xs text-maya-muted"
        >
          <p>
            MAYA Universe &mdash; Verifiable Knowledge Graph &mdash;{" "}
            <Link href="/llms.txt" className="underline hover:text-maya-text">
              llms.txt
            </Link>{" "}
            &middot;{" "}
            <Link
              href="/llms-full.txt"
              className="underline hover:text-maya-text"
            >
              llms-full.txt
            </Link>{" "}
            &middot;{" "}
            <Link
              href="/api/v1/verify?entity=neh"
              className="underline hover:text-maya-text"
            >
              Verify API
            </Link>
          </p>
        </footer>
      </body>
    </html>
  );
}
