import { FormEvent, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { AddressTypes } from "@/lib/definition";
import { usePostAddress } from "@/services/address";

const initialAddress = {
    state: '',
    city: '',
    district: '',
    subDistrict: '',
    neighborhood: '',
    street: '',
    zipCode: '',
};

export default function FormAddress() {
    const [location, setLocation] = useState<AddressTypes>(initialAddress);
    const postAdress = usePostAddress()

    const handleAddAddress = async (e: FormEvent) => {
        e.preventDefault();
        await postAdress(location);
    }

    return (
        <>
            <Card className="w-full max-w-md h-max">
                <CardHeader>
                    <CardTitle>Address</CardTitle>
                    <CardDescription>Enter your address details.</CardDescription>
                </CardHeader>
                <form onSubmit={handleAddAddress}>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="state">State</Label>
                                <Input
                                    id="state"
                                    placeholder="CA"
                                    name="state"
                                    required
                                    value={location.state}
                                    onChange={(e) => setLocation((prev): any => ({ ...prev, state: e.target.value }))}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="city">City</Label>
                                <Input
                                    id="city"
                                    placeholder="San Francisco"
                                    name="city"
                                    required
                                    value={location.city}
                                    onChange={(e) => setLocation((prev): any => ({ ...prev, city: e.target.value }))}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="district">District</Label>
                                <Input
                                    id="district"
                                    placeholder="San Francisco"
                                    name="district"
                                    required
                                    value={location.district}
                                    onChange={(e) => setLocation((prev): any => ({ ...prev, district: e.target.value }))}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="subdistrict">Sub-District</Label>
                                <Input
                                    id="subdistrict"
                                    placeholder="CA"
                                    name="subdistrict"
                                    required
                                    value={location.subDistrict}
                                    onChange={(e) => setLocation((prev): any => ({ ...prev, subDistrict: e.target.value }))}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="neighborhood">Neighborhood</Label>
                                <Input
                                    id="neighborhood"
                                    placeholder="Neighborhood"
                                    name="neighborhood"
                                    required
                                    value={location.neighborhood}
                                    onChange={(e) => setLocation((prev): any => ({ ...prev, neighborhood: e.target.value }))}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="zipCode">Zip Code</Label>
                                <Input
                                    id="zipCode"
                                    placeholder="12345"
                                    name="zipCode"
                                    required
                                    value={location.zipCode}
                                    onChange={(e) => setLocation((prev): any => ({ ...prev, zipCode: e.target.value }))}
                                />
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="street">Street Address</Label>
                            <Input
                                id="street"
                                placeholder="123 Main St"
                                name="street"
                                required
                                value={location.street}
                                onChange={(e) => setLocation((prev): any => ({ ...prev, street: e.target.value }))}
                            />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button type="submit">
                            Save Address
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </>
    );
}