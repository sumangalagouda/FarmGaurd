import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Check, Clock, AlertTriangle } from 'lucide-react';

export default function HealthCalendarPage() {
  const events = [
    { date: new Date(2024, 6, 1), type: "done", description: "Farrowing Crate Disinfection" },
    { date: new Date(2024, 6, 5), type: "done", description: "Vaccination - Poultry - Newcastle Disease" },
    { date: new Date(2024, 6, 12), type: "done", description: "Iron Shots for Piglets" },
    { date: new Date(2024, 7, 2), type: "upcoming", description: "Deworming for Sows" },
    { date: new Date(2024, 7, 10), type: "upcoming", description: "Vitamin Supplements - All Poultry" },
    { date: new Date(2024, 7, 15), type: "upcoming", description: "Bi-annual farm deep clean" },
    { date: new Date(2024, 6, 28), type: "overdue", description: "Check ventilation system filters" },
  ];
  
  const today = new Date();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Detailed Health Calendar</CardTitle>
            <CardDescription>View and manage all health-related tasks for your farm.</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              numberOfMonths={2}
              className="rounded-md border p-4"
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
          </CardContent>
        </Card>
      </div>
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Upcoming & Overdue</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-semibold text-destructive">Overdue Tasks</h3>
              {events.filter(e => e.type === 'overdue').map((event, index) => (
                <div key={`overdue-${index}`} className="flex items-center gap-2 p-2 bg-destructive/10 rounded-md">
                  <AlertTriangle className="h-4 w-4 text-destructive shrink-0" />
                  <div>
                    <p className="text-sm font-medium">{event.description}</p>
                    <p className="text-xs text-muted-foreground">{event.date.toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-accent-foreground">Upcoming Tasks</h3>
              {events.filter(e => e.type === 'upcoming').map((event, index) => (
                <div key={`upcoming-${index}`} className="flex items-center gap-2 p-2 bg-accent/20 rounded-md">
                  <Clock className="h-4 w-4 text-accent-foreground shrink-0" />
                  <div>
                    <p className="text-sm font-medium">{event.description}</p>
                    <p className="text-xs text-muted-foreground">{event.date.toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>
             <div className="space-y-2">
              <h3 className="font-semibold text-primary-foreground/80">Completed This Month</h3>
              {events.filter(e => e.type === 'done' && e.date.getMonth() === today.getMonth()).map((event, index) => (
                <div key={`done-${index}`} className="flex items-center gap-2 p-2 bg-primary/10 rounded-md">
                  <Check className="h-4 w-4 text-primary shrink-0" />
                  <div>
                    <p className="text-sm font-medium">{event.description}</p>
                    <p className="text-xs text-muted-foreground">{event.date.toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
