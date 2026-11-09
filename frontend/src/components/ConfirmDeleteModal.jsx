import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, X, Trash2 } from "lucide-react";

const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm, itemName }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          className="fixed inset-0 bg-black/75 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        {/* Modal Window */}
        <motion.div
          className="relative z-10 w-full max-w-md overflow-hidden rounded-2xl border border-rose-500/30 bg-slate-900/95 p-6 shadow-2xl backdrop-blur-xl sm:p-7"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 rounded-full p-1.5 text-gray-400 transition hover:bg-white/10 hover:text-white"
            aria-label="Close"
          >
            <X size={18} />
          </button>

          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-500 shadow-inner">
              <Trash2 className="h-7 w-7 text-rose-500" />
            </div>

            <h3 className="text-xl font-bold text-white mb-2">
              Delete Product?
            </h3>
            <p className="text-sm text-gray-300 mb-6 leading-relaxed">
              Are you sure you want to permanently delete{" "}
              <span className="font-semibold text-rose-400">{itemName || "this product"}</span>? This action cannot be undone.
            </p>

            <div className="flex w-full flex-col-reverse sm:flex-row gap-3">
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:flex-1 rounded-xl border border-slate-700 bg-slate-800/80 px-4 py-2.5 text-xs sm:text-sm font-medium text-gray-200 transition hover:bg-slate-700 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={onConfirm}
                className="w-full sm:flex-1 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-lg shadow-rose-600/30 transition hover:from-rose-500 hover:to-red-500"
              >
                Delete Product
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ConfirmDeleteModal;

