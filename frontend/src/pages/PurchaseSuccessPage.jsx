import { ArrowRight, CheckCircle2, ShoppingBag, Sparkles, Package } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCartStore } from "../stores/useCartStore";
import axios from "../lib/axios";
import Confetti from "react-confetti";

const PurchaseSuccessPage = () => {
  const [isProcessing, setIsProcessing] = useState(true);
  const { clearCart } = useCartStore();
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleCheckoutSuccess = async (sessionId) => {
      try {
        await axios.post("/payments/checkout-success", {
          sessionId,
        });
        clearCart();
      } catch (error) {
        console.log(error);
      } finally {
        setIsProcessing(false);
      }
    };

    const sessionId = new URLSearchParams(window.location.search).get(
      "session_id"
    );
    if (sessionId) {
      handleCheckoutSuccess(sessionId);
    } else {
      setIsProcessing(false);
      setError("No session ID found in the URL");
    }
  }, [clearCart]);

  if (isProcessing) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4">
        <div className="h-10 w-10 border-4 border-violet-500 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-sm font-semibold text-gray-300">Finalizing your order...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
        <p className="text-rose-400 font-semibold mb-4">Error: {error}</p>
        <Link to="/" className="text-xs text-violet-400 underline">Return to Home</Link>
      </div>
    );
  }

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 relative overflow-hidden">
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        gravity={0.08}
        style={{ zIndex: 99 }}
        numberOfPieces={400}
        recycle={false}
      />

      <div className="max-w-md w-full rounded-3xl border border-violet-500/20 bg-slate-900/90 p-6 sm:p-8 shadow-2xl backdrop-blur-xl relative z-10 text-center">
        {/* Success Icon */}
        <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-3xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 shadow-inner">
          <CheckCircle2 size={40} />
        </div>

        <div className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-300 mb-3">
          <Sparkles size={12} />
          <span>PAYMENT VERIFIED</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-white mb-2">
          Order Confirmed!
        </h1>

        <p className="text-xs sm:text-sm text-gray-300 mb-6 leading-relaxed">
          Thank you for trusting TrendWear. Your tailored pieces are being prepared by our fulfillment specialists.
        </p>

        {/* Order Details Card */}
        <div className="rounded-2xl border border-slate-800 bg-slate-800/50 p-4 mb-6 text-left space-y-2.5 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Order Reference</span>
            <span className="font-mono font-bold text-violet-300">#TW-{Math.floor(100000 + Math.random() * 900000)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Estimated Delivery</span>
            <span className="font-semibold text-white">2 - 4 Business Days</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Confirmation Sent To</span>
            <span className="font-semibold text-emerald-400">Your Registered Email</span>
          </div>
        </div>

        <div className="space-y-3">
          <Link
            to="/"
            className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 py-3.5 px-6 text-sm font-bold text-white shadow-xl shadow-violet-600/30 hover:opacity-95 transition"
          >
            <ShoppingBag size={16} />
            <span>Continue Shopping</span>
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PurchaseSuccessPage;
