import { Heart, MapPin, MessageCircle, ArrowUp } from "lucide-react";

export const Footer = ({ siteData }) => {
  const brand = siteData?.brand || {};
  const contact = siteData?.contact || {};

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-tyrell-dark border-t border-tyrell-gold/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-16 grid md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="mb-6">
              <span className="font-display text-2xl tracking-[0.3em] text-white font-bold">
                {brand.name || "TYRELL"}
              </span>
              <p className="mt-1 text-tyrell-gold text-[10px] tracking-[0.25em] uppercase font-light">
                Florería Artesanal
              </p>
            </div>
            <p className="text-white/40 text-sm font-light leading-relaxed">{brand.tagline}</p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-display text-sm tracking-[0.2em] uppercase text-white mb-6">Navegación</h4>
            <ul className="space-y-3">
              {["Inicio", "Nosotros", "Servicios", "Contacto"].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    onClick={(e) => {
                      e.preventDefault();
                      const el = document.querySelector(`#${link.toLowerCase()}`);
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="text-white/40 hover:text-tyrell-gold text-sm font-light tracking-wider transition-colors duration-300"
                  >
                    {link}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={brand.catalogUrl || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/40 hover:text-tyrell-gold text-sm font-light tracking-wider transition-colors duration-300"
                >
                  Catálogo
                </a>
              </li>
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h4 className="font-display text-sm tracking-[0.2em] uppercase text-white mb-6">Contacto</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-tyrell-gold mt-0.5 flex-shrink-0" />
                <span className="text-white/40 text-sm font-light">{contact.address}</span>
              </li>
              <li className="flex items-start gap-3">
                <MessageCircle className="w-4 h-4 text-tyrell-gold mt-0.5 flex-shrink-0" />
                <a
                  href={brand.whatsappLink || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/40 hover:text-tyrell-gold text-sm font-light transition-colors duration-300"
                >
                  {brand.whatsappNumber || "WhatsApp"}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/25 text-xs font-light tracking-wider">
            © {currentYear} {brand.name || "TYRELL"} Florería. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-1 text-white/25 text-xs font-light">
            <span>Hecho con</span>
            <Heart className="w-3 h-3 text-tyrell-gold fill-tyrell-gold" />
            <span>en {brand.location || "Moyobamba"}</span>
          </div>
        </div>
      </div>

      {/* Back to top button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 z-40 w-12 h-12 bg-tyrell-gold/90 hover:bg-tyrell-gold text-white flex items-center justify-center transition-all duration-300 hover:shadow-[0_8px_25px_rgba(201,169,110,0.3)] group"
        aria-label="Volver arriba"
      >
        <ArrowUp className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-0.5" />
      </button>
    </footer>
  );
};
