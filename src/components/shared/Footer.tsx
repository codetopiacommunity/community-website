import { inter } from "@/fonts/fonts";
import Image from "next/image";
import { FaDiscord, FaLinkedinIn, FaTiktok, FaYoutube } from "react-icons/fa";
import { FaBluesky, FaThreads, FaXTwitter } from "react-icons/fa6";
import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

export default function Footer() {


    const communityLinks = [
        {
            label: "Code of Conduct",
            href: "#",
        },
        {
            label: "Become a Sponsor",
            href: "#",
        },
        {
            label: "Become a Volunteer",
            href: "#",
        },
        {
            label: "Join Our Discord Server",
            href: "https://discord.gg/3nBFMfdNmB",
        },
        {
            label: "Join Our WhatsApp Community",
            href: "https://chat.whatsapp.com/LiiirOwOnPz0XQ3vupioi9",
        },
    ];


    const socialLinks = [
        {
            href: "https://discord.gg/3nBFMfdNmB",
            Icon: FaDiscord,
        },
        {
            href: "https://www.youtube.com/channel/UCJqs2xW7x-cs1V0bRG7ucXg",
            Icon: FaYoutube,
        },
        {
            href: "https://gh.linkedin.com/company/codetopia-community",
            Icon: FaLinkedinIn,
        },
        {
            href: "https://twitter.com/codetopiacom",
            Icon: FaXTwitter,
        },
        {
            href: "#",
            Icon: FaBluesky,
        },
        {
            href: "#",
            Icon: FaThreads,
        },
        {
            href: "https://www.tiktok.com/@codetopiacommunity",
            Icon: FaTiktok,
        },
    ];

    const aboutLinks = [
        { label: "About Us", href: "#" },
        { label: "Events", href: "#" },
        { label: "Articles", href: "#" },
        { label: "Gallery", href: "#" },
    ];

    const legalLinks = [
        { label: "Privacy Policy", href: "#" },
        { label: "Terms of Service", href: "#" },
        { label: "Cookies Policy", href: "#" },
    ];



    return (
        <footer className={`relative w-full min-h-[400px] md:min-h-[344px] text-ct-secondary ${inter.className}`}>


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

                        <p className="text-sm mb-6 text-ct-secondary">
                            A utopia for tech enthusiasts
                        </p>

                        <div className="flex flex-wrap gap-6">
                            {socialLinks.map(({ href, Icon }, index) => (
                                <Link key={index} href={href}>
                                    <Icon className="w-6 h-6 hover:text-ct-primary transition" />
                                </Link>
                            ))}
                        </div>

                    </div>


                    <div>
                        <h3 className="text-lg font-semibold text-ct-primary mb-4">
                            Community
                        </h3>

                        <ul className="space-y-3 text-sm">
                            {communityLinks.map((link, index) => (
                                <li key={index}>
                                    <Link
                                        href={link.href}
                                        className={"hover:text-ct-primary transition"}
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>



                    <div>
                        <h3 className="text-lg font-semibold text-ct-primary mb-4">Contact</h3>
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
                            {aboutLinks.map((link, index) => (
                                <li key={index}>
                                    <Link
                                        href={link.href}
                                        className="hover:text-ct-primary transition"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                    </div>

                </div>


                <div className="mt-12 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center text-sm text-ct-secondary">
                    <p>&copy; 2020 - {new Date().getFullYear()} Codetopia Community</p>

                    <div className="flex gap-6 mt-4 md:mt-0">
                        {legalLinks.map((link, index) => (
                            <Link
                                key={index}
                                href={link.href}
                                className="hover:text-ct-primary transition"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                </div>

            </div>
        </footer>
    );
}
