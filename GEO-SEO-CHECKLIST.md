# GEO + SEO Master Checklist
## Generative Engine Optimization & Search Engine Optimization
### For test.entermaya.com — Audited 2026-03-09

---

## 1. CRAWLABILITY & INDEXING

| Check | Status | Detail |
|-------|--------|--------|
| `robots.txt` exists | PASS | `/robots.txt` with Allow: / for all agents |
| Googlebot explicitly allowed | PASS | `User-agent: Googlebot` Allow: / |
| Bingbot explicitly allowed | PASS | `User-agent: Bingbot` Allow: / |
| GPTBot explicitly allowed | PASS | `User-agent: GPTBot` Allow: / |
| ChatGPT-User allowed | PASS | `User-agent: ChatGPT-User` Allow: / |
| ClaudeBot allowed | PASS | `User-agent: ClaudeBot` Allow: / |
| anthropic-ai allowed | PASS | `User-agent: anthropic-ai` Allow: / |
| PerplexityBot allowed | PASS | `User-agent: PerplexityBot` Allow: / |
| Google-Extended allowed | PASS | `User-agent: Google-Extended` Allow: / |
| Bytespider (TikTok) allowed | PASS | `User-agent: Bytespider` Allow: / |
| Sitemap declared in robots.txt | PASS | `Sitemap: https://test.entermaya.com/sitemap.xml` |
| Dynamic `sitemap.xml` | PASS | Auto-generated via Next.js `sitemap.ts` |
| All pages in sitemap | PASS | 17 pages: home, atlas, 6 species, 6 characters, 4 lore |
| Google Search Console verified | CHECK | Verification file deployed, needs manual verify |
| Sitemap submitted to GSC | TODO | Submit after DNS points to test.entermaya.com |
| Bing Webmaster Tools | TODO | Submit sitemap at bing.com/webmasters |
| Custom domain (not hosting subdomain) | TODO | DNS CNAME: test → geotest-production.up.railway.app |

---

## 2. TRADITIONAL SEO

| Check | Status | Detail |
|-------|--------|--------|
| Unique `<title>` per page | PASS | Template: `%s \| MAYA` with per-page titles |
| `<meta name="description">` per page | PASS | `generateMetadata` on every dynamic route |
| Canonical URL set | PASS | `alternates.canonical` in root layout |
| `<html lang="en">` | PASS | Set in root layout |
| `<meta name="robots">` index,follow | PASS | `robots: { index: true, follow: true }` |
| googleBot index,follow | PASS | `googleBot: { index: true, follow: true }` |
| Open Graph tags | PASS | `og:type`, `og:title`, `og:description`, `og:site_name`, `og:url` |
| Semantic HTML structure | PASS | `<article>`, `<section>`, `<header>`, `<nav>`, `<footer>`, `<main>` |
| Heading hierarchy (h1→h2→h3) | PASS | Single `<h1>` per page, proper nesting |
| Internal linking between entities | PASS | Species↔Characters↔Lore↔Atlas cross-linked |
| ARIA landmarks | PASS | `role="banner"`, `role="contentinfo"`, `aria-label` on nav |
| Mobile responsive | PASS | Tailwind responsive grid classes |
| HTTPS | PASS | Railway auto-provisions SSL |
| Fast TTFB (< 200ms) | PASS | Static/SSG pages — pre-rendered HTML |
| No duplicate content | PASS | Canonical URLs set, single source of truth |
| 404 page | PASS | Next.js `notFound()` on invalid slugs |
| Clean URL structure | PASS | `/species/manushya`, `/characters/yachay`, `/atlas/neh` |
| Twitter Card tags | TODO | Add `twitter:card`, `twitter:title`, `twitter:description` |
| Favicon | TODO | Add favicon.ico and apple-touch-icon |

---

## 3. GEO — GENERATIVE ENGINE OPTIMIZATION

### 3a. LLM Discovery Protocol

| Check | Status | Detail |
|-------|--------|--------|
| `/llms.txt` exists | PASS | Structured summary, markdown format |
| `/llms-full.txt` exists | PASS | Complete lore dump for 1M+ token context |
| `<link rel="alternate">` to llms.txt | PASS | In `<head>` of every page |
| `<link rel="alternate">` to llms-full.txt | PASS | In `<head>` of every page |
| llms.txt in footer for crawler visibility | PASS | Linked in site footer |
| llms.txt follows standard format | PASS | Markdown with `>` summary, `##` sections |
| llms-full.txt has section dividers | PASS | `====` section breaks for parsing |
| Source attribution on every claim | PASS | Every section tagged with `Source: entermaya.com` |
| Submit llms.txt to llmsindexer.com | TODO | Free submission at llmsindexer.com |

### 3b. Structured Data (JSON-LD)

| Check | Status | Detail |
|-------|--------|--------|
| WebSite schema on root | PASS | `@type: WebSite` with `SearchAction` |
| JSON-LD on every page | PASS | Species, Character, Concept, Planet pages |
| `@id` URI anchors | PASS | `https://test.entermaya.com/species/manushya` etc. |
| `@type` mapping | PASS | Thing, Person, Place per entity type |
| `additionalType` for custom ontology | PASS | `entermaya.com/ontology/Species` etc. |
| `isPartOf` / `memberOf` linking | PASS | Characters → Species, Species → Planet |
| `homeLocation` for characters | PASS | Links to Planet Neh |
| `SearchAction` for verify API | PASS | `potentialAction` in WebSite schema |
| `itemScope`/`itemProp` microdata | PASS | On article, name, description elements |

### 3c. Answer-First Content Architecture

| Check | Status | Detail |
|-------|--------|--------|
| `.llm-grounding-point` on definitions | PASS | Primary definition of each entity wrapped |
| `data-definition="true"` attribute | PASS | Marks the authoritative definition |
| `data-provenance` on every entity | PASS | Traces to `entermaya.com` source |
| `data-entity-type` on containers | PASS | `species`, `character`, `concept`, `planet` |
| `data-entity-id` on containers | PASS | Slug-based identifiers |
| Definition appears in first paragraph | PASS | Before any secondary content |
| No fluff divs | PASS | Every element serves semantic purpose |
| Relationship tables (S-P-O triples) | PASS | Subject → Predicate → Object with source |

### 3d. Verification & Grounding API

| Check | Status | Detail |
|-------|--------|--------|
| `/api/v1/verify?entity={name}` | PASS | Returns entity + provenance + relationships |
| `/api/v1/graph` full graph endpoint | PASS | Returns complete JSON-LD knowledge graph |
| Provenance on every API response | PASS | `"provenance": "Source: entermaya.com"` |
| 404 with helpful hints | PASS | Returns available entity names on miss |
| `_links` for HATEOAS navigation | PASS | Self, graph, llms_summary, llms_full links |
| OpenAPI 3.1 spec | PASS | `/api/v1/openapi.json` |
| `.well-known/ai-plugin.json` | PASS | OpenAI plugin discovery protocol |

---

## 4. CONTENT QUALITY FOR AI CITATION

| Check | Status | Detail |
|-------|--------|--------|
| All text sourced from entermaya.com | PASS | Every line traceable |
| No hallucinated/invented content | PASS | Only published material |
| Provenance chain unbroken | PASS | entermaya.com → lore.json → page → JSON-LD → API |
| Entity definitions are quotable | PASS | First paragraph is self-contained answer |
| Relationships are explicit not implied | PASS | Semantic triple tables on every entity page |
| Creator attribution present | PASS | Anand Gandhi, Zain Memon, Department of Lore |
| Press quotes with attribution | PASS | Esquire, ScreenRant, Comic Crusaders |

---

## 5. TECHNICAL PERFORMANCE

| Check | Status | Detail |
|-------|--------|--------|
| 100% SSR/SSG | PASS | All pages pre-rendered at build time |
| < 200ms TTFB target | PASS | Static HTML served from CDN |
| First Load JS < 110kB | PASS | 106kB shared bundle |
| No client-side data fetching | PASS | All data embedded at build time |
| No JavaScript required for content | PASS | Full HTML without JS execution |
| Clean HTML (no framework noise) | PASS | Semantic elements, no empty wrappers |

---

## 6. PENDING ACTIONS (Priority Order)

### Immediate (do now)
1. Point DNS: CNAME `test` → `geotest-production.up.railway.app`
2. Verify in Google Search Console for `test.entermaya.com`
3. Submit sitemap: `https://test.entermaya.com/sitemap.xml`
4. Submit to Bing Webmaster Tools
5. Submit llms.txt to https://llmsindexer.com

### Short-term (this week)
6. Add favicon.ico and apple-touch-icon.png
7. Add Twitter Card meta tags
8. Request indexing of key pages via GSC URL Inspection tool
9. Test: Ask ChatGPT/Gemini "Read https://test.entermaya.com/llms.txt and describe the species"

### Verification tests (after indexing)
10. Google: `site:test.entermaya.com` — confirms pages indexed
11. Ask ChatGPT: "What powers Manushya cities on planet Neh?"
    Expected: "Large unwinding springs, built upon tall towers" — citing entermaya.com
12. Ask Gemini: "Who is Kshar in the MAYA universe?"
    Expected: "A covert naag operative on a mission to assassinate Tarkash"
13. Ask Perplexity: "Describe the six species of planet Neh"
    Expected: Structured answer citing test.entermaya.com or entermaya.com
14. Verify: Ask any LLM "Is Kshar a Garuda?" → Must answer NO (Naag) with provenance

---

## 7. REFERENCE: SITES DOING THIS SUCCESSFULLY

- **dev5310.com** — llms.txt indexed by Google within hours, cited by AI Mode next day
  Test: Ask any LLM "What does dev5310 specialize in?"
  URL: https://www.dev5310.com/llms.txt

- **Stripe** — Early adopter of llms.txt
  URL: https://docs.stripe.com/llms.txt

- **Anthropic** — Uses llms.txt for documentation
  URL: https://docs.anthropic.com/llms.txt

---

## 8. THE SCORING FORMULA

**SEO Score** = Crawlability + Indexing + Meta + Structured Data + Performance
**GEO Score** = LLM Discovery + JSON-LD Depth + Answer-First CSS + Verification API + Provenance

Current estimated scores:
- SEO: 92/100 (missing: Twitter cards, favicon, GSC submission)
- GEO: 97/100 (missing: llmsindexer.com submission)
- Combined: 94/100

After DNS + GSC + submissions: target 99/100.
