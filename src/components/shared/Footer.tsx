import { inter } from "@/fonts/fonts";
import Image from "next/image";
import { FaDiscord, FaLinkedinIn, FaTiktok, FaYoutube } from "react-icons/fa";
import { FaBluesky, FaThreads, FaXTwitter } from "react-icons/fa6";
import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className={`relative w-full min-h-[400px] md:min-h-[344px] text-gray-300 ${inter.className}`}>


            <Image
                src="/images/codetopia-bg.jpg"
                alt="Codetopia background"
                fill
                className="object-cover"
                priority
            />




            <div className="relative z-10   max-lg:px-4 py-12 md:py-16 lg:max-w-8/10 mx-auto w-full">


                <div className="grid grid-cols-1 md:grid-cols-3  gap-10 md:gap-16 xl:flex flex-wrap xl:justify-between">


                    <div className="flex flex-col items-start ">
                        <div className="flex items-center gap-3 mb-4">
                            <Image
                                width={150}
                                height={72}
                                src="/images/codetopia-logo.png"
                                alt="Codetopia logo"
                            />
                        </div>

                        <p className="text-sm mb-6 text-gray-400">
                            A utopia for tech enthusiasts
                        </p>

                        <div className="flex flex-wrap gap-6">
                            <Link href="https://discord.gg/3nBFMfdNmB"><FaDiscord className="w-6 h-6 hover:text-white transition" /></Link>
                            <Link href="https://www.youtube.com/channel/UCJqs2xW7x-cs1V0bRG7ucXg"><FaYoutube className="w-6 h-6 hover:text-white transition" /></Link>
                            <Link href="https://gh.linkedin.com/company/codetopia-community"><FaLinkedinIn className="w-6 h-6 hover:text-white transition" /></Link>
                            <Link href="https://twitter.com/codetopiacom"><FaXTwitter className="w-6 h-6 hover:text-white transition" /></Link>
                            <Link href="#"><FaBluesky className="w-6 h-6 hover:text-white transition" /></Link>
                            <Link href="#"><FaThreads className="w-6 h-6 hover:text-white transition" /></Link>
                            <Link href="https://www.tiktok.com/@codetopiacommunity"><FaTiktok className="w-6 h-6 hover:text-white transition" /></Link>
                        </div>
                    </div>


                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4">Community</h3>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="#" className="hover:text-white transition">Code of Conduct</Link></li>
                            <li><Link href="#" className="hover:text-white transition">Become a Sponsor</Link></li>
                            <li><Link href="#" className="hover:text-white transition">Become a Volunteer</Link></li>
                            <li><Link href="https://discord.gg/3nBFMfdNmB" className="hover:text-white transition">Join Our Discord Server</Link></li>
                            <li><Link href="https://chat.whatsapp.com/LiiirOwOnPz0XQ3vupioi9" className="hover:text-white transition">Join Our WhatsApp Community</Link></li>
                        </ul>
                    </div>


                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4">Contact</h3>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-center gap-3">
                                <Mail className="w-4 h-4" />
                                <Link href="mailto:hello@codetopia.com" className="hover:text-white transition">
                                    hello@codetopia.com
                                </Link>
                            </li>
                            <li className="flex items-center gap-3">
                                <MapPin className="w-4 h-4" />
                                <span>123 Tech Street, Innovation District</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="w-4 h-4" />
                                <span>(233) 55 555 5555</span>
                            </li>
                        </ul>
                    </div>


                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="#" className="hover:text-white transition">About Us</Link></li>
                            <li><Link href="#" className="hover:text-white transition">Events</Link></li>
                            <li><Link href="#" className="hover:text-white transition">Articles</Link></li>
                            <li><Link href="#" className="hover:text-white transition">Gallery</Link></li>
                        </ul>
                    </div>

                </div>


                <div className="mt-12 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
                    <p>&copy; 2020 - {new Date().getFullYear()} Codetopia Community</p>

                    <div className="flex gap-6 mt-4 md:mt-0">
                        <Link href="#" className="hover:text-white transition">Privacy Policy</Link>
                        <Link href="#" className="hover:text-white transition">Terms of Service</Link>
                        <Link href="#" className="hover:text-white transition">Cookies Policy</Link>
                    </div>
                </div>

            </div>
        </footer>
    );
}
