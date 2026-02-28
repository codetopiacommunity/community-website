import Link from "next/link";
import { AlertCircle } from "lucide-react";

export function ContributionBanner() {
    return (
        <div className="w-full bg-zinc-900 border-b border-zinc-800 text-zinc-300 py-3 px-4 text-sm md:text-base">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 text-center">
                <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 md:w-5 md:h-5 text-amber-500" />
                    <span className="font-medium text-amber-500">Site Under Construction</span>
                </div>
                <span className="hidden md:inline text-zinc-600">|</span>
                <p>
                    Some features may not work as expected.{" "}
                    <Link
                        href="https://github.com/codetopiacommunity/community-website"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white underline underline-offset-4 hover:text-amber-500 transition-colors font-medium border-b border-white hover:border-amber-500 pb-0.5"
                    >
                        We are looking for contributors!
                    </Link>
                </p>
            </div>
        </div>
    );
}
