import { FC } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";
import { categories } from "@/lib/utils";


const Navigation = ({}) => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Shop by category</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 w-[500px] grid-cols-2">
              {categories.map((category) => (
                <li
                  key={category.title}
                  className="p-2 rounded-md leading-none hover:bg-slate-100 outline-none"
                >
                  <a href={category.href}>
                    <span className="font-medium">{category.title}</span>
                    <p className="text-sm text-gray-600">
                      {category.description}
                    </p>
                  </a>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default Navigation;
