import { Header } from "../components/landing/Header";
import { HeroSection } from "../components/landing/HeroSection";
import { AboutSection } from "../components/landing/AboutSection";
import { ServicesSection } from "../components/landing/ServicesSection";
import { TestimonialsSection } from "../components/landing/TestimonialsSection";
import { ContactSection } from "../components/landing/ContactSection";
import { Footer } from "../components/landing/Footer";
import { Toaster } from "sonner";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Toaster position="top-center" richColors />
      <Header />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
