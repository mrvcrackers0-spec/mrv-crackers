import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import type { CartItem } from "../context/CartStore";
import type { SiteSettings } from "../types/database";
import type { CustomerDetails } from "./whatsapp";
import { formatCurrency } from "./utils";

export function downloadOrderSummaryPdf(
  settings: SiteSettings,
  customer: CustomerDetails,
  items: CartItem[]
) {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const marginX = 40;
  let y = 50;

  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text(settings.business_name, marginX, y);

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  y += 18;
  doc.text(`Order Date: ${new Date().toLocaleDateString("en-IN")}`, marginX, y);

  y += 24;
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Customer Details", marginX, y);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  y += 16;
  doc.text(`Name: ${customer.name}`, marginX, y);
  y += 14;
  doc.text(`Phone: ${customer.mobile}`, marginX, y);
  y += 14;
  doc.text(`Address: ${customer.address}, ${customer.city}`, marginX, y);

  y += 20;

  let subtotal = 0;
  let savings = 0;
  const rows = items.map((item, index) => {
    const total = item.sellingPrice * item.quantity;
    subtotal += total;
    if (item.originalPrice && item.originalPrice > item.sellingPrice) {
      savings += (item.originalPrice - item.sellingPrice) * item.quantity;
    }
    return [
      String(index + 1),
      item.name,
      String(item.quantity),
      formatCurrency(item.sellingPrice),
      formatCurrency(total),
    ];
  });

  autoTable(doc, {
    startY: y,
    head: [["#", "Product", "Qty", "Price", "Total"]],
    body: rows,
    headStyles: { fillColor: [200, 30, 44] },
    margin: { left: marginX, right: marginX },
    styles: { fontSize: 9 },
  });

  const finalY = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 24;

  doc.setFontSize(10);
  doc.text(`Subtotal: ${formatCurrency(subtotal)}`, marginX, finalY);
  if (savings > 0) doc.text(`Savings: ${formatCurrency(savings)}`, marginX, finalY + 14);
  doc.setFont("helvetica", "bold");
  doc.text(`Grand Total: ${formatCurrency(subtotal)}`, marginX, finalY + (savings > 0 ? 28 : 14));

  const contactY = finalY + (savings > 0 ? 52 : 38);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text(
    `${settings.business_name} | ${settings.phone} | ${settings.address}, ${settings.city}`,
    marginX,
    contactY
  );

  doc.save(`MRV-Crackers-Order-${Date.now()}.pdf`);
}
