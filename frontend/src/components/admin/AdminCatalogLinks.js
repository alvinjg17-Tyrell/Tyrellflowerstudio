import { useState } from "react";
import { api } from "../../lib/api";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Plus, Trash2, Save, Loader2, Link2, ExternalLink } from "lucide-react";
import { toast } from "sonner";

export const AdminCatalogLinks = ({ catalogLinks, setCatalogLinks }) => {
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({});
  const [saving, setSaving] = useState(false);
  const [adding, setAdding] = useState(false);
  const [newForm, setNewForm] = useState({ title: "", url: "", order: 0 });

  const startEdit = (link) => {
    setEditingId(link.id);
    setForm({ title: link.title, url: link.url, order: link.order });
  };

  const cancelEdit = () => { setEditingId(null); setForm({}); };

  const saveEdit = async () => {
    try {
      setSaving(true);
      const updated = await api.updateCatalogLink(editingId, form);
      setCatalogLinks(prev => prev.map(l => l.id === editingId ? updated : l));
      setEditingId(null);
      toast.success("Enlace actualizado");
    } catch (err) {
      toast.error("Error actualizando enlace");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Eliminar este enlace?")) return;
    try {
      await api.deleteCatalogLink(id);
      setCatalogLinks(prev => prev.filter(l => l.id !== id));
      toast.success("Enlace eliminado");
    } catch (err) {
      toast.error("Error eliminando enlace");
    }
  };

  const handleAdd = async () => {
    if (!newForm.title.trim() || !newForm.url.trim()) {
      toast.error("Título y URL son obligatorios"); return;
    }
    try {
      setSaving(true);
      const created = await api.createCatalogLink({ ...newForm, order: catalogLinks.length });
      setCatalogLinks(prev => [...prev, created]);
      setNewForm({ title: "", url: "", order: 0 });
      setAdding(false);
      toast.success("Enlace añadido");
    } catch (err) {
      toast.error("Error añadiendo enlace");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-2">
        <h2 className="font-['Playfair_Display'] text-2xl text-[#1a1a1a] font-light">Enlaces de Catálogo</h2>
        <Button onClick={() => setAdding(true)} className="bg-[#C9A96E] hover:bg-[#A67C52] text-white rounded-none px-6 tracking-wider text-sm">
          <Plus className="w-4 h-4 mr-2" /> Añadir Enlace
        </Button>
      </div>
      <p className="text-sm text-[#1a1a1a]/40">Estos enlaces se muestran como botones en la página para que tus clientes accedan a tus catálogos.</p>

      {adding && (
        <div className="bg-white border-2 border-[#C9A96E]/30 p-6 space-y-4">
          <h3 className="text-sm font-medium tracking-wider uppercase text-[#C9A96E]">Nuevo Enlace</h3>
          <div>
            <label className="block text-xs tracking-wider uppercase text-[#1a1a1a]/50 mb-1.5">Nombre del botón *</label>
            <Input value={newForm.title} onChange={e => setNewForm(p => ({...p, title: e.target.value}))} className="rounded-none border-[#C9A96E]/20 h-11" placeholder="Ej: Catálogo San Valentín" />
          </div>
          <div>
            <label className="block text-xs tracking-wider uppercase text-[#1a1a1a]/50 mb-1.5">URL del enlace *</label>
            <Input value={newForm.url} onChange={e => setNewForm(p => ({...p, url: e.target.value}))} className="rounded-none border-[#C9A96E]/20 h-11" placeholder="https://..." />
          </div>
          <div className="flex gap-3 pt-2">
            <Button onClick={handleAdd} disabled={saving} className="bg-[#C9A96E] hover:bg-[#A67C52] text-white rounded-none px-6 text-sm">
              {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />} Guardar
            </Button>
            <Button onClick={() => setAdding(false)} variant="outline" className="rounded-none border-[#C9A96E]/20 text-sm">Cancelar</Button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {catalogLinks.map((link) => (
          <div key={link.id} className="bg-white border border-[#C9A96E]/10 p-5">
            {editingId === link.id ? (
              <div className="space-y-4">
                <Input value={form.title} onChange={e => setForm(p => ({...p, title: e.target.value}))} placeholder="Nombre del botón" className="rounded-none border-[#C9A96E]/20 h-11" />
                <Input value={form.url} onChange={e => setForm(p => ({...p, url: e.target.value}))} placeholder="URL" className="rounded-none border-[#C9A96E]/20 h-11" />
                <div className="flex gap-3">
                  <Button onClick={saveEdit} disabled={saving} className="bg-[#C9A96E] hover:bg-[#A67C52] text-white rounded-none px-6 text-sm">
                    {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />} Guardar
                  </Button>
                  <Button onClick={cancelEdit} variant="outline" className="rounded-none border-[#C9A96E]/20 text-sm">Cancelar</Button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <Link2 className="w-5 h-5 text-[#C9A96E] flex-shrink-0" />
                  <div className="min-w-0">
                    <span className="font-['Playfair_Display'] text-base text-[#1a1a1a]">{link.title}</span>
                    <p className="text-xs text-[#1a1a1a]/30 truncate">{link.url}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-[#1a1a1a]/30 hover:text-[#C9A96E] transition-colors p-2">
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <button onClick={() => startEdit(link)} className="text-[#C9A96E] hover:text-[#A67C52] text-xs tracking-wider uppercase transition-colors px-3 py-2">Editar</button>
                  <button onClick={() => handleDelete(link.id)} className="text-red-400 hover:text-red-600 transition-colors p-2">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
