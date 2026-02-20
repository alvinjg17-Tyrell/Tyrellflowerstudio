import { useEffect, useRef, useState } from "react";
import { ChevronRight, X, ChevronLeft } from "lucide-react";
import { Dialog, DialogContent } from "../ui/dialog";

export const ServicesSection = ({ services, siteData, colorPalette }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const sectionRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const brand = siteData?.brand || {};
  const svcSection = siteData?.services || {};
  
  // Get colors from svcSection or use defaults
  const titleColor = svcSection.titleColor || '#1a1a1a';
  const highlightColor = svcSection.highlightColor || '#daa609';
  const subtitleColor = svcSection.subtitleColor || '#666666';
  const labelColor = svcSection.labelColor || '#daa609';
  const pedirButtonColor = svcSection.pedir_buttonColor || '#daa609';
  const pedirTextColor = svcSection.pedir_textColor || '#daa609';

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

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.querySelector('[data-product-card]')?.offsetWidth || 200;
      scrollContainerRef.current.scrollBy({ left: cardWidth + 16, behavior: 'smooth' });
    }
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.querySelector('[data-product-card]')?.offsetWidth || 200;
      scrollContainerRef.current.scrollBy({ left: -(cardWidth + 16), behavior: 'smooth' });
    }
  };

  return (
    <section id="servicios" ref={sectionRef} className="relative py-16 lg:py-24 bg-white overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-tyrell-gold/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={`text-center mb-10 lg:mb-14 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <p 
            className="text-xs uppercase tracking-[0.3em] mb-3"
            style={{ color: labelColor }}
          >
            {svcSection.label || "Nuestros Servicios"}
          </p>
          <h2 
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight"
            style={{ color: titleColor }}
          >
            {svcSection.title || "Creaciones para cada"}
            <span style={{ color: highlightColor }}> {svcSection.titleHighlight || "momento"}</span>
          </h2>
          <p 
            className="mt-4 text-base lg:text-lg font-light max-w-xl mx-auto"
            style={{ color: subtitleColor }}
          >
            {svcSection.subtitle || "Descubre nuestra colección de arreglos florales y servicios diseñados para sorprender."}
          </p>
        </div>

        {/* Products Carousel Container */}
        <div className="relative">
          {/* Left Arrow (hidden on mobile, visible on desktop) */}
          <button
            onClick={scrollLeft}
            className="hidden lg:flex absolute -left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white border border-gray-200 rounded-full items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 hover:bg-gray-50"
            data-testid="carousel-scroll-left"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>

          {/* Scrollable Products Container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4 -mx-4 px-4 lg:mx-0 lg:px-0"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {(services || []).map((service, index) => {
              const allImages = [service.image, ...(service.images || [])].filter(Boolean);
              
              return (
                <div
                  key={service.id}
                  data-product-card
                  className={`flex-shrink-0 w-[160px] sm:w-[180px] lg:w-[200px] snap-start transition-all duration-700 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                  }`}
                  style={{ transitionDelay: `${100 + index * 80}ms` }}
                  data-testid={`product-card-${index}`}
                >
                  {/* Product Image */}
                  <div 
                    className="relative aspect-[3/4] bg-gray-100 overflow-hidden cursor-pointer group"
                    onClick={() => allImages.length > 0 && openLightbox(allImages, 0)}
                  >
                    {service.image ? (
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-300">
                        <span className="text-xs">Sin imagen</span>
                      </div>
                    )}
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                  </div>

                  {/* Product Info */}
                  <div className="mt-3 space-y-1.5">
                    <h3 
                      className="font-display text-sm lg:text-base font-medium leading-tight line-clamp-2"
                      style={{ color: titleColor }}
                    >
                      {service.title}
                    </h3>
                    
                    {service.description && (
                      <p className="text-xs text-gray-500 line-clamp-2 font-light">
                        {service.description}
                      </p>
                    )}

                    {service.price && (
                      <p 
                        className="text-sm font-medium"
                        style={{ color: highlightColor }}
                      >
                        {service.price}
                      </p>
                    )}

                    {/* Pedir Button */}
                    <a
                      href={getWhatsAppUrl(service.title)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-2 px-4 py-1.5 text-xs uppercase tracking-wider font-medium transition-all duration-300 hover:opacity-80"
                      style={{ 
                        backgroundColor: `${pedirButtonColor}20`,
                        color: pedirTextColor
                      }}
                      data-testid={`product-order-btn-${index}`}
                    >
                      Pedir
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Arrow Button (circular with >) */}
          <button
            onClick={scrollRight}
            className="absolute -right-2 lg:-right-4 top-[35%] -translate-y-1/2 z-20 w-10 h-10 bg-white border border-gray-300 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 hover:bg-gray-50"
            data-testid="carousel-scroll-right"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Image Lightbox */}
      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent className="max-w-4xl w-[95vw] h-auto max-h-[90vh] p-0 border-0 bg-transparent shadow-none" data-testid="image-lightbox">
          <div className="relative flex items-center justify-center">
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-2 right-2 z-50 w-10 h-10 bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-colors rounded-full"
              data-testid="lightbox-close-btn"
            >
              <X className="w-5 h-5" />
            </button>

            {lightboxImages.length > 1 && (
              <>
                <button
                  onClick={lightboxPrev}
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-50 w-12 h-12 bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-colors rounded-full"
                  data-testid="lightbox-prev-btn"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={lightboxNext}
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-50 w-12 h-12 bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-colors rounded-full"
                  data-testid="lightbox-next-btn"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            {lightboxImages[lightboxIndex] && (
              <img
                src={lightboxImages[lightboxIndex]}
                alt={`Imagen ${lightboxIndex + 1}`}
                className="max-w-full max-h-[85vh] object-contain rounded-lg"
                data-testid="lightbox-image"
              />
            )}

            {lightboxImages.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white text-sm px-4 py-2 rounded-full" data-testid="lightbox-counter">
                {lightboxIndex + 1} / {lightboxImages.length}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};
