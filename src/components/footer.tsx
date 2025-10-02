
'use client';

import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { ArrowUp } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";

export function Footer() {
    const { t } = useTranslation();
    return (
        <footer className="bg-yellow-400 text-black py-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="font-bold mb-2">{t.footerUsefulLinks}</h3>
                        <ul className="space-y-1 text-sm">
                            <li><Link href="#" className="hover:underline">{t.footerAboutPortal}</Link></li>
                            <li><Link href="#" className="hover:underline">{t.footerTerms}</Link></li>
                            <li><Link href="#" className="hover:underline">{t.footerPolicies}</Link></li>
                            <li><Link href="#" className="hover:underline">{t.footerAccessibility}</Link></li>
                            <li><Link href="#" className="hover:underline">{t.footerGODL}</Link></li>
                            <li><Link href="#" className="hover:underline">{t.footerFAQ}</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold mb-2 invisible md:visible">.</h3>
                        <ul className="space-y-1 text-sm">
                            <li><Link href="#" className="hover:underline">{t.footerCDO}</Link></li>
                            <li><Link href="#" className="hover:underline">{t.footerLinkToUs}</Link></li>
                            <li><Link href="#" className="hover:underline">{t.footerNewsletters}</Link></li>
                            <li><Link href="#" className="hover:underline">{t.footerSitemap}</Link></li>
                            <li><Link href="#" className="hover:underline">{t.footerHelp}</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold mb-2 invisible md:visible">.</h3>
                        <ul className="space-y-1 text-sm">
                            <li><Link href="#" className="hover:underline">{t.footerConnect}</Link></li>
                            <li><Link href="#" className="hover:underline">{t.footerSuggestDataset}</Link></li>
                            <li><Link href="#" className="hover:underline">{t.footerSuggestions}</Link></li>
                            <li><Link href="#" className="hover:underline">{t.footerTellFriend}</Link></li>
                            <li><Link href="#" className="hover:underline">{t.footerFeedback}</Link></li>
                            <li><Link href="#" className="hover:underline">{t.footerGrievance}</Link></li>
                        </ul>
                    </div>
                    <div className="text-sm">
                        <p>{t.footerPlatformInfo}</p>
                        
                        <Button className="bg-blue-600 text-white hover:bg-blue-700 mt-4">{t.footerNeedHelp}</Button>
                    </div>
                </div>

                <div className="border-t border-gray-600/50 mt-8 pt-4 flex justify-between items-center text-xs">
                    <p>{t.footerCopyright}</p>
                    <p>{t.footerLastUpdated}</p>
                </div>
                 <div className="fixed bottom-4 right-4 flex flex-col items-center space-y-2">
                    <Image src="https://picsum.photos/seed/asknicci/50/50" alt="Ask Nicci" width={50} height={50} className="rounded-full border-2 border-white" />
                    <Button size="icon" className="rounded-full bg-white text-black hover:bg-gray-200" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                        <ArrowUp />
                    </Button>
                </div>
            </div>
        </footer>
    );
}
