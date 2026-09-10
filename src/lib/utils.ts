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

// site_settings.whatsapp_number is stored as raw digits (e.g. "919994812945")
// so it plugs straight into wa.me links — format it for on-screen display only.
export function formatPhoneDisplay(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) {
    const local = digits.slice(2);
    return `+91 ${local.slice(0, 5)} ${local.slice(5)}`;
  }
  if (digits.length === 10) {
    return `+91 ${digits.slice(0, 5)} ${digits.slice(5)}`;
  }
  return raw.startsWith("+") ? raw : `+${digits || raw}`;
}
