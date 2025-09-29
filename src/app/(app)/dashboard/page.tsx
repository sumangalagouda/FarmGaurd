
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Award, Shield, BarChart, Sun, AlertTriangle, Loader2 } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { placeholderImageMap } from "@/lib/placeholder-images";
import { useEffect, useState } from "react";
import { getNearbyOutbreaks } from "@/services/outbreak-service";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";
import { getCurrentWeather, WeatherAlert } from "@/services/weather-service";

interface Outbreak {
  disease: string;
  date: string;
}

interface CurrentWeather {
    temperature: number;
    condition: string;
    alert: WeatherAlert | null;
}

export default function DashboardPage() {
  const { user } = useAuth();
  const biosecurityScore = 85;
  const [outbreaks, setOutbreaks] = useState<Outbreak[]>([]);
  const [loadingOutbreaks, setLoadingOutbreaks] = useState(true);
  const [weather, setWeather] = useState<CurrentWeather | null>(null);
  const [loadingWeather, setLoadingWeather] = useState(true);


  // Mocked user location, in a real app this would come from the user's profile
  const userLocation = "Jos, Plateau State";
  
  useEffect(() => {
    async function fetchOutbreaks() {
      if (userLocation) {
        try {
          const nearbyOutbreaks = await getNearbyOutbreaks(userLocation);
          setOutbreaks(nearbyOutbreaks);
        } catch (error) {
          console.error("Failed to fetch outbreaks:", error);
        } finally {
          setLoadingOutbreaks(false);
        }
      }
    }
    async function fetchWeather() {
      if (userLocation) {
        try {
          const weatherData = await getCurrentWeather(userLocation);
          setWeather(weatherData);
        } catch (error) {
          console.error("Failed to fetch weather:", error);
        } finally {
          setLoadingWeather(false);
        }
      }
    }
    fetchOutbreaks();
    fetchWeather();
  }, [userLocation]);

  const events = [
    { date: new Date(new Date().setDate(new Date().getDate() + 2)), type: "upcoming", description: "Deworming for Piglets" },
    { date: new Date(new Date().setDate(new Date().getDate() - 5)), type: "done", description: "Vaccination - Swine Fever" },
    { date: new Date(new Date().setDate(new Date().getDate() + 10)), type: "upcoming", description: "Supplement - Poultry" },
    { date: new Date(new Date().setDate(new Date().getDate() - 1)), type: "overdue", description: "Clean pen area 3" },
  ];

  const communityBuzz = [
    { id: 'user1-avatar', name: "John D.", post: "Best feed for broilers? Looking for advice..." },
    { id: 'user2-avatar', name: "Sarah A.", post: "Great success with the new ventilation system!" },
    { id: 'user3-avatar', name: "Mike K.", post: "Warning: I've seen signs of swine flu in my area." },
  ]

  return (
    <div className="grid gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Biosecurity Score</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{biosecurityScore}%</div>
            <p className="text-xs text-muted-foreground">Your farm's compliance rating</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Gamification Rank</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">#12</div>
            <p className="text-xs text-muted-foreground">Top 10% in your region</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loadingOutbreaks ? '...' : outbreaks.length}</div>
            <p className="text-xs text-muted-foreground">Local outbreak warnings</p>
          </CardContent>
        </Card>
        <Link href="/weather-forecast" className="block hover:shadow-lg transition-shadow rounded-lg">
          <Card className={cn("h-full", weather?.alert && "border-destructive")}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className={cn("text-sm font-medium", weather?.alert && "text-destructive")}>
                  {weather?.alert ? weather.alert.title : "Weather"}
              </CardTitle>
              {loadingWeather ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : weather?.alert ? (
                  <AlertTriangle className="h-4 w-4 text-destructive" />
              ) : (
                  <Sun className="h-4 w-4 text-muted-foreground" />
              )}
            </CardHeader>
            <CardContent>
              {loadingWeather ? (
                <div className="text-2xl font-bold">...</div>
              ) : (
                <div className="text-2xl font-bold">{weather?.temperature}°C</div>
              )}
              <p className="text-xs text-muted-foreground">
                  {loadingWeather ? "Loading..." : weather?.alert ? weather.alert.description : weather?.condition}
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>

      {outbreaks.length > 0 && (
        <Card className="border-destructive">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle />
              Outbreak Alerts
            </CardTitle>
            <CardDescription>
              There are active disease outbreaks reported in your area. Take preventive measures.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {outbreaks.map((outbreak, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-destructive/10 rounded-md">
                <p className="font-medium">{outbreak.disease}</p>
                <p className="text-sm text-muted-foreground">Reported on: {new Date(outbreak.date).toLocaleDateString()}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Health Calendar</CardTitle>
            <CardDescription>Upcoming health tasks for your farm.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Calendar
              mode="single"
              selected={new Date()}
              className="rounded-md border"
              modifiers={{
                done: events.filter(e => e.type === 'done').map(e => e.date),
                upcoming: events.filter(e => e.type === 'upcoming').map(e => e.date),
                overdue: events.filter(e => e.type === 'overdue').map(e => e.date),
              }}
              modifiersClassNames={{
                done: 'bg-primary text-primary-foreground',
                upcoming: 'bg-accent text-accent-foreground',
                overdue: 'bg-destructive text-destructive-foreground',
              }}
            />
            <div className="space-y-4">
              {events.map((event, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className={`mt-1.5 h-3 w-3 rounded-full ${
                    event.type === 'done' ? 'bg-primary' : event.type === 'upcoming' ? 'bg-accent' : 'bg-destructive'
                  }`}></div>
                  <div>
                    <p className="font-medium">{event.description}</p>
                    <p className="text-sm text-muted-foreground">{event.date.toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Community Buzz</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/community-forum">View All</Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {communityBuzz.map((post) => {
              const avatar = placeholderImageMap[post.id];
              return (
              <div key={post.id} className="flex items-start gap-3">
                <Avatar className="w-8 h-8 border">
                  <AvatarImage src={avatar.imageUrl} data-ai-hint={avatar.imageHint} />
                  <AvatarFallback>{post.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{post.name}</p>
                  <p className="text-sm text-muted-foreground">{post.post}</p>
                </div>
              </div>
            )})}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
