import { useState, type FormEvent } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { LogIn } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useSiteSettings } from "../../hooks/useSiteSettings";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";

export default function AdminLogin() {
  const { session, signIn, loading } = useAuth();
  const { settings } = useSiteSettings();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  if (!loading && session) {
    return <Navigate to="/admin" replace />;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const { error } = await signIn(email, password);
    setSubmitting(false);
    if (error) {
      setError(error);
      return;
    }
    navigate("/admin");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-navy bg-grid-navy px-4">
      <div className="w-full max-w-[420px] rounded-card-lg border border-white/10 bg-white p-8 shadow-float sm:p-10">
        <div className="mb-8 flex flex-col items-center gap-3 text-center">
          <span className="h-14 w-14 shrink-0 overflow-hidden rounded-full">
            <img
              src={settings.logo_url || "/logo.jpg"}
              alt={`${settings.business_name} logo`}
              className="h-full w-full object-cover"
            />
          </span>
          <h1 className="text-2xl font-extrabold text-text-dark">MRV Crackers Admin</h1>
          <p className="text-sm text-text-muted">Sign in to manage products, categories and settings.</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="Email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@example.com"
          />
          <Input
            label="Password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />
          {error && <p className="text-sm font-semibold text-red">{error}</p>}
          <Button type="submit" size="lg" fullWidth icon={<LogIn size={18} />} disabled={submitting}>
            {submitting ? "Signing in..." : "Sign In"}
          </Button>
        </form>
      </div>
    </div>
  );
}
