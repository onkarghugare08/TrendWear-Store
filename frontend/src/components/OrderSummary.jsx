import { useState } from "react";
import { motion } from "framer-motion";
import { useCartStore } from "../stores/useCartStore";
import { Link } from "react-router-dom";
import { MoveRight, ShieldCheck, Lock, Loader } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "../lib/axios";
import toast from "react-hot-toast";

const stripePromise = loadStripe(
  "pk_test_51PyoJzP9XA1HoSKNAPxq4nueoiySvmwmCYvuIxSNLNLZHi3uhctltDygkQKZcNlAVCv6QkuIyJGtFtGErt0kwnJr005NZ5O9wp"
);

const OrderSummary = () => {
  const { total, subtotal, coupon, isCouponApplied, cart } = useCartStore();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const savings = subtotal - total;
  const formattedSubtotal = subtotal.toFixed(2);
  const formattedTotal = total.toFixed(2);
  const formattedSavings = savings.toFixed(2);

  const handlePayment = async () => {
    setIsCheckingOut(true);
    try {
      const stripe = await stripePromise;
      const res = await axios.post("/payments/create-checkout-session", {
        products: cart,
        couponCode: coupon ? coupon.code : null,
      });

      const session = res.data;
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        console.error("Error:", result.error);
        toast.error(result.error.message || "Checkout redirection failed");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to initialize checkout session");
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <motion.div
      className="rounded-3xl border border-violet-500/20 bg-slate-900/80 p-6 shadow-2xl backdrop-blur-xl space-y-5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <h3 className="text-lg font-bold text-white">Order Summary</h3>
        <span className="text-xs text-gray-400 font-medium">{cart.length} unique items</span>
      </div>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between text-gray-300">
          <span>Subtotal</span>
          <span className="font-semibold text-white">${formattedSubtotal}</span>
        </div>

        {savings > 0 && (
          <div className="flex justify-between text-emerald-400 font-medium">
            <span>Special Savings</span>
            <span>-${formattedSavings}</span>
          </div>
        )}

        {coupon && isCouponApplied && (
          <div className="flex justify-between text-fuchsia-400 font-medium">
            <span>Discount Coupon ({coupon.code})</span>
            <span>-{coupon.discountPercentage}%</span>
          </div>
        )}

        <div className="flex justify-between text-gray-400 text-xs">
          <span>Shipping & Taxes</span>
          <span className="text-emerald-400 font-medium">FREE at checkout</span>
        </div>

        <div className="pt-4 border-t border-slate-800 flex justify-between items-baseline">
          <span className="text-base font-bold text-white">Estimated Total</span>
          <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-300 via-fuchsia-300 to-pink-300">
            ${formattedTotal}
          </span>
        </div>
      </div>

      {/* Checkout Button */}
      <button
        type="button"
        onClick={handlePayment}
        disabled={isCheckingOut || cart.length === 0}
        className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 py-3.5 px-6 text-sm font-bold text-white shadow-xl shadow-violet-600/30 transition hover:opacity-95 disabled:opacity-50"
      >
        {isCheckingOut ? (
          <>
            <Loader className="h-4 w-4 animate-spin" />
            <span>Connecting to Stripe...</span>
          </>
        ) : (
          <>
            <Lock size={16} />
            <span>Proceed to Checkout</span>
          </>
        )}
      </button>

      {/* Trust Badge & Continue Shopping */}
      <div className="pt-2 text-center space-y-3">
        <div className="flex items-center justify-center gap-1.5 text-xs text-gray-400">
          <ShieldCheck size={14} className="text-emerald-400" />
          <span>Guaranteed Safe & Secure Checkout via Stripe</span>
        </div>

        <div>
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-violet-400 hover:text-fuchsia-400 transition"
          >
            <span>Continue Shopping</span>
            <MoveRight size={14} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default OrderSummary;
