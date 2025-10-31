import { CartProvider } from 'components/cart/cart-context';
import { getCart } from 'lib/shopify';
import type { ReactNode } from 'react';

export async function CartProviderWrapper({
  children,
}: {
  children: ReactNode;
}) {
  const cart = getCart();

  return <CartProvider cartPromise={cart}>{children}</CartProvider>;
}
