import { useEffect, useRef, useState } from "react";
import { ArrowRight, MessageCircle, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";

// Grid display for multiple images (no carousel, no auto-scroll)
const ServiceImageGrid = ({ images, mainImage, onImageClick }) => {
  const allImages = [mainImage, ...(images || [])].filter(Boolean);
  const displayImages = allImages.slice(0, 4); // Show max 4 images in grid
  const remainingCount = allImages.length - 4;

  if (displayImages.length === 0) return null;

  // Single image layout
  if (displayImages.length === 1) {
    return (
      <div className="relative w-full h-full">
        <img
          src={displayImages[0]}
          alt=""
          className="w-full h-full object-cover cursor-pointer hover:opacity-95 transition-opacity"
          onClick={() => onImageClick && onImageClick(allImages, 0)}
          data-testid="service-image-0"
        />
      </div>
    );
  }

  // 2 images layout
  if (displayImages.length === 2) {
    return (
      <div className="grid grid-cols-2 gap-0.5 w-full h-full">
        {displayImages.map((img, i) => (
          <img
            key={i}
            src={img}
            alt=""
            className="w-full h-full object-cover cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => onImageClick && onImageClick(allImages, i)}
            data-testid={`service-image-${i}`}
          />
        ))}
      </div>
    );
  }

  // 3 images layout (1 large left, 2 stacked right)
  if (displayImages.length === 3) {
    return (
      <div className="grid grid-cols-2 gap-0.5 w-full h-full">
        <img
          src={displayImages[0]}
          alt=""
          className="w-full h-full object-cover cursor-pointer hover:opacity-90 transition-opacity row-span-2"
          onClick={() => onImageClick && onImageClick(allImages, 0)}
          data-testid="service-image-0"
        />
        <div className="grid grid-rows-2 gap-0.5 h-full">
          {displayImages.slice(1).map((img, i) => (
            <img
              key={i + 1}
              src={img}
              alt=""
              className="w-full h-full object-cover cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => onImageClick && onImageClick(allImages, i + 1)}
              data-testid={`service-image-${i + 1}`}
            />
          ))}
        </div>
      </div>
    );
  }

  // 4+ images layout (2x2 grid with overlay for more)
  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-0.5 w-full h-full">
      {displayImages.map((img, i) => (
        <div key={i} className="relative">
          <img
            src={img}
            alt=""
            className="w-full h-full object-cover cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => onImageClick && onImageClick(allImages, i)}
            data-testid={`service-image-${i}`}
          />
          {/* Show +N overlay on last image if there are more */}
          {i === 3 && remainingCount > 0 && (
            <div 
              className="absolute inset-0 bg-black/50 flex items-center justify-center cursor-pointer hover:bg-black/60 transition-colors"
              onClick={() => onImageClick && onImageClick(allImages, i)}
            >
              <span className="text-white text-2xl font-light">+{remainingCount}</span>
            </div>
          )}
        </div>
      ))}
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
    <section id="servicios" ref={sectionRef} className="relative py-24 lg:py-32 bg-white overflow-hidden">
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
              className={`group relative bg-[#F5F1EB] overflow-hidden transition-all duration-700 hover:shadow-[0_20px_60px_rgba(218,166,9,0.12)] ${
                index === 0 ? "md:col-span-2 lg:col-span-2" : ""
              } ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
              style={{ transitionDelay: `${200 + index * 150}ms` }}
              data-testid={`service-card-${index}`}
            >
              <div className={`relative overflow-hidden ${index === 0 ? "h-64 lg:h-80" : "h-56 lg:h-64"}`}>
                <ServiceImageGrid
                  images={service.images || []}
                  mainImage={service.image}
                  onImageClick={openLightbox}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-tyrell-dark/60 via-tyrell-dark/10 to-transparent pointer-events-none" />
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
                  className="mt-5 inline-flex items-center gap-2 bg-[#D8A7B1]/30 hover:bg-[#D8A7B1]/50 text-[#B76E79] px-4 py-2 text-sm tracking-wider transition-all duration-300 group/btn"
                  data-testid={`service-order-btn-${index}`}
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
            <Button className="bg-tyrell-gold hover:bg-tyrell-gold-dark text-white px-10 py-6 text-sm tracking-[0.2em] uppercase rounded-none transition-all duration-300 hover:shadow-[0_8px_30px_rgba(218,166,9,0.35)] group">
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
