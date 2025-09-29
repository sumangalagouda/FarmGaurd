
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sun, Cloud, CloudRain, Thermometer, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { getWeeklyForecast, Forecast } from "@/services/weather-service";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";

const weatherIcons = {
  sunny: <Sun className="h-8 w-8 text-yellow-500" />,
  cloudy: <Cloud className="h-8 w-8 text-gray-500" />,
  rainy: <CloudRain className="h-8 w-8 text-blue-500" />,
};

const getTempColor = (temp: number) => {
  if (temp >= 32) return "bg-red-500/80";
  if (temp >= 30) return "bg-orange-500/80";
  if (temp >= 25) return "bg-yellow-500/80";
  if (temp >= 20) return "bg-green-500/80";
  if (temp >= 15) return "bg-blue-500/80";
  return "bg-indigo-500/80";
};

export default function WeatherForecastPage() {
  const [forecastData, setForecastData] = useState<Forecast[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  
  // Mocked user location, in a real app this would come from the user's profile
  const userLocation = "Jos, Plateau State";

  useEffect(() => {
    async function fetchForecast() {
      if (userLocation) {
        try {
          const data = await getWeeklyForecast(userLocation);
          setForecastData(data);
        } catch (error) {
          console.error("Failed to fetch forecast:", error);
        } finally {
          setLoading(false);
        }
      }
    }
    fetchForecast();
  }, [userLocation]);


  return (
    <Card>
      <CardHeader>
        <CardTitle>7-Day Weather Forecast</CardTitle>
        <CardDescription>Heatmap showing the temperature forecast for the upcoming week in {userLocation}.</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-7 gap-2 text-center">
              {forecastData.map((data) => (
                <div key={data.day} className="p-2 border rounded-lg flex flex-col items-center justify-between space-y-2">
                  <span className="font-bold text-lg">{data.day}</span>
                  <div className="my-4">
                    {weatherIcons[data.weather as keyof typeof weatherIcons]}
                  </div>
                  <div className="w-full space-y-1">
                    <div className={cn("text-white text-sm font-semibold p-2 rounded-t-md", getTempColor(data.high))}>
                      {data.high}°C
                    </div>
                    <div className={cn("text-white text-sm font-semibold p-2 rounded-b-md opacity-80", getTempColor(data.low))}>
                      {data.low}°C
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex items-center justify-end space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                    <div className="h-4 w-4 rounded-sm bg-red-500/80"></div>
                    <span>{'>'}= 32°C</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="h-4 w-4 rounded-sm bg-orange-500/80"></div>
                    <span>30-31°C</span>
                </div>
                 <div className="flex items-center gap-2">
                    <div className="h-4 w-4 rounded-sm bg-yellow-500/80"></div>
                    <span>25-29°C</span>
                </div>
                 <div className="flex items-center gap-2">
                    <div className="h-4 w-4 rounded-sm bg-green-500/80"></div>
                    <span>20-24°C</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="h-4 w-4 rounded-sm bg-blue-500/80"></div>
                    <span>{'<'} 20°C</span>
                </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
