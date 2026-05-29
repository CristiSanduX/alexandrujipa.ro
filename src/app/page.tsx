import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";
import TraditionalDivider from "@/components/ui/TraditionalDivider";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <TraditionalDivider />
      <About />

      <TraditionalDivider />
      <Testimonials />
      <TraditionalDivider />
      <Contact />
      <Footer />
    </main>
  );
}
