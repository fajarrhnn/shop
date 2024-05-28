import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

const CardSkeleton = () => (
    <Card className="rounded-none shadow-none border-none">
        <CardHeader className="h-56 flex justify-center items-center">
            <Skeleton className="w-32 h-32" />
        </CardHeader>
        <CardContent>
            <Skeleton className="h-6 w-full mb-2" />
            <Skeleton className="h-6 w-20" />
        </CardContent>
    </Card>
);

export default CardSkeleton;
