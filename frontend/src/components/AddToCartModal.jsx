import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, X, Plus, Minus, Check, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const SIZES = ["S", "M", "L", "XL"];

const AddToCartModal = ({ isOpen, onClose, onConfirm, product }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("M");
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen || !product) return null;

  const handleConfirm = async () => {
    await onConfirm({ ...product, quantity, selectedSize });
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setQuantity(1);
      onClose();
    }, 1500);
  };

  const handleClose = () => {
    setIsSuccess(false);
    setQuantity(1);
    onClose();
  };

  const totalPrice = (product.price * quantity).toFixed(2);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
        />

        {/* Modal Window */}
        <motion.div
          className="relative z-10 w-full max-w-lg overflow-hidden rounded-3xl border border-violet-500/30 bg-slate-900/98 p-6 sm:p-8 shadow-2xl backdrop-blur-2xl"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
        >
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-5 right-5 rounded-full p-2 text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
            aria-label="Close"
          >
            <X size={20} />
          </button>

          {!isSuccess ? (
            <>
              {/* Header */}
              <div className="flex items-center gap-3.5 mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-600/20 border border-violet-500/30 text-violet-400">
                  <ShoppingBag size={24} />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-white">Add to Shopping Bag</h3>
                  <p className="text-sm text-gray-300">Confirm options before adding item</p>
                </div>
              </div>

              {/* Product Info Row */}
              <div className="flex gap-4 rounded-2xl border border-slate-800 bg-slate-800/60 p-4 mb-6">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-24 w-24 rounded-xl object-cover border border-white/10 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <span className="inline-block px-2.5 py-0.5 rounded text-xs font-bold tracking-wider uppercase bg-violet-500/20 text-violet-300 border border-violet-500/30 mb-1.5">
                    {product.category || "Fashion"}
                  </span>
                  <h4 className="text-base sm:text-lg font-bold text-white truncate">
                    {product.name}
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-300 line-clamp-1 mt-1">
                    {product.description}
                  </p>
                  <p className="text-lg sm:text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400 mt-1.5">
                    ${product.price?.toFixed(2)}
                  </p>
                </div>
              </div>

              {/* Size Selector */}
              <div className="mb-5">
                <label className="block text-sm font-bold text-gray-200 mb-2">
                  Select Size
                </label>
                <div className="flex gap-2.5">
                  {SIZES.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`h-11 flex-1 rounded-xl text-sm font-bold transition-all border ${
                        selectedSize === size
                          ? "border-violet-500 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-md shadow-violet-600/30"
                          : "border-slate-700 bg-slate-800/80 text-gray-200 hover:border-slate-600"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Counter & Total */}
              <div className="flex items-center justify-between border-t border-b border-slate-800 py-5 mb-6">
                <div>
                  <label className="block text-sm font-bold text-gray-200">
                    Quantity
                  </label>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="h-9 w-9 rounded-xl border border-slate-700 bg-slate-800 flex items-center justify-center text-gray-200 hover:text-white hover:bg-slate-700 transition"
                      disabled={quantity <= 1}
                    >
                      <Minus size={15} />
                    </button>
                    <span className="w-9 text-center font-bold text-white text-base">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => q + 1)}
                      className="h-9 w-9 rounded-xl border border-slate-700 bg-slate-800 flex items-center justify-center text-gray-200 hover:text-white hover:bg-slate-700 transition"
                    >
                      <Plus size={15} />
                    </button>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs text-gray-400 block font-medium">Subtotal</span>
                  <span className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">
                    ${totalPrice}
                  </span>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleClose}
                  className="flex-1 rounded-2xl border border-slate-700 bg-slate-800/90 py-3.5 px-5 text-sm font-bold text-gray-200 transition hover:bg-slate-700 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirm}
                  className="flex-1 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 py-3.5 px-5 text-sm font-bold text-white shadow-xl shadow-violet-600/30 transition hover:opacity-95"
                >
                  <ShoppingBag size={18} />
                  Confirm & Add
                </button>
              </div>
            </>
          ) : (
            /* Success Feedback within modal */
            <motion.div
              className="py-10 text-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400">
                <Check className="h-10 w-10" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white mb-2">Added to Cart!</h3>
              <p className="text-base text-gray-300 mb-8">
                {product.name} ({quantity}x, Size {selectedSize})
              </p>
              <div className="flex justify-center gap-3">
                <button
                  onClick={handleClose}
                  className="rounded-2xl border border-slate-700 bg-slate-800 px-6 py-3 text-sm font-bold text-white hover:bg-slate-700"
                >
                  Continue Shopping
                </button>
                <Link
                  to="/cart"
                  onClick={handleClose}
                  className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-6 py-3 text-sm font-bold text-white shadow-md shadow-violet-600/25 hover:opacity-95"
                >
                  View Cart <ArrowRight size={16} />
                </Link>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AddToCartModal;
