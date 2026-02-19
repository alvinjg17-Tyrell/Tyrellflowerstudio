import { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, MessageCircle, X } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Dialog, DialogContent, DialogClose } from "../ui/dialog";

const ServiceImageCarousel = ({ images, mainImage, title, onImageClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const allImages = [mainImage, ...(images || [])].filter(Boolean);
  const scrollRef = useRef(null);
  const autoScrollRef = useRef(null);

  if (allImages.length === 0) return null;

  const scrollTo = (index) => {
    setCurrentIndex(index);
    if (scrollRef.current) {
      const child = scrollRef.current.children[index];
      if (child) {
        child.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      }
    }
  };

  const next = (e) => {
    if (e) { e.preventDefault(); e.stopPropagation(); }
    scrollTo((currentIndex + 1) % allImages.length);
  };

  const prev = (e) => {
    if (e) { e.preventDefault(); e.stopPropagation(); }
    scrollTo((currentIndex - 1 + allImages.length) % allImages.length);
  };

  // Auto-scroll every 5 seconds
  useEffect(() => {
    if (allImages.length <= 1) return;
    
    autoScrollRef.current = setInterval(() => {
      setCurrentIndex(prev => {
        const nextIndex = (prev + 1) % allImages.length;
        if (scrollRef.current) {
          const child = scrollRef.current.children[nextIndex];
          if (child) {
            child.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
          }
        }
        return nextIndex;
      });
    }, 5000);

    return () => {
      if (autoScrollRef.current) clearInterval(autoScrollRef.current);
    };
  }, [allImages.length]);

  const handleImageClick = (e, index) => {
    e.preventDefault();
    e.stopPropagation();
    if (onImageClick) onImageClick(allImages, index);
  };

  return (
    <div className="relative overflow-hidden group/carousel">
      <div
        ref={scrollRef}
        className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        onScroll={(e) => {
          const el = e.target;
          const index = Math.round(el.scrollLeft / el.clientWidth);
          setCurrentIndex(index);
        }}
      >
        {allImages.map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`${title} ${i + 1}`}
            className="w-full h-full object-cover flex-shrink-0 snap-center cursor-pointer hover:opacity-95 transition-opacity"
            onClick={(e) => handleImageClick(e, i)}
            data-testid={`service-image-${i}`}
          />
        ))}
      </div>

      {allImages.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-opacity z-10"
            data-testid="carousel-prev-btn"
          >
            <ChevronLeft className="w-4 h-4 text-[#1a1a1a]" />
          </button>
          <button
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-opacity z-10"
            data-testid="carousel-next-btn"
          >
            <ChevronRight className="w-4 h-4 text-[#1a1a1a]" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {allImages.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); scrollTo(i); }}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === currentIndex ? "bg-white w-4" : "bg-white/50"
                }`}
                data-testid={`carousel-dot-${i}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export const ServicesSection = ({ services, siteData }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const sectionRef = useRef(null);
  const brand = siteData?.brand || {};
  const svcSection = siteData?.services || {};

  const openLightbox = (images, index) => {
    setLightboxImages(images);
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const lightboxNext = () => {
    setLightboxIndex((prev) => (prev + 1) % lightboxImages.length);
  };

  const lightboxPrev = () => {
    setLightboxIndex((prev) => (prev - 1 + lightboxImages.length) % lightboxImages.length);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const getWhatsAppUrl = (serviceName) => {
    const number = brand.whatsappLink ? brand.whatsappLink.replace("https://wa.me/", "") : "";
    const message = encodeURIComponent(`Hola Tyrell, necesito información sobre ${serviceName}`);
    return number ? `https://wa.me/${number}?text=${message}` : `https://wa.me/?text=${message}`;
  };

  const getGenericWhatsAppUrl = () => {
    const number = brand.whatsappLink ? brand.whatsappLink.replace("https://wa.me/", "") : "";
    const message = encodeURIComponent("Hola Tyrell quisiera información sobre ...");
    return number ? `https://wa.me/${number}?text=${message}` : `https://wa.me/?text=${message}`;
  };

  return (
    <section id="servicios" ref={sectionRef} className="relative py-24 lg:py-32 bg-gradient-to-b from-tyrell-sage-light/30 via-tyrell-cream/40 to-tyrell-rose-light/20 overflow-hidden">
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
            <div
              key={service.id}
              className={`group relative bg-white overflow-hidden transition-all duration-700 hover:shadow-[0_20px_60px_rgba(201,169,110,0.12)] ${
                index === 0 ? "md:col-span-2 lg:col-span-2" : ""
              } ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
              style={{ transitionDelay: `${200 + index * 150}ms` }}
            >
              <div className={`relative overflow-hidden ${index === 0 ? "h-64 lg:h-80" : "h-56 lg:h-64"}`}>
                <ServiceImageCarousel
                  images={service.images || []}
                  mainImage={service.image}
                  title={service.title}
                  onImageClick={openLightbox}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-tyrell-dark/60 via-tyrell-dark/10 to-transparent pointer-events-none" />
                {service.tag && (
                  <div className="absolute top-4 left-4 z-10">
                    <Badge className="bg-white/90 text-tyrell-dark text-[10px] tracking-wider uppercase font-medium rounded-none px-3 py-1 hover:bg-white/90">{service.tag}</Badge>
                  </div>
                )}
                {service.price && (
                  <div className="absolute bottom-4 left-4 z-10">
                    <span className="bg-tyrell-gold/90 text-white text-sm font-medium px-3 py-1.5 backdrop-blur-sm">{service.price}</span>
                  </div>
                )}
              </div>
              <div className="p-6 lg:p-8">
                <h3 className="font-display text-xl lg:text-2xl text-tyrell-dark font-medium tracking-wide">{service.title}</h3>
                <p className="mt-3 text-tyrell-dark/50 text-sm font-light leading-relaxed">{service.description}</p>
                <a
                  href={getWhatsAppUrl(service.title)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-2 bg-tyrell-burgundy/10 hover:bg-tyrell-burgundy/20 text-tyrell-burgundy px-4 py-2 text-sm tracking-wider transition-all duration-300 group/btn"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span className="font-light uppercase text-xs">Pedir</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" />
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className={`text-center mt-16 transition-all duration-1000 delay-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <a href={getGenericWhatsAppUrl()} target="_blank" rel="noopener noreferrer" data-testid="services-catalog-btn">
            <Button className="bg-tyrell-gold hover:bg-tyrell-gold-dark text-white px-10 py-6 text-sm tracking-[0.2em] uppercase rounded-none transition-all duration-300 hover:shadow-[0_8px_30px_rgba(201,169,110,0.35)] group">
              Ver Catálogo Completo
              <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </a>
        </div>
      </div>

      {/* Image Lightbox */}
      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent className="max-w-4xl w-[95vw] h-auto max-h-[90vh] p-0 border-0 bg-transparent shadow-none" data-testid="image-lightbox">
          <div className="relative flex items-center justify-center">
            {/* Close button */}
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-2 right-2 z-50 w-10 h-10 bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-colors"
              data-testid="lightbox-close-btn"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Navigation arrows */}
            {lightboxImages.length > 1 && (
              <>
                <button
                  onClick={lightboxPrev}
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-50 w-12 h-12 bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-colors"
                  data-testid="lightbox-prev-btn"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={lightboxNext}
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-50 w-12 h-12 bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-colors"
                  data-testid="lightbox-next-btn"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            {/* Image */}
            {lightboxImages[lightboxIndex] && (
              <img
                src={lightboxImages[lightboxIndex]}
                alt={`Imagen ${lightboxIndex + 1}`}
                className="max-w-full max-h-[85vh] object-contain"
                data-testid="lightbox-image"
              />
            )}

            {/* Image counter */}
            {lightboxImages.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white text-sm px-4 py-2" data-testid="lightbox-counter">
                {lightboxIndex + 1} / {lightboxImages.length}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};
