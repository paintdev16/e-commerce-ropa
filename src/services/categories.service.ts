import categoriesData from "@/src/data/categories.json";
import type { Category, Department } from "@/src/types/store";

const categories = categoriesData as unknown as Category[];

export function getCategories(): Category[] {
  return categories;
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((category) => category.slug === slug);
}

export function getCategoriesByDepartment(department: Department): Category[] {
  return categories.filter((category) => category.department === department);
}
