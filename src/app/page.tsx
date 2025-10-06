
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
import { useTranslation } from "@/hooks/use-translation";

const featuresIcons = [Bot, Shield, CalendarDays, LineChart, Siren, MessageSquare];

export default function LandingPage() {
  const { t, setLanguage } = useTranslation();
  const [open, setOpen] = useState(false);
  
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b bg-primary text-primary-foreground">
        <div className="container flex h-14 items-center">
          <div className="mr-auto flex items-center">
            <Link href="/" className="font-bold text-lg">FarmGuard</Link>
          </div>
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
             <Link href="/" className="hover:underline">{t.navHome}</Link>
             <Link href="/about" className="hover:underline">{t.navAbout}</Link>
             <Link href="/service" className="hover:underline">{t.navService}</Link>
             <Link href="/contact" className="hover:underline">{t.navContact}</Link>
          </nav>
          <div className="ml-auto flex items-center gap-4">
             <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Globe className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setLanguage('en')}>English</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage('hi')}>Hindi</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage('kn')}>Kannada</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <ThemeToggle />
            
            <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white rounded-full hidden sm:flex">
                <Link href="/login">{t.login}</Link>
            </Button>
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu />
                </Button>
              </SheetTrigger>
              <SheetContent>
                  <nav className="grid gap-6 text-lg font-medium mt-6">
                    <Link href="/" className="hover:underline" onClick={() => setOpen(false)}>{t.navHome}</Link>
                    <Link href="/about" className="hover:underline" onClick={() => setOpen(false)}>{t.navAbout}</Link>
                    <Link href="/service" className="hover:underline" onClick={() => setOpen(false)}>{t.navService}</Link>
                    <Link href="/contact" className="hover:underline" onClick={() => setOpen(false)}>{t.navContact}</Link>
                    <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white rounded-full mt-4">
                        <Link href="/login" onClick={() => setOpen(false)}>{t.login}</Link>
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
                    src="https://lirp.cdn-website.com/270e8ab9/dms3rep/multi/opt/Untitled+%2885%29-640w.png"
                    alt="Chickens"
                    fill
                    className="object-cover"
                    data-ai-hint="chickens farm"
                  />
                  <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center p-4">
                    <h1 className="text-white text-4xl md:text-6xl font-bold text-center">
                     {t.landingTitle1}
                    </h1>
                    <div className="mt-8 flex gap-4">
                        <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                            <Link href="/login">Get Started</Link>
                        </Button>
                        <Button asChild size="lg" variant="secondary">
                            <Link href="/about">Learn More</Link>
                        </Button>
                    </div>
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
                   <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center p-4">
                    <h1 className="text-white text-4xl md:text-6xl font-bold text-center">
                      {t.landingTitle2}
                    </h1>
                    <div className="mt-8 flex gap-4">
                        <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                            <Link href="/login">Get Started</Link>
                        </Button>
                        <Button asChild size="lg" variant="secondary">
                            <Link href="/about">Learn More</Link>
                        </Button>
                    </div>
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
                   <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center p-4">
                    <h1 className="text-white text-4xl md:text-6xl font-bold text-center">
                      {t.landingTitle3}
                    </h1>
                     <div className="mt-8 flex gap-4">
                        <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                            <Link href="/login">Get Started</Link>
                        </Button>
                        <Button asChild size="lg" variant="secondary">
                            <Link href="/about">Learn More</Link>
                        </Button>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            </CarouselContent>
          </Carousel>
        </section>
        
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-lavender-100 dark:bg-lavender-900/20">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">{t.featuresKey}</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">{t.featuresTitle}</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    {t.featuresDescription}
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {t.features.map((feature, index) => {
                const Icon = featuresIcons[index];
                return (
                  <Link href="/login" key={index}>
                      <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer bg-card">
                        <CardHeader className="flex flex-row items-start gap-4">
                          <div className="bg-primary/10 p-3 rounded-full">
                            <Icon className="h-6 w-6 text-primary" />
                          </div>
                          <CardTitle>{feature.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground">{feature.description}</p>
                        </CardContent>
                      </Card>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
