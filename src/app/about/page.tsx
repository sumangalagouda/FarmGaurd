import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function AboutPage() {
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
            <Card className="max-w-4xl mx-auto">
                <CardHeader>
                    <CardTitle className="text-3xl">About Us</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                    <p>
                        Farming is the backbone of our communities, and healthy livestock is the key to a farmer’s livelihood. Yet, pig and poultry farmers often face challenges like sudden disease outbreaks, lack of timely health guidance, and unpredictable market conditions. Our Digital Farm Management Portal is designed to solve these problems by combining modern technology with farmer-friendly tools.
                    </p>
                    <p>
                        The platform provides early disease detection through symptoms and history tracking, a health calendar with vaccination and medicine reminders, and real-time alerts based on outbreaks or climate changes. Farmers can also access government schemes, market demand insights, and step-by-step guidelines to manage their farms more efficiently.
                    </p>
                    <p>
                        To make the experience engaging, we use gamification features like leaderboards and learning modules, where farmers earn rewards, discounts, and recognition. Our mission is to empower every farmer with the knowledge and tools needed to improve animal health, increase productivity, and build a sustainable and biosecure farming ecosystem.
                    </p>
                </CardContent>
            </Card>
        </div>
      </main>
    </div>
  );
}
