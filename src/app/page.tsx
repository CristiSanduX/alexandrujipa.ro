import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import TraditionalDivider from "@/components/ui/TraditionalDivider";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <TraditionalDivider />
      <About />

      {/* Secțiuni urmează */}
      <TraditionalDivider />
      <section id="spectacole" data-navbar-theme="light" className="min-h-screen bg-white" />
      <TraditionalDivider theme="dark" />
      <section id="contact" data-navbar-theme="dark" className="min-h-screen bg-[var(--brand-dark)]" />
    </main>
  );
}
