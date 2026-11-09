import { XCircle, ArrowLeft, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const PurchaseCancelPage = () => {
  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full rounded-3xl border border-rose-500/20 bg-slate-900/90 p-6 sm:p-8 shadow-2xl backdrop-blur-xl text-center"
      >
        <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-3xl bg-rose-500/10 border border-rose-500/30 text-rose-400">
          <XCircle size={40} />
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-white mb-2">
          Checkout Cancelled
        </h1>

        <p className="text-xs sm:text-sm text-gray-300 mb-6 leading-relaxed">
          Your transaction was not completed and your card was not charged. Your bag items remain saved for when you are ready.
        </p>

        <div className="rounded-2xl border border-slate-800 bg-slate-800/50 p-4 mb-6 text-xs text-gray-400">
          Need assistance or encountered a payment issue? Contact our 24/7 concierge anytime.
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            to="/cart"
            className="flex-1 flex items-center justify-center gap-1.5 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 py-3 px-4 text-xs sm:text-sm font-bold text-white shadow-lg shadow-violet-600/30 hover:opacity-95 transition"
          >
            <RotateCcw size={15} />
            <span>Return to Bag</span>
          </Link>
          <Link
            to="/"
            className="flex-1 flex items-center justify-center gap-1.5 rounded-2xl border border-slate-700 bg-slate-800/80 py-3 px-4 text-xs sm:text-sm font-semibold text-gray-300 hover:text-white hover:bg-slate-700 transition"
          >
            <ArrowLeft size={15} />
            <span>Home</span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default PurchaseCancelPage;
