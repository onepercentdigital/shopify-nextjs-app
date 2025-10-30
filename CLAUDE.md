# Next.js Shopify Commerce Application

## Project Overview

This is a high-performance, server-rendered Next.js 15 App Router ecommerce application that integrates with Shopify as a headless storefront. It's based on Vercel's Next.js Commerce template and demonstrates modern React patterns including Server Components, Server Actions, Suspense, and `useOptimistic`.

## Tech Stack

### Core Framework
- **Next.js 15.4.2-canary.47** - App Router with experimental features enabled
- **React 19.1.1** - Latest React with Server Components
- **TypeScript 5.9.3** - Type-safe development
- **Bun** - Fast JavaScript runtime and package manager

### Styling & UI
- **Tailwind CSS 4.1.16** - Utility-first CSS framework
- **@tailwindcss/typography 0.5.19** - Beautiful typographic defaults
- **@tailwindcss/container-queries 0.1.1** - Container query support
- **Geist Font 1.5.1** - Vercel's typeface
- **clsx 2.1.1** - Utility for constructing className strings

### UI Components
- **@headlessui/react 2.2.9** - Unstyled, accessible UI components
- **@heroicons/react 2.2.0** - Beautiful hand-crafted SVG icons
- **Sonner 2.0.7** - Toast notifications

### Development Tools
- **Biome 2.3.2** - Fast formatter and linter (replaces ESLint + Prettier)

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
│   ├── globals.css               # Global styles
│   └── error.tsx                 # Error boundary
├── components/                   # React components
│   ├── cart/                     # Shopping cart components
│   │   ├── actions.ts            # Server actions for cart operations
│   │   ├── cart-context.tsx     # Client-side cart state
│   │   └── modal.tsx            # Cart UI modal
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
├── fonts/                        # Custom fonts
├── tsconfig.json                 # TypeScript configuration
├── biome.json                    # Biome configuration
└── next.config.ts                # Next.js configuration
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
- **Turbopack** - Fast development mode bundler (via `--turbo` flag)

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

Required environment variables (see `env.example`):

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
bun dev                    # Start dev server with Bun runtime
bun start                  # Start production server
bun run build              # Build for production

# Code Quality
bun run check              # Check code with Biome
bun run check:all          # Run both type checking and Biome checks
bun run lint               # Lint code with Biome
bun run lint-fix           # Fix code issues with Biome (safe fixes)
bun run lint-fix-unsafe    # Fix code issues with Biome (including unsafe fixes)
bun run format             # Format code with Biome
bun run type               # TypeScript type checking
```

## Shopify API Integration

### Key Functions (`lib/shopify/index.ts`)

**Cart Operations:**
- `createCart()` - Create a new shopping cart
- `getCart()` - Retrieve current cart (returns undefined if no cart exists)
- `addToCart(lines)` - Add items to cart (requires cartId cookie)
- `removeFromCart(lineIds)` - Remove items from cart (requires cartId cookie)
- `updateCart(lines)` - Update cart item quantities (requires cartId cookie)

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

### Error Handling in Cart Operations

The cart functions (`addToCart`, `removeFromCart`, `updateCart`) throw errors if the cartId cookie is not found:

```typescript
const cartId = (await cookies()).get('cartId')?.value;

if (!cartId) {
  throw new Error('Cart ID not found in cookies');
}
```

Server actions in `components/cart/actions.ts` handle these errors and return user-friendly error messages.

### Cache Strategy

The app uses Next.js 15's new caching APIs:
- `'use cache'` directive for function-level caching
- `cacheTag()` - Tag cache entries for targeted invalidation
- `cacheLife('days')` - Set cache duration
- Tags: `collections`, `products`, `cart`

## TypeScript Configuration

**Modern Configuration:**
- Target: `ESNext`
- Module: `Preserve` (optimized for Next.js 15)
- Module Resolution: `bundler` (optimized for Bun + Next.js)
- JSX: `preserve` (required by Next.js)
- Strict mode enabled with additional safety checks:
  - `noUncheckedIndexedAccess`
  - `noImplicitOverride`
  - `noFallthroughCasesInSwitch`
  - `noUnusedLocals`
  - `noUnusedParameters`

**Note:** Generated Next.js files (`.next/types/validator.ts`) are excluded from strict unused variable checks.

## Next.js Configuration

**Experimental Features Enabled:**
- `ppr: true` - Partial Prerendering
- `inlineCss: true` - Inline critical CSS
- `useCache: true` - New caching system

**Image Optimization:**
- Formats: AVIF, WebP
- Remote patterns configured for Shopify CDN

## Code Style

The project uses **Biome** for both linting and formatting:

**Formatter Settings:**
- Line width: 80 characters
- Indent: 2 spaces
- Style: space indentation

**JavaScript/TypeScript Settings:**
- Quote style: single quotes
- Semicolons: always
- Trailing commas: all
- JSX quotes: double
- Arrow parentheses: always

**Linting Rules:**
- Recommended rules enabled
- Import type usage warnings
- Accessibility checks
- Sorted Tailwind classes (via `useSortedClasses`)
- Security checks (dangerouslySetInnerHtml warnings)

## Git Workflow

**Main Branch:** `main`
**Current Branch:** `update/test`

**Recent Changes:**
- TypeScript configuration modernized to ESNext with bundler resolution
- Fixed non-null assertion errors in cart functions
- Removed Safari lazy loading workaround (fixed in Safari 16.4+)
- Search and item state fixes
- Mobile menu improvements
- Client-side navigation for search
- Migration to Biome from ESLint/Prettier
- Tailwind configuration fixes

## Hidden Features

- Products tagged with `nextjs-frontend-hidden` are filtered out
- Collections starting with `hidden-` are excluded from search
- Automatic "All" collection for browsing all products

## Important Notes & Gotchas

### Server Action Architecture
When working with Next.js 15 experimental features (PPR, useCache), keep server action architecture **flat and simple**:

✅ **Good Pattern:**
```typescript
export async function addItem() {
  await addToCart([...]); // Single level of server API calls
}
```

❌ **Avoid:**
```typescript
export async function addItem() {
  await ensureCart();     // Nested server-only API calls
  await addToCart([...]);  // Creates complex dependency chain
}
```

**Why:** Deep nesting of server-only API calls (like `cookies()`) in Server Actions can cause webpack module resolution errors with Next.js 15's experimental features.

### Cart Operation Flow
1. Server actions in `components/cart/actions.ts` check if cart exists via `getCart()`
2. If no cart exists, appropriate error messages are returned
3. Cart operations (`addToCart`, `removeFromCart`, `updateCart`) require a valid cartId cookie
4. These functions throw errors if cartId is missing, which are caught by server actions

## Testing Considerations

When working on this project:
1. Always test cart operations (add, update, remove)
2. Verify mobile responsiveness
3. Check image loading and optimization
4. Test search and filter functionality
5. Validate TypeScript types with `bun run type`
6. Ensure Biome checks pass with `bun run check:all`
7. Test with empty cart state (no cartId cookie)
8. Test cart operations after clearing cookies

## Deployment

Optimized for deployment on Vercel:
- One-click deploy with environment variables
- Automatic cache revalidation via webhooks
- Edge-ready with React Server Components
- Optimized for CDN delivery
- Uses Bun runtime for faster builds

## Additional Resources

- [Next.js Commerce GitHub](https://github.com/vercel/commerce)
- [Shopify Storefront API Docs](https://shopify.dev/docs/api/storefront)
- [Next.js 15 Documentation](https://nextjs.org/docs)
- [Vercel Shopify Integration Guide](https://vercel.com/docs/integrations/ecommerce/shopify)
- [Biome Documentation](https://biomejs.dev/)
- [Bun Documentation](https://bun.sh/docs)
