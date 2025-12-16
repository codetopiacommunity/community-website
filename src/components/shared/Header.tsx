import Image from "next/image";
import NavBar from "./Navbar";

export default function Header() {
  return (
    <div className="bg-black py-2">
      <header className="flex items-center justify-between lg:max-w-9/10 mx-auto text-white px-4">
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
