import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/images/logos/codetopia-community.png";
import { SidebarHeader } from "@/components/ui/sidebar";

export function AppSidebarHeader() {
  return (
    <SidebarHeader className="h-20 flex items-center justify-center border-b border-grey-800 bg-black">
      <Link
        href="/admin"
        className="flex items-center gap-2 group-data-[collapsible=icon]:justify-center"
      >
        <Image
          src={logo}
          alt="Codetopia"
          width={120}
          height={40}
          className="object-contain group-data-[collapsible=icon]:hidden"
        />
        <div className="h-8 w-8 bg-white rounded-lg hidden group-data-[collapsible=icon]:flex items-center justify-center overflow-hidden p-1">
          <Image
            src={logo}
            alt="Logo"
            width={24}
            height={24}
            className="object-contain"
          />
        </div>
      </Link>
    </SidebarHeader>
  );
}
