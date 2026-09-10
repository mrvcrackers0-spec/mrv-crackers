import { useState } from "react";
import { Link } from "react-router-dom";
import { Download, MessageCircle, PackageOpen } from "lucide-react";
import { useCartStore, cartTotals } from "../../context/CartStore";
import { useSiteSettings } from "../../hooks/useSiteSettings";
import { CartItem } from "../../components/cart/CartItem";
import { CartSummary } from "../../components/cart/CartSummary";
import { CustomerForm } from "../../components/cart/CustomerForm";
import { Button } from "../../components/ui/Button";
import { buildOrderMessage, openWhatsApp, type CustomerDetails } from "../../lib/whatsapp";
import { formatCurrency } from "../../lib/utils";

const EMPTY_CUSTOMER: CustomerDetails = { name: "", mobile: "", city: "", address: "", notes: "" };

export default function Cart() {
  const items = useCartStore((s) => s.items);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const { settings } = useSiteSettings();

  const [customer, setCustomer] = useState<CustomerDetails>(EMPTY_CUSTOMER);
  const [errors, setErrors] = useState<Partial<Record<keyof CustomerDetails, string>>>({});
  const [formNotice, setFormNotice] = useState<string | null>(null);

  const { subtotal, savings, total } = cartTotals(items);
  const belowMinimum = settings.minimum_order_amount > 0 && total < settings.minimum_order_amount;

  function validate(): boolean {
    const nextErrors: Partial<Record<keyof CustomerDetails, string>> = {};
    if (!customer.name.trim()) nextErrors.name = "Name is required.";
    if (!/^\d{10}$/.test(customer.mobile.replace(/\D/g, ""))) nextErrors.mobile = "Enter a valid 10-digit mobile number.";
    if (!customer.city.trim()) nextErrors.city = "City is required.";
    if (!customer.address.trim()) nextErrors.address = "Address is required.";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleOrder() {
    setFormNotice(null);
    if (items.length === 0) return;
    if (belowMinimum) {
      setFormNotice(`Minimum order amount is ₹${settings.minimum_order_amount.toLocaleString("en-IN")}.`);
      return;
    }
    if (!validate()) return;

    const message = buildOrderMessage(customer, items);
    openWhatsApp(settings.whatsapp_number, message);
  }

  async function handleDownloadPdf() {
    if (items.length === 0) return;
    const { downloadOrderSummaryPdf } = await import("../../lib/pdf");
    downloadOrderSummaryPdf(settings, customer, items);
  }

  if (items.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 bg-off-white px-4 py-20 text-center">
        <span className="flex h-20 w-20 items-center justify-center rounded-full bg-red/10 text-red">
          <PackageOpen size={36} aria-hidden />
        </span>
        <h1 className="text-2xl font-extrabold text-text-dark">Your estimate is empty</h1>
        <p className="max-w-sm text-text-muted">
          Add some crackers to your estimate to see them here and build your order.
        </p>
        <Link to="/estimate">
          <Button>Browse Crackers</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-off-white py-10 sm:py-14">
      <div className="container-page max-w-[1200px]">
        <div className="mb-8 flex flex-col items-start gap-2">
          <span className="rounded-pill bg-red/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-red">
            Your Estimate
          </span>
          <h1 className="text-3xl font-extrabold text-red-dark sm:text-4xl">Review Your Crackers</h1>
          <p className="text-text-muted">Check your selected products before sending your order.</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          <div className="flex flex-col gap-4">
            {items.map((item) => (
              <CartItem
                key={item.productId}
                item={item}
                onQuantityChange={(qty) => updateQuantity(item.productId, qty)}
                onRemove={() => removeItem(item.productId)}
              />
            ))}
          </div>

          <div className="flex flex-col gap-6">
            <CartSummary
              subtotal={subtotal}
              savings={savings}
              total={total}
              minimumOrderAmount={settings.minimum_order_amount}
            />
            <CustomerForm values={customer} onChange={setCustomer} errors={errors} />

            {formNotice && (
              <p className="rounded-[10px] bg-red/10 p-3 text-sm font-semibold text-red">{formNotice}</p>
            )}

            <Button
              size="lg"
              variant="whatsapp"
              fullWidth
              icon={<MessageCircle size={18} />}
              onClick={handleOrder}
              disabled={belowMinimum}
            >
              {belowMinimum
                ? `Add ${formatCurrency(settings.minimum_order_amount - total)} More to Order`
                : "Order via WhatsApp"}
            </Button>
            <Button size="md" variant="secondary" fullWidth icon={<Download size={16} />} onClick={handleDownloadPdf}>
              Download Order Summary (PDF)
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
