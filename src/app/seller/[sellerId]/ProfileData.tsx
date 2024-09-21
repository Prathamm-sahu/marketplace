"use client";

import { cn } from "@/lib/utils";
import { User } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import { FC, useEffect, useState } from "react";

interface ProfileDataProps {
  seller: User;
  userStatus: "seller" | "buyer";
}

const ProfileData: FC<ProfileDataProps> = ({ seller, userStatus }) => {
  const [activeTab, setActiveTab] = useState("listings");
  const urlParams = useSearchParams();

  useEffect(() => {
    if (urlParams.get("tab")) {
      setActiveTab(urlParams.get("tab") || "listings");
    }
  }, [urlParams]);

  return (
    <div className="flex flex-col w-full items-center justify-center">
      <div className='w-[1200px] h-[700px] mt-4"'>
        <div className="flex flex-col items-center justify-center">
          <div className="flex justify-center gap-2">
            <div
              className={cn(
                "cursor-pointer p-2",
                activeTab === "listings" && "text-yellow-400"
              )}
            >
              Listings
            </div>
            {userStatus === "seller" && (
              <div
                className={cn(
                  "cursor-pointer p-2",
                  activeTab === "purchases" && "text-yellow-400"
                )}
                onClick={() => setActiveTab("purchases")}
              >
                Purchases
              </div>
            )}

            {userStatus === "seller" && (
              <div
                className={cn(
                  "cursor-pointer p-2",
                  activeTab === "activity" && "text-yellow-400"
                )}
                onClick={() => setActiveTab("activity")}
              >
                Sales
              </div>
            )}

            {userStatus === "seller" && (
              <div
                className={cn(
                  "cursor-pointer p-2",
                  activeTab === "watch list" && "text-yellow-400"
                )}
                onClick={() => setActiveTab("watch list")}
              >
                Watch List
              </div>
            )}

            {userStatus === "seller" && (
              <div
                className={cn(
                  "cursor-pointer p-2",
                  activeTab === "reviews" && "text-yellow-400"
                )}
                onClick={() => setActiveTab("reviews")}
              >
                Reviews
              </div>
            )}

            {userStatus === "seller" && (
              <div
                className={cn(
                  "cursor-pointer p-2",
                  activeTab === "your reviews" && "text-yellow-400"
                )}
                onClick={() => setActiveTab("your reviews")}
              >
                Your Reviews
              </div>
            )}
          </div>

          <div className="bg-gray-300 w-full h-px rounded-full" />
        </div>
        {/* {activeTab === "listings" && <ListingChart seller={seller} />}
        {activeTab === "purchases" && <PurchaseChart seller={seller} />}
        {activeTab === "activity" && <SaleChart seller={seller} />}
        {activeTab === "watch list" && <WatchListChart seller={seller} />}
        {activeTab === "reviews" && (
          <ReviewListForTarget target={seller.username} />
        )}
        {activeTab === "your reviews" && (
          <ReviewListForAuthor author={seller.username} />)} */}
      </div>
    </div>
  );
};

export default ProfileData;
