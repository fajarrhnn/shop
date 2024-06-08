import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { AddressTypes } from "@/lib/definition";
import { Button } from "@/components/ui/button";
import { TrashIcon, PencilIcon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { deleteAddress } from "@/services/address";

interface GetAddressProps {
    address: AddressTypes[];
}

const PreviewAddress: React.FC<GetAddressProps> = ({ address }) => {
    const { toast } = useToast()
  
    return (
        <>
            <Card className="w-full max-w-md h-max">
                <CardHeader>
                    <CardTitle>Your Address</CardTitle>
                    <CardDescription>Your address details.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {address?.map((items: any) => (
                        <div className="flex flex-col gap-3" key={items.id}>
                            <span className="text-lg">State: {items.state} </span>
                            <span className="text-lg">City: {items.city}</span>
                            <span className="text-lg">Disctrict: {items.district} </span>
                            <span className="text-lg">Sub-Disctrict: {items.subdistrict}</span>
                            <span className="text-lg">Neighborhood: {items.neighborhood}</span>
                            <span className="text-lg">ZipCode: {items.zipcode} </span>
                            <span className="text-lg">Street Address: {items.street} </span>
                        </div>
                    ))}
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                    <Button onClick={() => { toast({ title: "This feature is coming soon in the future" }) }}>
                        <PencilIcon className="w-4 h-4 mr-2" /> Edit
                    </Button>
                    <Button variant={'destructive'} onClick={deleteAddress}>
                        <TrashIcon className="w-4 h-4 mr-2" />  Hapus
                    </Button>
                </CardFooter>
            </Card>
        </>
    )
}

export default PreviewAddress