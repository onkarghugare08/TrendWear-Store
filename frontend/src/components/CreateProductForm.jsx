import { useState } from "react";
import { motion } from "framer-motion";
import { PlusCircle, Upload, Loader, Image as ImageIcon, X, CheckCircle, Sparkles } from "lucide-react";
import { useProductStore } from "../stores/useProductStore";
import { CATEGORIES } from "../data/categories";

const CreateProductForm = ({ onProductCreated }) => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
  });

  const { createProduct, loading } = useProductStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProduct(newProduct);
      setNewProduct({
        name: "",
        description: "",
        price: "",
        category: "",
        image: "",
      });
      if (onProductCreated) {
        onProductCreated();
      }
    } catch {
      console.log("error creating a product");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProduct({ ...newProduct, image: reader.result });
      };
      reader.readAsDataURL(file); // base64
    }
  };

  const removeImage = () => {
    setNewProduct({ ...newProduct, image: "" });
  };

  return (
    <motion.div
      className="max-w-2xl mx-auto rounded-3xl border border-violet-500/20 bg-slate-900/80 p-6 sm:p-10 shadow-2xl backdrop-blur-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-tr from-violet-600 to-fuchsia-600 text-white shadow-lg shadow-violet-600/30">
          <PlusCircle size={22} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">Create New Product</h2>
          <p className="text-xs text-gray-400">Add apparel or accessories to your digital store</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Product Name */}
        <div>
          <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1.5">
            Product Title <span className="text-fuchsia-400">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="e.g. Vintage Washed Street Hoodie"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            className="w-full rounded-xl border border-slate-700 bg-slate-800/80 py-2.5 px-4 text-sm text-white placeholder-gray-500 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500 transition"
            required
          />
        </div>

        {/* Category & Price (2 Cols) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="category" className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1.5">
              Category <span className="text-fuchsia-400">*</span>
            </label>
            <select
              id="category"
              name="category"
              value={newProduct.category}
              onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
              className="w-full rounded-xl border border-slate-700 bg-slate-800/80 py-2.5 px-4 text-sm text-white focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500 transition"
              required
            >
              <option value="">Select a category</option>
              {CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="price" className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1.5">
              Price (USD) <span className="text-fuchsia-400">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
              <input
                type="number"
                id="price"
                name="price"
                placeholder="49.99"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                step="0.01"
                min="0"
                className="w-full rounded-xl border border-slate-700 bg-slate-800/80 py-2.5 pl-8 pr-4 text-sm text-white placeholder-gray-500 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500 transition"
                required
              />
            </div>
          </div>
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1.5">
            Product Description <span className="text-fuchsia-400">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            rows="3"
            placeholder="Highlight fit, fabric weight, composition, and styling recommendations..."
            value={newProduct.description}
            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
            className="w-full rounded-xl border border-slate-700 bg-slate-800/80 py-2.5 px-4 text-sm text-white placeholder-gray-500 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500 transition"
            required
          />
        </div>

        {/* Image Upload Area */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1.5">
            Product Imagery <span className="text-fuchsia-400">*</span>
          </label>

          {newProduct.image ? (
            <div className="relative rounded-2xl border border-violet-500/40 bg-slate-800/60 p-3 flex items-center gap-4">
              <img
                src={newProduct.image}
                alt="Product preview"
                className="h-20 w-20 rounded-xl object-cover border border-white/10"
              />
              <div className="flex-1 min-w-0">
                <span className="inline-flex items-center gap-1 text-xs text-emerald-400 font-semibold mb-1">
                  <CheckCircle size={14} /> Ready for upload
                </span>
                <p className="text-xs text-gray-400 truncate">Image selected successfully</p>
              </div>
              <button
                type="button"
                onClick={removeImage}
                className="rounded-xl p-2 text-gray-400 hover:bg-rose-500/20 hover:text-rose-400 transition"
                title="Remove image"
              >
                <X size={18} />
              </button>
            </div>
          ) : (
            <div className="relative rounded-2xl border-2 border-dashed border-slate-700 bg-slate-800/40 p-6 text-center hover:border-violet-500/50 transition">
              <input
                type="file"
                id="image"
                className="sr-only"
                accept="image/*"
                onChange={handleImageChange}
                required
              />
              <label htmlFor="image" className="cursor-pointer flex flex-col items-center">
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-600/20 text-violet-400">
                  <Upload size={22} />
                </div>
                <span className="text-sm font-semibold text-white">
                  Click to select high-res image
                </span>
                <span className="text-xs text-gray-400 mt-0.5">
                  PNG, JPG, WEBP up to 10MB
                </span>
              </label>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 py-3.5 px-6 text-sm font-bold text-white shadow-xl shadow-violet-600/30 transition hover:opacity-95 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader className="h-5 w-5 animate-spin" />
              <span>Uploading to Cloud & Publishing...</span>
            </>
          ) : (
            <>
              <Sparkles size={18} />
              <span>Publish Product to Store</span>
            </>
          )}
        </button>
      </form>
    </motion.div>
  );
};

export default CreateProductForm;
