import { useEffect, useState } from "react";
import CategoryItem from "../components/CategoryItem";
import { useProductStore } from "../stores/useProductStore";
import FeaturedProducts from "../components/FeaturedProducts";
import { CATEGORIES } from "../data/categories";
import {
  Sparkles,
  ArrowRight,
  Tag,
  Flame,
  Compass,
  Copy,
  ShieldCheck,
  Zap,
  Leaf,
  Lock,
  TrendingUp,
} from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const HomePage = () => {
  const { fetchFeaturedProducts, products, isLoading } = useProductStore();
  const [selectedFilter, setSelectedFilter] = useState("all");

  useEffect(() => {
    fetchFeaturedProducts();
  }, [fetchFeaturedProducts]);

  const copyPromoCode = (code) => {
    navigator.clipboard.writeText(code);
    toast.success(`Promo code "${code}" copied to clipboard! ✨`, {
      id: "promo-copy",
    });
  };

  const filteredCategories = CATEGORIES.filter((cat) => {
    if (selectedFilter === "trending") return cat.badge === "Trending" || cat.badge === "Hot";
    if (selectedFilter === "luxury") return cat.badge === "Luxury" || cat.badge === "Signature";
    return true;
  });

  return (
    <div className="relative min-h-screen w-full text-white overflow-hidden pb-20">
      {/* Luxury Editorial Hero Section with High-Res Fashion Background Image */}
      <section className="relative z-10 w-full min-h-[580px] lg:min-h-[660px] flex items-center border-b border-slate-800/80 overflow-hidden">
        {/* Background Fashion Imagery with Dark Vignette Overlays */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-105"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=2070&q=80')`,
          }}
        />
        {/* Multi-layered dark scrim for readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-slate-950/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/80" />
        <div className="absolute -top-32 left-1/4 h-96 w-96 rounded-full bg-violet-600/20 blur-[130px] pointer-events-none" />

        {/* Hero Content */}
        <div className="relative z-10 w-full px-6 sm:px-10 lg:px-16 xl:px-24 py-16 sm:py-20">
          <div className="max-w-3xl">
            {/* Season Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/40 bg-slate-950/70 backdrop-blur-md px-4 py-1.5 text-xs sm:text-sm font-bold text-violet-300 mb-6 shadow-md">
              <Sparkles size={16} className="text-fuchsia-400 animate-pulse" />
              <span>FALL / WINTER LUXURY DROP 2026</span>
            </div>

            {/* Well-Proportioned, Refined Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight mb-5">
              Shop the{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-500">
                Trend
              </span>
              , Wear the{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-300 to-indigo-400">
                Style
              </span>
            </h1>

            {/* Rich Editorial Brand Narrative */}
            <p className="text-base sm:text-lg lg:text-xl text-gray-200 font-normal leading-relaxed mb-8 max-w-2xl">
              Redefining contemporary streetwear through sculptural silhouettes, limited-run textiles, and uncompromised bespoke craftsmanship. Designed for those who don’t just follow trends—they define culture.
            </p>

            {/* Brand Value Pillars Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-9 text-xs sm:text-sm font-semibold text-gray-300">
              <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-900/60 backdrop-blur-md border border-white/5">
                <ShieldCheck size={16} className="text-violet-400 shrink-0" />
                <span>100% Authentic Fits</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-900/60 backdrop-blur-md border border-white/5">
                <Zap size={16} className="text-fuchsia-400 shrink-0" />
                <span>Express 48h Dispatch</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-900/60 backdrop-blur-md border border-white/5">
                <Leaf size={16} className="text-emerald-400 shrink-0" />
                <span>Eco Organic Cottons</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-900/60 backdrop-blur-md border border-white/5">
                <Lock size={16} className="text-pink-400 shrink-0" />
                <span>Stripe Encrypted</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
              <a
                href="#categories-section"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 px-8 py-3.5 text-sm sm:text-base font-bold text-white shadow-xl shadow-violet-600/35 transition-all hover:scale-105 hover:opacity-95"
              >
                <Compass size={18} />
                Explore Collections
              </a>
              <Link
                to="/category/t-shirts"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-2xl border border-slate-700 bg-slate-900/80 px-8 py-3.5 text-sm sm:text-base font-bold text-white backdrop-blur-md transition-all hover:bg-slate-800 hover:border-slate-600"
              >
                Browse Latest Drops
                <ArrowRight size={16} />
              </Link>
            </div>

            {/* Quick Trending Keyword Pills */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-gray-400">
              <span className="font-semibold text-gray-300 flex items-center gap-1">
                <TrendingUp size={13} className="text-fuchsia-400" /> Trending:
              </span>
              <Link to="/category/t-shirts" className="hover:text-fuchsia-400 underline decoration-slate-700 underline-offset-4 transition">
                Acid Wash Tees
              </Link>
              <span>•</span>
              <Link to="/category/jeans" className="hover:text-fuchsia-400 underline decoration-slate-700 underline-offset-4 transition">
                Selvedge Denim
              </Link>
              <span>•</span>
              <Link to="/category/jackets" className="hover:text-fuchsia-400 underline decoration-slate-700 underline-offset-4 transition">
                Leather Bikers
              </Link>
              <span>•</span>
              <Link to="/category/watches" className="hover:text-fuchsia-400 underline decoration-slate-700 underline-offset-4 transition">
                Chronographs
              </Link>
              <span>•</span>
              <Link to="/category/hoodies" className="hover:text-fuchsia-400 underline decoration-slate-700 underline-offset-4 transition">
                Heavyweight Fleece
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Stats Bar */}
      <section className="w-full border-b border-slate-800/60 bg-slate-900/40 py-6 px-6 sm:px-10 lg:px-16 xl:px-24">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="flex items-center justify-center gap-4">
            <span className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">
              15,000+
            </span>
            <span className="text-xs sm:text-sm font-semibold text-gray-300 text-left">
              Active Global<br />Trendsetters
            </span>
          </div>
          <div className="flex items-center justify-center gap-4 border-y sm:border-y-0 sm:border-x border-slate-800 py-3 sm:py-0">
            <span className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-pink-400">
              500+
            </span>
            <span className="text-xs sm:text-sm font-semibold text-gray-300 text-left">
              Curated Luxury<br />Silhouettes
            </span>
          </div>
          <div className="flex items-center justify-center gap-4">
            <span className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-400">
              4.9 ★
            </span>
            <span className="text-xs sm:text-sm font-semibold text-gray-300 text-left">
              Verified 5-Star<br />Customer Score
            </span>
          </div>
        </div>
      </section>

      {/* Promotional Sale Voucher Banner */}
      <section className="w-full px-6 sm:px-10 lg:px-16 xl:px-24 my-14">
        <div className="relative w-full overflow-hidden rounded-3xl border border-violet-500/30 bg-gradient-to-r from-violet-950/80 via-purple-950/70 to-fuchsia-950/80 p-8 sm:p-10 backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="flex items-center gap-5 text-center md:text-left">
            <div className="hidden sm:flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-fuchsia-500/20 border border-fuchsia-500/40 text-fuchsia-400 shadow-inner">
              <Flame size={32} />
            </div>
            <div>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/30 mb-2">
                Seasonal VIP Voucher
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                Get 20% Off Your Entire Cart
              </h2>
              <p className="text-sm sm:text-base text-gray-300 mt-1">
                Apply discount voucher code at checkout for instant order reduction on all luxury streetwear.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 shrink-0">
            <button
              onClick={() => copyPromoCode("TREND20")}
              className="flex items-center gap-2.5 rounded-2xl border-2 border-dashed border-violet-400/80 bg-violet-950/90 px-5 py-3 text-base sm:text-lg font-mono font-black text-violet-200 hover:bg-violet-900/80 hover:border-violet-300 transition"
              title="Click to copy voucher code"
            >
              <Tag size={18} />
              <span>TREND20</span>
              <Copy size={16} className="text-gray-400 hover:text-white" />
            </button>
            <Link
              to="/category/jackets"
              className="rounded-2xl bg-gradient-to-r from-fuchsia-600 to-pink-600 px-6 py-3.5 text-sm sm:text-base font-bold text-white shadow-xl shadow-fuchsia-600/30 hover:opacity-95 transition whitespace-nowrap"
            >
              Shop Sale
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Grid Section */}
      <section id="categories-section" className="relative z-10 w-full px-6 sm:px-10 lg:px-16 xl:px-24 mt-14 mb-20">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-10 gap-5">
          <div>
            <div className="flex items-center gap-2 mb-1 justify-center sm:justify-start">
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-fuchsia-400">
                Curated Collections
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight text-center sm:text-left">
              Explore by Category
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 rounded-2xl border border-slate-800 bg-slate-900/90 p-1.5 backdrop-blur-md">
            <button
              onClick={() => setSelectedFilter("all")}
              className={`rounded-xl px-4 py-2 text-xs sm:text-sm font-bold transition ${
                selectedFilter === "all"
                  ? "bg-violet-600 text-white shadow-md shadow-violet-600/30"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              All ({CATEGORIES.length})
            </button>
            <button
              onClick={() => setSelectedFilter("trending")}
              className={`rounded-xl px-4 py-2 text-xs sm:text-sm font-bold transition ${
                selectedFilter === "trending"
                  ? "bg-violet-600 text-white shadow-md shadow-violet-600/30"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Trending
            </button>
            <button
              onClick={() => setSelectedFilter("luxury")}
              className={`rounded-xl px-4 py-2 text-xs sm:text-sm font-bold transition ${
                selectedFilter === "luxury"
                  ? "bg-violet-600 text-white shadow-md shadow-violet-600/30"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Luxury
            </button>
          </div>
        </div>

        {/* Categories Grid - Expansive 6-columns on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 sm:gap-7 w-full">
          {filteredCategories.map((category) => (
            <CategoryItem category={category} key={category.id} />
          ))}
        </div>
      </section>

      {/* Featured Products Carousel */}
      {!isLoading && products.length > 0 && (
        <FeaturedProducts featuredProducts={products} />
      )}
    </div>
  );
};

export default HomePage;
