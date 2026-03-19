import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import Clients from "@/components/sections/Clients";
import Opportunity from "@/components/sections/Opportunity";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Clients />
      <Opportunity />
    </main>
  );
}
