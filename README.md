[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Fcommerce&project-name=commerce&repo-name=commerce&demo-title=Next.js%20Commerce&demo-url=https%3A%2F%2Fdemo.vercel.store&demo-image=https%3A%2F%2Fbigcommerce-demo-asset-ksvtgfvnd.vercel.app%2Fbigcommerce.png&env=COMPANY_NAME,SHOPIFY_REVALIDATION_SECRET,SHOPIFY_STORE_DOMAIN,SHOPIFY_STOREFRONT_ACCESS_TOKEN,SITE_NAME)

# Next.js Commerce

A high-performance, server-rendered Next.js App Router ecommerce application.

This template uses React Server Components, Server Actions, `Suspense`, `useOptimistic`, and more.

> **Note:** For detailed technical documentation, architecture notes, and development guidelines, see [CLAUDE.md](./CLAUDE.md).

<h3 id="v1-note"></h3>

> Note: Looking for Next.js Commerce v1? View the [code](https://github.com/vercel/commerce/tree/v1), [demo](https://commerce-v1.vercel.store), and [release notes](https://github.com/vercel/commerce/releases/tag/v1).

## Tech Stack

- **Next.js 15** - App Router with experimental features (PPR, inline CSS, useCache)
- **React 19** - Server Components & Server Actions
- **TypeScript 5.9** - Full type safety
- **Tailwind CSS 4** - Utility-first styling
- **Biome** - Fast linting and formatting
- **Bun** - Fast JavaScript runtime and package manager
- **Shopify Storefront API** - Headless commerce integration

## Providers

Vercel will only be actively maintaining a Shopify version [as outlined in our vision and strategy for Next.js Commerce](https://github.com/vercel/commerce/pull/966).

Vercel is happy to partner and work with any commerce provider to help them get a similar template up and running and listed below. Alternative providers should be able to fork this repository and swap out the `lib/shopify` file with their own implementation while leaving the rest of the template mostly unchanged.

- Shopify (this repository)
- [BigCommerce](https://github.com/bigcommerce/nextjs-commerce) ([Demo](https://next-commerce-v2.vercel.app/))
- [Ecwid by Lightspeed](https://github.com/Ecwid/ecwid-nextjs-commerce/) ([Demo](https://ecwid-nextjs-commerce.vercel.app/))
- [Geins](https://github.com/geins-io/vercel-nextjs-commerce) ([Demo](https://geins-nextjs-commerce-starter.vercel.app/))
- [Medusa](https://github.com/medusajs/vercel-commerce) ([Demo](https://medusa-nextjs-commerce.vercel.app/))
- [Prodigy Commerce](https://github.com/prodigycommerce/nextjs-commerce) ([Demo](https://prodigy-nextjs-commerce.vercel.app/))
- [Saleor](https://github.com/saleor/nextjs-commerce) ([Demo](https://saleor-commerce.vercel.app/))
- [Shopware](https://github.com/shopwareLabs/vercel-commerce) ([Demo](https://shopware-vercel-commerce-react.vercel.app/))
- [Swell](https://github.com/swellstores/verswell-commerce) ([Demo](https://verswell-commerce.vercel.app/))
- [Umbraco](https://github.com/umbraco/Umbraco.VercelCommerce.Demo) ([Demo](https://vercel-commerce-demo.umbraco.com/))
- [Wix](https://github.com/wix/headless-templates/tree/main/nextjs/commerce) ([Demo](https://wix-nextjs-commerce.vercel.app/))
- [Fourthwall](https://github.com/FourthwallHQ/vercel-commerce) ([Demo](https://vercel-storefront.fourthwall.app/))

> Note: Providers, if you are looking to use similar products for your demo, you can [download these assets](https://drive.google.com/file/d/1q_bKerjrwZgHwCw0ovfUMW6He9VtepO_/view?usp=sharing).

## Integrations

Integrations enable upgraded or additional functionality for Next.js Commerce

- [Orama](https://github.com/oramasearch/nextjs-commerce) ([Demo](https://vercel-commerce.oramasearch.com/))

  - Upgrades search to include typeahead with dynamic re-rendering, vector-based similarity search, and JS-based configuration.
  - Search runs entirely in the browser for smaller catalogs or on a CDN for larger.

- [React Bricks](https://github.com/ReactBricks/nextjs-commerce-rb) ([Demo](https://nextjs-commerce.reactbricks.com/))
  - Edit pages, product details, and footer content visually using [React Bricks](https://www.reactbricks.com) visual headless CMS.

## Running Locally

You will need to use the environment variables [defined in `env.example`](env.example) to run Next.js Commerce. It's recommended you use [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables) for this, but a `.env.local` file is all that is necessary.

> Note: You should not commit your `.env` file or it will expose secrets that will allow others to control your Shopify store.

### Quick Start

1. Install Bun (if not already installed): `curl -fsSL https://bun.sh/install | bash`
2. Install dependencies: `bun install`
3. Set up environment variables (see below)
4. Run development server: `bun dev`

Your app should now be running on [localhost:3000](http://localhost:3000/).

### Environment Setup

**Option 1: Using Vercel CLI (Recommended)**

1. Install Vercel CLI: `npm i -g vercel`
2. Link local instance with Vercel and GitHub accounts: `vercel link`
3. Download your environment variables: `vercel env pull`

**Option 2: Manual Setup**

1. Copy `env.example` to `.env.local`
2. Fill in your Shopify credentials:
   ```bash
   SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
   SHOPIFY_STOREFRONT_ACCESS_TOKEN=your-storefront-access-token
   SHOPIFY_REVALIDATION_SECRET=your-secret-key
   COMPANY_NAME=Your Company Name
   SITE_NAME=Your Site Name
   ```

<details>
  <summary>Expand if you work at Vercel and want to run locally and / or contribute</summary>

1. Run `vc link`.
1. Select the `Vercel Solutions` scope.
1. Connect to the existing `commerce-shopify` project.
1. Run `vc env pull` to get environment variables.
1. Run `bun dev` to ensure everything is working correctly.
</details>

## Available Scripts

```bash
# Development
bun dev                    # Start dev server
bun start                  # Start production server
bun run build              # Build for production

# Code Quality
bun run check              # Run Biome checks
bun run check:all          # Run type checking + Biome checks
bun run lint               # Lint with Biome
bun run lint-fix           # Fix linting issues (safe)
bun run lint-fix-unsafe    # Fix linting issues (including unsafe)
bun run format             # Format code with Biome
bun run type               # TypeScript type checking
```

## Project Structure

```
shopify-nextjs-app/
├── app/                    # Next.js App Router pages
│   ├── [page]/            # Dynamic pages
│   ├── product/           # Product pages
│   ├── search/            # Search & collections
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── cart/              # Shopping cart
│   ├── layout/            # Navigation & footer
│   └── product/           # Product displays
├── lib/                   # Utilities & Shopify integration
│   └── shopify/           # Shopify API layer
└── fonts/                 # Custom fonts
```

## Key Features

- **Cart Management** - Add, update, remove items with optimistic updates
- **Product Browsing** - Collections, filtering, sorting, search
- **Image Optimization** - Automatic AVIF/WebP conversion
- **Partial Prerendering** - Faster page loads with Next.js 15 PPR
- **Server Components** - Reduced client-side JavaScript
- **Cache Management** - Smart revalidation with Shopify webhooks

## Vercel, Next.js Commerce, and Shopify Integration Guide

You can use this comprehensive [integration guide](https://vercel.com/docs/integrations/ecommerce/shopify) with step-by-step instructions on how to configure Shopify as a headless CMS using Next.js Commerce as your headless Shopify storefront on Vercel.

## Contributing

See [CLAUDE.md](./CLAUDE.md) for detailed development guidelines, architecture notes, and best practices.

## License

MIT License - see LICENSE file for details
