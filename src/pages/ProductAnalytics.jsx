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
  Megaphone
} from 'lucide-react';
import axios from 'axios';
import { saveAs } from 'file-saver';
import { motion, AnimatePresence } from 'framer-motion';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Sample data for the dashboard
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
    { quarter: 'Q1', sales: 131000 }, // Jan-Mar
    { quarter: 'Q2', sales: 170000 }, // Apr-Jun
    { quarter: 'Q3', sales: 192000 }, // Jul-Sep
    { quarter: 'Q4', sales: 242000 }  // Oct-Dec
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

function ProductAnalytics() {
  const [timeRange, setTimeRange] = useState('weekly');
  const [salesTimeRange, setSalesTimeRange] = useState('daily');
  const [isTopProductsExpanded, setIsTopProductsExpanded] = useState(false);
  const [isCouponsExpanded, setIsCouponsExpanded] = useState(false);
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

  const getStatusColor = (status) => {
    switch(status) {
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'Processing': return 'bg-blue-100 text-blue-800';
      case 'Shipped': return 'bg-purple-100 text-purple-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Returned': return 'bg-red-100 text-red-800';
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Completed': return 'bg-blue-100 text-blue-800';
      case 'Paused': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', { 
      style: 'currency', 
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Chart data for Chart.js
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
      backgroundColor: 'rgba(59, 130, 246, 0.6)',
      borderColor: 'rgb(59, 130, 246)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(59, 130, 246, 0.8)',
    }],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleFont: { size: 14 },
        bodyFont: { size: 12 },
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
        },
        grid: { color: 'rgba(229, 231, 235, 0.5)' },
      },
      x: {
        grid: { display: false },
      },
    },
    animation: {
      duration: 1000,
      easing: 'easeOutQuart',
    },
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen w-full font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-between items-center mb-10"
        >
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Analytics Dashboard</h1>
          <div className="flex space-x-4">
            <select 
              className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition-all duration-300"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <option value="weekly">Last 7 Days</option>
              <option value="monthly">Last 30 Days</option>
              <option value="quarterly">Last Quarter</option>
              <option value="yearly">Last Year</option>
            </select>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDownload}
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow-md transition-all duration-300"
            >
              <Download size={18} />
              <span>Export Data</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6 p-4 bg-red-100 text-red-800 rounded-lg flex items-center"
            >
              <AlertCircle size={20} className="mr-2" />
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {[
            { title: 'Total Revenue', value: formatCurrency(revenueStats.totalRevenue), growth: revenueStats.revenueGrowth, icon: DollarSign, color: 'blue' },
            { title: 'Total Orders', value: orderStats.totalOrders.toLocaleString(), growth: orderStats.orderGrowth, icon: ShoppingBag, color: 'purple' },
            { title: 'Total Customers', value: customerStats.totalCustomers.toLocaleString(), growth: customerStats.customerGrowth, icon: User, color: 'green' },
            { title: 'Average Order Value', value: formatCurrency(revenueStats.averageOrderValue), growth: 5.2, icon: CreditCard, color: 'amber' },
          ].map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500 mb-2">{stat.title}</p>
                  <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                  <div className="flex items-center mt-3">
                    <span className={`flex items-center text-sm ${stat.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.growth >= 0 ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                      {Math.abs(stat.growth)}%
                    </span>
                    <span className="text-xs text-gray-500 ml-2">vs last {timeRange}</span>
                  </div>
                </div>
                <div className={`bg-${stat.color}-50 p-3 rounded-full`}>
                  <stat.icon size={24} className={`text-${stat.color}-600`} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          {/* Sales Chart */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 lg:col-span-2"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Sales Overview</h3>
              <div className="flex space-x-2">
                {['daily', 'monthly', 'quarterly', 'yearly'].map((range) => (
                  <motion.button 
                    key={range}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-4 py-2 rounded-lg text-sm font-medium capitalize ${salesTimeRange === range ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                    onClick={() => setSalesTimeRange(range)}
                  >
                    {range}
                  </motion.button>
                ))}
              </div>
            </div>
            <div className="h-80">
              <Bar ref={chartRef} data={chartData} options={chartOptions} />
            </div>
          </motion.div>

          {/* Order Status Cards */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Order Status</h3>
            <div className="space-y-4">
              {[
                { label: 'Pending', value: orderStats.pendingOrders, icon: Clock, color: 'yellow' },
                { label: 'Delivered', value: orderStats.deliveredOrders, icon: Truck, color: 'green' },
                { label: 'Returned', value: orderStats.returnedOrders, icon: Package, color: 'red' },
              ].map((status) => (
                <motion.div
                  key={status.label}
                  whileHover={{ scale: 1.02 }}
                  className={`p-4 bg-${status.color}-50 rounded-lg`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <status.icon size={20} className={`text-${status.color}-600 mr-3`} />
                      <span className="text-gray-700 font-medium">{status.label}</span>
                    </div>
                    <span className="text-lg font-semibold text-gray-900">{status.value.toLocaleString()}</span>
                  </div>
                </motion.div>
              ))}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="pt-2"
              >
                <button className="w-full flex items-center justify-center text-blue-600 hover:text-blue-700 text-sm font-medium">
                  View detailed report
                  <ChevronRight size={16} className="ml-1" />
                </button>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Top Products & Coupons Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          {/* Top Products */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Top Products</h3>
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => setIsTopProductsExpanded(!isTopProductsExpanded)}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center"
              >
                {isTopProductsExpanded ? 'Collapse' : 'View All'}
                {isTopProductsExpanded ? <ChevronUp size={16} className="ml-1" /> : <ChevronDown size={16} className="ml-1" />}
              </motion.button>
            </div>
            <AnimatePresence>
              {isTopProductsExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-x-auto"
                >
                  <table className="min-w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Product</th>
                        <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">Orders</th>
                        <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">Revenue</th>
                      </tr>
                    </thead>
                    <tbody>
                      {topProducts.map((product) => (
                        <tr
                          key={product.id}
                          className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200"
                        >
                          <td className="py-3 px-4">
                            <div className="flex items-center">
                              <div className="h-8 w-8 bg-gray-200 rounded-md mr-3"></div>
                              <span className="text-sm font-medium text-gray-700">{product.name}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-right text-sm text-gray-700">{product.sales.toLocaleString()}</td>
                          <td className="py-3 px-4 text-right text-sm font-medium text-gray-900">{formatCurrency(product.revenue)}</td>
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Coupon Usage</h3>
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => setIsCouponsExpanded(!isCouponsExpanded)}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center"
              >
                {isCouponsExpanded ? 'Collapse' : 'View All'}
                {isCouponsExpanded ? <ChevronUp size={16} className="ml-1" /> : <ChevronDown size={16} className="ml-1" />}
              </motion.button>
            </div>
            <AnimatePresence>
              {isCouponsExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-x-auto"
                >
                  <table className="min-w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Code</th>
                        <th className="text-center py-3 px-4 text-sm font-medium text-gray-500">Discount</th>
                        <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">Uses</th>
                        <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">Revenue</th>
                      </tr>
                    </thead>
                    <tbody>
                      {coupons.map((coupon, index) => (
                        <tr
                          key={index}
                          className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200"
                        >
                          <td className="py-3 px-4">
                            <span className="text-sm font-medium text-gray-700">{coupon.code}</span>
                          </td>
                          <td className="py-3 px-4 text-center">
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                              <Percent size={12} className="mr-1" />
                              {coupon.discount}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right text-sm text-gray-700">{coupon.uses.toLocaleString()}</td>
                          <td className="py-3 px-4 text-right text-sm font-medium text-gray-900">{formatCurrency(coupon.revenue)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Recent Orders Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 mb-10"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Recent Orders</h3>
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => setIsRecentOrdersExpanded(!isRecentOrdersExpanded)}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center"
            >
              {isRecentOrdersExpanded ? 'Collapse' : 'View All Orders'}
              {isRecentOrdersExpanded ? <ChevronUp size={16} className="ml-1" /> : <ChevronDown size={16} className="ml-1" />}
            </motion.button>
          </div>
          <AnimatePresence>
            {isRecentOrdersExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-x-auto"
              >
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Order ID</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Customer</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Date</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">Amount</th>
                      <th className="text-center py-3 px-4 text-sm font-medium text-gray-500">Status</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order) => (
                      <tr
                        key={order.id}
                        className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200"
                      >
                        <td className="py-4 px-4">
                          <span className="text-sm font-medium text-gray-700">{order.id}</span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-sm text-gray-700">{order.customer}</span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-sm text-gray-500">{order.date}</span>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <span className="text-sm font-medium text-gray-900">{formatCurrency(order.amount)}</span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex justify-center">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                              {order.status}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            className="text-gray-500 hover:text-gray-700"
                          >
                            <Eye size={18} />
                          </motion.button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Digital Marketing Insights Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 mb-10"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Digital Marketing Insights</h3>
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => setIsMarketingExpanded(!isMarketingExpanded)}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center"
            >
              {isMarketingExpanded ? 'Collapse' : 'View All'}
              {isMarketingExpanded ? <ChevronUp size={16} className="ml-1" /> : <ChevronDown size={16} className="ml-1" />}
            </motion.button>
          </div>
          <AnimatePresence>
            {isMarketingExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Summary Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  {[
                    { title: 'Total Ad Spend', value: formatCurrency(digitalMarketingStats.totalAdSpend), icon: DollarSign, color: 'blue' },
                    { title: 'Impressions', value: digitalMarketingStats.impressions.toLocaleString(), icon: Eye, color: 'purple' },
                    { title: 'Clicks', value: digitalMarketingStats.clicks.toLocaleString(), icon: Circle, color: 'green' },
                    { title: 'Conversion Rate', value: `${digitalMarketingStats.conversionRate}%`, icon: Percent, color: 'amber' },
                  ].map((stat) => (
                    <motion.div
                      key={stat.title}
                      whileHover={{ scale: 1.02 }}
                      className="bg-gray-50 rounded-lg p-4 flex items-center"
                    >
                      <div className={`bg-${stat.color}-50 p-3 rounded-full mr-4`}>
                        <stat.icon size={20} className={`text-${stat.color}-600`} />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">{stat.title}</p>
                        <h4 className="text-lg font-semibold text-gray-900">{stat.value}</h4>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Campaign Details Table */}
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Campaign</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Platform</th>
                        <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">Spend</th>
                        <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">Impressions</th>
                        <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">Clicks</th>
                        <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">Conversions</th>
                        <th className="text-center py-3 px-4 text-sm font-medium text-gray-500">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {digitalMarketingStats.campaigns.map((campaign) => (
                        <tr
                          key={campaign.id}
                          className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200"
                        >
                          <td className="py-3 px-4">
                            <span className="text-sm font-medium text-gray-700">{campaign.name}</span>
                          </td>
                          <td className="py-3 px-4">
                            <span className="text-sm text-gray-700">{campaign.platform}</span>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <span className="text-sm text-gray-700">{formatCurrency(campaign.spend)}</span>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <span className="text-sm text-gray-700">{campaign.impressions.toLocaleString()}</span>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <span className="text-sm text-gray-700">{campaign.clicks.toLocaleString()}</span>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <span className="text-sm text-gray-700">{campaign.conversions.toLocaleString()}</span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex justify-center">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
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

        {/* Maps & Analytics Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sales by Region */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Sales by Region</h3>
            <div className="space-y-4">
              {[
                { region: 'North India', value: 38, color: 'blue' },
                { region: 'South India', value: 28, color: 'green' },
                { region: 'East India', value: 22, color: 'amber' },
                { region: 'West India', value: 12, color: 'purple' },
              ].map((region) => (
                <motion.div
                  key={region.region}
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center">
                    <div className={`h-3 w-3 bg-${region.color}-500 rounded-full mr-2`}></div>
                    <span className="text-sm text-gray-700">{region.region}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{region.value}%</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Seasonal Trends */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Seasonal Products Performance</h3>
            <div className="space-y-4">
              {[
                { name: "Valentine's Special", value: 85, color: 'pink' },
                { name: 'Diwali Collection', value: 92, color: 'amber' },
                { name: 'Easter Specials', value: 78, color: 'purple' },
                { name: 'Christmas Collection', value: 89, color: 'red' },
              ].map((trend) => (
                <div key={trend.name}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-700">{trend.name}</span>
                    <span className="text-sm font-medium text-gray-900">{trend.value}%</span>
                  </div>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${trend.value}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className={`h-2 bg-${trend.color}-500 rounded-full`}
                  ></motion.div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Customer Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Customer Insights</h3>
            <div className="space-y-6">
              {[
                { label: 'Returning Customers', value: Math.round((customerStats.returningCustomers / customerStats.totalCustomers) * 100), growth: 3.2 },
                { label: 'New Customers', value: customerStats.newCustomers, growth: customerStats.customerGrowth.toFixed(1) },
                { label: 'Customer Retention Rate', value: Math.round((customerStats.returningCustomers / customerStats.totalCustomers) * 100), growth: 2.5 },
              ].map((stat) => (
                <motion.div
                  key={stat.label}
                  whileHover={{ scale: 1.02 }}
                >
                  <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
                  <div className="flex items-center">
                    <div className="text-xl font-bold text-gray-900 mr-2">{stat.label.includes('Customers') && !stat.label.includes('New') ? `${stat.value}%` : stat.value.toLocaleString()}</div>
                    <div className="flex items-center text-sm text-green-600">
                      <ArrowUpRight size={16} />
                      {stat.growth}%
                    </div>
                  </div>
                </motion.div>
              ))}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="pt-2"
              >
                <button className="w-full flex items-center justify-center text-blue-600 hover:text-blue-700 text-sm font-medium">
                  View Customer Analytics
                  <ChevronRight size={16} className="ml-1" />
                </button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default ProductAnalytics;