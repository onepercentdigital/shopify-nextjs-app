# Next.js Shopify Commerce Application

## Project Overview

This is a high-performance, server-rendered Next.js 15 App Router ecommerce application that integrates with Shopify as a headless storefront. It's based on Vercel's Next.js Commerce template and demonstrates modern React patterns including Server Components, Server Actions, Suspense, and `useOptimistic`.

## Tech Stack

### Core Framework
- **Next.js 15.6.0-canary.57** - App Router with experimental features enabled
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
- `cacheComponents: true` - Cache Components (replaces PPR in 15.6+, enables Partial Prerendering)
- `inlineCss: true` - Inline critical CSS
- `useCache: true` - New caching system
- `enablePrerenderSourceMaps: true` - Automatically enabled by cacheComponents
- `rdcForNavigations: true` - Automatically enabled by cacheComponents

**Image Optimization:**
- Formats: AVIF, WebP
- Remote patterns configured for Shopify CDN

**Note:** In Next.js 15.6+, `experimental.ppr` was renamed to `experimental.cacheComponents`. The Partial Prerendering feature is still available but is now enabled via the `cacheComponents` flag.

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
- **Next.js 15.6 Upgrade** - Migrated from 15.4 to 15.6 canary
  - Updated `experimental.ppr` to `experimental.cacheComponents`
  - Added required Suspense boundaries for components using `use()` hook
  - Fixed `new Date()` usage in Server and Client Components
  - Updated `revalidateTag()` to use new two-argument API
- **Suspense Boundary Improvements**
  - Wrapped `CartModal` in Suspense in Navbar
  - Wrapped `AddToCart` in Suspense in ProductDescription
  - Wrapped `CopyrightYear` in Suspense in Footer
- **Dynamic Data Access Fixes**
  - Added `await headers()` in product pages (`/product/[handle]`)
  - Added `await headers()` in search pages (`/search/[collection]`)
  - Added `await headers()` in dynamic pages (`/[page]`)
  - Ensures proper data access ordering before params/searchParams
- **Cart Functionality Fixes**
  - Added `revalidatePath('/', 'layout')` to cart server actions
  - Ensures cart updates propagate correctly without page refresh
  - Maintains optimistic UI updates with server state synchronization
- **Component Architecture**
  - Created `CopyrightYear` client component for dynamic year display
  - Moved copyright logic from server to client to avoid prerendering issues
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

### Next.js 15.6 Specific Requirements

**Suspense Boundaries for Dynamic Data:**
With `experimental.cacheComponents` enabled, components that access dynamic data require proper Suspense boundaries:

```typescript
// ✅ Correct: Component using use() wrapped in Suspense
<Suspense fallback={<LoadingSkeleton />}>
  <ComponentUsingUseHook />
</Suspense>

// ❌ Wrong: Component using use() without Suspense
<ComponentUsingUseHook />
```

**Using `new Date()` in Components:**
- In Server Components: Must access uncached data (like `headers()`, `cookies()`) BEFORE calling `new Date()`
- In Client Components: Must be wrapped in Suspense boundary
- Best practice: Move dynamic time logic to small, isolated Client Components

```typescript
// ✅ Correct: Client component with Suspense
'use client';
function DynamicDate() {
  const year = new Date().getFullYear();
  return <>{year}</>;
}

// In parent Server Component:
<Suspense fallback="2025">
  <DynamicDate />
</Suspense>
```

**revalidateTag API Update:**
Next.js 15.6 requires a second argument for `revalidateTag()`:

```typescript
// ✅ Correct: Two arguments
revalidateTag(TAGS.cart, 'max');

// ❌ Deprecated: Single argument
revalidateTag(TAGS.cart);
```

**Cart Updates and Revalidation:**
Cart server actions use both `revalidateTag()` and `revalidatePath()`:
- `revalidateTag(TAGS.cart, 'max')` - For tagged cache entries
- `revalidatePath('/', 'layout')` - Revalidates the layout to refresh cart data

This ensures:
1. Optimistic UI updates happen immediately
2. Server state is persisted via server actions
3. Layout refetches fresh cart data after mutations
4. Cart displays correctly without manual page refresh

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
1. **Optimistic Update**: Client immediately updates UI via `useOptimistic` hook
2. **Server Action**: Executes cart mutation (add/remove/update)
3. **Revalidation**: Calls `revalidateTag()` and `revalidatePath()` to refresh data
4. **Layout Refresh**: Root layout refetches cart data via `getCart()`
5. **State Sync**: Client reconciles optimistic state with server response

**Important:** Cart data is fetched at the layout level, which makes the layout dynamic (uses `cookies()`). This is intentional and correct for e-commerce - each user needs their own cart. Product pages and other content remain statically generated.

**Architecture Benefits:**
- ✅ Product catalog pages are static (fast, CDN-cached)
- ✅ Layout is dynamic for user-specific cart data
- ✅ Optimistic updates provide instant feedback
- ✅ Server actions ensure data persistence
- ✅ Best of both worlds: static content + dynamic user data

## Troubleshooting

### Common Next.js 15.6 Migration Issues

**Error: "Route used `new Date()` before accessing uncached data"**
- **Cause**: Calling `new Date()` in Server Component before accessing dynamic data
- **Solution**: Call `await headers()` before `new Date()`, or move to Client Component with Suspense
- **Files affected**: Product pages, search pages, footer components

**Error: "Component accessed data without Suspense boundary"**
- **Cause**: Component using `use()` hook not wrapped in Suspense
- **Solution**: Wrap component in `<Suspense fallback={...}>`
- **Files affected**: Components using `useCart()` hook (CartModal, AddToCart)

**Error: "`revalidateTag` without second argument is deprecated"**
- **Cause**: Using old single-argument `revalidateTag()` API
- **Solution**: Add second argument: `revalidateTag(tag, 'max')`
- **Files affected**: Cart server actions, webhook handlers

**Cart not updating after adding items**
- **Cause**: Missing `revalidatePath()` call in server actions
- **Solution**: Add `revalidatePath('/', 'layout')` after cart mutations
- **Files affected**: `components/cart/actions.ts`

**Pages showing as fully dynamic when they should be static**
- **Cause**: Accessing `cookies()` or `headers()` in page components
- **Solution**: Only access dynamic data in layout or specific dynamic components
- **Note**: Cart data in layout is intentionally dynamic - product pages remain static

### Development Tips

1. **Check Build Output**: Run `bun run build` to see which routes are static vs dynamic
2. **Monitor Console**: Watch for deprecation warnings during development
3. **Test Without Cache**: Clear `.next` folder if seeing stale behavior
4. **Verify Suspense**: Use React DevTools to check Suspense boundaries
5. **Check Network Tab**: Verify optimistic updates and server responses

## Testing Considerations

When working on this project:
1. Always test cart operations (add, update, remove)
2. Verify cart updates appear without page refresh (optimistic updates)
3. Verify mobile responsiveness
4. Check image loading and optimization
5. Test search and filter functionality
6. Validate TypeScript types with `bun run type`
7. Ensure Biome checks pass with `bun run check:all`
8. Test with empty cart state (no cartId cookie)
9. Test cart operations after clearing cookies
10. Verify Suspense boundaries don't cause loading flashes
11. Check console for Next.js 15.6 prerendering warnings

## Deployment

Optimized for deployment on Vercel:
- One-click deploy with environment variables
- Automatic cache revalidation via webhooks
- Edge-ready with React Server Components
- Optimized for CDN delivery
- Uses Bun runtime for faster builds

## Migration Guide: Next.js 15.4 → 15.6

If you're upgrading from Next.js 15.4 (or earlier) to 15.6, follow these steps:

### 1. Update Configuration

```typescript
// next.config.ts
export default {
  experimental: {
    cacheComponents: true,  // Changed from: ppr: true
    inlineCss: true,
    useCache: true,
  },
  // ... rest of config
};
```

### 2. Update revalidateTag Calls

```typescript
// Before
revalidateTag(TAGS.cart);

// After
revalidateTag(TAGS.cart, 'max');
```

### 3. Add Suspense Boundaries

Wrap components using `use()` hook in Suspense:

```typescript
// Before
<ComponentUsingUseHook />

// After
<Suspense fallback={<Skeleton />}>
  <ComponentUsingUseHook />
</Suspense>
```

### 4. Fix new Date() Usage

**Option A - Server Component:**
```typescript
export default async function MyComponent() {
  await headers(); // Access uncached data first
  const year = new Date().getFullYear();
  // ...
}
```

**Option B - Client Component (Preferred):**
```typescript
// components/dynamic-date.tsx
'use client';
export default function DynamicDate() {
  const year = new Date().getFullYear();
  return <>{year}</>;
}

// In Server Component
<Suspense fallback="2025">
  <DynamicDate />
</Suspense>
```

### 5. Add Cart Revalidation

```typescript
// components/cart/actions.ts
export async function addItem(...) {
  await addToCart([...]);
  revalidateTag(TAGS.cart, 'max');
  revalidatePath('/', 'layout'); // Add this line
}
```

### 6. Verify Build

```bash
bun run build
```

Check that:
- Static routes are marked with `○` (static)
- Dynamic routes are marked with `λ` (server)
- No deprecation warnings in console

## Additional Resources

- [Next.js Commerce GitHub](https://github.com/vercel/commerce)
- [Shopify Storefront API Docs](https://shopify.dev/docs/api/storefront)
- [Next.js 15 Documentation](https://nextjs.org/docs)
- [Next.js 15.6 Upgrade Guide](https://nextjs.org/docs/messages/next-prerender-missing-suspense)
- [Vercel Shopify Integration Guide](https://vercel.com/docs/integrations/ecommerce/shopify)
- [Biome Documentation](https://biomejs.dev/)
- [Bun Documentation](https://bun.sh/docs)
