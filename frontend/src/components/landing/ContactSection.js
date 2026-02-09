import { useEffect, useRef, useState } from "react";
import { MapPin, MessageCircle, Clock, ArrowRight, Send } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { siteData } from "../../data/mock";
import { toast } from "sonner";

export const ContactSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    message: "",
  });
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.message) {
      toast.error("Por favor completa todos los campos");
      return;
    }
    // Open WhatsApp with the message
    const whatsappMsg = encodeURIComponent(
      `Hola TYRELL, soy ${formData.name}. ${formData.message}`
    );
    const whatsappUrl = siteData.brand.whatsappLink || `https://wa.me/?text=${whatsappMsg}`;
    window.open(whatsappUrl, "_blank");
    toast.success("Redirigiendo a WhatsApp...");
    setFormData({ name: "", message: "" });
  };

  return (
    <section
      id="contacto"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-tyrell-dark overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-tyrell-gold/20 to-transparent" />
      <div className="absolute top-20 right-0 w-72 h-72 bg-tyrell-gold/[0.03] rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-0 w-80 h-80 bg-tyrell-gold/[0.02] rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div
          className={`text-center mb-16 lg:mb-20 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-[1px] w-10 bg-tyrell-gold/40" />
            <span className="text-tyrell-gold text-xs tracking-[0.3em] uppercase font-light">
              Contacto
            </span>
            <div className="h-[1px] w-10 bg-tyrell-gold/40" />
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-white font-light tracking-tight">
            {siteData.contact.title}
          </h2>
          <p className="mt-4 text-white/40 text-lg font-light">
            {siteData.contact.subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Contact info */}
          <div
            className={`transition-all duration-1000 delay-300 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-12"
            }`}
          >
            <div className="space-y-8">
              {/* WhatsApp */}
              <div className="flex gap-5 group">
                <div className="flex-shrink-0 w-14 h-14 border border-tyrell-gold/30 flex items-center justify-center transition-all duration-300 group-hover:bg-tyrell-gold/10 group-hover:border-tyrell-gold/50">
                  <MessageCircle className="w-6 h-6 text-tyrell-gold" />
                </div>
                <div>
                  <h3 className="font-display text-lg text-white font-medium tracking-wide">
                    {siteData.contact.whatsappLabel}
                  </h3>
                  <p className="mt-1 text-white/40 text-sm font-light">
                    Respuesta rápida y personalizada
                  </p>
                  <a
                    href={siteData.brand.whatsappLink || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-2 text-tyrell-gold text-sm tracking-wider hover:text-tyrell-gold-light transition-colors duration-300"
                  >
                    <span>Enviar mensaje</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="flex gap-5 group">
                <div className="flex-shrink-0 w-14 h-14 border border-tyrell-gold/30 flex items-center justify-center transition-all duration-300 group-hover:bg-tyrell-gold/10 group-hover:border-tyrell-gold/50">
                  <MapPin className="w-6 h-6 text-tyrell-gold" />
                </div>
                <div>
                  <h3 className="font-display text-lg text-white font-medium tracking-wide">
                    Ubicación
                  </h3>
                  <p className="mt-1 text-white/40 text-sm font-light">
                    {siteData.contact.address}
                  </p>
                </div>
              </div>

              {/* Schedule */}
              <div className="flex gap-5 group">
                <div className="flex-shrink-0 w-14 h-14 border border-tyrell-gold/30 flex items-center justify-center transition-all duration-300 group-hover:bg-tyrell-gold/10 group-hover:border-tyrell-gold/50">
                  <Clock className="w-6 h-6 text-tyrell-gold" />
                </div>
                <div>
                  <h3 className="font-display text-lg text-white font-medium tracking-wide">
                    {siteData.contact.scheduleTitle}
                  </h3>
                  <p className="mt-1 text-white/40 text-sm font-light">
                    {siteData.contact.schedule}
                  </p>
                  <p className="text-white/40 text-sm font-light">
                    {siteData.contact.scheduleWeekend}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div
            className={`transition-all duration-1000 delay-500 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-12"
            }`}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-white/50 text-xs tracking-wider uppercase mb-2 font-light">
                  Tu nombre
                </label>
                <Input
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Ingresa tu nombre"
                  className="bg-white/10 border-tyrell-gold/30 text-white placeholder:text-white/35 rounded-none h-12 focus:border-tyrell-gold/60 focus:ring-tyrell-gold/20 transition-all duration-300"
                />
              </div>
              <div>
                <label className="block text-white/50 text-xs tracking-wider uppercase mb-2 font-light">
                  Tu mensaje
                </label>
                <Textarea
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder="Cuéntanos qué necesitas..."
                  rows={5}
                  className="bg-white/5 border-tyrell-gold/20 text-white placeholder:text-white/25 rounded-none focus:border-tyrell-gold/50 focus:ring-tyrell-gold/20 transition-all duration-300 resize-none"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-tyrell-gold hover:bg-tyrell-gold-dark text-white py-6 text-sm tracking-[0.2em] uppercase rounded-none transition-all duration-300 hover:shadow-[0_8px_30px_rgba(201,169,110,0.3)] group"
              >
                <Send className="mr-2 w-4 h-4" />
                Enviar por WhatsApp
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
