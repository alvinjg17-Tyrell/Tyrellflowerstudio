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
import { DynamicSection } from "../components/landing/DynamicSection";
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
        
        // Apply color palette to CSS variables if available
        if (result.site?.colorPalette) {
          const palette = result.site.colorPalette;
          document.documentElement.style.setProperty('--color-primary', palette.primary || '#daa609');
          document.documentElement.style.setProperty('--color-primary-hover', palette.primaryHover || '#b8890a');
          document.documentElement.style.setProperty('--color-secondary', palette.secondary || '#B76E79');
          document.documentElement.style.setProperty('--color-accent', palette.accent || '#D4B896');
          document.documentElement.style.setProperty('--color-text', palette.text || '#1a1a1a');
          document.documentElement.style.setProperty('--color-text-light', palette.textLight || '#4F6D5E');
          document.documentElement.style.setProperty('--color-background', palette.background || '#F5F1EB');
        }
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

  const colorPalette = data.site?.colorPalette;

  return (
    <div className="min-h-screen bg-white">
      <Toaster position="top-center" richColors />
      <Header siteData={data.site} colorPalette={colorPalette} />
      <HeroSection siteData={data.site} colorPalette={colorPalette} />
      <AboutSection siteData={data.site} colorPalette={colorPalette} />
      <ServicesSection 
        services={data.services} 
        siteData={data.site} 
        colorPalette={colorPalette} 
        categories={data.categories || []}
      />
      
      {/* Dynamic Sections */}
      {data.dynamicSections && data.dynamicSections.length > 0 && (
        data.dynamicSections.map((section) => (
          <DynamicSection key={section.id} section={section} />
        ))
      )}
      
      {data.catalogLinks && data.catalogLinks.length > 0 && (
        <CatalogLinksSection catalogLinks={data.catalogLinks} colorPalette={colorPalette} />
      )}
      <ContactSection siteData={data.site} colorPalette={colorPalette} />
      <Footer siteData={data.site} colorPalette={colorPalette} />
      <WhatsAppButton whatsappLink={data.site?.brand?.whatsappLink} />
    </div>
  );
}
