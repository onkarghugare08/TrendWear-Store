import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "../lib/axios";
import { Users, Package, ShoppingBag, DollarSign, TrendingUp, Sparkles, Loader } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const AnalyticsTab = () => {
  const [analyticsData, setAnalyticsData] = useState({
    users: 0,
    products: 0,
    totalSales: 0,
    totalRevenue: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [dailySalesData, setDailySalesData] = useState([]);

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        const response = await axios.get("/analytics");
        setAnalyticsData(response.data.analyticsData);
        setDailySalesData(response.data.dailySalesData);
      } catch (error) {
        console.error("Error fetching analytics data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalyticsData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader className="h-8 w-8 text-violet-400 animate-spin mb-3" />
        <p className="text-xs text-gray-400">Loading business performance metrics...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1600px] mx-auto space-y-8">
      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <AnalyticsCard
          title="Total Customers"
          value={analyticsData.users.toLocaleString()}
          icon={Users}
          trend="+18.4%"
          gradient="from-violet-600/30 via-purple-600/20 to-transparent"
          border="border-violet-500/30"
          accent="text-violet-400"
        />
        <AnalyticsCard
          title="Active Inventory"
          value={analyticsData.products.toLocaleString()}
          icon={Package}
          trend="+8 Drops"
          gradient="from-fuchsia-600/30 via-pink-600/20 to-transparent"
          border="border-fuchsia-500/30"
          accent="text-fuchsia-400"
        />
        <AnalyticsCard
          title="Total Orders"
          value={analyticsData.totalSales.toLocaleString()}
          icon={ShoppingBag}
          trend="+24.2%"
          gradient="from-pink-600/30 via-rose-600/20 to-transparent"
          border="border-pink-500/30"
          accent="text-pink-400"
        />
        <AnalyticsCard
          title="Gross Revenue"
          value={`$${analyticsData.totalRevenue.toLocaleString()}`}
          icon={DollarSign}
          trend="+31.5%"
          gradient="from-emerald-600/30 via-teal-600/20 to-transparent"
          border="border-emerald-500/30"
          accent="text-emerald-400"
        />
      </div>

      {/* Chart Section */}
      <motion.div
        className="rounded-3xl border border-violet-500/20 bg-slate-900/80 p-6 sm:p-8 shadow-2xl backdrop-blur-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 mb-6 border-b border-slate-800 gap-2">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="flex h-5 w-5 items-center justify-center rounded bg-violet-500/20 text-violet-400">
                <Sparkles size={12} />
              </span>
              <span className="text-[11px] font-bold uppercase tracking-wider text-violet-400">
                Revenue Intelligence
              </span>
            </div>
            <h3 className="text-xl font-bold text-white">Sales & Revenue Trajectory</h3>
          </div>
          <div className="text-xs text-gray-400">
            Real-time daily transaction trends
          </div>
        </div>

        <div className="h-80 sm:h-96 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={dailySalesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
              <XAxis dataKey="name" stroke="#94A3B8" fontSize={12} tickLine={false} />
              <YAxis yAxisId="left" stroke="#94A3B8" fontSize={12} tickLine={false} />
              <YAxis yAxisId="right" orientation="right" stroke="#94A3B8" fontSize={12} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0F172A",
                  borderColor: "rgba(139, 92, 246, 0.4)",
                  borderRadius: "12px",
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.5)",
                  color: "#fff",
                }}
              />
              <Legend wrapperStyle={{ paddingTop: "12px" }} />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="sales"
                stroke="#C084FC"
                strokeWidth={3}
                dot={{ r: 4, fill: "#C084FC" }}
                activeDot={{ r: 7 }}
                name="Units Sold"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="revenue"
                stroke="#F472B6"
                strokeWidth={3}
                dot={{ r: 4, fill: "#F472B6" }}
                activeDot={{ r: 7 }}
                name="Revenue ($)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
};

export default AnalyticsTab;

const AnalyticsCard = ({ title, value, icon: Icon, trend, gradient, border, accent }) => (
  <motion.div
    className={`relative rounded-3xl border ${border} bg-gradient-to-br ${gradient} bg-slate-900/90 p-6 shadow-xl backdrop-blur-xl overflow-hidden`}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
  >
    <div className="relative z-10 flex flex-col justify-between h-full">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-bold uppercase tracking-wider text-gray-300">
          {title}
        </span>
        <div className={`p-2 rounded-xl bg-slate-800/80 border border-white/5 ${accent}`}>
          <Icon size={18} />
        </div>
      </div>

      <div>
        <h3 className="text-3xl font-black text-white tracking-tight mb-2">
          {value}
        </h3>
        <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
          <TrendingUp size={13} />
          <span>{trend}</span>
          <span className="text-gray-400 font-normal">vs last period</span>
        </div>
      </div>
    </div>
  </motion.div>
);
