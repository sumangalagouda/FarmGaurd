
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Share2 } from "lucide-react";

export default function ShareResourcesPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><Share2 /> Share Resources</CardTitle>
        <CardDescription>
          This feature will allow you to share guidelines, articles, and other resources directly with individual farmers or groups.
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
