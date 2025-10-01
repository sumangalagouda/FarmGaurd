
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Mail, Phone } from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen bg-muted/40">
        <header className="sticky top-0 z-50 w-full border-b bg-primary text-primary-foreground">
            <div className="container flex h-14 items-center">
            <div className="mr-auto flex items-center">
                <span className="font-bold text-lg">FarmGuard</span>
            </div>
            <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
                <Link href="/" className="hover:underline">Home</Link>
                <Link href="/about" className="hover:underline">About</Link>
                <Link href="/service" className="hover:underline">Service</Link>
                <Link href="/contact" className="hover:underline">Contact</Link>
            </nav>
            <div className="ml-auto">
                <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white rounded-full">
                    <Link href="/login">Login</Link>
                </Button>
            </div>
            </div>
      </header>
      <main className="flex-1 py-12 md:py-24">
        <div className="container">
            <Card className="max-w-2xl mx-auto">
                <CardHeader>
                    <CardTitle className="text-3xl">Contact Us</CardTitle>
                    <CardDescription>We're here to help. Reach out to us with any questions.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex items-center gap-4 p-4 bg-secondary rounded-md">
                        <Phone className="h-6 w-6 text-muted-foreground" />
                        <div>
                            <h3 className="font-semibold">Phone</h3>
                            <a href="tel:+234-FARM-GUARD" className="text-primary hover:underline">+234-FARM-GUARD</a>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-secondary rounded-md">
                        <Mail className="h-6 w-6 text-muted-foreground" />
                        <div>
                            <h3 className="font-semibold">Email</h3>
                            <a href="mailto:support@farmguard.ag" className="text-primary hover:underline">support@farmguard.ag</a>
                        </div>
                    </div>
                     <div className="flex items-center gap-4 p-4 bg-secondary rounded-md">
                        <div className="text-muted-foreground">📍</div>
                        <div>
                            <h3 className="font-semibold">Address</h3>
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
