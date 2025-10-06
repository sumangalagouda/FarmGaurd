
'use client';

import Link from "next/link";
import { Facebook, Twitter, Instagram, MessageCircle } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-yellow-200 text-black py-6">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-6">
                    {/* About Us */}
                    <div className="md:col-span-2">
                        <h3 className="font-bold text-base mb-2">About Us</h3>
                        <p className="text-xs text-gray-800">
                            SmartFarmGuard is a digital platform built to help pig and poultry farmers adopt biosecurity measures, detect diseases early, and improve profitability with AI-powered insights, training modules, and market opportunities.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-bold text-base mb-2">Quick Links</h3>
                        <ul className="space-y-1 text-xs text-gray-800">
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
                        <h3 className="font-bold text-base mb-2">Farmer Support</h3>
                        <ul className="space-y-2 text-xs text-gray-800">
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

                {/* Disclaimer & Copyright */}
                <div className="border-t border-gray-400 pt-4 text-center text-xs text-gray-700 space-y-2">
                    <div>
                        <h4 className="font-bold">Disclaimer</h4>
                        <p className="text-xs">This platform provides AI-driven guidance and general awareness. It does not replace veterinary consultation. Always consult certified vets for final diagnosis and treatment.</p>
                    </div>
                    <p>© 2025 SmartFarmGuard. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
}
