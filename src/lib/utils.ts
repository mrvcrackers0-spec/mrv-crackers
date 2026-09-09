export function formatCurrency(amount: number): string {
  return `₹${Math.round(amount).toLocaleString("en-IN")}`;
}

export function lineTotal(sellingPrice: number, quantity: number): number {
  return sellingPrice * quantity;
}

export function lineSavings(
  originalPrice: number | null | undefined,
  sellingPrice: number,
  quantity: number
): number {
  if (!originalPrice || originalPrice <= sellingPrice) return 0;
  return (originalPrice - sellingPrice) * quantity;
}

export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}
