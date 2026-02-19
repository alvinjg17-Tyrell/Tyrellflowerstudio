import { MessageCircle } from "lucide-react";

export const WhatsAppButton = ({ whatsappLink }) => {
  const getWhatsAppUrl = () => {
    const number = whatsappLink ? whatsappLink.replace("https://wa.me/", "") : "";
    const message = encodeURIComponent("Hola Tyrell quisiera información sobre ...");
    return number ? `https://wa.me/${number}?text=${message}` : `https://wa.me/?text=${message}`;
  };

  return (
    <a
      href={getWhatsAppUrl()}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-24 right-6 z-50 w-14 h-14 bg-[#25D366] hover:bg-[#20BA5C] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
      data-testid="whatsapp-float-btn"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle className="w-7 h-7 text-white fill-white" />
    </a>
  );
};
