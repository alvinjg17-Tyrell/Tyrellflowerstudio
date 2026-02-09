import { useState, useEffect } from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Save, Loader2, Image as ImageIcon } from "lucide-react";

export const AdminHero = ({ content, onSave, saving }) => {
  const [form, setForm] = useState(content.hero);

  useEffect(() => { setForm(content.hero); }, [content]);

  const handleSave = () => {
    onSave({ ...content, hero: form });
  };

  const update = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-2">
        <h2 className="font-['Playfair_Display'] text-2xl text-[#1a1a1a] font-light">Sección Hero</h2>
        <Button onClick={handleSave} disabled={saving} className="bg-[#C9A96E] hover:bg-[#A67C52] text-white rounded-none px-6 tracking-wider text-sm">
          {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
          Guardar
        </Button>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white border border-[#C9A96E]/10 p-6 space-y-5">
          <div>
            <label className="block text-xs tracking-wider uppercase text-[#1a1a1a]/50 mb-1.5">Título (línea 1)</label>
            <Input value={form.title} onChange={e => update("title", e.target.value)} className="rounded-none border-[#C9A96E]/20 focus:border-[#C9A96E]/50 h-11" />
          </div>
          <div>
            <label className="block text-xs tracking-wider uppercase text-[#1a1a1a]/50 mb-1.5">Título destacado (línea 2, en dorado)</label>
            <Input value={form.titleHighlight} onChange={e => update("titleHighlight", e.target.value)} className="rounded-none border-[#C9A96E]/20 focus:border-[#C9A96E]/50 h-11" />
          </div>
          <div>
            <label className="block text-xs tracking-wider uppercase text-[#1a1a1a]/50 mb-1.5">Subtítulo</label>
            <Textarea value={form.subtitle} onChange={e => update("subtitle", e.target.value)} rows={3} className="rounded-none border-[#C9A96E]/20 focus:border-[#C9A96E]/50 resize-none" />
          </div>
          <div>
            <label className="block text-xs tracking-wider uppercase text-[#1a1a1a]/50 mb-1.5">Texto del botón</label>
            <Input value={form.ctaText} onChange={e => update("ctaText", e.target.value)} className="rounded-none border-[#C9A96E]/20 focus:border-[#C9A96E]/50 h-11" />
          </div>
          <div>
            <label className="block text-xs tracking-wider uppercase text-[#1a1a1a]/50 mb-1.5">URL de imagen principal</label>
            <Input value={form.image} onChange={e => update("image", e.target.value)} className="rounded-none border-[#C9A96E]/20 focus:border-[#C9A96E]/50 h-11" placeholder="https://..." />
          </div>
        </div>

        {/* Preview */}
        <div className="bg-white border border-[#C9A96E]/10 p-6">
          <label className="block text-xs tracking-wider uppercase text-[#1a1a1a]/50 mb-3">Vista previa de imagen</label>
          {form.image ? (
            <img src={form.image} alt="Hero preview" className="w-full h-64 object-cover" />
          ) : (
            <div className="w-full h-64 bg-[#faf7f2] flex items-center justify-center">
              <ImageIcon className="w-12 h-12 text-[#C9A96E]/30" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
