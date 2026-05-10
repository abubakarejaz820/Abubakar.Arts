// src/utils/formatPrice.ts
export function formatPrice(amount: number, currency: 'USD' | 'RS' = 'RS'): string {
  if (currency === 'USD') {
    return `$${amount.toFixed(2)}`; // USD format
  } else {
    return `Rs ${amount.toLocaleString()}`; // RS format
  }
}
