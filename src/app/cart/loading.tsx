import { Skeleton } from '@/components/ui/skeleton';
import { Card } from '@/components/ui/card';

const ItemCartSkeleton = () => (
  <Skeleton>
    <Card className="overflow-hidden">
      <div className="p-4">
        <div className="flex items-center mb-4">
          <Skeleton className="rounded-md mr-4 h-[80] w-[80]" />
          <div>
            <Skeleton className="w-52 h-6 mb-2" />
            <Skeleton className="w-32 h-4" />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Skeleton className="h-6 w-24" />
          </div>
          <Skeleton className="h-4 w-4 text-red-500" />
        </div>
      </div>
    </Card>
  </Skeleton>
);

export default ItemCartSkeleton;
