import { useState, useEffect } from "react";
import { api } from "../lib/api";
import { AdminHeader } from "../components/admin/AdminHeader";
import { AdminBrand } from "../components/admin/AdminBrand";
import { AdminHero } from "../components/admin/AdminHero";
import { AdminAbout } from "../components/admin/AdminAbout";
import { AdminServices } from "../components/admin/AdminServices";
import { AdminTestimonials } from "../components/admin/AdminTestimonials";
import { AdminContact } from "../components/admin/AdminContact";
import { Toaster, toast } from "sonner";
import { Loader2 } from "lucide-react";

const TABS = [
  { id: "brand", label: "Marca" },
  { id: "hero", label: "Hero" },
  { id: "about", label: "Nosotros" },
  { id: "services", label: "Servicios" },
  { id: "testimonials", label: "Testimonios" },
  { id: "contact", label: "Contacto" },
];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("brand");
  const [siteContent, setSiteContent] = useState(null);
  const [services, setServices] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await api.getContent();
      setSiteContent(data.site);
      setServices(data.services);
      setTestimonials(data.testimonials);
    } catch (err) {
      toast.error("Error cargando datos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const saveSiteContent = async (updatedContent) => {
    try {
      setSaving(true);
      await api.updateContent(updatedContent);
      setSiteContent(updatedContent);
      toast.success("Cambios guardados correctamente");
    } catch (err) {
      toast.error("Error guardando cambios");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#faf7f2] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#C9A96E] animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf7f2]">
      <Toaster position="top-center" richColors />
      <AdminHeader />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Tabs */}
        <div className="flex gap-1 overflow-x-auto pb-4 mb-8 border-b border-[#C9A96E]/15">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 text-sm tracking-wider uppercase whitespace-nowrap transition-all duration-300 ${
                activeTab === tab.id
                  ? "bg-[#C9A96E] text-white"
                  : "text-[#1a1a1a]/50 hover:text-[#1a1a1a]/80 hover:bg-[#C9A96E]/5"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        {activeTab === "brand" && siteContent && (
          <AdminBrand content={siteContent} onSave={saveSiteContent} saving={saving} />
        )}
        {activeTab === "hero" && siteContent && (
          <AdminHero content={siteContent} onSave={saveSiteContent} saving={saving} />
        )}
        {activeTab === "about" && siteContent && (
          <AdminAbout content={siteContent} onSave={saveSiteContent} saving={saving} />
        )}
        {activeTab === "services" && (
          <AdminServices services={services} setServices={setServices} />
        )}
        {activeTab === "testimonials" && (
          <AdminTestimonials testimonials={testimonials} setTestimonials={setTestimonials} />
        )}
        {activeTab === "contact" && siteContent && (
          <AdminContact content={siteContent} onSave={saveSiteContent} saving={saving} />
        )}
      </div>
    </div>
  );
}
