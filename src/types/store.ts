export type Gender = "Hombre" | "Mujer" | "Unisex";
export type Department = "Calzado" | "Ropa";

export type ProductColor = {
  name: string;
  value: string;
  image?: string;
};

export type ProductSize = {
  value: string;
  available: boolean;
  stock?: number;
};

export type ProductVariant = {
  name: "Color" | "Talla";
  options: string[];
};

export type Product = {
  id: number;
  name: string;
  slug: string;
  brand: string;
  gender: Gender;
  department: Department;
  category: string;
  categoryId: number;
  collection: string;
  description: string;
  shortDescription: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  stock: number;
  featured: boolean;
  new: boolean;
  rating: number;
  reviews: number;
  images: string[];
  colors: ProductColor[];
  sizes: ProductSize[];
  variants: ProductVariant[];
  tone: string;
  visual: "shoe" | "hoodie" | "shirt" | "pants" | "boot" | "sandal";
};

export type ProductFilters = {
  query?: string;
  gender?: Gender;
  department?: Department;
  category?: string;
  collection?: string;
  brands?: string[];
  sizes?: string[];
  colors?: string[];
  minPrice?: number;
  maxPrice?: number;
  discounted?: boolean;
  available?: boolean;
  newOnly?: boolean;
  sort?: "featured" | "recent" | "price-asc" | "price-desc" | "bestseller" | "discount" | "rating";
};

export type Category = {
  id: number;
  name: string;
  slug: string;
  department: Department;
  image: string;
  count: number;
};

export type Collection = {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string;
};

export type Banner = {
  id: string;
  eyebrow: string;
  kicker: string;
  title: string;
  emphasis: string;
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  image: string;
  imageAlt: string;
  note?: string;
};

export type CartItem = {
  productId: number;
  quantity: number;
  variants: Record<string, string>;
};

export type Order = {
  id: string;
  date: string;
  status: string;
  total: number;
  productIds: number[];
};

export type User = {
  name: string;
  email: string;
  phone: string;
  avatar: string;
  address: string;
};
