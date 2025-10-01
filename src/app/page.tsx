
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
import Image from "next/image";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b bg-primary text-primary-foreground">
        <div className="container flex h-14 items-center">
          <div className="mr-auto flex items-center">
            <span className="font-bold text-lg">FarmGuard</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
             <Link href="#" className="hover:underline">Home</Link>
             <Link href="#" className="hover:underline">About</Link>
             <Link href="#" className="hover:underline">Service</Link>
             <Link href="#" className="hover:underline">Contact</Link>
          </nav>
          <div className="ml-auto">
             <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white rounded-full">
                <Link href="/login">Login</Link>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="relative w-full h-[calc(100vh-3.5rem)]">
          <Carousel
            className="w-full h-full"
            plugins={[
              Autoplay({
                delay: 5000,
              }),
            ]}
          >
            <CarouselContent>
              <CarouselItem>
                <div className="relative h-[calc(100vh-3.5rem)] w-full">
                  <Image
                    src="https://images.unsplash.com/photo-1516427185348-12a8682a46c2?q=80&w=2070&auto=format&fit=crop"
                    alt="Piglet"
                    fill
                    className="object-cover"
                    data-ai-hint="piglet"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <h1 className="text-white text-4xl md:text-6xl font-bold text-center">
                      We care for your farm,<br /> just like you do.
                    </h1>
                  </div>
                </div>
              </CarouselItem>
                 <CarouselItem>
                <div className="relative h-[calc(100vh-3.5rem)] w-full">
                  <Image
                    src="https://images.unsplash.com/photo-1588167093802-5369b1a55a29?q=80&w=2070&auto=format&fit=crop"
                    alt="Chickens"
                    fill
                    className="object-cover"
                    data-ai-hint="chickens"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <h1 className="text-white text-4xl md:text-6xl font-bold text-center">
                     Healthy Flocks, Higher Profits.
                    </h1>
                  </div>
                </div>
              </CarouselItem>
            </CarouselContent>
          </Carousel>
        </section>
      </main>
    </div>
  );
}
