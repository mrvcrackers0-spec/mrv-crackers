import { useState, type FormEvent } from "react";
import { Send } from "lucide-react";
import { Input, Textarea } from "../ui/Input";
import { Button } from "../ui/Button";
import { buildEnquiryMessage, openWhatsApp } from "../../lib/whatsapp";

interface ContactFormProps {
  whatsappNumber: string;
}

export function ContactForm({ whatsappNumber }: ContactFormProps) {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{ name?: string; mobile?: string; message?: string }>({});

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const nextErrors: typeof errors = {};
    if (!name.trim()) nextErrors.name = "Name is required.";
    if (!/^\d{10}$/.test(mobile.replace(/\D/g, ""))) nextErrors.mobile = "Enter a valid 10-digit mobile number.";
    if (!message.trim()) nextErrors.message = "Please enter a message.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    openWhatsApp(whatsappNumber, buildEnquiryMessage(name, mobile, message));
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <Input label="Name" placeholder="Your full name" value={name} onChange={(e) => setName(e.target.value)} error={errors.name} />
      <Input label="Mobile Number" type="tel" placeholder="10-digit mobile number" value={mobile} onChange={(e) => setMobile(e.target.value)} error={errors.mobile} />
      <Textarea label="Message" placeholder="How can we help?" value={message} onChange={(e) => setMessage(e.target.value)} error={errors.message} />
      <Button type="submit" size="lg" fullWidth icon={<Send size={16} />}>
        Send Enquiry
      </Button>
    </form>
  );
}
