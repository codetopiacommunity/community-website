import Hero from "@/components/sections/Hero";
import Offer from "@/components/sections/Offer";
import Header from "@/components/shared/Header";
import GrowingCommunity from "@/components/sections/GrowingCommunity";
import Footer from "@/components/shared/Footer";

export default function Home() {
  return (
    <div className="">
      <Header />
      <Hero />
      <Offer />
      <GrowingCommunity />
      <Footer/>
    </div>
  );
}
