
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";

const listings = [
    {
        id: 1,
        title: "Fresh Organic Eggs - 100 Crates",
        price: "₦3,500 / crate",
        seller: "Amina's Poultry",
        location: "Kano",
        image: "https://images.unsplash.com/photo-1598965671588-fe884c56d2e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxlZ2dzJTIwY3JhdGV8ZW58MHx8fHwxNzU5MjM4MzAxfDA&ixlib=rb-4.1.0&q=80&w=1080",
        imageHint: "eggs crate"
    },
    {
        id: 2,
        title: "Live Broiler Chickens - 500 units",
        price: "₦8,000 / bird",
        seller: "David's Farm",
        location: "Lagos",
        image: "https://images.unsplash.com/photo-1616010355490-6c7473a2588c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxicm9pbGVyJTIwY2hpY2tlbnN8ZW58MHx8fHwxNzU5MjM4MzMxfDA&ixlib=rb-4.1.0&q=80&w=1080",
        imageHint: "broiler chickens"
    },
    {
        id: 3,
        title: "Weaned Piglets (8 weeks old)",
        price: "₦25,000 / piglet",
        seller: "Grace's Piggery",
        location: "Jos",
        image: "https://images.unsplash.com/photo-1576705537624-aea254b1a418?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxwaWdsZXRzfGVufDB8fHx8fDE3NTkyMTAyMjF8MA&ixlib=rb-4.1.0&q=80&w=1080",
        imageHint: "piglets"
    }
]

export default function SellBuyPage() {
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
                </CardContent>
                <CardFooter>
                    <Button className="w-full">Post Listing</Button>
                </CardFooter>
            </Card>
        </div>
    </div>
  );
}
