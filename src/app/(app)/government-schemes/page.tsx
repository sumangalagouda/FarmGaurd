
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Landmark } from "lucide-react";
import Link from "next/link";

const schemes = [
  {
    title: "National Livestock Mission",
    description: "Aims to enhance livestock productivity and increase the income of livestock farmers through sustainable and scientific interventions.",
    eligibility: "All farmers, Farmer Producer Organizations (FPOs), and entrepreneurs.",
    link: "https://nlm.udyamimitra.in/"
  },
  {
    title: "Livestock Insurance Scheme",
    description: "Provides a protection mechanism to farmers and cattle rearers against any eventual loss of their animals due to death.",
    eligibility: "Farmers with indigenous/crossbred milch cattle and buffaloes.",
    link: "https://nlm.udyamimitra.in/Home/SchemePage"
  },
  {
    title: "Animal Husbandry Infrastructure Development Fund (AHIDF)",
    description: "Incentivizes investments in dairy processing, meat processing, and animal feed plants.",
    eligibility: "Private companies, FPOs, MSMEs, individuals.",
    link: "https://dahd.gov.in/schemes/programmes/ahidf"
  },
   {
    title: "Pradhan Mantri Matsya Sampada Yojana (PMMSY)",
    description: "A scheme to bring about a blue revolution through sustainable and responsible development of the fisheries sector.",
    eligibility: "Fishers, fish farmers, FPOs, and entrepreneurs in the fisheries sector.",
    link: "https://pmmsy.dof.gov.in/"
  },
  {
    title: "Rashtriya Gokul Mission",
    description: "Aims to develop and conserve indigenous bovine breeds and enhance milk production and productivity.",
    eligibility: "Applicable to all states and union territories.",
    link: "https://dahd.gov.in/schemes/programmes/rashtriya_gokul_mission"
  }
];

export default function GovernmentSchemesPage() {
  return (
    <div className="space-y-6">
       <Card>
        <CardHeader>
            <div className="flex items-center gap-2">
                 <Landmark className="h-6 w-6" />
                <CardTitle>Government Schemes for Farmers</CardTitle>
            </div>
          <CardDescription>Explore various government schemes available to support your farming activities.</CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {schemes.map((scheme, index) => (
          <Card key={index} className="flex flex-col">
            <CardHeader>
              <CardTitle>{scheme.title}</CardTitle>
              <CardDescription className="pt-2">{scheme.description}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="text-sm">
                    <p className="font-semibold">Eligibility:</p>
                    <p className="text-muted-foreground">{scheme.eligibility}</p>
                </div>
            </CardContent>
            <CardFooter className="mt-auto">
              <Button asChild variant="secondary">
                <Link href={scheme.link} target="_blank" rel="noopener noreferrer">Learn More</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
