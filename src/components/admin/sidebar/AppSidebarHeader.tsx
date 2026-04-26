import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/images/logos/codetopia-community.png";
import { SidebarHeader } from "@/components/ui/sidebar";

export function AppSidebarHeader() {
  return (
    <SidebarHeader className="px-5 pt-6 pb-4 bg-black">
      <Link href="/admin" className="flex items-center overflow-hidden">
        <div className="relative w-32 h-7 shrink-0 group-data-[collapsible=icon]:w-7 transition-all duration-300">
          <Image
            src={logo}
            alt="Codetopia"
            fill
            className="object-contain object-left invert brightness-0 group-data-[collapsible=icon]:hidden"
          />
          <Image
            src={logo}
            alt="Codetopia"
            fill
            className="object-contain hidden group-data-[collapsible=icon]:block invert brightness-0"
          />
        </div>
      </Link>
    </SidebarHeader>
  );
}
