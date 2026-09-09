/**
 * MOCK DATA — development-only fallback.
 *
 * Used only when Supabase is not configured (no .env) or a query fails.
 * Never imported directly by page/UI components — always go through
 * `src/services/*`, which decide whether to use Supabase or this file.
 * Safe to delete this whole file once a real Supabase project is live.
 */
import type { Category, Product, SiteSettings } from "../types/database";

export const mockSiteSettings: SiteSettings = {
  id: "00000000-0000-0000-0000-000000000001",
  business_name: "MRV Crackers",
  logo_url: null,
  phone: "+91 90000 00000",
  whatsapp_number: "919000000000",
  email: "info@mrvcrackers.example",
  address: "123 Market Street, Crackers Nagar",
  city: "Sivakasi, Tamil Nadu",
  minimum_order_amount: 3000,
  ticker_text: "MRV Crackers • Premium Crackers • Festival Offers • Best Deals • Shop Now",
  footer_text: "Your trusted destination for premium festival crackers.",
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

export const mockCategories: Category[] = [
  { id: "cat-1", name: "Gift Boxes", slug: "gift-boxes", description: "Curated combo packs", image_url: null, display_order: 1, is_active: true, created_at: "", updated_at: "" },
  { id: "cat-2", name: "Sparklers", slug: "sparklers", description: "Classic hand sparklers", image_url: null, display_order: 2, is_active: true, created_at: "", updated_at: "" },
  { id: "cat-3", name: "Flower Pots", slug: "flower-pots", description: "Ground spinning fountains", image_url: null, display_order: 3, is_active: true, created_at: "", updated_at: "" },
  { id: "cat-4", name: "Aerial Crackers", slug: "aerial-crackers", description: "Sky shots & rockets", image_url: null, display_order: 4, is_active: true, created_at: "", updated_at: "" },
  { id: "cat-5", name: "Ground Chakkars", slug: "ground-chakkars", description: "Spinning wheels", image_url: null, display_order: 5, is_active: true, created_at: "", updated_at: "" },
  { id: "cat-6", name: "Kids Collection", slug: "kids-collection", description: "Safe fun for children", image_url: null, display_order: 6, is_active: true, created_at: "", updated_at: "" },
];

export const mockProducts: Product[] = [
  { id: "p-1", category_id: "cat-1", name: "Family Celebration Gift Box", slug: "family-celebration-gift-box", description: "A generous assortment for the whole family.", image_url: null, original_price: 5000, selling_price: 3200, discount_percentage: 36, is_featured: true, display_order: 1, is_active: true, created_at: "", updated_at: "" },
  { id: "p-2", category_id: "cat-1", name: "Deluxe Diwali Combo Pack", slug: "deluxe-diwali-combo-pack", description: "Our most popular combo.", image_url: null, original_price: 7500, selling_price: 4500, discount_percentage: 40, is_featured: true, display_order: 2, is_active: true, created_at: "", updated_at: "" },
  { id: "p-3", category_id: "cat-2", name: "7 Inch Electric Sparklers (Pack of 10)", slug: "7-inch-electric-sparklers", description: "Bright, long-lasting sparklers.", image_url: null, original_price: 150, selling_price: 95, discount_percentage: 37, is_featured: true, display_order: 1, is_active: true, created_at: "", updated_at: "" },
  { id: "p-4", category_id: "cat-3", name: "Colour Flower Pot (Big)", slug: "colour-flower-pot-big", description: "Rich colour fountain effect.", image_url: null, original_price: 220, selling_price: 140, discount_percentage: 36, is_featured: true, display_order: 1, is_active: true, created_at: "", updated_at: "" },
  { id: "p-5", category_id: "cat-4", name: "Sky Shot 10 Shots", slug: "sky-shot-10-shots", description: "Multi-colour aerial display.", image_url: null, original_price: 900, selling_price: 599, discount_percentage: 33, is_featured: false, display_order: 1, is_active: true, created_at: "", updated_at: "" },
  { id: "p-6", category_id: "cat-5", name: "Ground Chakkar (Pack of 5)", slug: "ground-chakkar-pack-5", description: "Classic spinning wheel.", image_url: null, original_price: 180, selling_price: 110, discount_percentage: 39, is_featured: false, display_order: 1, is_active: true, created_at: "", updated_at: "" },
  { id: "p-7", category_id: "cat-6", name: "Kids Fun Sparkler Combo", slug: "kids-fun-sparkler-combo", description: "Safe assortment for kids.", image_url: null, original_price: 350, selling_price: 249, discount_percentage: 29, is_featured: true, display_order: 1, is_active: true, created_at: "", updated_at: "" },
  { id: "p-8", category_id: "cat-2", name: "12 Inch Colour Sparklers (Pack of 5)", slug: "12-inch-colour-sparklers", description: "Vivid colour sparks.", image_url: null, original_price: 200, selling_price: 129, discount_percentage: 35, is_featured: false, display_order: 2, is_active: true, created_at: "", updated_at: "" },
];
