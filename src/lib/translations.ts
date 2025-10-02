
export type TranslationSet = {
    navHome: string;
    navAbout: string;
    navService: string;
    navContact: string;
    login: string;
    aboutTitle: string;
    aboutParagraphs: string[];
    contactTitle: string;
    contactDescription: string;
    contactPhone: string;
    contactEmail: string;
    contactAddress: string;
    serviceTitle: string;
    serviceDescription: string;
    landingTitle1: string;
    landingTitle2: string;
    landingTitle3: string;
    featuresKey: string;
    featuresTitle: string;
    featuresDescription: string;
    footerUsefulLinks: string;
    footerAboutPortal: string;
    footerTerms: string;
    footerPolicies: string;
    footerAccessibility: string;
    footerGODL: string;
    footerFAQ: string;
    footerCDO: string;
    footerLinkToUs: string;
    footerNewsletters: string;
    footerSitemap: string;
    footerHelp: string;
    footerConnect: string;
    footerSuggestDataset: string;
    footerSuggestions: string;
    footerTellFriend: string;
    footerFeedback: string;
    footerGrievance: string;
    footerPlatformInfo: string;
    footerNeedHelp: string;
    footerCopyright: string;
    footerLastUpdated: string;
    features: {
        title: string;
        description: string;
    }[];
};

export const translations: Record<'en' | 'hi' | 'kn', TranslationSet> = {
  en: {
    navHome: "Home",
    navAbout: "About",
    navService: "Service",
    navContact: "Contact",
    login: "Login",
    aboutTitle: "About Us",
    aboutParagraphs: [
      "Farming is the backbone of our communities, and healthy livestock is the key to a farmer’s livelihood. Yet, pig and poultry farmers often face challenges like sudden disease outbreaks, lack of timely health guidance, and unpredictable market conditions. Our Digital Farm Management Portal is designed to solve these problems by combining modern technology with farmer-friendly tools.",
      "The platform provides early disease detection through symptoms and history tracking, a health calendar with vaccination and medicine reminders, and real-time alerts based on outbreaks or climate changes. Farmers can also access government schemes, market demand insights, and step-by-step guidelines to manage their farms more efficiently.",
      "To make the experience engaging, we use gamification features like leaderboards and learning modules, where farmers earn rewards, discounts, and recognition. Our mission is to empower every farmer with the knowledge and tools needed to improve animal health, increase productivity, and build a sustainable and biosecure farming ecosystem.",
    ],
    contactTitle: "Contact Us",
    contactDescription: "We're here to help. Reach out to us with any questions.",
    contactPhone: "Phone",
    contactEmail: "Email",
    contactAddress: "Address",
    serviceTitle: "Our Services",
    serviceDescription: "Empowering farmers with the tools they need for success.",
    landingTitle1: "Healthy Flocks, Higher Profits.",
    landingTitle2: "Together for healthier farms and happier animals",
    landingTitle3: "We care for your farm, just like you do.",
    featuresKey: "Key Features",
    featuresTitle: "Everything You Need to Secure Your Farm",
    featuresDescription: "From AI diagnostics to market connections, FarmGuard provides a full suite of tools for success.",
    footerUsefulLinks: "Useful Links/Support",
    footerAboutPortal: "About Portal",
    footerTerms: "Terms of Use",
    footerPolicies: "Policies",
    footerAccessibility: "Accessibility Statement",
    footerGODL: "GODL",
    footerFAQ: "FAQ",
    footerCDO: "Chief Data Officers(CDOs)",
    footerLinkToUs: "Link To Us",
    footerNewsletters: "Newsletters",
    footerSitemap: "Sitemap",
    footerHelp: "Help",
    footerConnect: "Connect with us",
    footerSuggestDataset: "Suggest Dataset",
    footerSuggestions: "Suggestions",
    footerTellFriend: "Tell A Friend",
    footerFeedback: "Feedback",
    footerGrievance: "Public Grievance",
    footerPlatformInfo: "This platform is designed, developed, and hosted by the National Informatics Centre (NIC), Ministry of Electronics & Information Technology, Government of India. The content published on data.gov.in is owned by the respective Ministry/State/Department/Organization and licensed under the Government Open Data License - India",
    footerNeedHelp: "NEED HELP? ASK NICCI",
    footerCopyright: "© 2012-2015 GOVERNMENT OF INDIA. All rights reserved.",
    footerLastUpdated: "Last updated 30/09/2025 - 3:46:20",
    features: [
      {
        title: "AI Disease Prediction",
        description: "Get AI-powered analysis of possible diseases and preventive measures based on symptoms.",
      },
      {
        title: "Biosecurity Score",
        description: "Track your farm's compliance and biosecurity rating to ensure a healthy environment.",
      },
      {
        title: "Health Calendar",
        description: "Personalized health schedules with reminders for vaccinations and treatments.",
      },
      {
        title: "Market Insights",
        description: "Stay updated on local market price trends and connect with top buyers in your network.",
      },
      {
        title: "Outbreak Reporting",
        description: "Inform nearby farmers about disease outbreaks to help protect the local farming community.",
      },
      {
        title: "Community Forum",
        description: "Connect with other farmers, share knowledge, and learn from their experiences.",
      },
    ]
  },
  hi: {
    navHome: "होम",
    navAbout: "हमारे बारे में",
    navService: "सेवा",
    navContact: "संपर्क",
    login: "लॉग इन करें",
    aboutTitle: "हमारे बारे में",
    aboutParagraphs: [
        "खेती हमारे समुदायों की रीढ़ है, और स्वस्थ पशुधन किसान की आजीविका की कुंजी है। फिर भी, सुअर और मुर्गी पालक किसानों को अक्सर अचानक बीमारी फैलने, समय पर स्वास्थ्य मार्गदर्शन की कमी और अप्रत्याशित बाजार स्थितियों जैसी चुनौतियों का सामना करना पड़ता है। हमारा डिजिटल फार्म प्रबंधन पोर्टल आधुनिक तकनीक को किसान-हितैषी उपकरणों के साथ जोड़कर इन समस्याओं को हल करने के लिए डिज़ाइन किया गया है।",
        "यह प्लेटफ़ॉर्म लक्षणों और इतिहास की ट्रैकिंग के माध्यम से बीमारी का शीघ्र पता लगाने, टीकाकरण और दवा अनुस्मारक के साथ एक स्वास्थ्य कैलेंडर, और प्रकोप या जलवायु परिवर्तन के आधार पर वास्तविक समय के अलर्ट प्रदान करता है। किसान सरकारी योजनाओं, बाजार की मांग की जानकारी, और अपने खेतों को अधिक कुशलता से प्रबंधित करने के लिए चरण-दर-चरण दिशानिर्देशों तक भी पहुँच सकते हैं।",
        "अनुभव को आकर्षक बनाने के लिए, हम लीडरबोर्ड और लर्निंग मॉड्यूल जैसी गेमिफिकेशन सुविधाओं का उपयोग करते हैं, जहाँ किसान पुरस्कार, छूट और मान्यता अर्जित करते हैं। हमारा मिशन प्रत्येक किसान को पशु स्वास्थ्य में सुधार, उत्पादकता बढ़ाने और एक स्थायी और जैव-सुरक्षित कृषि पारिस्थितिकी तंत्र बनाने के लिए आवश्यक ज्ञान और उपकरणों के साथ सशक्त बनाना है।",
    ],
    contactTitle: "हमसे संपर्क करें",
    contactDescription: "हम सहायता के लिए यहां हैं। किसी भी प्रश्न के लिए हमसे संपर्क करें।",
    contactPhone: "फ़ोन",
    contactEmail: "ईमेल",
    contactAddress: "पता",
    serviceTitle: "हमारी सेवाएँ",
    serviceDescription: "किसानों को सफलता के लिए आवश्यक उपकरणों के साथ सशक्त बनाना।",
    landingTitle1: "स्वस्थ झुंड, उच्च लाभ।",
    landingTitle2: "स्वस्थ खेतों और खुशहाल जानवरों के लिए एक साथ",
    landingTitle3: "हम आपके खेत की देखभाल करते हैं, जैसे आप करते हैं।",
    featuresKey: "मुख्य विशेषताएँ",
    featuresTitle: "आपके खेत को सुरक्षित करने के लिए आपको जो कुछ भी चाहिए",
    featuresDescription: "एआई निदान से लेकर बाजार कनेक्शन तक, फार्मगार्ड सफलता के लिए उपकरणों का एक पूरा सूट प्रदान करता है।",
    footerUsefulLinks: "उपयोगी लिंक/समर्थन",
    footerAboutPortal: "पोर्टल के बारे में",
    footerTerms: "उपयोग की शर्तें",
    footerPolicies: "नीतियां",
    footerAccessibility: "अभिगम्यता कथन",
    footerGODL: "जीओडीएल",
    footerFAQ: "सामान्य प्रश्न",
    footerCDO: "मुख्य डेटा अधिकारी (CDO)",
    footerLinkToUs: "हमसे लिंक करें",
    footerNewsletters: "न्यूज़लेटर्स",
    footerSitemap: "साइटमैप",
    footerHelp: "सहायता",
    footerConnect: "हमसे जुड़ें",
    footerSuggestDataset: "डेटासेट सुझाएं",
    footerSuggestions: "सुझाव",
    footerTellFriend: "मित्र को बताएं",
    footerFeedback: "प्रतिक्रिया",
    footerGrievance: "लोक शिकायत",
    footerPlatformInfo: "यह प्लेटफॉर्म राष्ट्रीय सूचना विज्ञान केंद्र (एनआईसी), इलेक्ट्रॉनिक्स और सूचना प्रौद्योगिकी मंत्रालय, भारत सरकार द्वारा डिजाइन, विकसित और होस्ट किया गया है। data.gov.in पर प्रकाशित सामग्री संबंधित मंत्रालय/राज्य/विभाग/संगठन के स्वामित्व में है और सरकारी ओपन डेटा लाइसेंस - भारत के तहत लाइसेंस प्राप्त है",
    footerNeedHelp: "मदद चाहिए? NICCI से पूछें",
    footerCopyright: "© 2012-2015 भारत सरकार। सर्वाधिकार सुरक्षित।",
    footerLastUpdated: "अंतिम अपडेट 30/09/2025 - 3:46:20",
    features: [
      {
        title: "एआई रोग भविष्यवाणी",
        description: "लक्षणों के आधार पर संभावित बीमारियों और निवारक उपायों का एआई-संचालित विश्लेषण प्राप्त करें।",
      },
      {
        title: "जैव सुरक्षा स्कोर",
        description: "एक स्वस्थ वातावरण सुनिश्चित करने के लिए अपने खेत के अनुपालन और जैव सुरक्षा रेटिंग को ट्रैक करें।",
      },
      {
        title: "स्वास्थ्य कैलेंडर",
        description: "टीकाकरण और उपचार के लिए अनुस्मारक के साथ व्यक्तिगत स्वास्थ्य कार्यक्रम।",
      },
      {
        title: "बाजार अंतर्दृष्टि",
        description: "स्थानीय बाजार मूल्य प्रवृत्तियों पर अपडेट रहें और अपने नेटवर्क में शीर्ष खरीदारों से जुड़ें।",
      },
      {
        title: "प्रकोप रिपोर्टिंग",
        description: "स्थानीय कृषि समुदाय की रक्षा में मदद करने के लिए बीमारी के प्रकोप के बारे में आस-पास के किसानों को सूचित करें।",
      },
      {
        title: "सामुदायिक मंच",
        description: "अन्य किसानों से जुड़ें, ज्ञान साझा करें और उनके अनुभवों से सीखें।",
      },
    ]
  },
  kn: {
    navHome: "ಮುಖಪುಟ",
    navAbout: "ನಮ್ಮ ಬಗ್ಗೆ",
    navService: "ಸೇವೆ",
    navContact: "ಸಂಪರ್ಕಿಸಿ",
    login: "ಲಾಗಿನ್",
    aboutTitle: "ನಮ್ಮ ಬಗ್ಗೆ",
    aboutParagraphs: [
      "ಕೃಷಿಯು ನಮ್ಮ ಸಮುದಾಯಗಳ ಬೆನ್ನೆಲುಬಾಗಿದೆ, ಮತ್ತು ಆರೋಗ್ಯಕರ ಜಾನುವಾರು ರೈತನ ಜೀವನೋಪಾಯಕ್ಕೆ ಪ್ರಮುಖವಾಗಿದೆ. ಆದರೂ, ಹಂದಿ ಮತ್ತು ಕೋಳಿ ಸಾಕಣೆದಾರರು ಹಠಾತ್ ರೋಗ ಹರಡುವಿಕೆ, ಸಮಯೋಚಿತ ಆರೋಗ್ಯ ಮಾರ್ಗದರ್ಶನದ ಕೊರತೆ ಮತ್ತು ಅನಿರೀಕ್ಷಿತ ಮಾರುಕಟ್ಟೆ ಪರಿಸ್ಥಿತಿಗಳಂತಹ ಸವಾಲುಗಳನ್ನು ಎದುರಿಸುತ್ತಾರೆ. ನಮ್ಮ ಡಿಜಿಟಲ್ ಫಾರ್ಮ್ ಮ್ಯಾನೇಜ್‌ಮೆಂಟ್ ಪೋರ್ಟల్ ಆಧುನಿಕ ತಂತ್ರಜ್ಞಾನವನ್ನು ರೈತ-ಸ್ನೇಹಿ ಪರಿಕರಗಳೊಂದಿಗೆ ಸಂಯೋಜಿಸುವ ಮೂಲಕ ಈ ಸಮಸ್ಯೆಗಳನ್ನು ಪರಿಹರಿಸಲು ವಿನ್ಯಾಸಗೊಳಿಸಲಾಗಿದೆ.",
      "ಈ ವೇದಿಕೆಯು ರೋಗಲಕ್ಷಣಗಳು ಮತ್ತು ಇತಿಹಾಸದ ಟ್ರ್ಯಾಕಿಂಗ್ ಮೂಲಕ ಆರಂಭಿಕ ರೋಗ ಪತ್ತೆ, ಲಸಿಕೆ ಮತ್ತು ಔಷಧಿ ಜ್ಞಾಪನೆಗಳೊಂದಿಗೆ ಆರೋಗ್ಯ ಕ್ಯಾಲೆಂಡರ್, ಮತ್ತು ಹರಡುವಿಕೆಗಳು ಅಥವಾ ಹವಾಮಾನ ಬದಲಾವಣೆಗಳ ಆಧಾರದ ಮೇಲೆ ನೈಜ-ಸಮಯದ ಎಚ್ಚರಿಕೆಗಳನ್ನು ಒದಗಿಸುತ್ತದೆ. ರೈತರು ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು, ಮಾರುಕಟ್ಟೆ ಬೇಡಿಕೆಯ ಒಳನೋಟಗಳು ಮತ್ತು ತಮ್ಮ ಜಮೀನುಗಳನ್ನು ಹೆಚ್ಚು ಪರಿಣಾಮಕಾರಿಯಾಗಿ ನಿರ್ವಹಿಸಲು ಹಂತ-ಹಂತದ ಮಾರ್ಗಸೂಚಿಗಳನ್ನು ಸಹ ಪ್ರವೇಶಿಸಬಹುದು.",
      "ಅನುಭವವನ್ನು ಆಕರ್ಷಕವಾಗಿಸಲು, ನಾವು ಲೀಡರ್‌ಬೋರ್ಡ್‌ಗಳು ಮತ್ತು ಕಲಿಕಾ ಮಾಡ್ಯೂಲ್‌ಗಳಂತಹ ಗ್ಯಾಮಿಫಿಕೇಶನ್ ವೈಶಿಷ್ಟ್ಯಗಳನ್ನು ಬಳಸುತ್ತೇವೆ, ಅಲ್ಲಿ ರೈತರು ಪ್ರತಿಫಲಗಳು, ರಿಯಾಯಿತಿಗಳು ಮತ್ತು ಮನ್ನಣೆಯನ್ನು ಗಳಿಸುತ್ತಾರೆ. ನಮ್ಮ ಧ್ಯೇಯವು ಪ್ರತಿಯೊಬ್ಬ ರೈತನಿಗೆ ಪ್ರಾಣಿಗಳ ಆರೋಗ್ಯವನ್ನು ಸುಧಾರಿಸಲು, ಉತ್ಪಾದಕತೆಯನ್ನು ಹೆಚ್ಚಿಸಲು ಮತ್ತು ಸುಸ್ಥಿರ ಹಾಗೂ ಜೈವಿಕ ಸುರಕ್ಷಿತ ಕೃಷಿ ಪರಿಸರ ವ್ಯವಸ್ಥೆಯನ್ನು ನಿರ್ಮಿಸಲು ಬೇಕಾದ ಜ್ಞాన ಮತ್ತು ಪರಿಕರಗಳೊಂದಿಗೆ ಸಶಕ್ತಗೊಳಿಸುವುದಾಗಿದೆ.",
    ],
    contactTitle: "ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ",
    contactDescription: "ನಾವು ಸಹಾಯ ಮಾಡಲು ಇಲ್ಲಿದ್ದೇವೆ. ಯಾವುದೇ ಪ್ರಶ್ನೆಗಳೊಂದಿಗೆ ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ.",
    contactPhone: "ದೂರವಾಣಿ",
    contactEmail: "ఇమెయిల్",
    contactAddress: "ವಿಳಾಸ",
    serviceTitle: "ನಮ್ಮ ಸೇವೆಗಳು",
    serviceDescription: "ರೈತರಿಗೆ ಯಶಸ್ಸಿಗೆ ಬೇಕಾದ ಸಾಧನಗಳೊಂದಿಗೆ ಸಬಲೀಕರಣ.",
    landingTitle1: "ಆರೋಗ್ಯಕರ ಹಿಂಡುಗಳು, ಹೆಚ್ಚಿನ ಲಾಭಗಳು.",
    landingTitle2: "ಆರೋಗ್ಯಕರ খামারಗಳು ಮತ್ತು ಸಂತೋಷದ ಪ್ರಾಣಿಗಳಿಗಾಗಿ ಒಟ್ಟಿಗೆ",
    landingTitle3: "ನೀವು ಮಾಡುವಂತೆಯೇ ನಾವು ನಿಮ್ಮ ಜಮೀನನ್ನು ನೋಡಿಕೊಳ್ಳುತ್ತೇವೆ.",
    featuresKey: "મુખ્ય ಲಕ್ಷಣಗಳು",
    featuresTitle: "ನಿಮ್ಮ ಫಾರ್ಮ್ ಅನ್ನು ಸುರಕ್ಷಿತಗೊಳಿಸಲು ನಿಮಗೆ ಬೇಕಾದ ಎಲ್ಲವೂ",
    featuresDescription: "AI ಡಯাগ್ರಾസ്റ്റിಕ್ಸ್‌ನಿಂದ ಮಾರುಕಟ್ಟೆ ಸಂಪರ್ಕಗಳವರೆಗೆ, ಫಾರ್ಮ್‌ಗಾರ್ಡ್ ಯಶಸ್ಸಿಗೆ ಪೂರ್ಣ ಸಾಧನಗಳನ್ನು ಒದಗಿಸುತ್ತದೆ.",
    footerUsefulLinks: "ಉಪಯುಕ್ತ ಲಿಂಕ್‌ಗಳು/ಬೆಂಬಲ",
    footerAboutPortal: "портал ಬಗ್ಗೆ",
    footerTerms: "ಬಳಕೆಯ ನಿಯಮಗಳು",
    footerPolicies: "ನೀತಿಗಳು",
    footerAccessibility: "ಪ್ರവേശനೀಯತೆ ಹೇಳಿಕೆ",
    footerGODL: "ಜಿಒಡಿಎಲ್",
    footerFAQ: "ಸಾಮಾನ್ಯ ಪ್ರಶ್ನೆಗಳು",
    footerCDO: "ಮುಖ್ಯ ಡೇటా ಅಧಿಕಾರಿಗಳು (ಸಿಡಿಒ)",
    footerLinkToUs: "ನಮಗೆ ಲಿಂಕ್ ಮಾಡಿ",
    footerNewsletters: "ಸುದ್ದಿಪತ್ರಗಳು",
    footerSitemap: "ಸೈಟ್‌ಮ్యాప్",
    footerHelp: "ಸಹಾಯ",
    footerConnect: "ನಮ್ಮೊಂದಿಗೆ ಸಂಪರ್ಕ ಸಾಧಿಸಿ",
    footerSuggestDataset: "ಡೇటాಸೆಟ್ ಸೂಚಿಸಿ",
    footerSuggestions: "ಸಲಹೆಗಳು",
    footerTellFriend: "ಗೆಳೆಯನಿಗೆ ತಿಳಿಸಿ",
    footerFeedback: "ಪ್ರತಿಕ್ರಿಯೆ",
    footerGrievance: "જાહેર ફરિયાદ",
    footerPlatformInfo: "ಈ ಪ್ಲಾಟ್‌ಫಾರ್ಮ್ ಅನ್ನು ರಾಷ್ಟ್ರೀಯ ಮಾಹಿತಿ ಕೇಂದ್ರ (NIC), ಎಲೆಕ್ಟ್ರಾನಿಕ್ಸ್ ಮತ್ತು ಮಾಹಿತಿ ತಂತ್ರಜ್ಞಾನ ಸಚಿವಾಲಯ, ಭಾರತ ಸರ್ಕಾರವು ವಿನ್ಯಾಸಗೊಳಿಸಿದೆ, ಅಭಿವೃದ್ಧಿಪಡಿಸಿದೆ ಮತ್ತು ಹೋస్ట్ ಮಾಡಿದೆ. data.gov.in ನಲ್ಲಿ ಪ್ರಕಟವಾದ ವಿಷಯವು સંબંધિત ಸಚಿವಾಲಯ/ರಾಜ್ಯ/ಇಲಾಖೆ/ಸಂಸ್ಥೆಯ ಮಾಲೀಕತ್ವದಲ್ಲಿದೆ এবং ప్రభుత్వ ఓపెన్ డేటా లైసెన్స్ - ఇండియా క్రింద లైసెన్స్ పొందింది",
    footerNeedHelp: "ಸಹಾಯ ಬೇಕೇ? NICCI ಕೇಳಿ",
    footerCopyright: "© 2012-2015 ಭಾರತ ಸರ್ಕಾರ. ಎಲ್ಲಾ ಹಕ್ಕುಗಳನ್ನು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ.",
    footerLastUpdated: "ಕೊನೆಯದಾಗಿ ನವೀಕರಿಸಿದ್ದು 30/09/2025 - 3:46:20",
    features: [
      {
        title: "ಎಐ ರೋಗ পূর্বাভাস",
        description: "ರೋಗಲಕ್ಷಣಗಳ ಆಧಾರದ ಮೇಲೆ ಸಂભವನೀಯ ರೋಗಗಳು ಮತ್ತು ತಡೆಗಟ್ಟುವ ಕ್ರಮಗಳ AI-ಚಾಲಿತ ವಿಶ್ಲೇಷಣೆಯನ್ನು ಪಡೆಯಿರಿ.",
      },
      {
        title: "ಜૈವಿಕ સુરક્ષા ಅಂಕ",
        description: "ಆರോഗ്യಕರ ವಾತಾವರಣವನ್ನು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಲು ನಿಮ್ಮ খামারের ಅನುಸರಣೆ ಮತ್ತು ಜૈವಿಕ સુરક્ષા రేటింగ్‌ను ట్రాక్ చేయండి.",
      },
      {
        title: "ಆರೋಗ್ಯ ಕ್ಯಾಲೆಂಡರ್",
        description: "ክትባት మరియు ಚಿಕಿತ್ಸೆಗಳಿಗಾಗಿ ಜ್ಞಾಪನೆಗಳೊಂದಿಗೆ ವೈಯಕ್ತಿಕಗೊಳಿಸಿದ ಆರೋಗ್ಯ ವೇಳಾಪಟ್ಟಿಗಳು.",
      },
      {
        title: "ಮಾರುಕಟ್ಟೆ ಒಳನೋಟಗಳು",
        description: "ಸ್ಥಳೀಯ ಮಾರುಕಟ್ಟೆ ಬೆಲೆ ಪ್ರವೃತ್ತಿಗಳ ಬಗ್ಗೆ ನವೀಕிருತರಾಗಿರಿ మరియు ನಿಮ್ಮ ನೆట్‌ವರ್ಕ್‌ನಲ್ಲಿನ κορυφα ખરીદદારોతో ಸಂಪರ್ಕ ಸಾಧಿಸಿ.",
      },
      {
        title: "ಸೋಂಕು ವರದಿ ಮಾಡುವಿಕೆ",
        description: "ಸ್ಥಳೀಯ ಕೃಷಿ ಸಮುದಾಯವನ್ನು రక్షించడంలో సహాయపడటానికి వ్యాధి వ్యాప్తి గురించి సమీపంలోని రైతులకు తెలియజేయండి.",
      },
      {
        title: "ಸಮುದಾಯ ವೇದಿಕೆ",
        description: "다른 ರೈತರೊಂದಿಗೆ ಸಂಪರ್ಕ ಸಾಧಿಸಿ, ಜ್ಞಾನವನ್ನು ಹಂಚಿಕೊಳ್ಳಿ మరియు వారి అనుభవಗಳಿಂದ నేర్చుకోండి.",
      },
    ]
  }
};
