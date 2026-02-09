import { useState, useEffect } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Save, Loader2 } from "lucide-react";

export const AdminContact = ({ content, onSave, saving }) => {
  const [form, setForm] = useState(content.contact);

  useEffect(() => { setForm(content.contact); }, [content]);

  const handleSave = () => {
    onSave({ ...content, contact: form });
  };

  const update = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-2">
        <h2 className="font-['Playfair_Display'] text-2xl text-[#1a1a1a] font-light">Sección Contacto</h2>
        <Button onClick={handleSave} disabled={saving} className="bg-[#C9A96E] hover:bg-[#A67C52] text-white rounded-none px-6 tracking-wider text-sm">
          {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
          Guardar
        </Button>
      </div>

      <div className="bg-white border border-[#C9A96E]/10 p-6 space-y-5">
        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs tracking-wider uppercase text-[#1a1a1a]/50 mb-1.5">Título de la sección</label>
            <Input value={form.title} onChange={e => update("title", e.target.value)} className="rounded-none border-[#C9A96E]/20 focus:border-[#C9A96E]/50 h-11" />
          </div>
          <div>
            <label className="block text-xs tracking-wider uppercase text-[#1a1a1a]/50 mb-1.5">Subtítulo</label>
            <Input value={form.subtitle} onChange={e => update("subtitle", e.target.value)} className="rounded-none border-[#C9A96E]/20 focus:border-[#C9A96E]/50 h-11" />
          </div>
        </div>
        <div>
          <label className="block text-xs tracking-wider uppercase text-[#1a1a1a]/50 mb-1.5">Dirección</label>
          <Input value={form.address} onChange={e => update("address", e.target.value)} className="rounded-none border-[#C9A96E]/20 focus:border-[#C9A96E]/50 h-11" />
        </div>
        <div>
          <label className="block text-xs tracking-wider uppercase text-[#1a1a1a]/50 mb-1.5">Etiqueta de WhatsApp</label>
          <Input value={form.whatsappLabel} onChange={e => update("whatsappLabel", e.target.value)} className="rounded-none border-[#C9A96E]/20 focus:border-[#C9A96E]/50 h-11" />
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs tracking-wider uppercase text-[#1a1a1a]/50 mb-1.5">Título de horario</label>
            <Input value={form.scheduleTitle} onChange={e => update("scheduleTitle", e.target.value)} className="rounded-none border-[#C9A96E]/20 focus:border-[#C9A96E]/50 h-11" />
          </div>
          <div>
            <label className="block text-xs tracking-wider uppercase text-[#1a1a1a]/50 mb-1.5">Horario (L-S)</label>
            <Input value={form.schedule} onChange={e => update("schedule", e.target.value)} className="rounded-none border-[#C9A96E]/20 focus:border-[#C9A96E]/50 h-11" />
          </div>
        </div>
        <div>
          <label className="block text-xs tracking-wider uppercase text-[#1a1a1a]/50 mb-1.5">Horario (Domingos)</label>
          <Input value={form.scheduleWeekend} onChange={e => update("scheduleWeekend", e.target.value)} className="rounded-none border-[#C9A96E]/20 focus:border-[#C9A96E]/50 h-11" />
        </div>
      </div>
    </div>
  );
};
