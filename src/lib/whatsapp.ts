import type { CartItem } from "../context/CartStore";
import { formatCurrency } from "./utils";

export interface CustomerDetails {
  name: string;
  mobile: string;
  city: string;
  address: string;
  notes?: string;
}

export function buildOrderMessage(customer: CustomerDetails, items: CartItem[]): string {
  const lines: string[] = [];

  lines.push("Hello MRV Crackers,");
  lines.push("");
  lines.push("I would like to place an order.");
  lines.push("");
  lines.push("CUSTOMER DETAILS");
  lines.push("-------------------------");
  lines.push(`Name: ${customer.name}`);
  lines.push(`Mobile: ${customer.mobile}`);
  lines.push(`City: ${customer.city}`);
  lines.push(`Address: ${customer.address}`);
  if (customer.notes) lines.push(`Notes: ${customer.notes}`);
  lines.push("");
  lines.push("ORDER DETAILS");
  lines.push("-------------------------");

  let subtotal = 0;
  let savings = 0;

  items.forEach((item, index) => {
    const total = item.sellingPrice * item.quantity;
    subtotal += total;
    if (item.originalPrice && item.originalPrice > item.sellingPrice) {
      savings += (item.originalPrice - item.sellingPrice) * item.quantity;
    }
    lines.push(`${index + 1}. ${item.name}`);
    lines.push(`Qty: ${item.quantity}`);
    lines.push(`Price: ${formatCurrency(item.sellingPrice)}`);
    lines.push(`Total: ${formatCurrency(total)}`);
    lines.push("");
  });

  lines.push("-------------------------");
  lines.push(`Subtotal: ${formatCurrency(subtotal)}`);
  if (savings > 0) lines.push(`Savings: ${formatCurrency(savings)}`);
  lines.push(`Total: ${formatCurrency(subtotal)}`);
  lines.push("-------------------------");
  lines.push("");
  lines.push("Please confirm availability and order details.");
  lines.push("");
  lines.push("Thank you.");

  return lines.join("\n");
}

export function buildEnquiryMessage(name: string, mobile: string, message: string): string {
  return [
    "Hello MRV Crackers,",
    "",
    "I have an enquiry.",
    "",
    `Name: ${name}`,
    `Mobile: ${mobile}`,
    `Message: ${message}`,
  ].join("\n");
}

export function openWhatsApp(whatsappNumber: string, message: string) {
  const digitsOnly = whatsappNumber.replace(/\D/g, "");
  const url = `https://wa.me/${digitsOnly}?text=${encodeURIComponent(message)}`;

  // Mobile browsers frequently block or mishandle window.open() when it
  // hands off to another app — a same-tab navigation is what reliably
  // triggers the WhatsApp app there. Desktop keeps the new-tab behavior
  // since there's no app to hand off to (wa.me shows a QR/web page).
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  if (isMobile) {
    window.location.href = url;
  } else {
    window.open(url, "_blank", "noopener,noreferrer");
  }
}
