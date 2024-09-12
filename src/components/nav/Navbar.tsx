import { FC } from "react";
import Image from "next/image";
import Navigation from "./Navigation";
import { Button } from "../ui/button";
import { ShoppingCartIcon } from "lucide-react";
import SearchBar from "./SearchBar";
import { getAuthSession } from "@/lib/auth";
import SignIn from "./SignIn";
import Profile from "./Profile";
import CreateItemListing from "../CreateItemListing";

interface NavbarProps {}

const Navbar: FC<NavbarProps> = async ({}) => {
  const session = await getAuthSession()

  return (
    <div className="bg-[#053C36] fixed flex items-center justify-between w-full h-16 z-30 px-10">
      <div className="h-full flex items-center">
        <Image src="/marketplace-logo.png" alt="logo" width={44} height={44} />
        <span className="ml-2 font-medium text-white text-2xl">
          Marketplace
        </span>
      </div>

      {/* Category */}

      <div className="flex items-center space-x-2">
        <div className="">
          <Navigation />
        </div>

        <div>
          <SearchBar />
        </div>

        <div>
          <Button variant={"subtle"}>Search</Button>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        {!session?.user ? (
          <SignIn />
        ) : (
          <div className="flex space-x-2">
            <CreateItemListing />
            <Profile session={session} />
          </div>
        )}

        <Button variant={"subtle"}>
          <ShoppingCartIcon />
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
