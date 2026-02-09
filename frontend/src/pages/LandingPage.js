import { useState, useEffect } from "react";
import { api } from "../lib/api";
import { Header } from "../components/landing/Header";
import { HeroSection } from "../components/landing/HeroSection";
import { AboutSection } from "../components/landing/AboutSection";
import { ServicesSection } from "../components/landing/ServicesSection";
import { TestimonialsSection } from "../components/landing/TestimonialsSection";
import { ContactSection } from "../components/landing/ContactSection";
import { Footer } from "../components/landing/Footer";
import { Toaster } from "sonner";
import { Loader2 } from "lucide-react";

export default function LandingPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await api.getContent();
        setData(result);
      } catch (err) {
        console.error("Error fetching content:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#C9A96E] animate-spin" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-[#1a1a1a]/50">Error cargando contenido</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Toaster position="top-center" richColors />
      <Header siteData={data.site} />
      <HeroSection siteData={data.site} />
      <AboutSection siteData={data.site} />
      <ServicesSection services={data.services} siteData={data.site} />
      <TestimonialsSection testimonials={data.testimonials} />
      <ContactSection siteData={data.site} />
      <Footer siteData={data.site} />
    </div>
  );
}
