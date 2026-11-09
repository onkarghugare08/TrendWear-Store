import { useEffect, useState, useMemo } from "react";
import { useProductStore } from "../stores/useProductStore";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import ProductCard from "../components/ProductCard";
import { CATEGORIES } from "../data/categories";
import { MOCK_PRODUCTS } from "../data/mockProducts";
import { Search, ArrowLeft, Filter } from "lucide-react";

const CategoryPage = () => {
  const { category } = useParams();
  const { fetchProductsByCategory, products, loading } = useProductStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [priceFilter, setPriceFilter] = useState("all");

  useEffect(() => {
    fetchProductsByCategory(category);
  }, [fetchProductsByCategory, category]);

  // Find category metadata
  const categoryMeta = useMemo(() => {
    return (
      CATEGORIES.find((c) => c.id === category || c.href.replace("/", "") === category) || {
        name: category.charAt(0).toUpperCase() + category.slice(1),
        description: "Explore exclusive pieces curated for the season.",
        imageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80",
      }
    );
  }, [category]);

  // Fallback to mock products if backend has 0 products in this category
  const allAvailableProducts = useMemo(() => {
    if (products && products.length > 0) {
      return products;
    }
    const fallback = MOCK_PRODUCTS[category] || [];
    return fallback;
  }, [products, category]);

  // Apply search, price filter, and sorting
  const filteredProducts = useMemo(() => {
    let result = [...allAvailableProducts];

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name?.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q)
      );
    }

    // Price range filter
    if (priceFilter === "under50") {
      result = result.filter((p) => p.price < 50);
    } else if (priceFilter === "50to100") {
      result = result.filter((p) => p.price >= 50 && p.price <= 100);
    } else if (priceFilter === "over100") {
      result = result.filter((p) => p.price > 100);
    }

    // Sort order
    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [allAvailableProducts, searchQuery, priceFilter, sortBy]);

  return (
    <div className="min-h-screen w-full text-white pb-24">
      {/* Category Hero Header Banner - Full Width */}
      <div className="relative h-72 sm:h-96 w-full overflow-hidden border-b border-slate-800">
        <img
          src={categoryMeta.imageUrl}
          alt={categoryMeta.name}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-slate-950/40" />

        <div className="absolute inset-0 w-full px-6 sm:px-10 lg:px-16 xl:px-24 flex flex-col justify-end pb-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2.5 text-sm sm:text-base text-gray-300 mb-3 font-medium">
            <Link to="/" className="hover:text-white transition flex items-center gap-1.5">
              <ArrowLeft size={16} /> Home
            </Link>
            <span>/</span>
            <span className="text-gray-400">Collections</span>
            <span>/</span>
            <span className="text-fuchsia-400 font-bold">{categoryMeta.name}</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white mb-2">
            {categoryMeta.name}
          </h1>
          <p className="text-base sm:text-xl text-gray-200 max-w-3xl font-normal leading-relaxed">
            {categoryMeta.description || `Browse our latest selection of ${categoryMeta.name}.`}
          </p>
        </div>
      </div>

      <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24 pt-10">
        {/* Search & Filter Toolbar - Full Width */}
        <div className="mb-10 w-full rounded-3xl border border-slate-800 bg-slate-900/80 p-5 backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-5 shadow-xl">
          {/* Live Search input */}
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder={`Search within ${categoryMeta.name}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-2xl border border-slate-700 bg-slate-800/90 py-3 pl-12 pr-4 text-sm sm:text-base text-white placeholder-gray-400 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/30"
            />
          </div>

          {/* Controls: Price Filters & Sort */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-between md:justify-end">
            {/* Price Filter Chips */}
            <div className="flex items-center gap-2 text-sm font-semibold">
              <span className="text-gray-300 hidden sm:inline mr-1">Price:</span>
              <button
                onClick={() => setPriceFilter("all")}
                className={`rounded-xl px-4 py-2 transition ${
                  priceFilter === "all"
                    ? "bg-violet-600 text-white shadow-md shadow-violet-600/30"
                    : "bg-slate-800 text-gray-300 hover:text-white"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setPriceFilter("under50")}
                className={`rounded-xl px-4 py-2 transition ${
                  priceFilter === "under50"
                    ? "bg-violet-600 text-white shadow-md shadow-violet-600/30"
                    : "bg-slate-800 text-gray-300 hover:text-white"
                }`}
              >
                &lt; $50
              </button>
              <button
                onClick={() => setPriceFilter("50to100")}
                className={`rounded-xl px-4 py-2 transition ${
                  priceFilter === "50to100"
                    ? "bg-violet-600 text-white shadow-md shadow-violet-600/30"
                    : "bg-slate-800 text-gray-300 hover:text-white"
                }`}
              >
                $50 - $100
              </button>
              <button
                onClick={() => setPriceFilter("over100")}
                className={`rounded-xl px-4 py-2 transition ${
                  priceFilter === "over100"
                    ? "bg-violet-600 text-white shadow-md shadow-violet-600/30"
                    : "bg-slate-800 text-gray-300 hover:text-white"
                }`}
              >
                $100+
              </button>
            </div>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-2xl border border-slate-700 bg-slate-800/90 px-4 py-2.5 text-sm font-bold text-white focus:border-violet-500 focus:outline-none"
            >
              <option value="default">Sort: Recommended</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name: A to Z</option>
            </select>
          </div>
        </div>

        {/* Results counter */}
        <div className="flex items-center justify-between mb-8">
          <p className="text-sm sm:text-base text-gray-300 font-medium">
            Showing <span className="font-bold text-white">{filteredProducts.length}</span> luxury styles
          </p>
        </div>

        {/* Products Grid - Fluid wide grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-24 text-center rounded-3xl border border-slate-800 bg-slate-900/40 p-10">
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-slate-800 text-gray-400">
              <Filter size={32} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">No products found</h3>
            <p className="text-base text-gray-300 max-w-md mx-auto mb-8">
              We couldn't find any products matching your current filters. Try resetting your search or filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setPriceFilter("all");
                setSortBy("default");
              }}
              className="rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-7 py-3 text-sm sm:text-base font-bold text-white shadow-md shadow-violet-600/30 hover:opacity-95"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 sm:gap-7 w-full"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
