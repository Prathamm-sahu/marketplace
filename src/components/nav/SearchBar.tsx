import { FC } from "react";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { categories } from "@/lib/utils";

interface SearchProps {}

const SearchBar: FC<SearchProps> = ({}) => {
  return (
    <div className="flex items-center">
      <Input
        placeholder="Search..."
        className="w-[300px] focus-visible:ring-0 rounded-none rounded-l-lg"
      />
      <Select>
        <SelectTrigger className="rounded-none rounded-r-lg focus-visible:ring-0">
          <SelectValue placeholder="Search in category" />
        </SelectTrigger>
        <SelectContent>
          {categories.map((category) => (
            <SelectItem key={category.title} value={category.title}>
              {category.title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SearchBar;
