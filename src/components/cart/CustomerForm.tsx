import type { CustomerDetails } from "../../lib/whatsapp";
import { Input, Textarea } from "../ui/Input";

interface CustomerFormProps {
  values: CustomerDetails;
  onChange: (values: CustomerDetails) => void;
  errors?: Partial<Record<keyof CustomerDetails, string>>;
}

export function CustomerForm({ values, onChange, errors }: CustomerFormProps) {
  function set<K extends keyof CustomerDetails>(key: K, value: CustomerDetails[K]) {
    onChange({ ...values, [key]: value });
  }

  return (
    <div className="rounded-card-lg border border-black/[0.06] bg-white p-6 shadow-soft">
      <h3 className="mb-5 text-lg font-extrabold text-text-dark">Customer Details</h3>
      <div className="flex flex-col gap-4">
        <Input
          label="Name"
          placeholder="Your full name"
          value={values.name}
          onChange={(e) => set("name", e.target.value)}
          error={errors?.name}
        />
        <Input
          label="Mobile Number"
          type="tel"
          placeholder="10-digit mobile number"
          value={values.mobile}
          onChange={(e) => set("mobile", e.target.value)}
          error={errors?.mobile}
        />
        <Input
          label="City"
          placeholder="Your city"
          value={values.city}
          onChange={(e) => set("city", e.target.value)}
          error={errors?.city}
        />
        <Textarea
          label="Address"
          placeholder="Full delivery / pickup address"
          value={values.address}
          onChange={(e) => set("address", e.target.value)}
          error={errors?.address}
          className="min-h-[90px]"
        />
        <Textarea
          label="Notes (optional)"
          placeholder="Any special instructions"
          value={values.notes ?? ""}
          onChange={(e) => set("notes", e.target.value)}
          className="min-h-[70px]"
        />
      </div>
    </div>
  );
}
