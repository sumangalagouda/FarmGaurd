
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckSquare, Droplet, ShieldCheck } from "lucide-react";

const guidelines = [
    {
        icon: ShieldCheck,
        title: "Biosecurity Best Practices",
        points: [
            "Implement strict access control for farm visitors.",
            "Use dedicated footwear and clothing for each farm section.",
            "Regularly disinfect equipment, vehicles, and housing areas.",
            "Quarantine new animals for at least 30 days before introducing them to the main herd/flock."
        ]
    },
    {
        icon: Droplet,
        title: "Feeding & Water Management",
        points: [
            "Provide clean, fresh water at all times.",
            "Store feed in a dry, cool, and pest-free environment.",
            "Ensure feed formulation meets the nutritional needs for the specific age and type of livestock.",
            "Regularly clean and inspect feeders and waterers to prevent contamination."
        ]
    },
    {
        icon: CheckSquare,
        title: "Vaccination & Health Checks",
        points: [
            "Follow a strict vaccination schedule as recommended by your veterinarian.",
            "Monitor animals daily for any signs of illness or distress.",
            "Keep accurate records of all treatments and vaccinations.",
            "Isolate sick animals immediately to prevent disease spread."
        ]
    }
];

export default function GuidelinesPage() {
  return (
    <div className="space-y-6">
       <Card>
        <CardHeader>
          <CardTitle>Farming Guidelines</CardTitle>
          <CardDescription>
            Follow these best practices to improve farm productivity, ensure biosecurity, and maintain animal health.
          </CardDescription>
        </CardHeader>
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {guidelines.map(item => (
            <Card key={item.title}>
                <CardHeader className="flex flex-row items-center gap-4">
                    <item.icon className="w-8 h-8 text-primary" />
                    <CardTitle>{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-3 text-sm text-muted-foreground">
                        {item.points.map(point => (
                            <li key={point} className="flex items-start gap-2">
                                <CheckSquare className="w-4 h-4 mt-1 shrink-0 text-green-600"/>
                                <span>{point}</span>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
        ))}
      </div>
    </div>
  );
}
