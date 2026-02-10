import { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

export const ServicesSection = ({ services, siteData }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const brand = siteData?.brand || {};
  const svcSection = siteData?.services || {};

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="servicios" ref={sectionRef} className="relative py-24 lg:py-32 bg-tyrell-cream/40 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-tyrell-gold/20 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-tyrell-gold/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 lg:mb-20 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-[1px] w-10 bg-tyrell-gold/40" />
            <span className="text-tyrell-gold text-xs tracking-[0.3em] uppercase font-light">{svcSection.label || "Nuestros Servicios"}</span>
            <div className="h-[1px] w-10 bg-tyrell-gold/40" />
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-tyrell-dark font-light tracking-tight">
            {svcSection.title || "Creaciones para cada"}<span className="text-tyrell-gold"> {svcSection.titleHighlight || "momento"}</span>
          </h2>
          <p className="mt-4 text-tyrell-dark/50 text-lg font-light max-w-xl mx-auto">
            {svcSection.subtitle || "Descubre nuestra colección de arreglos florales y servicios diseñados para sorprender."}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {(services || []).map((service, index) => (
            <a
              key={service.id}
              href={brand.catalogUrl || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative bg-white overflow-hidden transition-all duration-700 hover:shadow-[0_20px_60px_rgba(201,169,110,0.12)] ${
                index === 0 ? "md:col-span-2 lg:col-span-2" : ""
              } ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
              style={{ transitionDelay: `${200 + index * 150}ms` }}
            >
              <div className={`relative overflow-hidden ${index === 0 ? "h-64 lg:h-80" : "h-56 lg:h-64"}`}>
                <img src={service.image} alt={service.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-tyrell-dark/60 via-tyrell-dark/10 to-transparent" />
                {service.tag && (
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-white/90 text-tyrell-dark text-[10px] tracking-wider uppercase font-medium rounded-none px-3 py-1 hover:bg-white/90">{service.tag}</Badge>
                  </div>
                )}
                {service.price && (
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-tyrell-gold/90 text-white text-sm font-medium px-3 py-1.5 backdrop-blur-sm">{service.price}</span>
                  </div>
                )}
                <div className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  <ArrowUpRight className="w-4 h-4 text-white" />
                </div>
              </div>
              <div className="p-6 lg:p-8">
                <h3 className="font-display text-xl lg:text-2xl text-tyrell-dark font-medium tracking-wide group-hover:text-tyrell-gold transition-colors duration-300">{service.title}</h3>
                <p className="mt-3 text-tyrell-dark/50 text-sm font-light leading-relaxed">{service.description}</p>
                <div className="mt-5 flex items-center gap-2 text-tyrell-gold text-sm tracking-wider">
                  <span className="font-light uppercase text-xs">Ver más</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className={`text-center mt-16 transition-all duration-1000 delay-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <a href={brand.catalogUrl || "#"} target="_blank" rel="noopener noreferrer">
            <Button className="bg-tyrell-gold hover:bg-tyrell-gold-dark text-white px-10 py-6 text-sm tracking-[0.2em] uppercase rounded-none transition-all duration-300 hover:shadow-[0_8px_30px_rgba(201,169,110,0.35)] group">
              Ver Catálogo Completo
              <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};
