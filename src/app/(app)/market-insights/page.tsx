
'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

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
                <YAxis unit="₦" />
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
