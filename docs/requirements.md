# Nafas Beauty Lounge — Requirements (Snapshot)

Date: 2026-04-01  
Project: **Nafas Beauty Lounge Website**  
Tech: **Next.js (App Router) + TypeScript + Tailwind CSS + Sanity CMS**  
Dev environment constraint: **Docker-only** (no local toolchain installs)

## 1) Goal
Build a **high-performance, SEO-optimized, bilingual (Arabic/English)** marketing website for Nafas Beauty Lounge with modern UI/UX and a content system that enables updates without developer involvement.

## 2) MVP Scope (v1)
- **Pages**
  - Home
  - About
  - Services (list + service details)
  - Contact
- **Booking**
  - Not required for v1 (no booking flow, no payments)

## 3) Content Management (Sanity)
Sanity will be used to manage dynamic content. Editable fields include:
- **Per page**
  - Page title (content)
  - Meta title (SEO)
  - Meta description (SEO)
  - Hero/content images
  - Section content (as needed per page)
- **Services**
  - Service name, description, category, images, and any display fields needed for the Services page

## 4) Internationalization (Arabic + English)
- **URL structure**
  - `/en/...` for English
  - `/ar/...` for Arabic
- **RTL support**
  - Arabic pages must render RTL and appropriate typography
- **Language switcher**
  - Present on all pages (UX: persistent and easily discoverable)
- **SEO hreflang**
  - Each page must emit correct hreflang tags for both languages
- **Per-locale metadata**
  - Each page must have separate Meta Title/Description for Arabic and English

## 5) SEO Requirements
### Technical SEO
- SSR/SSG as appropriate per route (favor static where possible)
- Dynamic metadata per page (title/description + canonical)
- Generate `sitemap.xml`
- Configure `robots.txt`
- Schema.org structured data
- Open Graph + Twitter card metadata
- Core Web Vitals optimization (LCP/CLS/INP focus)

### On-page SEO
- SEO-friendly URLs
- Correct heading structure (H1/H2/H3)
- Image optimization (responsive sizes, modern formats, alt text)

## 6) UI/UX Direction
- Visual style: **soft feminine**
- UX expectations:
  - Fast, clean navigation
  - Mobile-first responsive design
  - Accessibility baseline (keyboard nav, contrast, semantic HTML)

## 7) Analytics
- Google Analytics 4
- Google Search Console

## 8) Security & Forms
- Contact form validation
- Spam protection (e.g., reCAPTCHA) if needed based on spam volume
- HTTPS in production

## 9) Data & Database
- Because v1 has **no booking** and content lives in **Sanity**, a separate application database is **not required** for MVP.
  - If future phases add bookings/users, prefer **PostgreSQL**.

## 10) Hosting
- Target hosting: **Vercel** (CDN + edge caching + Next.js-native deploy)

## 11) Docker-only Development
- Must support local development using Docker (e.g., `docker compose up`)
- Preferred: run **Next.js** in a container; optionally run **Sanity Studio** in a container if feasible/desired

