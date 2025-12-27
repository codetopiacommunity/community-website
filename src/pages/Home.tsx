import Hero from "@/components/sections/Hero";
import Offer from "@/components/sections/Offer";
import GrowingCommunity from "@/components/sections/GrowingCommunity";
import NewsLetter from "@/components/sections/NewsLetter";
import JoinCommunity from "@/components/sections/JoinCommunity";

export default function Home() {
  return (
    <div className="">
      <Hero />
      <Offer />
      <GrowingCommunity />
      <NewsLetter/>
      <JoinCommunity/>
    </div>
  );
}
