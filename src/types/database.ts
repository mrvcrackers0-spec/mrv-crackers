export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type Product = {
  id: string;
  category_id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  original_price: number | null;
  selling_price: number;
  discount_percentage: number | null;
  is_featured: boolean;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type ProductWithCategory = Product & {
  category?: Pick<Category, "id" | "name" | "slug"> | null;
};

export type SiteSettings = {
  id: string;
  business_name: string;
  logo_url: string | null;
  phone: string;
  whatsapp_number: string;
  email: string | null;
  address: string;
  city: string;
  minimum_order_amount: number;
  hero_discount_percent: number;
  ticker_text: string;
  footer_text: string;
  created_at: string;
  updated_at: string;
};

export type CategoryInsert = Omit<Category, "id" | "created_at" | "updated_at">;
export type ProductInsert = Omit<Product, "id" | "created_at" | "updated_at">;
export type SiteSettingsUpdate = Partial<Omit<SiteSettings, "id" | "created_at" | "updated_at">>;

export type Database = {
  public: {
    Tables: {
      categories: {
        Row: Category;
        Insert: CategoryInsert;
        Update: Partial<CategoryInsert>;
        Relationships: [];
      };
      products: {
        Row: Product;
        Insert: ProductInsert;
        Update: Partial<ProductInsert>;
        Relationships: [];
      };
      site_settings: {
        Row: SiteSettings;
        Insert: Omit<SiteSettings, "created_at" | "updated_at">;
        Update: SiteSettingsUpdate;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
  };
};
