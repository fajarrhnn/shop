import { Card } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MinusIcon, PlusIcon, TrashIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import ImageSkeleton from "/white.png"

export default function ItemCartSkeleon() {
  return (
    <>
      <Skeleton>
        <Card className="overflow-hidden">
          <div className="p-4">
            <div className="flex items-center mb-4">
              <Skeleton>
                <Image
                  className="rounded-md mr-4"
                  height={80}
                  alt="image-loader"
                  style={{
                    aspectRatio: "80/80",
                    objectFit: "contain",
                    backgroundColor: "#d1d5db",
                  }}
                  src={ImageSkeleton}
                  width={80}
                />
              </Skeleton>
              <div>
                <Skeleton className="w-52 h-10" />
                <Skeleton className="h-10" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Skeleton className="w-48 h-12" />
              </div>
              <Button className="text-red-500" size="icon" variant="outline">
                <TrashIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </Skeleton>
    </>
  );
}