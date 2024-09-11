"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { categories, Sort, SORTS } from "@/lib/utils";
import { ItemType } from "@/lib/validators/item";
import { Category } from "@/types/category";
import { X } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios"

export default function Home() {
  const urlParams = useSearchParams();
  const categoryParams = urlParams.get("category");
  const searchParams = urlParams.get("search");

  const [items, setItems] = useState<ItemType>()
  const [isLoading, setIsLoading] = useState(false)
  const [sorting, setSorting] = useState<Sort | null>(null)
  const [category, setCategory] = useState<Category | null>(null);
  const [search, setSearch] = useState<string | null>();
  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize] = useState(10);

  const getItem = async () => {
    try {
      
      const { data } = await axios.get("/api/items")
      
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    setSearch(searchParams);
  }, [searchParams]);

  return (
    <div className="">
      <div className="flex items-center justify-between">
        <div className="">
          {search && category === null && (
            <div className="flex gap-2 items-center">
              <span className="text-gray-500">Search results for</span>
              <div>
                <span className="text-gray-700 font-semibold ml-1">
                  {search}
                </span>
                <X className="inline-block ml-2 cursor-pointer" />
              </div>
            </div>
          )}
          {!search && category !== null && (
            <div className="flex gap-2 items-center">
              <span className="text-gray-500">Showing all</span>
              <div>
                <span className="text-gray-700 font-semibold ml-1">
                  {category.title}
                </span>
                <X className="inline-block ml-2 cursor-pointer" />
              </div>
            </div>
          )}
          {search && category !== null && (
            <div className="flex gap-2 items-center">
              <span className="text-gray-500">Search results for</span>
              <div>
                <span className="text-gray-700 font-semibold ml-1">
                  {search}
                </span>
                <X className="inline-block ml-2 cursor-pointer" />
              </div>
              <span className="text-gray-500">in</span>
              <div>
                <span className="text-gray-700 font-semibold">
                  {category.title}
                </span>
                <X
                  className="inline-block ml-2 cursor-pointer"
                  onClick={() => (window.location.href = `/?search=${search}`)}
                />
              </div>
            </div>
          )}
        </div>

        <div className="flex items-start gap-3">
          {/* Category */}
          <Select>
            <SelectTrigger className="w-[180px] focus-visible:ring-0 focus:ring-0">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.title} value={category.title}>
                  {category.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Sorting order */}
          <Select>
            <SelectTrigger className="w-[180px] focus-visible:ring-0 focus:ring-0">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              {SORTS.map((sort) => (
                <SelectItem key={sort.value} value={sort.value}>
                  {sort.display}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
