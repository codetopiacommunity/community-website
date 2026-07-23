import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/images/logos/codetopia-community.png";
import { SidebarHeader } from "@/components/ui/sidebar";

export function AppSidebarHeader() {
  return (
    <SidebarHeader className="px-5 pt-8 pb-6 bg-black">
      <Link href="/admin" className="flex items-center overflow-hidden">
        <div className="relative w-44 h-12 shrink-0 group-data-[collapsible=icon]:w-8 group-data-[collapsible=icon]:h-8 transition-all duration-500">
          <Image
            src={logo}
            alt="Codetopia Community"
            fill
            sizes="(max-width: 768px) 32px, 176px"
            className="object-contain object-left brightness-0 invert transition-all duration-500"
          />
        </div>
      </Link>
    </SidebarHeader>
  );
}
