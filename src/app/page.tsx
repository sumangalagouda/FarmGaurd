
'use client';

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "@/components/theme-toggle";
import { Bot, CalendarDays, Globe, LineChart, MessageSquare, Shield, Siren, Menu } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Footer } from "@/components/footer";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";

const features = [
  {
    icon: Bot,
    title: "AI Disease Prediction",
    description: "Get AI-powered analysis of possible diseases and preventive measures based on symptoms.",
  },
  {
    icon: Shield,
    title: "Biosecurity Score",
    description: "Track your farm's compliance and biosecurity rating to ensure a healthy environment.",
  },
  {
    icon: CalendarDays,
    title: "Health Calendar",
    description: "Personalized health schedules with reminders for vaccinations and treatments.",
  },
  {
    icon: LineChart,
    title: "Market Insights",
    description: "Stay updated on local market price trends and connect with top buyers in your network.",
  },
  {
    icon: Siren,
    title: "Outbreak Reporting",
    description: "Inform nearby farmers about disease outbreaks to help protect the local farming community.",
  },
  {
    icon: MessageSquare,
    title: "Community Forum",
    description: "Connect with other farmers, share knowledge, and learn from their experiences.",
  },
];


export default function LandingPage() {
  const [open, setOpen] = useState(false);
  
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b bg-primary text-primary-foreground">
        <div className="container flex h-14 items-center">
          <div className="mr-auto flex items-center">
            <Link href="/" className="font-bold text-lg">FarmGuard</Link>
          </div>
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
             <Link href="/" className="hover:underline">Home</Link>
             <Link href="/about" className="hover:underline">About</Link>
             <Link href="/service" className="hover:underline">Service</Link>
             <Link href="/contact" className="hover:underline">Contact</Link>
          </nav>
          <div className="ml-auto flex items-center gap-4">
             <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Globe className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>English</DropdownMenuItem>
                <DropdownMenuItem>Hindi</DropdownMenuItem>
                <DropdownMenuItem>Kannada</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <ThemeToggle />
            
            <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white rounded-full hidden sm:flex">
                <Link href="/login">Login</Link>
            </Button>
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu />
                </Button>
              </SheetTrigger>
              <SheetContent>
                  <nav className="grid gap-6 text-lg font-medium mt-6">
                    <Link href="/" className="hover:underline" onClick={() => setOpen(false)}>Home</Link>
                    <Link href="/about" className="hover:underline" onClick={() => setOpen(false)}>About</Link>
                    <Link href="/service" className="hover:underline" onClick={() => setOpen(false)}>Service</Link>
                    <Link href="/contact" className="hover:underline" onClick={() => setOpen(false)}>Contact</Link>
                    <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white rounded-full mt-4">
                        <Link href="/login" onClick={() => setOpen(false)}>Login</Link>
                    </Button>
                  </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="relative w-full h-[calc(100vh-3.5rem)]">
          <Carousel
            className="w-full h-full"
            plugins={[
              Autoplay({
                delay: 10000,
              }),
            ]}
          >
            <CarouselContent>
               <CarouselItem>
                <div className="relative h-[calc(100vh-3.5rem)] w-full">
                  <Image
                    src="https://static.vecteezy.com/system/resources/previews/054/643/050/large_2x/mother-hen-walking-with-baby-chickens-on-a-farm-photo.jpg"
                    alt="Chickens"
                    fill
                    className="object-cover"
                    data-ai-hint="chickens farm"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-4">
                    <h1 className="text-white text-4xl md:text-6xl font-bold text-center">
                     Healthy Flocks, Higher Profits.
                    </h1>
                  </div>
                </div>
              </CarouselItem>
              <CarouselItem>
                <div className="relative h-[calc(100vh-3.5rem)] w-full">
                   <Image
                    src="https://media.istockphoto.com/id/1415613321/photo/cute-baby-pig-relaxing-and-enjoying-life-and-smiles-illuminated-by-the-sun.jpg?s=612x612&w=0&k=20&c=ouyg8jPrDhF_mC99NVzsAiy3pkTHq3CEkLFSi32IZ-k="
                    alt="Happy Piglet"
                    fill
                    className="object-cover"
                    data-ai-hint="happy piglet"
                  />
                   <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-4">
                    <h1 className="text-white text-4xl md:text-6xl font-bold text-center">
                      Together for healthier farms and happier animals
                    </h1>
                  </div>
                </div>
              </CarouselItem>
              <CarouselItem>
                <div className="relative h-[calc(100vh-3.5rem)] w-full">
                  <Image
                    src="https://science.ku.dk/english/press/news/2023/new-study-pig-welfare-outweighs-climate-concerns-for-consumers/billedinformationer/GettyImages-963820794_piglet_1100x600.jpg"
                    alt="Piglet"
                    fill
                    className="object-cover"
                    data-ai-hint="piglet"
                  />
                   <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-4">
                    <h1 className="text-white text-4xl md:text-6xl font-bold text-center">
                      We care for your farm,<br /> just like you do.
                    </h1>
                  </div>
                </div>
              </CarouselItem>
            </CarouselContent>
          </Carousel>
        </section>
        
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">Key Features</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Everything You Need to Secure Your Farm</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    From AI diagnostics to market connections, FarmGuard provides a full suite of tools for success.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Link href="/login" key={index}>
                    <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                      <CardHeader className="flex flex-row items-start gap-4">
                        <div className="bg-primary/10 p-3 rounded-full">
                          <feature.icon className="h-6 w-6 text-primary" />
                        </div>
                        <CardTitle>{feature.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">{feature.description}</p>
                      </CardContent>
                    </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
