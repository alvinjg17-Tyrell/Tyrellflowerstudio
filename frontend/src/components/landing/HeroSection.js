import { useEffect, useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "../ui/button";

export const HeroSection = ({ siteData }) => {
  const [isVisible, setIsVisible] = useState(false);
  const hero = siteData?.hero || {};
  const brand = siteData?.brand || {};

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const scrollToServices = () => {
    const element = document.querySelector("#servicios");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const getGenericWhatsAppUrl = () => {
    const number = brand.whatsappLink ? brand.whatsappLink.replace("https://wa.me/", "") : "";
    const message = encodeURIComponent("Hola Tyrell quisiera información sobre ...");
    return number ? `https://wa.me/${number}?text=${message}` : `https://wa.me/?text=${message}`;
  };

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background - Video or Image */}
      <div className="absolute inset-0">
        {hero.useVideo && hero.video ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            poster={hero.image || ""}
          >
            <source src={hero.video} type="video/quicktime" />
            <source src={hero.video} type="video/mp4" />
            {/* Fallback to image if video fails */}
            <img
              src={hero.image}
              alt="TYRELL Florería"
              className="w-full h-full object-cover"
            />
          </video>
        ) : (
          <img
            src={hero.image}
            alt="Arreglos florales TYRELL"
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-tyrell-dark/85 via-tyrell-dark/60 to-tyrell-dark/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-tyrell-dark/50 via-transparent to-transparent" />
      </div>

      {/* Gold decorative lines */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-tyrell-gold/30 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-tyrell-gold/30 to-transparent" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-32 lg:py-40">
        <div className="max-w-2xl">
          {/* Decorative element */}
          <div
            className={`flex items-center gap-3 mb-8 transition-all duration-1000 delay-200 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            <div className="h-[1px] w-12 bg-tyrell-gold" />
            <span className="text-tyrell-gold text-xs tracking-[0.3em] uppercase font-light">
              {hero.label || "Flower Studio"}
            </span>
          </div>

          {/* Title */}
          <h1
            className={`transition-all duration-1000 delay-400 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
          >
            <span className="block font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-white font-light leading-[0.95] tracking-tight">
              {hero.title}
            </span>
            <span className="block font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-tyrell-gold font-light leading-[0.95] tracking-tight mt-2">
              {hero.titleHighlight}
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className={`mt-8 text-white/70 text-base sm:text-lg font-light leading-relaxed max-w-lg transition-all duration-1000 delay-600 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
          >
            {hero.subtitle}
          </p>

          {/* CTAs */}
          <div
            className={`mt-10 flex flex-col sm:flex-row gap-4 transition-all duration-1000 delay-800 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
          >
            <a
              href={getGenericWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="hero-catalog-btn"
            >
              <Button className="bg-tyrell-gold hover:bg-tyrell-gold-dark text-white px-8 py-6 text-sm tracking-[0.2em] uppercase rounded-none transition-all duration-300 hover:shadow-[0_8px_30px_rgba(201,169,110,0.35)] group">
                {hero.ctaText || "Ver Catálogo"}
                <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </a>
            <Button
              onClick={scrollToServices}
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 hover:border-white/50 px-8 py-6 text-sm tracking-[0.2em] uppercase rounded-none transition-all duration-300 bg-transparent"
            >
              {hero.ctaSecondaryText || "Nuestros Servicios"}
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <button
          onClick={scrollToServices}
          className="flex flex-col items-center gap-2 text-white/50 hover:text-tyrell-gold transition-colors duration-300 group"
        >
          <span className="text-[10px] tracking-[0.3em] uppercase">Descubrir</span>
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </button>
      </div>

      {/* Side decorative text */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden xl:block">
        <span className="text-white/10 font-display text-sm tracking-[0.5em] uppercase writing-vertical">
          {brand.name || "TYRELL"} · Flower Studio
        </span>
      </div>
    </section>
  );
};
