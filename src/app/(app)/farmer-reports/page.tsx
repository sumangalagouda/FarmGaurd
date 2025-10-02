
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";

export default function FarmerReportsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><FileText /> Urgent Farmer Reports</CardTitle>
        <CardDescription>
          This page will show a feed of urgent reports submitted by farmers, allowing you to prioritize and respond to critical situations.
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
