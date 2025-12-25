import { inter } from "@/fonts/fonts";
import Image from "next/image";
import Background from "../../../public/images/codetopia-bg.jpg";
import Logo from "../../../public/images/codetopia-logo.png";
import {FaDiscord, FaLinkedinIn, FaTiktok, FaYoutube} from "react-icons/fa";
import {FaBluesky, FaThreads, FaXTwitter} from "react-icons/fa6";
import {Mail, MapPin, Phone} from "lucide-react";



export default function Footer() {
    return (
        <footer className={`relative w-full min-h-[400px] md:min-h-[344px] text-gray-300 ${inter.className}`}>

            <Image
                src={Background}
                alt="Codetopia background"
                fill
                className="object-cover"
                priority
            />


            <div className="relative z-10 container mx-auto px-6 py-12 md:py-16 lg:px-[5rem]">
                <div className="grid grid-cols-1 md:grid-cols-6 gap-10 md:gap-16">

                    <div className="flex flex-col items-start md:col-span-2">
                        <div className="flex items-center gap-3 mb-4">
                            <Image src={Logo} alt="logo" className="w-[150px] h-[72px]" />
                        </div>

                        <p className="text-sm mb-6 text-gray-400">
                            A utopia for tech enthusiasts
                        </p>

                        <div className="flex gap-6">
                            <a href="https://discord.gg/3nBFMfdNmB" ><FaDiscord className="w-6 h-6 hover:text-white transition cursor-pointer" /></a>
                            <a href="https://www.youtube.com/channel/UCJqs2xW7x-cs1V0bRG7ucXg" ><FaYoutube className="w-6 h-6 hover:text-white transition cursor-pointer" /></a>
                            <a href="https://gh.linkedin.com/company/codetopia-community" ><FaLinkedinIn className="w-6 h-6 hover:text-white transition cursor-pointer" /></a>
                            <a href="https://twitter.com/codetopiacom" ><FaXTwitter className="w-6 h-6 hover:text-white transition cursor-pointer" /></a>
                            <a href="#" ><FaBluesky className="w-6 h-6 hover:text-white transition cursor-pointer" /></a>
                            <a href="#" ><FaThreads className="w-6 h-6 hover:text-white transition cursor-pointer" /></a>
                            <a href="https://www.tiktok.com/@codetopiacommunity" ><FaTiktok className="w-6 h-6 hover:text-white transition cursor-pointer" /></a>
                        </div>
                    </div>


                    <div className="md:col-span-4 gap-y-10 flex flex-col md:flex-row md:justify-between">


                        <div>
                            <h3 className="text-lg font-semibold text-white mb-4">Community</h3>
                            <ul className="space-y-3 text-sm">
                                <li><a href="#" className="hover:text-white transition">Code of Conduct</a></li>
                                <li><a href="#" className="hover:text-white transition">Become a Sponsor</a></li>
                                <li><a href="#" className="hover:text-white transition">Become a Volunteer</a></li>
                                <li><a href="https://discord.gg/3nBFMfdNmB" className="hover:text-white transition">Join Our Discord Server</a></li>
                                <li><a href="https://chat.whatsapp.com/LiiirOwOnPz0XQ3vupioi9" className="hover:text-white transition">Join Our WhatsApp Community</a></li>
                            </ul>
                        </div>


                        <div>
                            <h3 className="text-lg font-semibold text-white mb-4">Contact</h3>
                            <ul className="space-y-3 text-sm">
                                <li className="flex items-center gap-3">
                                    <Mail className="w-4 h-4" />
                                    <a href="mailto:hello@codetopia.com" className="hover:text-white transition">
                                        hello@codetopia.com
                                    </a>
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
                                <li><a href="#" className="hover:text-white transition">About Us</a></li>
                                <li><a href="#" className="hover:text-white transition">Events</a></li>
                                <li><a href="#" className="hover:text-white transition">Articles</a></li>
                                <li><a href="#" className="hover:text-white transition">Gallery</a></li>
                            </ul>
                        </div>

                    </div>
                </div>


                <div className="mt-12 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
                    <p>© 2025 Codetopia Community. All rights reserved</p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <a href="#" className="hover:text-white transition">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition">Terms of Service</a>
                        <a href="#" className="hover:text-white transition">Cookies Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}