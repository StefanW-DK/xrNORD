import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import Clients from "@/components/sections/Clients";
import Opportunity from "@/components/sections/Opportunity";
import Industries from "@/components/sections/Industries";
import WhyAI from "@/components/sections/WhyAI";
import Capabilities from "@/components/sections/Capabilities";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Clients />
      <Opportunity />
      <Industries />
      <WhyAI />
      <Capabilities />
    </main>
  );
}
