import { useEffect, useState } from "react";
import { ShoppingBag, ChevronLeft, ChevronRight, Star, Heart, Sparkles } from "lucide-react";
import { useCartStore } from "../stores/useCartStore";
import { useUserStore } from "../stores/useUserStore";
import { useWishlistStore } from "../stores/useWishlistStore";
import toast from "react-hot-toast";
import AddToCartModal from "./AddToCartModal";

const FeaturedProducts = ({ featuredProducts }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { addToCart } = useCartStore();
  const { user } = useUserStore();
  const { isInWishlist, toggleWishlist } = useWishlistStore();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setItemsPerPage(1);
      else if (window.innerWidth < 1024) setItemsPerPage(2);
      else if (window.innerWidth < 1440) setItemsPerPage(3);
      else setItemsPerPage(4);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, featuredProducts.length - itemsPerPage));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const isStartDisabled = currentIndex === 0;
  const isEndDisabled = currentIndex >= Math.max(0, featuredProducts.length - itemsPerPage);

  const handleOpenAddModal = (product) => {
    if (!user) {
      toast.error("Please login to add products to your cart", { id: "login-featured" });
      return;
    }
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleConfirmAddToCart = async (itemWithOptions) => {
    await addToCart(itemWithOptions);
  };

  return (
    <section className="py-20 relative w-full px-6 sm:px-10 lg:px-16 xl:px-24">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-12 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2 justify-center sm:justify-start">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-500/20 text-violet-400">
              <Sparkles size={16} />
            </span>
            <span className="text-sm font-bold uppercase tracking-wider text-violet-400">
              Handpicked Luxury Fits
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight text-center sm:text-left">
            Featured Collections
          </h2>
        </div>

        {/* Navigation Controls */}
        {featuredProducts.length > itemsPerPage && (
          <div className="flex items-center gap-3">
            <button
              onClick={prevSlide}
              disabled={isStartDisabled}
              className={`p-3.5 rounded-2xl border border-slate-700 transition ${
                isStartDisabled
                  ? "opacity-30 cursor-not-allowed bg-slate-900 text-gray-500"
                  : "bg-slate-800 text-white hover:bg-violet-600 hover:border-violet-500 shadow-md"
              }`}
              aria-label="Previous"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              onClick={nextSlide}
              disabled={isEndDisabled}
              className={`p-3.5 rounded-2xl border border-slate-700 transition ${
                isEndDisabled
                  ? "opacity-30 cursor-not-allowed bg-slate-900 text-gray-500"
                  : "bg-slate-800 text-white hover:bg-violet-600 hover:border-violet-500 shadow-md"
              }`}
              aria-label="Next"
            >
              <ChevronRight size={22} />
            </button>
          </div>
        )}
      </div>

      {/* Carousel Slider */}
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-out -mx-4"
          style={{
            transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)`,
          }}
        >
          {featuredProducts.map((product) => {
            const isFav = isInWishlist(product._id);
            return (
              <div
                key={product._id}
                className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 flex-shrink-0 px-4"
              >
                <div className="group relative flex flex-col h-full rounded-3xl border border-slate-800 bg-slate-900/70 backdrop-blur-md overflow-hidden transition-all duration-300 hover:border-violet-500/50 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-violet-900/25">
                  {/* Image Area */}
                  <div className="relative aspect-[4/4.8] overflow-hidden bg-slate-800">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-108"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-black/25 opacity-60" />

                    {/* Top Badges */}
                    <span className="absolute top-3.5 left-3.5 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white shadow">
                      Featured
                    </span>

                    {/* Wishlist toggle */}
                    <button
                      onClick={() => toggleWishlist(product)}
                      className={`absolute top-3.5 right-3.5 z-10 flex h-9 w-9 items-center justify-center rounded-full backdrop-blur-md transition ${
                        isFav
                          ? "bg-rose-500 text-white shadow-md shadow-rose-500/40"
                          : "bg-slate-950/70 text-gray-200 hover:text-white hover:bg-slate-900"
                      }`}
                      title={isFav ? "Remove from wishlist" : "Save to wishlist"}
                    >
                      <Heart size={16} fill={isFav ? "currentColor" : "none"} />
                    </button>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 flex flex-col justify-between flex-1">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-violet-400">
                          {product.category || "Apparel"}
                        </span>
                        <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-amber-400">
                          <Star size={14} fill="currentColor" />
                          <span>{product.rating || "4.9"}</span>
                        </div>
                      </div>

                      <h3 className="text-lg font-bold text-white line-clamp-1 group-hover:text-fuchsia-400 transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-300 line-clamp-2 mt-1.5 leading-relaxed">
                        {product.description}
                      </p>
                    </div>

                    <div className="mt-5 pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
                      <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-300 to-fuchsia-300">
                        ${product.price?.toFixed(2)}
                      </span>
                      <button
                        onClick={() => handleOpenAddModal(product)}
                        className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 py-2.5 px-5 text-sm font-bold text-white shadow-md shadow-violet-600/30 hover:opacity-95 transition"
                      >
                        <ShoppingBag size={15} />
                        <span>Add</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add To Cart Confirmation Modal */}
      <AddToCartModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmAddToCart}
        product={selectedProduct}
      />
    </section>
  );
};

export default FeaturedProducts;
