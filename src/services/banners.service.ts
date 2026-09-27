import bannersData from "@/src/data/banners.json";
import type { Banner } from "@/src/types/store";

const banners = bannersData as unknown as Banner[];

export function getBanners(): Banner[] {
  return banners;
}

export function getBannerById(id: string): Banner | undefined {
  return banners.find((banner) => banner.id === id);
}
