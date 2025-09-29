import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LifeBuoy, Mail, Phone } from "lucide-react";

export default function HelpPage() {
    return (
        <div className="grid md:grid-cols-3 gap-6 items-start">
            <div className="md:col-span-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Frequently Asked Questions</CardTitle>
                        <CardDescription>Find answers to common questions about FarmGuard.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="item-1">
                                <AccordionTrigger>How do I use the AI Disease Prediction tool?</AccordionTrigger>
                                <AccordionContent>
                                    Navigate to the 'Disease Prediction' page, describe the symptoms you're observing in detail, select your farm type and location, and click 'Analyze Symptoms'. The AI will provide a list of possible diseases and preventive measures. Remember, this is not a substitute for professional veterinary advice.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-2">
                                <AccordionTrigger>How is my Biosecurity Score calculated?</AccordionTrigger>
                                <AccordionContent>
                                    Your score is based on several factors, including completing scheduled health tasks on time, reporting potential issues, and following best practice guidelines provided in the app. Higher engagement and compliance lead to a better score.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-3">
                                <AccordionTrigger>Can I use the app offline?</AccordionTrigger>
                                <AccordionContent>
                                    Yes, certain features like symptom reporting via SMS are designed to work offline. Full data synchronization will occur once you have an internet connection, ensuring your records are always up-to-date.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-4">
                                <AccordionTrigger>How do I get premium access to buyers?</AccordionTrigger>
                                <AccordionContent>
                                    Premium buyer access is a reward for farmers who consistently maintain a high biosecurity score and engage positively with the platform's learning and community features. Keep up the great work to unlock these opportunities.
                                </AccordionContent>
                            </AccordionItem>
                             <AccordionItem value="item-5">
                                <AccordionTrigger>What is the Health Calendar for?</AccordionTrigger>
                                <AccordionContent>
                                    The Health Calendar provides personalized schedules for important tasks like vaccinations, deworming, and supplement administration. It sends you reminders to help you stay on top of your farm's preventive care plan.
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </CardContent>
                </Card>
            </div>
            <div>
                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><LifeBuoy /> Contact Support</CardTitle>
                        <CardDescription>If you can't find an answer, reach out to us.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center gap-3 p-3 bg-secondary rounded-md">
                            <Phone className="h-5 w-5 text-muted-foreground" />
                            <a href="tel:+234-FARM-GUARD" className="text-sm font-medium">+234-FARM-GUARD</a>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-secondary rounded-md">
                            <Mail className="h-5 w-5 text-muted-foreground" />
                            <a href="mailto:support@farmguard.ag" className="text-sm font-medium">support@farmguard.ag</a>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
