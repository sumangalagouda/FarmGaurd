
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ThemeToggle } from "@/components/theme-toggle";
import { Bot, Shield, CalendarDays, LineChart, Siren, MessageSquare, Globe } from "lucide-react";
import Link from "next/link";

const services = [
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

export default function ServicePage() {
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
            <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white rounded-full">
              <Link href="/login">Login</Link>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1 py-12 md:py-24">
        <div className="container">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold">Our Services</h1>
            <p className="text-lg text-muted-foreground mt-2">
              Empowering farmers with the tools they need for success.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <service.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
