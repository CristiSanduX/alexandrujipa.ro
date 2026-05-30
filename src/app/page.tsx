import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";
import TraditionalDivider from "@/components/ui/TraditionalDivider";
import Loader from "@/components/ui/Loader";
import Gallery from "@/components/sections/Gallery";
import FAQ from "@/components/sections/FAQ";

export default function Home() {
  return (
    <main>
      <Loader />
      <Navbar />
      <Hero />
      <TraditionalDivider />
      <About />
      <TraditionalDivider />
      <Gallery />
      <TraditionalDivider />
      <Testimonials />
      <TraditionalDivider />
      <FAQ />
      <TraditionalDivider />
      <Contact />
      <Footer />
    </main>
  );
}
