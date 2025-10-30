# Next.js Shopify Commerce Application

## Project Overview

This is a high-performance, server-rendered Next.js 15 App Router ecommerce application that integrates with Shopify as a headless storefront. It's based on Vercel's Next.js Commerce template and demonstrates modern React patterns including Server Components, Server Actions, Suspense, and `useOptimistic`.

## Tech Stack

### Core Framework
- **Next.js 15.4.2-canary.47** - App Router with experimental features enabled
- **React 19.1.1** - Latest React with Server Components
- **TypeScript 5.9.2** - Type-safe development

### Styling & UI
- **Tailwind CSS 4.1.12** - Utility-first CSS framework
- **@tailwindcss/typography** - Beautiful typographic defaults
- **@tailwindcss/container-queries** - Container query support
- **Geist Font** - Vercel's typeface
- **clsx** - Utility for constructing className strings

### UI Components
- **@headlessui/react** - Unstyled, accessible UI components
- **@heroicons/react** - Beautiful hand-crafted SVG icons
- **Sonner** - Toast notifications

### Development Tools
- **Biome 2.2.0** - Fast formatter and linter (replaces ESLint + Prettier)
- **Prettier 3.6.2** - Code formatter with Tailwind plugin

### Shopify Integration
- **Shopify Storefront API** - GraphQL API for headless commerce
- Custom Shopify integration layer in `lib/shopify/`

## Project Structure

```
shopify-nextjs-app/
├── app/                          # Next.js App Router pages
│   ├── [page]/                   # Dynamic page routes
│   ├── api/                      # API routes
│   ├── product/                  # Product detail pages
│   ├── search/                   # Search and collection pages
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Homepage
│   └── error.tsx                 # Error boundary
├── components/                   # React components
│   ├── cart/                     # Shopping cart components
│   ├── grid/                     # Product grid layouts
│   ├── icons/                    # Icon components
│   ├── layout/                   # Layout components (navbar, footer, search)
│   └── product/                  # Product-related components
├── lib/                          # Utility functions and Shopify integration
│   ├── shopify/                  # Shopify API integration
│   │   ├── fragments/            # GraphQL fragments
│   │   ├── mutations/            # GraphQL mutations
│   │   ├── queries/              # GraphQL queries
│   │   ├── types.ts              # TypeScript types
│   │   └── index.ts              # Main Shopify API functions
│   ├── constants.ts              # App constants
│   └── utils.ts                  # Utility functions
└── fonts/                        # Custom fonts

```

## Key Features

### 1. Shopify Integration
- Full GraphQL Storefront API integration
- Cart management (create, add, update, remove)
- Product catalog browsing
- Collection filtering and sorting
- Dynamic menu generation
- Webhook support for cache revalidation

### 2. Performance Optimizations
- **Partial Prerendering (PPR)** - Experimental Next.js feature
- **React Server Components** - Reduces client-side JavaScript
- **Inline CSS** - Faster initial page loads
- **Image Optimization** - AVIF and WebP formats
- **Cache Management** - Smart revalidation with tags
- **Turbopack** - Fast development mode bundler

### 3. Shopping Experience
- Real-time cart updates with `useOptimistic`
- Product variant selection
- Image galleries with zoom
- Collection filtering and sorting
- Mobile-responsive design
- Toast notifications for user feedback

### 4. Search & Discovery
- Collection-based navigation
- Product search functionality
- Sorting options (relevance, trending, latest, price)
- Filter dropdowns

## Environment Variables

Required environment variables (see `.env.example`):

```bash
SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
SHOPIFY_STOREFRONT_ACCESS_TOKEN=your-storefront-access-token
SHOPIFY_REVALIDATION_SECRET=your-secret-key
COMPANY_NAME=Your Company Name
SITE_NAME=Your Site Name
```

## Development Scripts

```bash
# Development
bun dev                 # Start dev server with Turbopack
bun start              # Start production server
bun build              # Build for production

# Code Quality
bun run lint           # Check code with Biome
bun run lint-fix       # Fix code issues with Biome
bun run format         # Check formatting with Biome
bun run format-fix     # Fix formatting with Biome
bun run type          # TypeScript type checking
```

## Shopify API Integration

### Key Functions (`lib/shopify/index.ts`)

**Cart Operations:**
- `createCart()` - Create a new shopping cart
- `getCart()` - Retrieve current cart
- `addToCart(lines)` - Add items to cart
- `removeFromCart(lineIds)` - Remove items from cart
- `updateCart(lines)` - Update cart item quantities

**Product Operations:**
- `getProduct(handle)` - Get single product
- `getProducts(query, reverse, sortKey)` - Get product list
- `getProductRecommendations(productId)` - Get related products

**Collection Operations:**
- `getCollection(handle)` - Get single collection
- `getCollections()` - Get all collections
- `getCollectionProducts(collection, reverse, sortKey)` - Get products in collection

**Content Operations:**
- `getMenu(handle)` - Get navigation menu
- `getPage(handle)` - Get page content
- `getPages()` - Get all pages

**Cache Management:**
- `revalidate(req)` - Webhook handler for cache invalidation

### Cache Strategy

The app uses Next.js 15's new caching APIs:
- `'use cache'` directive for function-level caching
- `cacheTag()` - Tag cache entries for targeted invalidation
- `cacheLife('days')` - Set cache duration
- Tags: `collections`, `products`, `cart`

## Next.js Configuration

**Experimental Features Enabled:**
- `ppr: true` - Partial Prerendering
- `inlineCss: true` - Inline critical CSS
- `useCache: true` - New caching system

**Image Optimization:**
- Formats: AVIF, WebP
- Remote patterns configured for Shopify CDN

## Code Style

The project uses **Biome** for both linting and formatting (replaced ESLint and Prettier):
- Semi-colons: enabled
- Single quotes: enabled
- Tab width: 2 spaces
- Trailing commas: all
- Print width: 80 characters

## Git Workflow

**Main Branch:** `main`
**Current Branch:** `update/test`

**Recent Changes:**
- Search and item state fixes
- Mobile menu improvements
- Client-side navigation for search
- Migration to Biome from ESLint/Prettier
- Tailwind configuration fixes

## Hidden Features

- Products tagged with `nextjs-frontend-hidden` are filtered out
- Collections starting with `hidden-` are excluded from search
- Automatic "All" collection for browsing all products

## Testing Considerations

When working on this project:
1. Always test cart operations (add, update, remove)
2. Verify mobile responsiveness
3. Check image loading and optimization
4. Test search and filter functionality
5. Validate TypeScript types with `bun run type`
6. Ensure Biome checks pass before committing

## Deployment

Optimized for deployment on Vercel:
- One-click deploy with environment variables
- Automatic cache revalidation via webhooks
- Edge-ready with React Server Components
- Optimized for CDN delivery

## Additional Resources

- [Next.js Commerce GitHub](https://github.com/vercel/commerce)
- [Shopify Storefront API Docs](https://shopify.dev/docs/api/storefront)
- [Next.js 15 Documentation](https://nextjs.org/docs)
- [Vercel Shopify Integration Guide](https://vercel.com/docs/integrations/ecommerce/shopify)
