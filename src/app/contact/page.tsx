
'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ThemeToggle } from "@/components/theme-toggle";
import { Mail, Phone, Globe, Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { useTranslation } from "@/hooks/use-translation";

export default function ContactPage() {
  const { t, setLanguage } = useTranslation();
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col min-h-screen bg-muted/40">
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
      <main className="flex-1 py-12 md:py-24">
        <div className="container">
            <Card className="max-w-2xl mx-auto">
                <CardHeader>
                    <CardTitle className="text-3xl">{t.contactTitle}</CardTitle>
                    <CardDescription>{t.contactDescription}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex items-center gap-4 p-4 bg-secondary rounded-md">
                        <Phone className="h-6 w-6 text-muted-foreground" />
                        <div>
                            <h3 className="font-semibold">{t.contactPhone}</h3>
                            <a href="tel:+234-FARM-GUARD" className="text-primary hover:underline">+234-FARM-GUARD</a>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-secondary rounded-md">
                        <Mail className="h-6 w-6 text-muted-foreground" />
                        <div>
                            <h3 className="font-semibold">{t.contactEmail}</h3>
                            <a href="mailto:support@farmguard.ag" className="text-primary hover:underline">support@farmguard.ag</a>
                        </div>
                    </div>
                     <div className="flex items-center gap-4 p-4 bg-secondary rounded-md">
                        <div className="text-muted-foreground">📍</div>
                        <div>
                            <h3 className="font-semibold">{t.contactAddress}</h3>
                            <p className="text-muted-foreground">123 FarmTech Avenue, Jos, Plateau State, Nigeria</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
      </main>
    </div>
  );
}
