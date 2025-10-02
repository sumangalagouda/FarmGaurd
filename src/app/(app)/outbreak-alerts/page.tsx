
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Siren } from "lucide-react";

export default function OutbreakAlertsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><Siren /> Nearby Outbreak Alerts</CardTitle>
        <CardDescription>
          This page will display a map and list of reported disease outbreaks in your operational areas.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center text-muted-foreground py-16">
            <p>Feature coming soon.</p>
        </div>
      </CardContent>
    </Card>
  );
}
