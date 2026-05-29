import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />

      {/* Secțiuni urmează */}
      <section id="despre" className="min-h-screen bg-[var(--brand-cream)]" />
      <section id="spectacole" className="min-h-screen bg-white" />
      <section id="contact" className="min-h-screen bg-[var(--brand-dark)]" />
    </main>
  );
}
