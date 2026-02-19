import { useState, useEffect } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Save, Loader2 } from "lucide-react";

export const AdminHeaderSection = ({ content, onSave, saving }) => {
  const [form, setForm] = useState(content.header || {
    topBarLeft: "Jirón Esperanza 210, Moyobamba, Perú",
    topBarRight: "Entrega a domicilio disponible",
    navItems: ["INICIO", "NOSOTROS", "SERVICIOS", "CONTACTO"],
    ctaText: "VER CATÁLOGO"
  });

  useEffect(() => { 
    setForm(content.header || {
      topBarLeft: content.brand?.location || "Jirón Esperanza 210, Moyobamba, Perú",
      topBarRight: "Entrega a domicilio disponible",
      navItems: ["INICIO", "NOSOTROS", "SERVICIOS", "CONTACTO"],
      ctaText: "VER CATÁLOGO"
    }); 
  }, [content]);

  const handleSave = () => {
    onSave({ ...content, header: form });
  };

  const update = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-2">
        <h2 className="font-display text-2xl text-tyrell-olive font-light">Encabezado de la Página</h2>
        <Button onClick={handleSave} disabled={saving} className="bg-tyrell-gold hover:bg-tyrell-gold-dark text-white rounded-none px-6 tracking-wider text-sm">
          {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
          Guardar
        </Button>
      </div>

      <div className="bg-white border border-tyrell-rose/10 p-6 space-y-5">
        <h3 className="text-sm font-medium tracking-wider uppercase text-tyrell-rose-dark">Barra Superior</h3>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs tracking-wider uppercase text-tyrell-olive/50 mb-1.5">Texto izquierdo (ubicación)</label>
            <Input 
              value={form.topBarLeft || ""} 
              onChange={e => update("topBarLeft", e.target.value)} 
              className="rounded-none border-tyrell-rose/20 h-11" 
              placeholder="Ej: Jirón Esperanza 210, Moyobamba, Perú"
            />
          </div>
          <div>
            <label className="block text-xs tracking-wider uppercase text-tyrell-olive/50 mb-1.5">Texto derecho</label>
            <Input 
              value={form.topBarRight || ""} 
              onChange={e => update("topBarRight", e.target.value)} 
              className="rounded-none border-tyrell-rose/20 h-11" 
              placeholder="Ej: Entrega a domicilio disponible"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs tracking-wider uppercase text-tyrell-olive/50 mb-1.5">Texto del botón CTA</label>
          <Input 
            value={form.ctaText || ""} 
            onChange={e => update("ctaText", e.target.value)} 
            className="rounded-none border-tyrell-rose/20 h-11" 
            placeholder="Ej: VER CATÁLOGO"
          />
        </div>

        <div className="pt-4 border-t border-tyrell-rose/10">
          <h3 className="text-sm font-medium tracking-wider uppercase text-tyrell-rose-dark mb-4">Elementos de Navegación</h3>
          <p className="text-xs text-tyrell-olive/50 mb-3">Los elementos de navegación están vinculados a las secciones de la página</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {(form.navItems || []).map((item, i) => (
              <Input
                key={i}
                value={item}
                onChange={e => {
                  const newItems = [...(form.navItems || [])];
                  newItems[i] = e.target.value;
                  update("navItems", newItems);
                }}
                className="rounded-none border-tyrell-rose/20 h-10 text-sm"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export { AdminHeaderSection as AdminHeader };
