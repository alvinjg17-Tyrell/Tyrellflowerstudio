import { useState, useEffect } from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Save, Loader2 } from "lucide-react";

export const AdminServicesSection = ({ content, onSave, saving }) => {
  const [form, setForm] = useState(content.services || {
    label: "Nuestros Servicios",
    title: "Creaciones para cada",
    titleHighlight: "momento",
    subtitle: "",
  });

  useEffect(() => { if (content.services) setForm(content.services); }, [content]);

  const handleSave = () => {
    onSave({ ...content, services: form });
  };

  const update = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  return (
    <div className="bg-white border border-tyrell-rose/10 p-6 space-y-5 mb-6">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium tracking-wider uppercase text-tyrell-gold">Textos de la sección Servicios</h3>
        <Button onClick={handleSave} disabled={saving} className="bg-tyrell-gold hover:bg-tyrell-gold-dark text-white rounded-none px-5 tracking-wider text-xs">
          {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin mr-1.5" /> : <Save className="w-3.5 h-3.5 mr-1.5" />}
          Guardar textos
        </Button>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs tracking-wider uppercase text-tyrell-olive/50 mb-1.5">Etiqueta superior</label>
          <Input value={form.label || ""} onChange={e => update("label", e.target.value)} className="rounded-none border-tyrell-rose/20 h-10 text-sm" />
        </div>
        <div>
          <label className="block text-xs tracking-wider uppercase text-tyrell-olive/50 mb-1.5">Título destacado (en dorado)</label>
          <Input value={form.titleHighlight || ""} onChange={e => update("titleHighlight", e.target.value)} className="rounded-none border-tyrell-rose/20 h-10 text-sm" />
        </div>
      </div>
      <div>
        <label className="block text-xs tracking-wider uppercase text-tyrell-olive/50 mb-1.5">Título principal</label>
        <Input value={form.title || ""} onChange={e => update("title", e.target.value)} className="rounded-none border-tyrell-rose/20 h-10 text-sm" />
      </div>
      <div>
        <label className="block text-xs tracking-wider uppercase text-tyrell-olive/50 mb-1.5">Subtítulo</label>
        <Textarea value={form.subtitle || ""} onChange={e => update("subtitle", e.target.value)} rows={2} className="rounded-none border-tyrell-rose/20 resize-none text-sm" />
      </div>
    </div>
  );
};
