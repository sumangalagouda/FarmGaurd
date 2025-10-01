
'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ThemeToggle } from "@/components/theme-toggle";
import { Globe } from "lucide-react";
import Link from "next/link";

const content = {
  en: {
    title: "About Us",
    navHome: "Home",
    navAbout: "About",
    navService: "Service",
    navContact: "Contact",
    login: "Login",
    paragraphs: [
      "Farming is the backbone of our communities, and healthy livestock is the key to a farmer’s livelihood. Yet, pig and poultry farmers often face challenges like sudden disease outbreaks, lack of timely health guidance, and unpredictable market conditions. Our Digital Farm Management Portal is designed to solve these problems by combining modern technology with farmer-friendly tools.",
      "The platform provides early disease detection through symptoms and history tracking, a health calendar with vaccination and medicine reminders, and real-time alerts based on outbreaks or climate changes. Farmers can also access government schemes, market demand insights, and step-by-step guidelines to manage their farms more efficiently.",
      "To make the experience engaging, we use gamification features like leaderboards and learning modules, where farmers earn rewards, discounts, and recognition. Our mission is to empower every farmer with the knowledge and tools needed to improve animal health, increase productivity, and build a sustainable and biosecure farming ecosystem.",
    ]
  },
  kn: {
    title: "ನಮ್ಮ ಬಗ್ಗೆ",
    navHome: "ಮುಖಪುಟ",
    navAbout: "ನಮ್ಮ ಬಗ್ಗೆ",
    navService: "ಸೇವೆ",
    navContact: "ಸಂಪರ್ಕಿಸಿ",
    login: "ಲಾಗಿನ್",
    paragraphs: [
      "ಕೃಷಿಯು ನಮ್ಮ ಸಮುದಾಯಗಳ ಬೆನ್ನೆಲುಬಾಗಿದೆ, ಮತ್ತು ಆರೋಗ್ಯಕರ ಜಾನುವಾರು ರೈತನ ಜೀವನೋಪಾಯಕ್ಕೆ ಪ್ರಮುಖವಾಗಿದೆ. ಆದರೂ, ಹಂದಿ ಮತ್ತು ಕೋಳಿ ಸಾಕಣೆದಾರರು ಹಠಾತ್ ರೋಗ ಹರಡುವಿಕೆ, ಸಮಯೋಚಿತ ಆರೋಗ್ಯ ಮಾರ್ಗದರ್ಶನದ ಕೊರತೆ ಮತ್ತು ಅನಿರೀಕ್ಷಿತ ಮಾರುಕಟ್ಟೆ ಪರಿಸ್ಥಿತಿಗಳಂತಹ ಸವಾಲುಗಳನ್ನು ಎದುರಿಸುತ್ತಾರೆ. ನಮ್ಮ ಡಿಜಿಟಲ್ ಫಾರ್ಮ್ ಮ್ಯಾನೇಜ್‌ಮೆಂಟ್ ಪೋರ್ಟಲ್ ಆಧುನಿಕ ತಂತ್ರಜ್ಞಾನವನ್ನು ರೈತ-ಸ್ನೇಹಿ ಪರಿಕರಗಳೊಂದಿಗೆ ಸಂಯೋಜಿಸುವ ಮೂಲಕ ಈ ಸಮಸ್ಯೆಗಳನ್ನು ಪರಿಹರಿಸಲು ವಿನ್ಯಾಸಗೊಳಿಸಲಾಗಿದೆ.",
      "ಈ ವೇದಿಕೆಯು ರೋಗಲಕ್ಷಣಗಳು ಮತ್ತು ಇತಿಹಾಸದ ಟ್ರ್ಯಾಕಿಂಗ್ ಮೂಲಕ ಆರಂಭಿಕ ರೋಗ ಪತ್ತೆ, ಲಸಿಕೆ ಮತ್ತು ಔಷಧಿ ಜ್ಞಾಪನೆಗಳೊಂದಿಗೆ ಆರೋಗ್ಯ ಕ್ಯಾಲೆಂಡರ್, ಮತ್ತು ಹರಡುವಿಕೆಗಳು ಅಥವಾ ಹವಾಮಾನ ಬದಲಾವಣೆಗಳ ಆಧಾರದ ಮೇಲೆ ನೈಜ-ಸಮಯದ ಎಚ್ಚರಿಕೆಗಳನ್ನು ಒದಗಿಸುತ್ತದೆ. ರೈತರು ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು, ಮಾರುಕಟ್ಟೆ ಬೇಡಿಕೆಯ ಒಳನೋಟಗಳು ಮತ್ತು ತಮ್ಮ ಜಮೀನುಗಳನ್ನು ಹೆಚ್ಚು ಪರಿಣಾಮಕಾರಿಯಾಗಿ ನಿರ್ವಹಿಸಲು ಹಂತ-ಹಂತದ ಮಾರ್ಗಸೂಚಿಗಳನ್ನು ಸಹ ಪ್ರವೇಶಿಸಬಹುದು.",
      "ಅನುಭವವನ್ನು ಆಕರ್ಷಕವಾಗಿಸಲು, ನಾವು ಲೀಡರ್‌ಬೋರ್ಡ್‌ಗಳು ಮತ್ತು ಕಲಿಕಾ ಮಾಡ್ಯೂಲ್‌ಗಳಂತಹ ಗ್ಯಾಮಿಫಿಕೇಶನ್ ವೈಶಿಷ್ಟ್ಯಗಳನ್ನು ಬಳಸುತ್ತೇವೆ, ಅಲ್ಲಿ ರೈತರು ಪ್ರತಿಫಲಗಳು, ರಿಯಾಯಿತಿಗಳು ಮತ್ತು ಮನ್ನಣೆಯನ್ನು ಗಳಿಸುತ್ತಾರೆ. ನಮ್ಮ ಧ್ಯೇಯವು ಪ್ರತಿಯೊಬ್ಬ ರೈತನಿಗೆ ಪ್ರಾಣಿಗಳ ಆರೋಗ್ಯವನ್ನು ಸುಧಾರಿಸಲು, ಉತ್ಪಾದಕತೆಯನ್ನು ಹೆಚ್ಚಿಸಲು ಮತ್ತು ಸುಸ್ಥಿರ ಹಾಗೂ ಜೈವಿಕ ಸುರಕ್ಷಿತ ಕೃಷಿ ಪರಿಸರ ವ್ಯವಸ್ಥೆಯನ್ನು ನಿರ್ಮಿಸಲು ಬೇಕಾದ ಜ್ಞಾನ ಮತ್ತು ಪರಿಕರಗಳೊಂದಿಗೆ ಸಶಕ್ತಗೊಳಿಸುವುದಾಗಿದೆ.",
    ]
  },
  hi: {
    title: "हमारे बारे में",
    navHome: "होम",
    navAbout: "हमारे बारे में",
    navService: "सेवा",
    navContact: "संपर्क",
    login: "लॉग इन करें",
    paragraphs: [
        "खेती हमारे समुदायों की रीढ़ है, और स्वस्थ पशुधन किसान की आजीविका की कुंजी है। फिर भी, सुअर और मुर्गी पालक किसानों को अक्सर अचानक बीमारी फैलने, समय पर स्वास्थ्य मार्गदर्शन की कमी और अप्रत्याशित बाजार स्थितियों जैसी चुनौतियों का सामना करना पड़ता है। हमारा डिजिटल फार्म प्रबंधन पोर्टल आधुनिक तकनीक को किसान-हितैषी उपकरणों के साथ जोड़कर इन समस्याओं को हल करने के लिए डिज़ाइन किया गया है।",
        "यह प्लेटफ़ॉर्म लक्षणों और इतिहास की ट्रैकिंग के माध्यम से बीमारी का शीघ्र पता लगाने, टीकाकरण और दवा अनुस्मारक के साथ एक स्वास्थ्य कैलेंडर, और प्रकोप या जलवायु परिवर्तन के आधार पर वास्तविक समय के अलर्ट प्रदान करता है। किसान सरकारी योजनाओं, बाजार की मांग की जानकारी, और अपने खेतों को अधिक कुशलता से प्रबंधित करने के लिए चरण-दर-चरण दिशानिर्देशों तक भी पहुँच सकते हैं।",
        "अनुभव को आकर्षक बनाने के लिए, हम लीडरबोर्ड और लर्निंग मॉड्यूल जैसी गेमिफिकेशन सुविधाओं का उपयोग करते हैं, जहाँ किसान पुरस्कार, छूट और मान्यता अर्जित करते हैं। हमारा मिशन प्रत्येक किसान को पशु स्वास्थ्य में सुधार, उत्पादकता बढ़ाने और एक स्थायी और जैव-सुरक्षित कृषि पारिस्थितिकी तंत्र बनाने के लिए आवश्यक ज्ञान और उपकरणों के साथ सशक्त बनाना है।",
    ]
  }
};


export default function AboutPage() {
  const [language, setLanguage] = useState<'en' | 'kn' | 'hi'>('en');

  const currentContent = content[language];

  return (
    <div className="flex flex-col min-h-screen bg-muted/40">
        <header className="sticky top-0 z-50 w-full border-b bg-primary text-primary-foreground">
            <div className="container flex h-14 items-center">
            <div className="mr-auto flex items-center">
                <span className="font-bold text-lg">FarmGuard</span>
            </div>
            <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
                <Link href="/" className="hover:underline">{currentContent.navHome}</Link>
                <Link href="/about" className="hover:underline">{currentContent.navAbout}</Link>
                <Link href="/service" className="hover:underline">{currentContent.navService}</Link>
                <Link href="/contact" className="hover:underline">{currentContent.navContact}</Link>
            </nav>
            <div className="ml-auto flex items-center gap-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Globe className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setLanguage('en')}>English</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setLanguage('hi')}>Hindi</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setLanguage('kn')}>Kannada</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <ThemeToggle />

                <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white rounded-full">
                    <Link href="/login">{currentContent.login}</Link>
                </Button>
            </div>
            </div>
      </header>
      <main className="flex-1 py-12 md:py-24">
        <div className="container">
            <Card className="max-w-4xl mx-auto">
                <CardHeader>
                    <CardTitle className="text-3xl">{currentContent.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                    {currentContent.paragraphs.map((text, index) => (
                      <p key={index}>{text}</p>
                    ))}
                </CardContent>
            </Card>
        </div>
      </main>
    </div>
  );
}
