
'use client';

import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { ArrowUp } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-yellow-400 text-black py-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="font-bold mb-2">Useful Links/Support</h3>
                        <ul className="space-y-1 text-sm">
                            <li><Link href="#" className="hover:underline">About Portal</Link></li>
                            <li><Link href="#" className="hover:underline">Terms of Use</Link></li>
                            <li><Link href="#" className="hover:underline">Policies</Link></li>
                            <li><Link href="#" className="hover:underline">Accessibility Statement</Link></li>
                            <li><Link href="#" className="hover:underline">GODL</Link></li>
                            <li><Link href="#" className="hover:underline">FAQ</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold mb-2 invisible md:visible">.</h3>
                        <ul className="space-y-1 text-sm">
                            <li><Link href="#" className="hover:underline">Chief Data Officers(CDOs)</Link></li>
                            <li><Link href="#" className="hover:underline">Link To Us</Link></li>
                            <li><Link href="#" className="hover:underline">Newsletters</Link></li>
                            <li><Link href="#" className="hover:underline">Sitemap</Link></li>
                            <li><Link href="#" className="hover:underline">Help</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold mb-2 invisible md:visible">.</h3>
                        <ul className="space-y-1 text-sm">
                            <li><Link href="#" className="hover:underline">Connect with us</Link></li>
                            <li><Link href="#" className="hover:underline">Suggest Dataset</Link></li>
                            <li><Link href="#" className="hover:underline">Suggestions</Link></li>
                            <li><Link href="#" className="hover:underline">Tell A Friend</Link></li>
                            <li><Link href="#" className="hover:underline">Feedback</Link></li>
                            <li><Link href="#" className="hover:underline">Public Grievance</Link></li>
                        </ul>
                    </div>
                    <div className="text-sm">
                        <p>This platform is designed, developed, and hosted by the National Informatics Centre (NIC), Ministry of Electronics & Information Technology, Government of India. The content published on data.gov.in is owned by the respective Ministry/State/Department/Organization and licensed under the Government Open Data License - India</p>
                        
                        <Button className="bg-blue-600 text-white hover:bg-blue-700 mt-4">NEED HELP? ASK NICCI</Button>
                    </div>
                </div>

                <div className="border-t border-gray-600/50 mt-8 pt-4 flex justify-between items-center text-xs">
                    <p>&copy; 2012-2015 GOVERNMENT OF INDIA. All rights reserved.</p>
                    <p>Last updated 30/09/2025 - 3:46:20</p>
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
