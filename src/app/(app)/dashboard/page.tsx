
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Award, Shield, BarChart, Sun, AlertTriangle, Loader2, Calendar as CalendarIcon } from "lucide-react";
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

interface CalendarEvent {
    date: Date;
    type: 'upcoming' | 'done' | 'overdue';
    description: string;
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
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [isClient, setIsClient] = useState(false);

  // Mocked user location, in a real app this would come from the user's profile
  const userLocation = "Jos, Plateau State";
  
  useEffect(() => {
    setIsClient(true);
    const today = new Date();
    setEvents([
        { date: new Date(new Date().setDate(today.getDate() + 2)), type: "upcoming", description: "Deworming for Piglets" },
        { date: new Date(new Date().setDate(today.getDate() - 5)), type: "done", description: "Vaccination - Swine Fever" },
        { date: new Date(new Date().setDate(today.getDate() + 10)), type: "upcoming", description: "Supplement - Poultry" },
        { date: new Date(new Date().setDate(today.getDate() - 1)), type: "overdue", description: "Clean pen area 3" },
    ]);

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
        <Link href="/leaderboard" className="block hover:shadow-lg transition-shadow rounded-lg">
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
        </Link>
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

      {outbreaks.length > 0 && isClient && (
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
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Health Calendar</CardTitle>
            <CardDescription>Upcoming health tasks for your farm.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
             {!isClient ? (
                <div className="flex items-center justify-center col-span-1 md:col-span-2 h-72">
                    <Loader2 className="animate-spin h-8 w-8 text-muted-foreground" />
                </div>
            ) : (
                <>
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
                        done: 'bg-green-600 text-white',
                        upcoming: 'bg-yellow-500 text-white',
                        overdue: 'bg-red-600 text-white',
                    }}
                    />
                    <div className="space-y-4">
                    {events.map((event, index) => (
                        <div key={index} className="flex items-start gap-4">
                        <div className={`mt-1.5 h-3 w-3 rounded-full ${
                            event.type === 'done' ? 'bg-green-600' : event.type === 'upcoming' ? 'bg-yellow-500' : 'bg-red-600'
                        }`}></div>
                        <div>
                            <p className="font-medium">{event.description}</p>
                            <p className="text-sm text-muted-foreground">{event.date.toLocaleDateString()}</p>
                        </div>
                        </div>
                    ))}
                    </div>
                </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
