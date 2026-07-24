import React, { useState, useEffect, useRef } from 'react';
import { 
  BarChart, 
  TrendingUp, 
  ShoppingBag, 
  Package, 
  Truck, 
  Calendar, 
  CreditCard, 
  Tag, 
  AlertCircle, 
  ChevronDown, 
  ChevronUp, 
  Download, 
  Circle, 
  User, 
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Percent,
  Clock,
  ChevronRight,
  Eye,
  Megaphone,
  Users,
  ShoppingCart,
  BarChart3,
  Activity,
} from 'lucide-react';
import axios from 'axios';
import { saveAs } from 'file-saver';
import { motion, AnimatePresence } from 'framer-motion';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const salesData = {
  daily: [
    { day: 'Mon', sales: 2400 },
    { day: 'Tue', sales: 3100 },
    { day: 'Wed', sales: 2800 },
    { day: 'Thu', sales: 4200 },
    { day: 'Fri', sales: 5400 },
    { day: 'Sat', sales: 6800 },
    { day: 'Sun', sales: 4900 }
  ],
  monthly: [
    { month: 'Jan', sales: 42000 },
    { month: 'Feb', sales: 38000 },
    { month: 'Mar', sales: 51000 },
    { month: 'Apr', sales: 48000 },
    { month: 'May', sales: 59000 },
    { month: 'Jun', sales: 63000 },
    { month: 'Jul', sales: 57000 },
    { month: 'Aug', sales: 64000 },
    { month: 'Sep', sales: 71000 },
    { month: 'Oct', sales: 68000 },
    { month: 'Nov', sales: 79000 },
    { month: 'Dec', sales: 95000 }
  ],
  quarterly: [
    { quarter: 'Q1', sales: 131000 },
    { quarter: 'Q2', sales: 170000 },
    { quarter: 'Q3', sales: 192000 },
    { quarter: 'Q4', sales: 242000 }
  ],
  yearly: [
    { year: '2023', sales: 600000 },
    { year: '2024', sales: 735000 },
    { year: '2025', sales: 825000 }
  ]
};

const orderStats = {
  totalOrders: 12983,
  pendingOrders: 342,
  deliveredOrders: 12451,
  returnedOrders: 190,
  orderGrowth: 24.5
};

const revenueStats = {
  totalRevenue: 1254890,
  monthlyRevenue: 95000,
  weeklyRevenue: 24500,
  averageOrderValue: 980,
  revenueGrowth: 18.7
};

const topProducts = [
  { id: 1, name: "Dark Chocolate Truffle Box", sales: 1245, revenue: 124500 },
  { id: 2, name: "Assorted Macarons", sales: 987, revenue: 98700 },
  { id: 3, name: "Hazelnut Praline Cake", sales: 754, revenue: 90480 },
  { id: 4, name: "Raspberry Éclair", sales: 621, revenue: 49680 },
  { id: 5, name: "Pistachio Opera Cake", sales: 583, revenue: 69960 }
];

const coupons = [
  { code: "WELCOME20", uses: 789, discount: "20%", revenue: 78900 },
  { code: "SUMMER15", uses: 543, discount: "15%", revenue: 65160 },
  { code: "FESTIVE25", uses: 421, discount: "25%", revenue: 50520 },
  { code: "BDAY10", uses: 321, discount: "10%", revenue: 32100 },
  { code: "FLASH30", uses: 212, discount: "30%", revenue: 21200 }
];

const recentOrders = [
  { id: "#12983", customer: "Emma Wilson", date: "2025-04-19", amount: 1250, status: "Delivered" },
  { id: "#12982", customer: "James Brown", date: "2025-04-19", amount: 980, status: "Processing" },
  { id: "#12981", customer: "Olivia Smith", date: "2025-04-18", amount: 3450, status: "Shipped" },
  { id: "#12980", customer: "Noah Johnson", date: "2025-04-18", amount: 1870, status: "Pending" },
  { id: "#12979", customer: "Sophia Davis", date: "2025-04-17", amount: 2340, status: "Delivered" }
];

const customerStats = {
  totalCustomers: 8456,
  newCustomers: 342,
  returningCustomers: 5871,
  customerGrowth: 12.8
};

const digitalMarketingStats = {
  totalAdSpend: 150000,
  impressions: 2500000,
  clicks: 75000,
  conversionRate: 3.5,
  campaigns: [
    { id: 1, name: "Summer Sale Campaign", platform: "Google Ads", spend: 50000, impressions: 800000, clicks: 25000, conversions: 875, status: "Active" },
    { id: 2, name: "Festive Discount", platform: "Facebook Ads", spend: 35000, impressions: 600000, clicks: 18000, conversions: 630, status: "Completed" },
    { id: 3, name: "New Year Promo", platform: "Instagram Ads", spend: 45000, impressions: 700000, clicks: 21000, conversions: 735, status: "Active" },
    { id: 4, name: "Loyalty Program", platform: "Email Marketing", spend: 20000, impressions: 400000, clicks: 11000, conversions: 385, status: "Paused" }
  ]
};

const statusColors = {
  Delivered: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
  Processing: 'bg-blue-50 text-blue-700 border border-blue-200',
  Shipped: 'bg-purple-50 text-purple-700 border border-purple-200',
  Pending: 'bg-amber-50 text-amber-700 border border-amber-200',
  Returned: 'bg-red-50 text-red-700 border border-red-200',
  Active: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
  Completed: 'bg-blue-50 text-blue-700 border border-blue-200',
  Paused: 'bg-surface-100 text-surface-600 border border-surface-200',
};

const cardColors = {
  blue: 'bg-blue-50 text-blue-600',
  green: 'bg-emerald-50 text-emerald-600',
  purple: 'bg-purple-50 text-purple-600',
  amber: 'bg-amber-50 text-amber-600',
  red: 'bg-red-50 text-red-600',
};

function ProductAnalytics() {
  const [timeRange, setTimeRange] = useState('weekly');
  const [salesTimeRange, setSalesTimeRange] = useState('daily');
  const [isTopProductsExpanded, setIsTopProductsExpanded] = useState(true);
  const [isCouponsExpanded, setIsCouponsExpanded] = useState(true);
  const [isRecentOrdersExpanded, setIsRecentOrdersExpanded] = useState(true);
  const [isMarketingExpanded, setIsMarketingExpanded] = useState(true);
  const [error, setError] = useState(null);

  const chartRef = useRef(null);

  const handleDownload = async () => {
    try {
      const response = await axios.get("api/v1/products/download-products", {
        responseType: "blob",
      });
      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      saveAs(blob, "productDetails.xlsx");
      setError(null);
    } catch (error) {
      console.error("Error downloading the Excel file:", error);
      setError("Failed to download report. Please try again.");
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', { 
      style: 'currency', 
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const chartData = {
    labels: salesTimeRange === 'daily' 
      ? salesData.daily.map(item => item.day)
      : salesTimeRange === 'monthly'
      ? salesData.monthly.map(item => item.month)
      : salesTimeRange === 'quarterly'
      ? salesData.quarterly.map(item => item.quarter)
      : salesData.yearly.map(item => item.year),
    datasets: [{
      label: 'Sales (INR)',
      data: salesTimeRange === 'daily' 
        ? salesData.daily.map(item => item.sales)
        : salesTimeRange === 'monthly'
        ? salesData.monthly.map(item => item.sales)
        : salesTimeRange === 'quarterly'
        ? salesData.quarterly.map(item => item.sales)
        : salesData.yearly.map(item => item.sales),
      backgroundColor: 'rgba(16, 185, 129, 0.6)',
      borderColor: 'rgb(16, 185, 129)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(16, 185, 129, 0.8)',
      borderRadius: 6,
    }],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(17, 24, 39, 0.9)',
        titleFont: { family: 'Inter', size: 13, weight: '500' },
        bodyFont: { family: 'Inter', size: 12 },
        padding: 12,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          label: (context) => `Sales: ${formatCurrency(context.parsed.y)}`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => `₹${(value / 1000).toFixed(0)}K`,
          font: { family: 'Inter', size: 11 },
          color: '#9CA3AF',
          padding: 8,
        },
        grid: { color: 'rgba(229, 231, 235, 0.4)', drawBorder: false },
        border: { display: false },
      },
      x: {
        grid: { display: false },
        ticks: { font: { family: 'Inter', size: 11 }, color: '#9CA3AF', padding: 8 },
        border: { display: false },
      },
    },
    animation: {
      duration: 800,
      easing: 'easeOutQuart',
    },
  };

  const overviewCards = [
    { title: 'Total Revenue', value: formatCurrency(revenueStats.totalRevenue), growth: revenueStats.revenueGrowth, icon: DollarSign, color: 'green' },
    { title: 'Total Orders', value: orderStats.totalOrders.toLocaleString(), growth: orderStats.orderGrowth, icon: ShoppingCart, color: 'blue' },
    { title: 'Total Customers', value: customerStats.totalCustomers.toLocaleString(), growth: customerStats.customerGrowth, icon: Users, color: 'purple' },
    { title: 'Avg. Order Value', value: formatCurrency(revenueStats.averageOrderValue), growth: 5.2, icon: CreditCard, color: 'amber' },
  ];

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex justify-between items-center mb-8"
        >
          <div>
            <h1 className="text-2xl font-bold text-surface-900 tracking-tight">Analytics Dashboard</h1>
            <p className="text-sm text-surface-500 mt-1">Track your business performance and insights</p>
          </div>
          <div className="flex items-center gap-3">
            <select 
              className="input-base w-auto pr-8"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <option value="weekly">Last 7 Days</option>
              <option value="monthly">Last 30 Days</option>
              <option value="quarterly">Last Quarter</option>
              <option value="yearly">Last Year</option>
            </select>
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleDownload}
              className="btn-primary"
            >
              <Download size={16} />
              <span>Export</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Error */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6 p-4 bg-red-50 text-red-700 rounded-xl flex items-center gap-2 border border-red-200"
            >
              <AlertCircle size={18} />
              <span className="text-sm font-medium">{error}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {overviewCards.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: index * 0.07 }}
              className="card-hover p-5"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs font-medium text-surface-500 uppercase tracking-wide">{stat.title}</p>
                  <h3 className="text-2xl font-bold text-surface-900 mt-1.5">{stat.value}</h3>
                  <div className="flex items-center mt-2">
                    <span className={`inline-flex items-center gap-0.5 text-xs font-semibold ${stat.growth >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                      {stat.growth >= 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                      {Math.abs(stat.growth)}%
                    </span>
                    <span className="text-xs text-surface-400 ml-1.5">vs last {timeRange}</span>
                  </div>
                </div>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${cardColors[stat.color]}`}>
                  <stat.icon size={20} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-8">
          {/* Sales Chart */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="card p-6 lg:col-span-2"
          >
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-base font-semibold text-surface-900">Sales Overview</h3>
                <p className="text-xs text-surface-500 mt-0.5">Revenue performance over time</p>
              </div>
              <div className="flex bg-surface-100 rounded-lg p-0.5">
                {['daily', 'monthly', 'quarterly', 'yearly'].map((range) => (
                  <button 
                    key={range}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium capitalize transition-all duration-150 ${
                      salesTimeRange === range 
                        ? 'bg-white text-surface-900 shadow-sm' 
                        : 'text-surface-500 hover:text-surface-700'
                    }`}
                    onClick={() => setSalesTimeRange(range)}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>
            <div className="h-72">
              <Bar ref={chartRef} data={chartData} options={chartOptions} />
            </div>
          </motion.div>

          {/* Order Status */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="card p-6"
          >
            <h3 className="text-base font-semibold text-surface-900 mb-5">Order Status</h3>
            <div className="space-y-3">
              {[
                { label: 'Pending', value: orderStats.pendingOrders, icon: Clock, color: 'text-amber-500', bg: 'bg-amber-50' },
                { label: 'Delivered', value: orderStats.deliveredOrders, icon: Truck, color: 'text-emerald-500', bg: 'bg-emerald-50' },
                { label: 'Returned', value: orderStats.returnedOrders, icon: Package, color: 'text-red-500', bg: 'bg-red-50' },
              ].map((status) => (
                <div key={status.label} className="flex items-center justify-between p-3 rounded-lg bg-surface-50 hover:bg-surface-100 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg ${status.bg} flex items-center justify-center`}>
                      <status.icon size={16} className={status.color} />
                    </div>
                    <span className="text-sm font-medium text-surface-700">{status.label}</span>
                  </div>
                  <span className="text-sm font-bold text-surface-900">{status.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 flex items-center justify-center gap-1.5 text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors py-2">
              View detailed report
              <ChevronRight size={14} />
            </button>
          </motion.div>
        </div>

        {/* Top Products & Coupons */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-8">
          {/* Top Products */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="card"
          >
            <div className="flex justify-between items-center p-5 border-b border-surface-100">
              <h3 className="text-base font-semibold text-surface-900">Top Products</h3>
              <button
                onClick={() => setIsTopProductsExpanded(!isTopProductsExpanded)}
                className="text-xs font-medium text-brand-600 hover:text-brand-700 flex items-center gap-1"
              >
                {isTopProductsExpanded ? 'Collapse' : 'View All'}
                {isTopProductsExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </button>
            </div>
            <AnimatePresence>
              {isTopProductsExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-surface-100">
                        <th className="text-left py-3 px-5 text-xs font-medium text-surface-500 uppercase tracking-wide">Product</th>
                        <th className="text-right py-3 px-5 text-xs font-medium text-surface-500 uppercase tracking-wide">Orders</th>
                        <th className="text-right py-3 px-5 text-xs font-medium text-surface-500 uppercase tracking-wide">Revenue</th>
                      </tr>
                    </thead>
                    <tbody>
                      {topProducts.map((product, idx) => (
                        <tr key={product.id} className="border-b border-surface-50 last:border-0 hover:bg-surface-50 transition-colors">
                          <td className="py-3 px-5">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-surface-100 flex items-center justify-center text-xs font-bold text-surface-500">
                                {idx + 1}
                              </div>
                              <span className="text-sm font-medium text-surface-800">{product.name}</span>
                            </div>
                          </td>
                          <td className="py-3 px-5 text-right text-sm text-surface-600">{product.sales.toLocaleString()}</td>
                          <td className="py-3 px-5 text-right text-sm font-semibold text-surface-900">{formatCurrency(product.revenue)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Coupon Usage */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.35 }}
            className="card"
          >
            <div className="flex justify-between items-center p-5 border-b border-surface-100">
              <h3 className="text-base font-semibold text-surface-900">Coupon Usage</h3>
              <button
                onClick={() => setIsCouponsExpanded(!isCouponsExpanded)}
                className="text-xs font-medium text-brand-600 hover:text-brand-700 flex items-center gap-1"
              >
                {isCouponsExpanded ? 'Collapse' : 'View All'}
                {isCouponsExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </button>
            </div>
            <AnimatePresence>
              {isCouponsExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-surface-100">
                        <th className="text-left py-3 px-5 text-xs font-medium text-surface-500 uppercase tracking-wide">Code</th>
                        <th className="text-center py-3 px-5 text-xs font-medium text-surface-500 uppercase tracking-wide">Discount</th>
                        <th className="text-right py-3 px-5 text-xs font-medium text-surface-500 uppercase tracking-wide">Uses</th>
                        <th className="text-right py-3 px-5 text-xs font-medium text-surface-500 uppercase tracking-wide">Revenue</th>
                      </tr>
                    </thead>
                    <tbody>
                      {coupons.map((coupon, index) => (
                        <tr key={index} className="border-b border-surface-50 last:border-0 hover:bg-surface-50 transition-colors">
                          <td className="py-3 px-5">
                            <span className="text-sm font-mono font-semibold text-surface-800 bg-surface-100 px-2 py-0.5 rounded">{coupon.code}</span>
                          </td>
                          <td className="py-3 px-5 text-center">
                            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-brand-50 text-brand-700 border border-brand-200">
                              {coupon.discount}
                            </span>
                          </td>
                          <td className="py-3 px-5 text-right text-sm text-surface-600">{coupon.uses.toLocaleString()}</td>
                          <td className="py-3 px-5 text-right text-sm font-semibold text-surface-900">{formatCurrency(coupon.revenue)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Recent Orders */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="card mb-8"
        >
          <div className="flex justify-between items-center p-5 border-b border-surface-100">
            <h3 className="text-base font-semibold text-surface-900">Recent Orders</h3>
            <button
              onClick={() => setIsRecentOrdersExpanded(!isRecentOrdersExpanded)}
              className="text-xs font-medium text-brand-600 hover:text-brand-700 flex items-center gap-1"
            >
              {isRecentOrdersExpanded ? 'Collapse' : 'View All Orders'}
              {isRecentOrdersExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
          </div>
          <AnimatePresence>
            {isRecentOrdersExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-surface-100">
                      <th className="text-left py-3 px-5 text-xs font-medium text-surface-500 uppercase tracking-wide">Order ID</th>
                      <th className="text-left py-3 px-5 text-xs font-medium text-surface-500 uppercase tracking-wide">Customer</th>
                      <th className="text-left py-3 px-5 text-xs font-medium text-surface-500 uppercase tracking-wide">Date</th>
                      <th className="text-right py-3 px-5 text-xs font-medium text-surface-500 uppercase tracking-wide">Amount</th>
                      <th className="text-center py-3 px-5 text-xs font-medium text-surface-500 uppercase tracking-wide">Status</th>
                      <th className="text-right py-3 px-5 text-xs font-medium text-surface-500 uppercase tracking-wide">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order) => (
                      <tr key={order.id} className="border-b border-surface-50 last:border-0 hover:bg-surface-50 transition-colors">
                        <td className="py-3.5 px-5">
                          <span className="text-sm font-medium text-surface-800">{order.id}</span>
                        </td>
                        <td className="py-3.5 px-5">
                          <span className="text-sm text-surface-700">{order.customer}</span>
                        </td>
                        <td className="py-3.5 px-5">
                          <span className="text-sm text-surface-500">{order.date}</span>
                        </td>
                        <td className="py-3.5 px-5 text-right">
                          <span className="text-sm font-semibold text-surface-900">{formatCurrency(order.amount)}</span>
                        </td>
                        <td className="py-3.5 px-5">
                          <div className="flex justify-center">
                            <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[order.status] || 'bg-surface-100 text-surface-600'}`}>
                              {order.status}
                            </span>
                          </div>
                        </td>
                        <td className="py-3.5 px-5 text-right">
                          <button className="p-1.5 text-surface-400 hover:text-surface-600 hover:bg-surface-100 rounded-lg transition-colors">
                            <Eye size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Digital Marketing */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.45 }}
          className="card mb-8"
        >
          <div className="flex justify-between items-center p-5 border-b border-surface-100">
            <div>
              <h3 className="text-base font-semibold text-surface-900">Digital Marketing Insights</h3>
              <p className="text-xs text-surface-500 mt-0.5">Campaign performance and ad spend</p>
            </div>
            <button
              onClick={() => setIsMarketingExpanded(!isMarketingExpanded)}
              className="text-xs font-medium text-brand-600 hover:text-brand-700 flex items-center gap-1"
            >
              {isMarketingExpanded ? 'Collapse' : 'View All'}
              {isMarketingExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
          </div>
          <AnimatePresence>
            {isMarketingExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                {/* Marketing Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-5 border-b border-surface-100">
                  {[
                    { title: 'Total Ad Spend', value: formatCurrency(digitalMarketingStats.totalAdSpend), icon: DollarSign, color: 'blue' },
                    { title: 'Impressions', value: digitalMarketingStats.impressions.toLocaleString(), icon: Eye, color: 'purple' },
                    { title: 'Clicks', value: digitalMarketingStats.clicks.toLocaleString(), icon: Activity, color: 'green' },
                    { title: 'Conversion Rate', value: `${digitalMarketingStats.conversionRate}%`, icon: Percent, color: 'amber' },
                  ].map((stat) => (
                    <div key={stat.title} className="flex items-center gap-3 p-3 rounded-lg bg-surface-50">
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${cardColors[stat.color]}`}>
                        <stat.icon size={18} />
                      </div>
                      <div>
                        <p className="text-xs text-surface-500">{stat.title}</p>
                        <h4 className="text-sm font-bold text-surface-900">{stat.value}</h4>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Campaigns Table */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-surface-100">
                        <th className="text-left py-3 px-5 text-xs font-medium text-surface-500 uppercase tracking-wide">Campaign</th>
                        <th className="text-left py-3 px-5 text-xs font-medium text-surface-500 uppercase tracking-wide">Platform</th>
                        <th className="text-right py-3 px-5 text-xs font-medium text-surface-500 uppercase tracking-wide">Spend</th>
                        <th className="text-right py-3 px-5 text-xs font-medium text-surface-500 uppercase tracking-wide">Impressions</th>
                        <th className="text-right py-3 px-5 text-xs font-medium text-surface-500 uppercase tracking-wide">Clicks</th>
                        <th className="text-right py-3 px-5 text-xs font-medium text-surface-500 uppercase tracking-wide">Conversions</th>
                        <th className="text-center py-3 px-5 text-xs font-medium text-surface-500 uppercase tracking-wide">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {digitalMarketingStats.campaigns.map((campaign) => (
                        <tr key={campaign.id} className="border-b border-surface-50 last:border-0 hover:bg-surface-50 transition-colors">
                          <td className="py-3 px-5">
                            <span className="text-sm font-medium text-surface-800">{campaign.name}</span>
                          </td>
                          <td className="py-3 px-5">
                            <span className="text-sm text-surface-600">{campaign.platform}</span>
                          </td>
                          <td className="py-3 px-5 text-right text-sm text-surface-700">{formatCurrency(campaign.spend)}</td>
                          <td className="py-3 px-5 text-right text-sm text-surface-700">{campaign.impressions.toLocaleString()}</td>
                          <td className="py-3 px-5 text-right text-sm text-surface-700">{campaign.clicks.toLocaleString()}</td>
                          <td className="py-3 px-5 text-right text-sm text-surface-700">{campaign.conversions.toLocaleString()}</td>
                          <td className="py-3 px-5">
                            <div className="flex justify-center">
                              <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[campaign.status] || 'bg-surface-100 text-surface-600'}`}>
                                {campaign.status}
                              </span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Bottom Row - Region, Seasonal, Customer */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Sales by Region */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="card p-6"
          >
            <h3 className="text-base font-semibold text-surface-900 mb-5">Sales by Region</h3>
            <div className="space-y-4">
              {[
                { region: 'North India', value: 38, color: 'bg-brand-500' },
                { region: 'South India', value: 28, color: 'bg-blue-500' },
                { region: 'East India', value: 22, color: 'bg-amber-500' },
                { region: 'West India', value: 12, color: 'bg-purple-500' },
              ].map((region) => (
                <div key={region.region}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm text-surface-700">{region.region}</span>
                    <span className="text-sm font-semibold text-surface-900">{region.value}%</span>
                  </div>
                  <div className="w-full h-2 bg-surface-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${region.value}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut', delay: 0.5 }}
                      className={`h-full ${region.color} rounded-full`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Seasonal Trends */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.55 }}
            className="card p-6"
          >
            <h3 className="text-base font-semibold text-surface-900 mb-5">Seasonal Performance</h3>
            <div className="space-y-4">
              {[
                { name: "Valentine's Special", value: 85, color: 'bg-pink-500' },
                { name: 'Diwali Collection', value: 92, color: 'bg-amber-500' },
                { name: 'Easter Specials', value: 78, color: 'bg-purple-500' },
                { name: 'Christmas Collection', value: 89, color: 'bg-red-500' },
              ].map((trend) => (
                <div key={trend.name}>
                  <div className="flex justify-between mb-1.5">
                    <span className="text-sm text-surface-700">{trend.name}</span>
                    <span className="text-sm font-semibold text-surface-900">{trend.value}%</span>
                  </div>
                  <div className="w-full h-2 bg-surface-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${trend.value}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut', delay: 0.6 }}
                      className={`h-full ${trend.color} rounded-full`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Customer Insights */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.6 }}
            className="card p-6"
          >
            <h3 className="text-base font-semibold text-surface-900 mb-5">Customer Insights</h3>
            <div className="space-y-5">
              {[
                { label: 'Returning Customers', value: Math.round((customerStats.returningCustomers / customerStats.totalCustomers) * 100), suffix: '%', growth: 3.2 },
                { label: 'New Customers', value: customerStats.newCustomers, suffix: '', growth: customerStats.customerGrowth },
                { label: 'Retention Rate', value: Math.round((customerStats.returningCustomers / customerStats.totalCustomers) * 100), suffix: '%', growth: 2.5 },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-xs text-surface-500 mb-1">{stat.label}</p>
                  <div className="flex items-center">
                    <span className="text-xl font-bold text-surface-900">{stat.value}{stat.suffix}</span>
                    <span className="flex items-center text-xs font-semibold text-emerald-600 ml-2">
                      <ArrowUpRight size={14} />
                      {stat.growth}%
                    </span>
                  </div>
                </div>
              ))}
              <button className="w-full flex items-center justify-center gap-1.5 text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors pt-2 border-t border-surface-100">
                View Customer Analytics
                <ChevronRight size={14} />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default ProductAnalytics;
