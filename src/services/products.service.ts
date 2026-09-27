import productsData from "@/src/data/products.json";
import { getCategories } from "@/src/services/categories.service";
import collectionsData from "@/src/data/collections.json";
import type { Category, Collection, Product, ProductFilters, ProductVariant } from "@/src/types/store";

export { getCategories } from "@/src/services/categories.service";

type ProductRecord = Omit<Product, "categoryId" | "shortDescription" | "variants" | "tone" | "visual" | "stock"> & {
  stock?: number;
};

const categories: Category[] = getCategories();
const collections = collectionsData as unknown as Collection[];
const products: Product[] = (productsData as unknown as ProductRecord[]).map((product) => {
  const category = categories.find((item) => item.slug === product.category);
  const variants: ProductVariant[] = [
    { name: "Color", options: product.colors.map((color) => color.name) },
    { name: "Talla", options: product.sizes.map((size) => size.value) },
  ].filter((variant) => variant.options.length > 0);

  return {
    ...product,
    categoryId: category?.id ?? 0,
    stock: product.stock ?? product.sizes.reduce((total, size) => total + (size.stock ?? (size.available ? 4 : 0)), 0),
    shortDescription: product.description,
    variants,
    tone: product.department === "Calzado" ? "#e8e5df" : "#e2e4de",
    visual: product.department === "Calzado" ? ("shoe" as const) : ("hoodie" as const),
  };
});

export function getProducts(): Product[] {
  return products;
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((product) => product.featured);
}

export function getNewProducts(): Product[] {
  return products.filter((product) => product.new);
}

export function getDiscountedProducts(): Product[] {
  return products.filter((product) => (product.discount ?? 0) > 0);
}

export function getProductsByCategory(categoryId: number): Product[] {
  return products.filter((product) => product.categoryId === categoryId);
}

export function getProductsByGender(gender: Product["gender"]): Product[] {
  return products.filter((product) => product.gender === gender || product.gender === "Unisex");
}

export function getProductsByDepartment(department: Product["department"]): Product[] {
  return products.filter((product) => product.department === department);
}

export function getProductsByCollection(collection: string): Product[] {
  return products.filter((product) => product.collection === collection);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return products
    .filter((item) => item.id !== product.id && item.category === product.category)
    .slice(0, limit);
}

export function getFilteredProducts(filters: ProductFilters = {}): Product[] {
  let result = filters.query ? searchProducts(filters.query) : [...products];

  if (filters.gender) {
    result = result.filter((product) => product.gender === filters.gender || product.gender === "Unisex");
  }
  if (filters.department) result = result.filter((product) => product.department === filters.department);
  if (filters.category) result = result.filter((product) => product.category === filters.category);
  if (filters.collection) result = result.filter((product) => product.collection === filters.collection);
  if (filters.brands?.length) result = result.filter((product) => filters.brands?.includes(product.brand));
  if (filters.sizes?.length) {
    result = result.filter((product) => product.sizes.some((size) => size.available && filters.sizes?.includes(size.value)));
  }
  if (filters.colors?.length) {
    result = result.filter((product) => product.colors.some((color) => filters.colors?.includes(color.name)));
  }
  if (filters.minPrice !== undefined) result = result.filter((product) => product.price >= filters.minPrice!);
  if (filters.maxPrice !== undefined) result = result.filter((product) => product.price <= filters.maxPrice!);
  if (filters.discounted) result = result.filter((product) => (product.discount ?? 0) > 0);
  if (filters.available) result = result.filter((product) => product.stock > 0);
  if (filters.newOnly) result = result.filter((product) => product.new);

  switch (filters.sort ?? "featured") {
    case "recent": result.sort((a, b) => Number(b.new) - Number(a.new) || b.id - a.id); break;
    case "price-asc": result.sort((a, b) => a.price - b.price); break;
    case "price-desc": result.sort((a, b) => b.price - a.price); break;
    case "bestseller": result.sort((a, b) => b.reviews - a.reviews); break;
    case "discount": result.sort((a, b) => (b.discount ?? 0) - (a.discount ?? 0)); break;
    case "rating": result.sort((a, b) => b.rating - a.rating); break;
    default: result.sort((a, b) => Number(b.featured) - Number(a.featured) || b.rating - a.rating);
  }
  return result;
}

export function searchProducts(query: string): Product[] {
  const needle = query.trim().toLocaleLowerCase("es");
  if (!needle) return [];

  return products.filter((product) => {
    const category = categories.find((item) => item.slug === product.category)?.name ?? "";
    const collection = collections.find((item) => item.slug === product.collection)?.name ?? product.collection;
    return [product.name, product.brand, product.description, category, collection, product.gender]
      .some((value) => value.toLocaleLowerCase("es").includes(needle));
  });
}

export function getCollections(): Collection[] {
  return collections;
}
