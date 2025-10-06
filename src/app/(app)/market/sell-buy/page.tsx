
'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ShoppingCart, Upload } from "lucide-react";
import Image from "next/image";

const listings = [
    {
        id: 1,
        title: "Fresh Organic Eggs - 100 Crates",
        price: "₦3,500 / crate",
        seller: "Amina's Poultry",
        location: "Kano",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPSDZMnnhkzmePNs3yJYwVVMy8j4g2uNPUuA&s",
        imageHint: "eggs crate"
    },
    {
        id: 2,
        title: "Live Broiler Chickens - 500 units",
        price: "₦8,000 / bird",
        seller: "David's Farm",
        location: "Lagos",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrih3lfe8yjWNSujJgkLeaOVxdPQ0iZdxBew&s",
        imageHint: "broiler chickens"
    },
    {
        id: 3,
        title: "Weaned Piglets (8 weeks old)",
        price: "₦25,000 / piglet",
        seller: "Grace's Piggery",
        location: "Jos",
        image: "https://i0.wp.com/www.pic.com/wp-content/uploads/sites/3/2022/12/early_weaned_8-8_Fig2.png?resize=338%2C209&ssl=1",
        imageHint: "piglets"
    }
]

export default function SellBuyPage() {
    const [fileName, setFileName] = useState('');

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
        const file = e.target.files[0];
        setFileName(file.name);
        // In a real app, you'd handle the file upload here
        } else {
        setFileName('');
        }
    };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Current Listings</CardTitle>
                    <CardDescription>Browse products available from other farmers in the network.</CardDescription>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-6">
                    {listings.map(item => (
                        <Card key={item.id} className="overflow-hidden">
                            <div className="relative h-40 w-full">
                                <Image src={item.image} alt={item.title} fill className="object-cover" data-ai-hint={item.imageHint}/>
                            </div>
                            <CardHeader>
                                <CardTitle className="text-lg">{item.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <p className="font-bold text-primary text-xl">{item.price}</p>
                                <p className="text-sm text-muted-foreground"><span className="font-semibold">Seller:</span> {item.seller}</p>
                                <p className="text-sm text-muted-foreground"><span className="font-semibold">Location:</span> {item.location}</p>
                            </CardContent>
                             <CardFooter>
                                <Button className="w-full">
                                    <ShoppingCart className="mr-2 h-4 w-4" />
                                    Contact Seller
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </CardContent>
            </Card>
        </div>
        <div>
            <Card className="sticky top-24">
                <CardHeader>
                    <CardTitle>Sell Your Products</CardTitle>
                    <CardDescription>Create a new listing to sell your farm products to the community.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="product-name">Product Name</Label>
                        <Input id="product-name" placeholder="e.g., Organic Eggs" />
                    </div>
                     <div className="grid gap-2">
                        <Label htmlFor="product-type">Product Type</Label>
                        <Select>
                            <SelectTrigger id="product-type">
                                <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="eggs">Eggs</SelectItem>
                                <SelectItem value="poultry">Live Poultry</SelectItem>
                                <SelectItem value="pork">Pork / Live Pigs</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                     <div className="grid gap-2">
                        <Label htmlFor="quantity">Quantity</Label>
                        <Input id="quantity" placeholder="e.g., 100 Crates" />
                    </div>
                     <div className="grid gap-2">
                        <Label htmlFor="price">Price</Label>
                        <Input id="price" placeholder="e.g., ₦3,500 / crate" />
                    </div>
                     <div className="grid gap-2">
                        <Label htmlFor="description">Description (Optional)</Label>
                        <Textarea id="description" placeholder="Add a brief description..." />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="product-image">Product Image</Label>
                        <div className="relative">
                            <Input
                                id="product-image"
                                type="file"
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                            <div className="flex items-center justify-center w-full h-10 px-3 py-2 text-sm border rounded-md border-input bg-background ring-offset-background">
                                <Upload className="w-4 h-4 mr-2 text-muted-foreground" />
                                <span className="text-muted-foreground">
                                {fileName || 'Upload an image'}
                                </span>
                            </div>
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button className="w-full">Post Listing</Button>
                </CardFooter>
            </Card>
        </div>
    </div>
  );
}
