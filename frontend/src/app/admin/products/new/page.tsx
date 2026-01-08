import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Switch } from "@/shared/ui/switch";
import { ArrowLeft, Check } from "lucide-react";
import Link from "next/link";

export default function ProductForm() {
  return (
    <div className="bg-muted min-h-dvh w-full">
      <header className="bg-background flex px-4 justify-between items-center w-full h-16 sticky top-0 left-0 border-b">
        <p className="flex text-muted-foreground items-center gap-1 h-full">
          <Link href="/admin/products">
            <ArrowLeft className="cursor-pointer hover:text-accent-foreground" />
          </Link> Add new product
        </p>
        <Button>
          <Check /> Add product
        </Button>
      </header>

      <div className="w-full h-full p-4 grid grid-cols-2 gap-4">

        <div className="bg-background rounded-lg p-4">
          <h1>Basic information</h1>
          <Input placeholder="Product name" />
          <Input placeholder="product-slug" />
          <Input placeholder="Rich text editor here" />
        </div>

        <div className="bg-background rounded-lg p-4">
          <h1>Upload images</h1>

          <div className="flex mt-5 items-start">
            {/* Main Image */}
            <div className="w-full aspect-square border border-dashed rounded-lg flex items-center justify-center">
              Main image
            </div>

            {/* Side Images */}
            <div className="w-32 ml-2 h-87.5 flex flex-col gap-2 max-h-full overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              <div className="w-full aspect-square border rounded-lg">ss</div>
              <div className="w-full aspect-square border rounded-lg">ss</div>
              <div className="w-full aspect-square border rounded-lg">ss</div>
              <div className="w-full aspect-square border rounded-lg">ss</div>
              <div className="w-full aspect-square border rounded-lg">ss</div>
              <div className="w-full aspect-square border rounded-lg">ss</div>
              <div className="w-full aspect-square border rounded-lg">ss</div>
              <div className="w-full aspect-square border rounded-lg">ss</div>
              <div className="w-full aspect-square border rounded-lg">ss</div>
              <div className="w-full aspect-square border rounded-lg">ss</div>
              <div className="w-full aspect-square border rounded-lg">ss</div>
              <div className="w-full aspect-square border rounded-lg">ss</div>
              <div className="w-full aspect-square border rounded-lg">ss</div>
            </div>
          </div>
        </div>


        <div className="bg-background rounded-lg p-4">
          <h1>Pricing and stock</h1>
          <div className="grid grid-cols-2 gap-3">
            <Input placeholder="Base price" />
            <Input placeholder="Discount price" />
            <Input placeholder="Rich text editor here" />
            <div className="flex items-center justify-between">
              <Label>Featured product?</Label>
              <Switch />
            </div>
          </div>
        </div>

        <div className="bg-background rounded-lg p-4 space-y-3">
          <h1>Category</h1>
          <Input placeholder="Fashion"/>
          <Button>
            Add category
          </Button>
        </div>

      </div>
    </div>
  )
}
