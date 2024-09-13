import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const categories = [
  {
    title: "Collectibles & Art",
    href: "?category=collectiblesAndArt",
    description: "NFTs, trading cards and more",
    value: "collectiblesAndArt",
  },
  {
    title: "Home & Garden",
    href: "?category=homeAndGarden",
    description: "Furniture, Kitchenware and more",
    value: "homeAndGarden",
  },
  {
    title: "Toys and Games",
    href: "?category=toysAndGames",
    description: "Board games, video games and more",
    value: "toysAndGames"
  },
  {
    title: "Electronics",
    href: "?category=electronics",
    description: "Computer phones and more",
    value: "electronics"
  },
  {
    title: "Jewellry & Accessories",
    href: "?category=jewelryAndAccessories",
    description: "Watches, rings and more",
    value: "jewelryAndAccessories"
  },
];

export enum categoryEnumValues {
  collectiblesAndArt = "collectiblesAndArt",
  electronics = "electronics",
  homeAndGarden = "homeAndGarden",
  jewelryAndAccessories = "jewelryAndAccessories",
  toysAndGames = "toysAndGames"
}

export const convertCategoryStrToEnum = (convertingStr: string) => {
  switch (convertingStr) {
    case "collectiblesAndArt":
        return categoryEnumValues.collectiblesAndArt;
    case "electronics":
        return categoryEnumValues.electronics;
    case "homeAndGarden":
        return categoryEnumValues.homeAndGarden;
    case "jewelryAndAccessories":
        return categoryEnumValues.jewelryAndAccessories;
    case "toysAndGames":
        return categoryEnumValues.toysAndGames;
    default:
        return categoryEnumValues.electronics;;
  }
}

export const convertValueToCategory = (value: string) => {
  const category = categories.find((category) => category.value === value)
  if(!category) {
    return null
  }
  return category
}


export type Sort = {
  display: string;
  value: string;
};

export const SORTS: Sort[] = [
  { display: "Newest", value: "newest" },
  { display: "Oldest", value: "oldest" },
  { display: "Price: Low to High", value: "priceAsc" },
  { display: "Price: High to Low", value: "priceDesc" },
];

export const valueToSort = (value: string): Sort | null => {
  const sort = SORTS.find((sort) => sort.value === value);
  if (!sort) {
    return null;
  }
  return sort;
}
