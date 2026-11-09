import { Link } from "react-router-dom";
import { useCartStore } from "../stores/useCartStore";
import { motion } from "framer-motion";
import { ShoppingBag, ArrowLeft, ArrowRight } from "lucide-react";
import CartItem from "../components/CartItem";
import PeopleAlsoBought from "../components/PeopleAlsoBought";
import OrderSummary from "../components/OrderSummary";
import GiftCouponCard from "../components/GiftCouponCard";

const CartPage = () => {
  const { cart } = useCartStore();

  const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

  return (
    <div className="min-h-screen text-white pb-24 pt-6">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Breadcrumb */}
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-300 mb-2 font-medium">
              <Link to="/" className="hover:text-white transition flex items-center gap-1.5">
                <ArrowLeft size={16} /> Continue Shopping
              </Link>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white">
              Shopping Bag{" "}
              {cart.length > 0 && (
                <span className="text-xs sm:text-sm font-bold px-3 py-1 rounded-full bg-violet-600/30 text-violet-300 border border-violet-500/30 ml-3 align-middle">
                  {totalItems} {totalItems === 1 ? "item" : "items"}
                </span>
              )}
            </h1>
          </div>
        </div>

        {cart.length === 0 ? (
          <EmptyCartUI />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Items Column */}
            <motion.div
              className="lg:col-span-8 space-y-5"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="space-y-4">
                {cart.map((item) => (
                  <CartItem key={item._id} item={item} />
                ))}
              </div>

              {/* Recommended items under cart */}
              <PeopleAlsoBought />
            </motion.div>

            {/* Right Summary Column */}
            <motion.div
              className="lg:col-span-4 space-y-6 lg:sticky lg:top-24"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <OrderSummary />
              <GiftCouponCard />
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;

const EmptyCartUI = () => (
  <motion.div
    className="max-w-xl mx-auto text-center py-20 px-8 rounded-3xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl shadow-2xl my-10"
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
  >
    <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-3xl bg-violet-600/15 border border-violet-500/25 text-violet-400">
      <ShoppingBag size={44} />
    </div>
    <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">Your Bag is Empty</h2>
    <p className="text-base sm:text-lg text-gray-300 mb-10 max-w-md mx-auto leading-relaxed">
      Looks like you haven't added any luxury pieces yet. Explore our latest drops and elevate your wardrobe today.
    </p>
    <Link
      to="/"
      className="inline-flex items-center gap-2.5 rounded-2xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 px-9 py-4 text-base sm:text-lg font-bold text-white shadow-xl shadow-violet-600/30 hover:opacity-95 transition"
    >
      <span>Start Exploring</span>
      <ArrowRight size={18} />
    </Link>
  </motion.div>
);
