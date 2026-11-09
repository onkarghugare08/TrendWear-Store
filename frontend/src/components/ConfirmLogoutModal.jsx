import { motion, AnimatePresence } from "framer-motion";
import { LogOut, X } from "lucide-react";

const ConfirmLogoutModal = ({ isOpen, onClose, onConfirm, userName }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        {/* Modal Box */}
        <motion.div
          className="relative z-10 w-full max-w-lg overflow-hidden rounded-3xl border border-violet-500/30 bg-slate-900/98 p-8 sm:p-10 shadow-2xl backdrop-blur-2xl"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 rounded-full p-2 text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
            aria-label="Close"
          >
            <X size={20} />
          </button>

          <div className="flex flex-col items-center text-center">
            {/* Warning Icon Badge */}
            <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-violet-600/20 to-fuchsia-600/20 border border-fuchsia-500/40 text-fuchsia-400 shadow-inner">
              <LogOut className="h-10 w-10 text-fuchsia-400" />
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-white mb-3">
              Confirm Logout
            </h3>
            <p className="text-sm sm:text-base text-gray-300 mb-8 leading-relaxed max-w-sm">
              {userName ? (
                <>Are you sure you want to log out, <span className="font-bold text-fuchsia-400">{userName}</span>? You will need to sign in again to access your saved cart and profile.</>
              ) : (
                "Are you sure you want to end your session? You can sign back in anytime."
              )}
            </p>

            {/* Action Buttons */}
            <div className="flex w-full flex-col-reverse sm:flex-row gap-3.5">
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:flex-1 rounded-2xl border border-slate-700 bg-slate-800/90 px-5 py-3.5 text-sm sm:text-base font-bold text-gray-200 transition-all hover:bg-slate-700 hover:text-white focus:outline-none"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={onConfirm}
                className="w-full sm:flex-1 rounded-2xl bg-gradient-to-r from-fuchsia-600 to-rose-600 px-5 py-3.5 text-sm sm:text-base font-bold text-white shadow-xl shadow-fuchsia-600/30 transition-all hover:from-fuchsia-500 hover:to-rose-500 focus:outline-none"
              >
                Log Out
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ConfirmLogoutModal;
