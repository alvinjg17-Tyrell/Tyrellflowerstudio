import { useState, useEffect } from "react";
import { api } from "../lib/api";
import { Header } from "../components/landing/Header";
import { HeroSection } from "../components/landing/HeroSection";
import { AboutSection } from "../components/landing/AboutSection";
import { ServicesSection } from "../components/landing/ServicesSection";
import { CatalogLinksSection } from "../components/landing/CatalogLinksSection";
import { ContactSection } from "../components/landing/ContactSection";
import { Footer } from "../components/landing/Footer";
import { WhatsAppButton } from "../components/landing/WhatsAppButton";
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
      <div className="min-h-screen bg-tyrell-ivory flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-tyrell-gold animate-spin" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-tyrell-ivory flex items-center justify-center">
        <p className="text-tyrell-olive/50">Error cargando contenido</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-tyrell-ivory">
      <Toaster position="top-center" richColors />
      <Header siteData={data.site} />
      <HeroSection siteData={data.site} />
      <AboutSection siteData={data.site} />
      <ServicesSection services={data.services} siteData={data.site} />
      {data.catalogLinks && data.catalogLinks.length > 0 && (
        <CatalogLinksSection catalogLinks={data.catalogLinks} />
      )}
      <ContactSection siteData={data.site} />
      <Footer siteData={data.site} />
      <WhatsAppButton whatsappLink={data.site?.brand?.whatsappLink} />
    </div>
  );
}
