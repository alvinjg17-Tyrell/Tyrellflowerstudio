import { useState, useRef } from "react";
import { api } from "../../lib/api";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Plus, Trash2, Save, Loader2, ChevronDown, ChevronUp, Image as ImageIcon, X, Video, ChevronRight, ChevronLeft } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

// Multi-image gallery for a product
const ProductGalleryEditor = ({ product, onUpdate }) => {
  const [uploading, setUploading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const fileRef = useRef(null);
  const videoRef = useRef(null);

  // Combine main image with additional images
  const allMedia = [
    product.image, 
    ...(product.images || []),
    product.video
  ].filter(Boolean);

  const handleUpload = async (e, isVideo = false) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post(`${BACKEND_URL}/api/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const url = `${BACKEND_URL}${res.data.url}`;
      
      if (isVideo) {
        onUpdate({ ...product, video: url });
      } else if (!product.image) {
        // First image becomes main image
        onUpdate({ 
          ...product, 
          image: url,
          imagePosition: { x: 50, y: 50 }
        });
      } else {
        // Additional images
        onUpdate({ 
          ...product, 
          images: [...(product.images || []), url]
        });
      }
      toast.success(isVideo ? "Video subido" : "Imagen subida");
    } catch (err) {
      toast.error("Error subiendo archivo");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
      if (videoRef.current) videoRef.current.value = "";
    }
  };

  const removeMedia = (index) => {
    if (index === 0 && product.image) {
      // Remove main image, promote first additional image if exists
      const newImages = product.images || [];
      if (newImages.length > 0) {
        onUpdate({
          ...product,
          image: newImages[0],
          images: newImages.slice(1)
        });
      } else {
        onUpdate({ ...product, image: "", imagePosition: {} });
      }
    } else {
      // Remove from additional images
      const adjustedIndex = index - 1;
      if (product.images && product.images[adjustedIndex]) {
        onUpdate({
          ...product,
          images: product.images.filter((_, i) => i !== adjustedIndex)
        });
      } else if (product.video) {
        onUpdate({ ...product, video: "" });
      }
    }
    setActiveIndex(0);
  };

  return (
    <div className="space-y-2">
      {/* Main Preview */}
      <div className="relative aspect-[3/4] bg-gray-100 rounded overflow-hidden group">
        {allMedia.length > 0 ? (
          <>
            {/* Current media */}
            {allMedia[activeIndex]?.includes('.mp4') || allMedia[activeIndex]?.includes('.mov') ? (
              <video
                src={allMedia[activeIndex]}
                className="w-full h-full object-cover"
                style={{
                  objectPosition: `${product.imagePosition?.x || 50}% ${product.imagePosition?.y || 50}%`
                }}
                muted
                loop
                autoPlay
                playsInline
              />
            ) : (
              <img
                src={allMedia[activeIndex]}
                alt={product.name || "Producto"}
                className="w-full h-full object-cover"
                style={{
                  objectPosition: `${product.imagePosition?.x || 50}% ${product.imagePosition?.y || 50}%`
                }}
              />
            )}

            {/* Navigation arrows */}
            {allMedia.length > 1 && (
              <>
                <button
                  onClick={() => setActiveIndex(prev => (prev - 1 + allMedia.length) % allMedia.length)}
                  className="absolute left-1 top-1/2 -translate-y-1/2 w-6 h-6 bg-white/80 rounded-full flex items-center justify-center shadow hover:bg-white"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setActiveIndex(prev => (prev + 1) % allMedia.length)}
                  className="absolute right-1 top-1/2 -translate-y-1/2 w-6 h-6 bg-white/80 rounded-full flex items-center justify-center shadow hover:bg-white"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </>
            )}

            {/* Counter */}
            {allMedia.length > 1 && (
              <div className="absolute bottom-1 left-1/2 -translate-x-1/2 bg-black/50 text-white text-[10px] px-2 py-0.5 rounded-full">
                {activeIndex + 1} / {allMedia.length}
              </div>
            )}

            {/* Remove button */}
            <button
              onClick={() => removeMedia(activeIndex)}
              className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="w-3 h-3" />
            </button>
          </>
        ) : (
          <button
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
            className="w-full h-full flex flex-col items-center justify-center gap-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors"
          >
            {uploading ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              <>
                <ImageIcon className="w-8 h-8" />
                <span className="text-xs">Subir imagen</span>
              </>
            )}
          </button>
        )}
      </div>

      {/* Thumbnails */}
      {allMedia.length > 0 && (
        <div className="flex gap-1 overflow-x-auto">
          {allMedia.map((media, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`w-10 h-10 flex-shrink-0 rounded overflow-hidden border-2 ${
                activeIndex === i ? "border-tyrell-gold" : "border-transparent"
              }`}
            >
              {media?.includes('.mp4') || media?.includes('.mov') ? (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <Video className="w-4 h-4 text-gray-500" />
                </div>
              ) : (
                <img src={media} alt="" className="w-full h-full object-cover" />
              )}
            </button>
          ))}
        </div>
      )}

      {/* Add more buttons */}
      <div className="flex gap-2">
        <button
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          className="flex-1 py-1.5 text-[10px] uppercase tracking-wider border border-dashed border-gray-300 rounded hover:border-tyrell-gold hover:text-tyrell-gold transition-colors flex items-center justify-center gap-1"
        >
          <Plus className="w-3 h-3" /> Imagen
        </button>
        <button
          onClick={() => videoRef.current?.click()}
          disabled={uploading}
          className="flex-1 py-1.5 text-[10px] uppercase tracking-wider border border-dashed border-gray-300 rounded hover:border-tyrell-gold hover:text-tyrell-gold transition-colors flex items-center justify-center gap-1"
        >
          <Video className="w-3 h-3" /> Video
        </button>
      </div>

      {/* Image position controls */}
      {product.image && (
        <div className="space-y-1 pt-2 border-t border-gray-100">
          <p className="text-[10px] text-gray-400 uppercase tracking-wider">Posición imagen principal</p>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[9px] text-gray-400">Horizontal</label>
              <input
                type="range"
                min="0"
                max="100"
                value={product.imagePosition?.x || 50}
                onChange={(e) => onUpdate({
                  ...product,
                  imagePosition: { ...product.imagePosition, x: parseInt(e.target.value) }
                })}
                className="w-full h-1 accent-tyrell-gold"
              />
            </div>
            <div>
              <label className="text-[9px] text-gray-400">Vertical</label>
              <input
                type="range"
                min="0"
                max="100"
                value={product.imagePosition?.y || 50}
                onChange={(e) => onUpdate({
                  ...product,
                  imagePosition: { ...product.imagePosition, y: parseInt(e.target.value) }
                })}
                className="w-full h-1 accent-tyrell-gold"
              />
            </div>
          </div>
        </div>
      )}
      
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        onChange={(e) => handleUpload(e, false)}
        className="hidden"
      />
      <input
        ref={videoRef}
        type="file"
        accept="video/mp4,video/quicktime,video/mov"
        onChange={(e) => handleUpload(e, true)}
        className="hidden"
      />
    </div>
  );
};

// Single product card in admin
const ProductCard = ({ product, onUpdate, onDelete }) => {
  const allMedia = [product.image, ...(product.images || []), product.video].filter(Boolean);
  
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden w-[180px] flex-shrink-0">
      <ProductGalleryEditor product={product} onUpdate={onUpdate} />
      <div className="p-2 space-y-1.5">
        <Input
          value={product.name || ""}
          onChange={(e) => onUpdate({ ...product, name: e.target.value })}
          placeholder="Nombre del producto"
          className="h-8 text-xs rounded border-gray-200"
        />
        <Input
          value={product.price || ""}
          onChange={(e) => onUpdate({ ...product, price: e.target.value })}
          placeholder="Precio (opcional)"
          className="h-7 text-xs rounded border-gray-200"
        />
        {allMedia.length > 1 && (
          <p className="text-[10px] text-tyrell-gold">{allMedia.length} archivos</p>
        )}
        <button
          onClick={onDelete}
          className="w-full text-[10px] text-red-400 hover:text-red-600 py-1 transition-colors"
        >
          Eliminar producto
        </button>
      </div>
    </div>
  );
};

// Category section with its products
const CategorySection = ({ category, onUpdate, onDelete, saving }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [localCategory, setLocalCategory] = useState(category);

  const addProduct = () => {
    const newProduct = {
      id: `temp-${Date.now()}`,
      name: "",
      image: "",
      images: [],
      video: "",
      imagePosition: { x: 50, y: 50 },
      price: "",
      order: localCategory.products.length
    };
    setLocalCategory(prev => ({
      ...prev,
      products: [...prev.products, newProduct]
    }));
  };

  const updateProduct = (index, updatedProduct) => {
    setLocalCategory(prev => ({
      ...prev,
      products: prev.products.map((p, i) => i === index ? updatedProduct : p)
    }));
  };

  const deleteProduct = (index) => {
    if (!window.confirm("¿Eliminar este producto?")) return;
    setLocalCategory(prev => ({
      ...prev,
      products: prev.products.filter((_, i) => i !== index)
    }));
  };

  const handleSave = () => {
    onUpdate(localCategory);
  };

  return (
    <div className="bg-white border border-tyrell-gold/20 rounded-lg overflow-hidden">
      {/* Category Header */}
      <div 
        className="flex items-center justify-between p-4 bg-tyrell-ivory cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          {isExpanded ? <ChevronUp className="w-4 h-4 text-tyrell-gold" /> : <ChevronDown className="w-4 h-4 text-tyrell-gold" />}
          <div>
            <h3 className="font-display text-lg text-tyrell-dark">{localCategory.name || "Nueva Categoría"}</h3>
            <span className="text-xs text-gray-500">{localCategory.products.length} productos</span>
          </div>
        </div>
        <div className="flex items-center gap-2" onClick={e => e.stopPropagation()}>
          <Button
            onClick={handleSave}
            disabled={saving}
            size="sm"
            className="bg-tyrell-gold hover:bg-tyrell-gold-dark text-white text-xs h-8"
          >
            {saving ? <Loader2 className="w-3 h-3 animate-spin" /> : <Save className="w-3 h-3 mr-1" />}
            Guardar
          </Button>
          <button
            onClick={() => onDelete(category.id)}
            className="p-2 text-red-400 hover:text-red-600 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Category Content */}
      {isExpanded && (
        <div className="p-4 space-y-4">
          {/* Category Name */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase text-gray-500 mb-1">Nombre de la categoría</label>
              <Input
                value={localCategory.name}
                onChange={(e) => setLocalCategory(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Ej: Ramos, Flower Box, etc."
                className="rounded border-gray-200"
              />
            </div>
            <div>
              <label className="block text-xs uppercase text-gray-500 mb-1">Descripción (opcional)</label>
              <Input
                value={localCategory.description}
                onChange={(e) => setLocalCategory(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Descripción breve"
                className="rounded border-gray-200"
              />
            </div>
          </div>

          {/* Products Carousel */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs uppercase text-gray-500">Productos en esta categoría</label>
              <Button
                onClick={addProduct}
                size="sm"
                variant="outline"
                className="text-xs h-7 border-tyrell-gold text-tyrell-gold hover:bg-tyrell-gold/10"
              >
                <Plus className="w-3 h-3 mr-1" /> Añadir Producto
              </Button>
            </div>

            {localCategory.products.length > 0 ? (
              <div className="relative">
                {/* Scrollable container */}
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide" style={{ scrollbarWidth: 'none' }}>
                  {localCategory.products.map((product, index) => (
                    <ProductCard
                      key={product.id || index}
                      product={product}
                      onUpdate={(updated) => updateProduct(index, updated)}
                      onDelete={() => deleteProduct(index)}
                    />
                  ))}
                </div>
                <p className="text-[10px] text-gray-400 mt-2">← Desliza para ver más productos →</p>
              </div>
            ) : (
              <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-lg">
                <ImageIcon className="w-8 h-8 mx-auto text-gray-300 mb-2" />
                <p className="text-sm text-gray-400">No hay productos en esta categoría</p>
                <p className="text-xs text-gray-300">Haz clic en "Añadir Producto" para comenzar</p>
              </div>
            )}
          </div>

          {/* Preview */}
          <div className="pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-400 uppercase mb-2">Vista previa (como se verá en la página)</p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-display text-xl text-tyrell-dark mb-3">{localCategory.name || "Nombre de categoría"}</h4>
              <div className="flex gap-3 overflow-x-auto pb-2">
                {localCategory.products.slice(0, 5).map((product, i) => {
                  const mediaCount = [product.image, ...(product.images || []), product.video].filter(Boolean).length;
                  return (
                    <div key={i} className="w-[120px] flex-shrink-0">
                      <div className="aspect-[3/4] bg-gray-200 rounded overflow-hidden mb-2 relative">
                        {product.image && (
                          <img 
                            src={product.image} 
                            alt={product.name} 
                            className="w-full h-full object-cover"
                            style={{
                              objectPosition: `${product.imagePosition?.x || 50}% ${product.imagePosition?.y || 50}%`
                            }}
                          />
                        )}
                        {mediaCount > 1 && (
                          <div className="absolute bottom-1 right-1 bg-black/50 text-white text-[9px] px-1.5 py-0.5 rounded">
                            +{mediaCount - 1}
                          </div>
                        )}
                      </div>
                      <p className="text-xs font-medium truncate">{product.name || "Nombre"}</p>
                      <button className="text-[10px] text-tyrell-gold uppercase mt-1">Pedir</button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const AdminCategories = ({ categories, setCategories }) => {
  const [saving, setSaving] = useState(false);

  const addCategory = async () => {
    try {
      setSaving(true);
      const newCategory = await api.createCategory({
        name: "Nueva Categoría",
        description: "",
        products: [],
        order: categories.length,
        active: true
      });
      setCategories(prev => [...prev, newCategory]);
      toast.success("Categoría creada");
    } catch (err) {
      toast.error("Error creando categoría");
    } finally {
      setSaving(false);
    }
  };

  const updateCategory = async (updatedCategory) => {
    try {
      setSaving(true);
      const result = await api.updateCategory(updatedCategory.id, {
        name: updatedCategory.name,
        description: updatedCategory.description,
        products: updatedCategory.products,
        order: updatedCategory.order,
        active: updatedCategory.active !== false
      });
      setCategories(prev => prev.map(c => c.id === updatedCategory.id ? result : c));
      toast.success("Categoría actualizada");
    } catch (err) {
      toast.error("Error actualizando categoría");
    } finally {
      setSaving(false);
    }
  };

  const deleteCategory = async (id) => {
    if (!window.confirm("¿Eliminar esta categoría y todos sus productos?")) return;
    try {
      await api.deleteCategory(id);
      setCategories(prev => prev.filter(c => c.id !== id));
      toast.success("Categoría eliminada");
    } catch (err) {
      toast.error("Error eliminando categoría");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl text-tyrell-dark font-light">Categorías de Productos</h2>
          <p className="text-sm text-gray-500 mt-1">Organiza tus productos por categorías (Ramos, Flower Box, etc.)</p>
        </div>
        <Button
          onClick={addCategory}
          disabled={saving}
          className="bg-tyrell-gold hover:bg-tyrell-gold-dark text-white"
        >
          <Plus className="w-4 h-4 mr-2" /> Nueva Categoría
        </Button>
      </div>

      {categories.length > 0 ? (
        <div className="space-y-4">
          {categories.map((category) => (
            <CategorySection
              key={category.id}
              category={category}
              onUpdate={updateCategory}
              onDelete={deleteCategory}
              saving={saving}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white border-2 border-dashed border-gray-200 rounded-lg">
          <ImageIcon className="w-12 h-12 mx-auto text-gray-300 mb-3" />
          <h3 className="text-lg text-gray-500 mb-1">No hay categorías aún</h3>
          <p className="text-sm text-gray-400 mb-4">Crea tu primera categoría para organizar tus productos</p>
          <Button onClick={addCategory} className="bg-tyrell-gold hover:bg-tyrell-gold-dark text-white">
            <Plus className="w-4 h-4 mr-2" /> Crear Primera Categoría
          </Button>
        </div>
      )}
    </div>
  );
};
