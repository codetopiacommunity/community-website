"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import logo from '@/assets/images/logos/Codetopia-Logo-TW.png';
import { Container } from './Container';

import { Menu, X } from 'lucide-react';

const navLinks = [
    { name: 'ABOUT', href: '/about' },
    { name: 'EVENT & ACTIVITIES', href: '/events' },
    { name: 'ARTICLES', href: '/articles' },
    { name: 'GALLERY', href: '/gallery' },
];

export function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full bg-grey-900 text-grey-50 relative font-sans">
            <Container className="flex h-20 items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex shrink-0 items-center">
                    <Image
                        src={logo}
                        alt="Codetopia"
                        width={80}
                        height={48}
                        priority
                        className="object-contain"
                    />
                </Link>

                {/* Right side: Navigation */}
                <div className="flex items-center gap-10">
                    {/* Desktop Navigation Links */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-xs font-bold tracking-wider text-grey-300 hover:text-grey-50 transition-colors"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>

                    {/* Mobile menu toggle */}
                    <button
                        className="md:hidden p-2 text-grey-300 hover:text-grey-50 outline-none"
                        aria-label="Menu"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>
            </Container>

            {/* Full-width Mobile Dropdown Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-grey-900 border-b border-grey-800 animate-in slide-in-from-top-2">
                    <nav className="flex flex-col px-6 py-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="w-full text-sm font-bold tracking-wider text-grey-300 hover:text-grey-50 py-3 border-b border-grey-800/50 last:border-none transition-colors"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>
                </div>
            )}
        </header>
    );
}
