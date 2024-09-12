"use client";

import { Dialog } from "@radix-ui/react-dialog";
import { FC, useEffect, useState } from "react";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { categories, convertCategoryStrToEnum, convertValueToCategory } from "@/lib/utils";
import { Category } from "@/types/category";
import { toast } from "@/hooks/use-toast";
import { date, number } from "zod";
import axios from "axios";

interface CreateItemListingProps {}

// TODO: Implement a fuctionality, when user clicks on cross button of dialog box then only dialog box closes. Add a select tag for user to list item
// Use Hook form validator and toast message
// TODO: Add image upload feature
const CreateItemListing: FC<CreateItemListingProps> = ({}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number>();
  const [imageUrl, setImageUrl] = useState("");
  const [quantity, setQuantity] = useState<number>();
  const [category, setCategory] = useState<Category | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      await axios.post("/api/items", {
        title,
        description,
        price,
        image: imageUrl,
        totalSupply: quantity,
        availableSupply: quantity,
        listed: true,
        category: convertCategoryStrToEnum(category?.value!),
      });

  // TODO: After succesfull api request close the dialog and redirect the user to his profile page
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant={"subtle"}>$ Sell</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new listing</DialogTitle>
          <DialogDescription>
            Enter all of the details for your new listing. Click submit to
            create the listing.
          </DialogDescription>
        </DialogHeader>
        <div className="grid py-4 gap-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-center">Name</Label>
            <Input
              className="col-span-3"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-center">Description</Label>
            <Textarea
              className="col-span-3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-center">Listing Price</Label>
            <Input
              className="col-span-3"
              type="number"
              value={price}
              onChange={(e) => {
                const numberValue = parseFloat(e.target.value);
                if (isNaN(numberValue)) {
                  // TODO: Write use hookk form validator, toast error
                  console.log("Enter a valid number", numberValue);
                } else {
                  setPrice(numberValue);
                }
              }}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-center">Image url</Label>
            <Input
              className="col-span-3"
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-center">Quantity</Label>
            <Input
              className="col-span-3"
              type="number"
              value={quantity}
              onChange={(e) => {
                const quantityValue = parseInt(e.target.value);
                if (isNaN(quantityValue)) {
                  console.log("Enter a valid number");
                } else {
                  setQuantity(quantityValue);
                }
              }}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-center">Category</Label>
            <Select
              value={category?.value}
              onValueChange={(value) => {
                if (value === category?.value) {
                  setCategory(null);
                } else {
                  setCategory(convertValueToCategory(value));
                }
              }}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem value={category.value} key={category.title}>
                    {category.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={onSubmit}
            isLoading={isLoading}
            disabled={isLoading}
          >
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateItemListing;
