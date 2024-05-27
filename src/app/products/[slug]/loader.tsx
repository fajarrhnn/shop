import { Skeleton } from '@/components/ui/skeleton';
import { Card,CardContent,CardFooter } from '@/components/ui/card';

const DetailProductSkeleton = () => (
  <Card className="bg-white w-full mx-auto h-max flex flex-col">
    <div className="mt-4 w-1/3 md:w-44 mx-auto">
      <Skeleton className="w-full h-44" />
    </div>
    <CardContent className="relative flex flex-col">
      <div className="flex justify-between items-center">
        <Skeleton className="w-8 h-8" />
        <Skeleton className="w-24 h-6" />
      </div>
      <div className="space-y-3 mt-5">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-6 w-1/2" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
      </div>
    </CardContent>
    <CardFooter className="flex justify-between items-center space-x-3">
      <div className="flex flex-row space-x-2 items-center">
        <Skeleton className="w-8 h-8" />
        <Skeleton className="h-6 w-8" />
        <Skeleton className="w-8 h-8" />
      </div>
      <Skeleton className="h-10 w-32" />
    </CardFooter>
  </Card>
);

export default DetailProductSkeleton;
