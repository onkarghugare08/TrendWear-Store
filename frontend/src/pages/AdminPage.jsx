import { BarChart3, PlusCircle, ShoppingBag, ShieldCheck, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import AnalyticsTab from "../components/AnalyticsTab";
import CreateProductForm from "../components/CreateProductForm";
import ProductsList from "../components/ProductsList";
import { useProductStore } from "../stores/useProductStore";

const tabs = [
  { id: "create", label: "Create Product", icon: PlusCircle, badge: "New" },
  { id: "products", label: "Inventory & Manage", icon: ShoppingBag, badge: null },
  { id: "analytics", label: "Business Analytics", icon: BarChart3, badge: "Live" },
];

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("create");
  const { fetchAllProducts, products } = useProductStore();

  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);

  return (
    <div className="relative min-h-screen w-full pb-24 overflow-hidden">
      {/* High-End Luxury eCommerce Dashboard Background Image */}
      <div
        className="fixed inset-0 pointer-events-none z-0 bg-cover bg-center bg-no-repeat opacity-20 filter contrast-125 brightness-75 scale-105"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=2070&q=80')`,
        }}
      />
      {/* Mesh and Vignette Gradients */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-gradient-to-b from-slate-950/80 via-slate-950/92 to-slate-950" />
      <div className="fixed -top-40 right-1/4 h-96 w-96 rounded-full bg-violet-600/15 blur-[120px] pointer-events-none" />
      <div className="fixed bottom-10 left-1/4 h-96 w-96 rounded-full bg-fuchsia-600/15 blur-[120px] pointer-events-none" />

      {/* Main Full-Width Container */}
      <div className="relative z-10 w-full px-6 sm:px-10 lg:px-16 xl:px-24 pt-10">
        {/* Header Hero */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/15 px-5 py-2 text-sm font-bold text-violet-300 backdrop-blur-md mb-4 shadow">
            <ShieldCheck size={16} className="text-fuchsia-400" />
            <span>EXECUTIVE COMMAND PORTAL</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white mb-4">
            TrendWear <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400">Admin Dashboard</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto">
            Manage your fashion catalog, track real-time revenue performance, and release new luxury drops seamlessly.
          </p>
        </motion.div>

        {/* Tab Navigation Pill Bar */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-2 rounded-2xl border border-slate-800 bg-slate-900/90 backdrop-blur-2xl shadow-xl gap-2 overflow-x-auto max-w-full">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2.5 px-6 sm:px-8 py-3 rounded-xl text-sm sm:text-base font-bold transition-all whitespace-nowrap ${
                    isActive
                      ? "bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 text-white shadow-lg shadow-violet-600/30"
                      : "text-gray-300 hover:text-white hover:bg-slate-800/80"
                  }`}
                >
                  <tab.icon size={18} />
                  <span>{tab.label}</span>
                  {tab.id === "products" && products.length > 0 && (
                    <span
                      className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${
                        isActive ? "bg-white/20 text-white" : "bg-slate-800 text-gray-300"
                      }`}
                    >
                      {products.length}
                    </span>
                  )}
                  {tab.badge && (
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded font-black uppercase tracking-wider ${
                        isActive
                          ? "bg-white/25 text-white"
                          : "bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/30"
                      }`}
                    >
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Tab Panel */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3 }}
          className="w-full"
        >
          {activeTab === "create" && <CreateProductForm onProductCreated={() => setActiveTab("products")} />}
          {activeTab === "products" && <ProductsList />}
          {activeTab === "analytics" && <AnalyticsTab />}
        </motion.div>
      </div>
    </div>
  );
};

export default AdminPage;
