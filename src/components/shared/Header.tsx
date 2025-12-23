import Image from "next/image";
import NavBar from "./Navbar";

export default function Header() {
  return (
    <div className="bg-black py-2 sticky top-0 z-50">
      <header className="flex items-center justify-between lg:max-w-8/10 mx-auto text-white px-4">
        <div>
          <Image
            src="/codetopia.png"
            alt="Codetopia logo"
            width={70}
            height={70}
          />
        </div>
        <NavBar />
      </header>
    </div>
  );
}
