"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { categories, convertValueToCategory, Sort, SORTS } from "@/lib/utils";
import { ItemType } from "@/lib/validators/item";
import { Category } from "@/types/category";
import { AlertTriangle, ChevronLeft, ChevronRight, Loader, X } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios"
import ItemCard from "@/components/ItemCard";

export default function Home() {
  const urlParams = useSearchParams();
  const categoryParams = urlParams.get("category");
  const searchParams = urlParams.get("search");

  const [items, setItems] = useState<ItemType[]>()
  const [isLoading, setIsLoading] = useState(false)
  const [sorting, setSorting] = useState<Sort | null>(null)
  const [category, setCategory] = useState<Category | null>(null);
  const [search, setSearch] = useState<string | null>();
  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize] = useState(10);

  const getItems = async ({ category, sort }: { category: string | undefined, sort: string | undefined }) => {
    try {
      setIsLoading(true)
      if(category && sort) {
        const { data } = await axios.get(`/api/items?category=${category}&&sort=${sort}`)
        setItems(data)
        return ;
      }

      if(category && !sort) {
        const { data } = await axios.get(`/api/items?category=${category}`)
        setItems(data)
        return;
      }

      if(!category && sort) {
        const { data } = await axios.get(`/api/items?sort=${sort}`)
        setItems(data)
        return;
      }

      const { data } = await axios.get(`/api/items`)
      setItems(data)

    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if(categoryParams !== category?.value) {
      setCategory(convertValueToCategory(categoryParams!))
    }
    getItems({ category: category?.value, sort: sorting?.value })

  }, [sorting, categoryParams, searchParams])

  useEffect(() => {
    setSearch(searchParams);
  }, [searchParams]);

  return (
    <div className="min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          {search && category === null && (
            <div className="flex gap-2 items-center">
              <span className="text-gray-500">Search results for</span>
              <div>
                <span className="text-gray-700 font-semibold ml-1">
                  {search}
                </span>
                <X 
                  className="inline-block ml-2 cursor-pointer"
                  onClick={() => (window.location.href = `/`)}
                />
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
                <X 
                  className="inline-block ml-2 cursor-pointer" 
                  onClick={() => (window.location.href = "/")}
                />
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
                <X 
                  className="inline-block ml-2 cursor-pointer" 
                  onClick={() => (window.location.href = `/?category=${category.value}`)}
                />
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

      {/* Loading Animation */}
      {isLoading ? (
        <div className="flex items-center justify-center h-screen pb-28">
          <Loader className="h-6 w-6 animate-spin" />
        </div>
      ) : null }

      {/* No item found */}
      {items?.length === 0 && !isLoading && (
        <div className="flex flex-col justify-center items-center w-full h-96">
          <AlertTriangle className="w-16 h-16 text-yellow-400" />
          <span className="text-xl">No listings found</span>
        </div>
      )}

      {/* Displaying items */}
      {items?.length !== 0 && !isLoading && (
        <div>
          {items?.slice(pageSize * (pageNumber - 1), pageSize * pageNumber).map((item, index) => (
            <ItemCard item={item} key={index} />
          ))}
        </div>
      )}

      {/* Displaying pagination */}
      {items?.length !== 0 && !isLoading && (
        <div>
          {pageNumber > 1 && (
            <div>
              <ChevronLeft />
              <span>{pageNumber - 1}</span>
            </div>
          )}
          <span className="underline underline-offset-4">{pageNumber}</span>
          {items!.length > pageNumber * pageSize && (
          <div
            className="flex flex-row justify-center items-center gap-4 cursor-pointer"
            onClick={() => setPageNumber(pageNumber + 1)}
          >
            <span>{pageNumber + 1}</span>
            <ChevronRight />
          </div>
        )}
        </div>
      )}
    </div>
  );
}
