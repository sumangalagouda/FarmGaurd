
'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowDown, ArrowUp, Bird, Egg, Beef } from "lucide-react";
import { cn } from "@/lib/utils";

const chartData = [
  { month: "January", eggs: 186, pork: 80, chicken: 120 },
  { month: "February", eggs: 305, pork: 200, chicken: 150 },
  { month: "March", eggs: 237, pork: 120, chicken: 180 },
  { month: "April", eggs: 73, pork: 190, chicken: 210 },
  { month: "May", eggs: 209, pork: 130, chicken: 250 },
  { month: "June", eggs: 214, pork: 140, chicken: 230 },
];

const chartConfig = {
  eggs: { label: "Eggs (per crate)", color: "hsl(var(--chart-1))" },
  pork: { label: "Pork (per kg)", color: "hsl(var(--chart-2))" },
  chicken: { label: "Chicken (per kg)", color: "hsl(var(--chart-3))" },
};

const topBuyers = [
    { name: "FarmFresh Grocers", location: "Lagos", products: ["Eggs", "Chicken"], status: "Premium" },
    { name: "Capital Meats", location: "Abuja", products: ["Pork"], status: "Premium" },
    { name: "Jos Eateries Co-op", location: "Jos", products: ["Chicken", "Pork"], status: "Standard" },
    { name: "Sunshine Hotels", location: "Enugu", products: ["Eggs"], status: "Standard" },
];

const commodityPrices = [
  { location: "Dakshina Kannada", lastMonth: 65.00, thisMonth: 66.00, change: 1.54 },
  { location: "Chikkamagaluru", lastMonth: 67.00, thisMonth: 67.00, change: 0.00 },
  { location: "Chikkaballapur", lastMonth: 66.50, thisMonth: 67.00, change: 0.75 },
  { location: "Davanagere", lastMonth: 64.00, thisMonth: 64.50, change: 0.78 },
  { location: "Mysuru", lastMonth: 65.50, thisMonth: 66.00, change: 0.76 },
  { location: "Udupi", lastMonth: 62.00, thisMonth: 61.00, change: -1.61 },
  { location: "Uttara Kannada", lastMonth: 63.00, thisMonth: 62.50, change: -0.79 },
  { location: "Shivamogga", lastMonth: null, thisMonth: null, change: null },
];

export default function MarketInsightsPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Local Market Price Trends</CardTitle>
          <CardDescription>Average prices for farm products in your region over the last 6 months.</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} />
                <YAxis unit="₹" />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dot" />}
                />
                <Bar dataKey="eggs" fill="var(--color-eggs)" radius={4} />
                <Bar dataKey="pork" fill="var(--color-pork)" radius={4} />
                <Bar dataKey="chicken" fill="var(--color-chicken)" radius={4} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Commodity Prices by Area</CardTitle>
          <CardDescription>Check the latest commodity prices from different markets.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="eggs">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto">
              <TabsTrigger value="eggs" className="flex flex-col h-auto gap-1 py-2">
                <Egg className="h-6 w-6"/>
                <span>Eggs</span>
              </TabsTrigger>
              <TabsTrigger value="broiler" className="flex flex-col h-auto gap-1 py-2">
                <Bird className="h-6 w-6" />
                <span>Broiler</span>
              </TabsTrigger>
              <TabsTrigger value="pigs" className="flex flex-col h-auto gap-1 py-2">
                 <Beef className="h-6 w-6"/>
                <span>Pigs</span>
              </TabsTrigger>
              <TabsTrigger value="chicks" className="flex flex-col h-auto gap-1 py-2">
                <Bird className="h-6 w-6"/>
                <span>Chicks</span>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="eggs">
                <p className="text-sm text-muted-foreground my-2">All prices are per dozen.</p>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Location</TableHead>
                            <TableHead className="text-right">Last Month</TableHead>
                            <TableHead className="text-right">This Month</TableHead>
                            <TableHead className="text-right">Change</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {commodityPrices.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell className="font-medium">{item.location}</TableCell>
                                <TableCell className="text-right">{item.lastMonth ? `₹${item.lastMonth.toFixed(2)}` : '-'}</TableCell>
                                <TableCell className="text-right font-bold">{item.thisMonth ? `₹${item.thisMonth.toFixed(2)}` : '-'}</TableCell>
                                <TableCell className="text-right">
                                    {item.change !== null ? (
                                        <div className={cn("flex items-center justify-end", item.change > 0 ? "text-green-600" : item.change < 0 ? "text-red-600" : "text-muted-foreground")}>
                                            {item.change > 0 && <ArrowUp className="h-4 w-4"/>}
                                            {item.change < 0 && <ArrowDown className="h-4 w-4"/>}
                                            <span className="ml-1">{item.change.toFixed(2)}%</span>
                                        </div>
                                    ) : '-'}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TabsContent>
            {/* You can add more TabsContent for other commodities here */}
             <TabsContent value="broiler"><p className="text-center p-8 text-muted-foreground">Broiler prices are not available yet.</p></TabsContent>
             <TabsContent value="pigs"><p className="text-center p-8 text-muted-foreground">Pig prices are not available yet.</p></TabsContent>
             <TabsContent value="chicks"><p className="text-center p-8 text-muted-foreground">Chicks prices are not available yet.</p></TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Top Buyers in Your Network</CardTitle>
          <CardDescription>Premium access to buyers is available for top-performing farmers.</CardDescription>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Buyer Name</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Interested In</TableHead>
                        <TableHead>Access Level</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {topBuyers.map((buyer) => (
                        <TableRow key={buyer.name}>
                            <TableCell className="font-medium">{buyer.name}</TableCell>
                            <TableCell>{buyer.location}</TableCell>
                            <TableCell>
                                <div className="flex flex-wrap gap-1">
                                {buyer.products.map(p => <Badge key={p} variant="secondary">{p}</Badge>)}
                                </div>
                            </TableCell>
                            <TableCell>
                                <Badge className={buyer.status === "Premium" ? "bg-accent text-accent-foreground" : "bg-secondary text-secondary-foreground"}>{buyer.status}</Badge>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
      </Card>
    </div>
  );
}
