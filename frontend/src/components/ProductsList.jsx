import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Trash2, Star, Search, Filter, Sparkles, AlertCircle } from "lucide-react";
import { useProductStore } from "../stores/useProductStore";
import ConfirmDeleteModal from "./ConfirmDeleteModal";

const ProductsList = () => {
  const { deleteProduct, toggleFeaturedProduct, products } = useProductStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [productToDelete, setProductToDelete] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    if (!products) return [];
    return products.filter((p) => {
      const matchesSearch =
        p.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || p.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, selectedCategory]);

  const uniqueCategories = useMemo(() => {
    if (!products) return [];
    return Array.from(new Set(products.map((p) => p.category).filter(Boolean)));
  }, [products]);

  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!productToDelete) return;
    await deleteProduct(productToDelete._id);
    setIsDeleteModalOpen(false);
    setProductToDelete(null);
  };

  return (
    <>
      <motion.div
        className="w-full max-w-[1600px] mx-auto rounded-3xl border border-violet-500/25 bg-slate-900/85 p-8 shadow-2xl backdrop-blur-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header & Search Toolbar */}
        <div className="flex flex-col sm:flex-row items-center justify-between pb-6 mb-6 border-b border-slate-800 gap-4">
          <div>
            <h2 className="text-xl font-bold text-white">Product Inventory</h2>
            <p className="text-xs text-gray-400">
              Total items: <span className="font-semibold text-fuchsia-400">{products?.length || 0}</span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
            {/* Search */}
            <div className="relative flex-1 sm:w-60">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-800/80 py-2 pl-9 pr-3 text-xs text-white placeholder-gray-500 focus:border-violet-500 focus:outline-none"
              />
            </div>

            {/* Category Filter */}
            {uniqueCategories.length > 0 && (
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="rounded-xl border border-slate-700 bg-slate-800/80 px-3 py-2 text-xs text-white focus:border-violet-500 focus:outline-none"
              >
                <option value="all">All Categories</option>
                {uniqueCategories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>

        {/* Table / Cards container */}
        {filteredProducts.length === 0 ? (
          <div className="py-16 text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-800 text-gray-400">
              <AlertCircle size={24} />
            </div>
            <h4 className="text-sm font-semibold text-white">No products found</h4>
            <p className="text-xs text-gray-400 mt-1">Try adjusting your search criteria or create a new product.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-800">
              <thead>
                <tr className="border-b border-slate-800 text-left text-[11px] font-bold uppercase tracking-wider text-gray-400">
                  <th className="py-3 px-4">Item Details</th>
                  <th className="py-3 px-4">Price</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4 text-center">Featured</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredProducts.map((product) => (
                  <tr
                    key={product._id}
                    className="group transition-colors hover:bg-slate-800/40"
                  >
                    {/* Item Details */}
                    <td className="py-3 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-12 w-12 rounded-xl object-cover border border-white/5 bg-slate-800"
                        />
                        <div className="min-w-0 max-w-xs">
                          <p className="text-sm font-semibold text-white truncate group-hover:text-fuchsia-300 transition-colors">
                            {product.name}
                          </p>
                          <p className="text-xs text-gray-400 truncate max-w-xs">
                            {product.description}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Price */}
                    <td className="py-3 px-4 whitespace-nowrap">
                      <span className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-300 to-fuchsia-300">
                        ${product.price?.toFixed(2)}
                      </span>
                    </td>

                    {/* Category */}
                    <td className="py-3 px-4 whitespace-nowrap">
                      <span className="inline-block rounded-md bg-violet-500/10 border border-violet-500/20 px-2 py-0.5 text-xs font-semibold text-violet-300 capitalize">
                        {product.category}
                      </span>
                    </td>

                    {/* Featured Star Toggle */}
                    <td className="py-3 px-4 whitespace-nowrap text-center">
                      <button
                        onClick={() => toggleFeaturedProduct(product._id)}
                        className={`p-2 rounded-xl transition ${
                          product.isFeatured
                            ? "bg-amber-400/20 text-amber-400 border border-amber-400/40 shadow-sm"
                            : "bg-slate-800 text-gray-500 hover:text-gray-300 border border-slate-700"
                        }`}
                        title={product.isFeatured ? "Featured item (click to remove)" : "Click to mark as featured"}
                      >
                        <Star size={16} fill={product.isFeatured ? "currentColor" : "none"} />
                      </button>
                    </td>

                    {/* Delete Action */}
                    <td className="py-3 px-4 whitespace-nowrap text-right">
                      <button
                        onClick={() => handleDeleteClick(product)}
                        className="p-2 rounded-xl text-gray-400 hover:bg-rose-500/20 hover:text-rose-400 hover:border-rose-500/30 border border-transparent transition"
                        title="Delete product"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>

      {/* Delete Confirmation Modal */}
      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        itemName={productToDelete?.name}
      />
    </>
  );
};

export default ProductsList;
