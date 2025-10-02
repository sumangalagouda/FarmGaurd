
'use client';

import Link from "next/link";
import { Facebook, Twitter, Instagram, MessageCircle } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-secondary text-secondary-foreground py-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    {/* About Us */}
                    <div className="md:col-span-2">
                        <h3 className="font-bold text-lg mb-2">About Us</h3>
                        <p className="text-sm text-muted-foreground">
                            SmartFarmGuard is a digital platform built to help pig and poultry farmers adopt biosecurity measures, detect diseases early, and improve profitability with AI-powered insights, training modules, and market opportunities.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-bold text-lg mb-2">Quick Links</h3>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                            <li><Link href="/" className="hover:underline">Home</Link></li>
                            <li><Link href="/about" className="hover:underline">About</Link></li>
                            <li><Link href="/service" className="hover:underline">Services</Link></li>
                            <li><Link href="/market/market-insights" className="hover:underline">Market Insights</Link></li>
                            <li><Link href="/guidelines" className="hover:underline">Guidelines & Schemes</Link></li>
                            <li><Link href="/contact" className="hover:underline">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Farmer Support */}
                    <div>
                        <h3 className="font-bold text-lg mb-2">Farmer Support</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>📞 Helpline: <a href="tel:+91-XXXX-XXXXXX" className="hover:underline">+91-XXXX-XXXXXX</a></li>
                            <li>📧 Email: <a href="mailto:support@smartfarmguard.in" className="hover:underline">support@smartfarmguard.in</a></li>
                            <li className="flex gap-2 items-center flex-wrap">
                               <Link href="/help" className="hover:underline">📝 FAQs</Link> |
                               <Link href="#" className="hover:underline">Tutorials</Link> |
                               <Link href="#" className="hover:underline">Feedback</Link>
                            </li>
                        </ul>
                    </div>
                </div>
                
                 {/* Stay Connected */}
                <div className="text-center mb-6">
                    <h3 className="font-bold text-lg mb-2">Stay Connected</h3>
                     <p className="text-sm text-muted-foreground mb-4">Follow us for the latest updates, schemes, and tips:</p>
                    <div className="flex justify-center gap-4">
                        <Link href="#" aria-label="Facebook"><Facebook/></Link>
                        <Link href="#" aria-label="Twitter"><Twitter/></Link>
                        <Link href="#" aria-label="Instagram"><Instagram/></Link>
                        <Link href="#" aria-label="WhatsApp"><MessageCircle/></Link>
                    </div>
                </div>

                {/* Disclaimer & Copyright */}
                <div className="border-t border-muted pt-6 text-center text-xs text-muted-foreground space-y-2">
                    <div>
                        <h4 className="font-bold">Disclaimer</h4>
                        <p>This platform provides AI-driven guidance and general awareness. It does not replace veterinary consultation. Always consult certified vets for final diagnosis and treatment.</p>
                    </div>
                    <p>© 2025 SmartFarmGuard. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
}
