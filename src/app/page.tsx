import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme-toggle";
import { Globe, Shield, Bot, BarChart, CalendarDays, LineChart, MessageSquare, Briefcase, Siren } from "lucide-react";
import Link from "next/link";
import { Footer } from "@/components/footer";

const features = [
    {
        icon: Bot,
        title: "AI Disease Prediction",
        description: "Get AI-powered analysis of possible diseases and preventive measures based on symptoms.",
    },
    {
        icon: BarChart,
        title: "Biosecurity Score",
        description: "Track your farm's compliance and biosecurity rating to ensure a healthy environment.",
    },
    {
        icon: Siren,
        title: "Outbreak Reporting",
        description: "Inform nearby farmers about disease outbreaks to help protect the local farming community.",
    },
    {
        icon: LineChart,
        title: "Market Insights",
        description: "Stay updated on local market price trends and connect with top buyers in your network.",
    },
    {
        icon: MessageSquare,
        title: "Community Forum",
        description: "Connect with other farmers, share knowledge, and learn from their experiences.",
    },
    {
        icon: Briefcase,
        title: "Company Solutions",
        description: "Tools for businesses to manage multiple farms, track data, and ensure supply chain integrity."
    }
];

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 flex items-center">
            <Shield className="h-6 w-6 mr-2 text-primary" />
            <span className="font-bold text-lg">FarmGuard</span>
          </div>
          <nav className="flex items-center space-x-6 text-sm font-medium ml-auto">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon">
                    <Globe className="h-4 w-4" />
                </Button>
                <ThemeToggle />
                <Button asChild>
                    <Link href="/login">Login</Link>
                </Button>
            </div>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                   <Badge>For Modern Farmers & Agribusiness</Badge>
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Your Digital Partner in Farm Health & Biosecurity
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    FarmGuard is a comprehensive farm management platform that empowers pig and poultry farmers with AI-driven insights, biosecurity tracking, and market access to enhance productivity and profitability.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" asChild>
                    <Link href="/login">Get Started</Link>
                  </Button>
                  <Button size="lg" variant="outline">
                    Learn More
                  </Button>
                </div>
              </div>
              <img
                alt="Hero"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
                data-ai-hint="farm animals"
                src="https://images.unsplash.com/photo-1560493676-04071c5f467b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxwaWdzJTIwYW5kJTIwY2hpY2tlbnN8ZW58MHx8fHwxNzU5MjA5NzYwfDA&ixlib=rb-4.1.0&q=80&w=1080"
              />
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">Key Features</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Everything You Need to Secure Your Farm</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  From AI diagnostics to market connections, FarmGuard provides a full suite of tools for success.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:max-w-none lg:grid-cols-3 mt-12">
              {features.map((feature, index) => (
                <Card key={index}>
                    <CardHeader>
                        <div className="flex items-center gap-4">
                            <div className="bg-primary/10 p-3 rounded-full">
                                <feature.icon className="h-6 w-6 text-primary" />
                            </div>
                            <CardTitle>{feature.title}</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">{feature.description}</p>
                    </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
