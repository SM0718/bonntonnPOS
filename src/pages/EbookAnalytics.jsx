import React, { useState } from 'react';
import { 
  BookOpen, 
  Download, 
  Users, 
  DollarSign, 
  TrendingUp, 
  ChevronDown, 
  ChevronUp, 
  Filter, 
  Star, 
  Eye, 
  ShoppingCart,
  Tag,
  DownloadCloud
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, LineElement, PointElement, ArcElement } from 'chart.js';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { saveAs } from 'file-saver';
import axios from 'axios';

ChartJS.register(
  CategoryScale, 
  LinearScale, 
  BarElement, 
  LineElement, 
  PointElement, 
  ArcElement, 
  Title, 
  Tooltip, 
  Legend
);

const ebookSalesData = {
  daily: [
    { date: '2025-04-21', sales: 65 },
    { date: '2025-04-22', sales: 70 },
    { date: '2025-04-23', sales: 68 },
    { date: '2025-04-24', sales: 72 },
    { date: '2025-04-25', sales: 75 },
    { date: '2025-04-26', sales: 80 },
    { date: '2025-04-27', sales: 82 },
  ],
  monthly: [
    { month: 'Jan', sales: 1200 },
    { month: 'Feb', sales: 1350 },
    { month: 'Mar', sales: 1500 },
    { month: 'Apr', sales: 1650 },
    { month: 'May', sales: 1800 },
    { month: 'Jun', sales: 2000 },
  ],
  quarterly: [
    { quarter: 'Q1 2025', sales: 4050 },
    { quarter: 'Q2 2025', sales: 5450 },
    { quarter: 'Q3 2024', sales: 4800 },
    { quarter: 'Q4 2024', sales: 5100 },
  ],
  yearly: [
    { year: '2021', sales: 12000 },
    { year: '2022', sales: 15000 },
    { year: '2023', sales: 18000 },
    { year: '2024', sales: 20000 },
    { year: '2025', sales: 9500 },
  ],
};

const ebookStats = {
  totalEbooks: 85,
  activeEbooks: 78,
  newEbooks: 5,
  salesGrowth: 15.2,
  totalRevenue: 245000,
  monthlyRevenue: 42000,
  averagePrice: 29.99,
  conversionRate: 4.5,
  cac: 45.50,
  downloadsPerEbook: 320,
};

const topEbooks = [
  { id: 1, title: "Mastering Python", sales: 450, revenue: 13495, rating: 4.8, downloads: 1500 },
  { id: 2, title: "UX Design Guide", sales: 380, revenue: 11395, rating: 4.7, downloads: 1200 },
  { id: 3, title: "Data Science 101", sales: 320, revenue: 9595, rating: 4.9, downloads: 1000 },
  { id: 4, title: "Leadership Essentials", sales: 290, revenue: 8695, rating: 4.6, downloads: 900 },
];

const revenueBreakdown = {
  categories: [
    { name: 'Technical', value: 125000 },
    { name: 'Business', value: 75000 },
    { name: 'Self-Help', value: 45000 },
  ],
};

const salesByCustomerType = {
  types: [
    { name: 'New Customers', value: 6500 },
    { name: 'Returning Customers', value: 10500 },
    { name: 'Enterprise', value: 3000 },
  ],
};

function EbookAnalytics() {
  const [timeRange, setTimeRange] = useState('monthly');
  const [isTopEbooksExpanded, setIsTopEbooksExpanded] = useState(true);
  const [filterPanelOpen, setFilterPanelOpen] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState(['Technical', 'Business', 'Self-Help']);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const handleDownload = async () => {
    try {
      const response = await axios.get("api/v1/ebooks/download-analytics", {
        responseType: "blob",
      });
      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      saveAs(blob, "ebookAnalytics.xlsx");
      setError(null);
    } catch (error) {
      console.error("Error downloading the Excel file:", error);
      setError("Failed to download report. Please try again.");
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category]
    );
  };

  const getChartData = () => {
    let labels, data;
    switch (timeRange) {
      case 'daily':
        labels = ebookSalesData.daily.map(item => item.date);
        data = ebookSalesData.daily.map(item => item.sales);
        break;
      case 'monthly':
        labels = ebookSalesData.monthly.map(item => item.month);
        data = ebookSalesData.monthly.map(item => item.sales);
        break;
      case 'quarterly':
        labels = ebookSalesData.quarterly.map(item => item.quarter);
        data = ebookSalesData.quarterly.map(item => item.sales);
        break;
      case 'yearly':
        labels = ebookSalesData.yearly.map(item => item.year);
        data = ebookSalesData.yearly.map(item => item.sales);
        break;
      default:
        labels = [];
        data = [];
    }
    return { labels, data };
  };

  const salesChartData = {
    labels: getChartData().labels,
    datasets: [{
      label: 'eBook Sales',
      data: getChartData().data,
      backgroundColor: 'rgba(16, 185, 129, 0.8)',
      borderColor: 'rgb(16, 185, 129)',
      borderWidth: 2,
      borderRadius: 4,
      hoverBackgroundColor: 'rgba(16, 185, 129, 1)',
    }],
  };

  const salesChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 1000, easing: 'easeOutQuart' },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(31, 41, 55, 0.9)',
        padding: 12,
        cornerRadius: 8,
        titleFont: { size: 14, weight: 'bold' },
        bodyFont: { size: 12 },
        callbacks: { label: (context) => `Sales: ${context.parsed.y.toLocaleString()}` },
      },
      title: {
        display: true,
        text: `${timeRange.charAt(0).toUpperCase() + timeRange.slice(1)} Sales Trend`,
        align: 'start',
        font: { size: 16, weight: '600' },
        color: '#1f2937',
        padding: { bottom: 20 },
      },
    },
    scales: {
      y: { 
        beginAtZero: true, 
        grid: { color: 'rgba(229, 231, 235, 0.3)' },
        ticks: { font: { size: 12 }, callback: (value) => value.toLocaleString() },
      },
      x: { grid: { display: false }, ticks: { font: { size: 12 } } },
    },
  };

  const revenueLineData = {
    labels: getChartData().labels,
    datasets: [
      {
        label: 'Revenue',
        data: getChartData().data.map(sales => sales * ebookStats.averagePrice),
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.2)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: 'rgb(16, 185, 129)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(16, 185, 129)',
      },
    ],
  };

  const revenueLineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 1000, easing: 'easeOutQuart' },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(31, 41, 55, 0.9)',
        padding: 12,
        cornerRadius: 8,
        titleFont: { size: 14, weight: 'bold' },
        bodyFont: { size: 12 },
        callbacks: { label: (context) => `Revenue: ${formatCurrency(context.parsed.y)}` },
      },
      title: {
        display: true,
        text: `${timeRange.charAt(0).toUpperCase() + timeRange.slice(1)} Revenue Trend`,
        align: 'start',
        font: { size: 16, weight: '600' },
        color: '#1f2937',
        padding: { bottom: 20 },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { font: { size: 12 }, callback: (value) => `$${(value / 1000).toFixed(0)}K` },
        grid: { color: 'rgba(229, 231, 235, 0.3)' },
      },
      x: { grid: { display: false }, ticks: { font: { size: 12 } } },
    },
  };

  const revenueBreakdownData = {
    labels: revenueBreakdown.categories.map(item => item.name),
    datasets: [
      {
        data: revenueBreakdown.categories.map(item => item.value),
        backgroundColor: [
          'rgba(16, 185, 129, 0.8)',
          'rgba(139, 92, 246, 0.8)',
          'rgba(245, 158, 11, 0.8)',
        ],
        borderColor: [
          'rgb(16, 185, 129)',
          'rgb(139, 92, 246)',
          'rgb(245, 158, 11)',
        ],
        borderWidth: 2,
        hoverOffset: 20,
      },
    ],
  };

  const revenueBreakdownOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 1000, easing: 'easeOutQuart' },
    plugins: {
      legend: { 
        position: 'right', 
        labels: { boxWidth: 12, font: { size: 12 }, padding: 15, usePointStyle: true } 
      },
      tooltip: {
        backgroundColor: 'rgba(31, 41, 55, 0.9)',
        padding: 12,
        cornerRadius: 8,
        titleFont: { size: 14, weight: 'bold' },
        bodyFont: { size: 12 },
        callbacks: {
          label: (context) => `${context.label}: ${formatCurrency(context.raw)} (${(context.raw / context.dataset.data.reduce((a, b) => a + b, 0) * 100).toFixed(1)}%)`,
        },
      },
      title: {
        display: true,
        text: 'Revenue by Category',
        align: 'start',
        font: { size: 16, weight: '600' },
        color: '#1f2937',
        padding: { bottom: 20 },
      },
    },
  };

  const customerTypeData = {
    labels: salesByCustomerType.types.map(item => item.name),
    datasets: [
      {
        data: salesByCustomerType.types.map(item => item.value),
        backgroundColor: [
          'rgba(236, 72, 153, 0.8)',
          'rgba(139, 92, 246, 0.8)',
          'rgba(251, 191, 36, 0.8)',
        ],
        borderColor: [
          'rgb(236, 72, 153)',
          'rgb(139, 92, 246)',
          'rgb(251, 191, 36)',
        ],
        borderWidth: 2,
        hoverOffset: 20,
      },
    ],
  };

  const customerTypeOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 1000, easing: 'easeOutQuart' },
    plugins: {
      legend: { 
        position: 'right', 
        labels: { boxWidth: 12, font: { size: 12 }, padding: 15, usePointStyle: true } 
      },
      tooltip: {
        backgroundColor: 'rgba(31, 41, 55, 0.9)',
        padding: 12,
        cornerRadius: 8,
        titleFont: { size: 14, weight: 'bold' },
        bodyFont: { size: 12 },
        callbacks: {
          label: (context) => `${context.label}: ${context.raw.toLocaleString()} sales (${(context.raw / context.dataset.data.reduce((a, b) => a + b, 0) * 100).toFixed(1)}%)`,
        },
      },
      title: {
        display: true,
        text: 'Sales by Customer Type',
        align: 'start',
        font: { size: 16, weight: '600' },
        color: '#1f2937',
        padding: { bottom: 20 },
      },
    },
  };

  const toggleButtonClass = (isActive) =>
    `px-3 py-1 text-xs font-medium rounded-full transition-colors duration-200 ${
      isActive ? 'bg-brand-600 text-white' : 'bg-surface-100 text-surface-600 hover:bg-surface-200'
    }`;

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="page-title">eBook Analytics</h1>
            <p className="mt-1 text-sm text-surface-500">Key metrics and performance for eBook sales</p>
          </div>
          <div className="mt-4 md:mt-0 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
            <div className="relative">
              <button 
                onClick={() => setFilterPanelOpen(!filterPanelOpen)}
                className="btn-secondary inline-flex items-center px-4 py-2 text-sm font-medium rounded-md"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
                {filterPanelOpen ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />}
              </button>
              <AnimatePresence>
                {filterPanelOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-64 rounded-lg shadow-xl bg-white ring-1 ring-black ring-opacity-5 z-10 p-4"
                  >
                    <div className="space-y-2">
                      <div className="text-xs font-semibold text-surface-500">Categories</div>
                      {['Technical', 'Business', 'Self-Help'].map(category => (
                        <label key={category} className="flex items-center space-x-2 text-sm text-surface-700">
                          <input
                            type="checkbox"
                            checked={selectedCategories.includes(category)}
                            onChange={() => handleCategoryChange(category)}
                            className="h-4 w-4 text-brand-600 focus:ring-brand-500 border-surface-300 rounded"
                          />
                          <span>{category}</span>
                        </label>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <button
              onClick={handleDownload}
              className="btn-primary inline-flex items-center px-4 py-2 text-sm font-medium rounded-md"
            >
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div 
            className="card card-hover border border-surface-200 rounded-xl shadow-card p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center">
              <div className="inline-flex items-center justify-center p-3 bg-emerald-50 rounded-md">
                <BookOpen className="h-6 w-6 text-emerald-600" />
              </div>
              <div className="ml-4">
                <h2 className="text-sm font-medium text-surface-500">Total eBooks</h2>
                <div className="flex items-baseline">
                  <p className="text-2xl font-semibold text-surface-900">{ebookStats.totalEbooks}</p>
                  <p className="ml-2 flex items-baseline text-sm font-semibold text-emerald-600">
                    <TrendingUp className="self-center flex-shrink-0 h-4 w-4" />
                    <span>{ebookStats.salesGrowth}%</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-4 space-y-1">
              <div className="flex justify-between items-center text-sm">
                <span className="text-surface-500">Active eBooks</span>
                <span className="font-medium text-surface-900">{ebookStats.activeEbooks}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-surface-500">New eBooks</span>
                <span className="font-medium text-surface-900">{ebookStats.newEbooks}</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="card card-hover border border-surface-200 rounded-xl shadow-card p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <div className="flex items-center">
              <div className="inline-flex items-center justify-center p-3 bg-emerald-50 rounded-md">
                <DollarSign className="h-6 w-6 text-emerald-600" />
              </div>
              <div className="ml-4">
                <h2 className="text-sm font-medium text-surface-500">Total Revenue</h2>
                <p className="text-2xl font-semibold text-surface-900">{formatCurrency(ebookStats.totalRevenue)}</p>
              </div>
            </div>
            <div className="mt-4 space-y-1">
              <div className="flex justify-between items-center text-sm">
                <span className="text-surface-500">Monthly Revenue</span>
                <span className="font-medium text-surface-900">{formatCurrency(ebookStats.monthlyRevenue)}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-surface-500">Avg. Price</span>
                <span className="font-medium text-surface-900">${ebookStats.averagePrice.toFixed(2)}</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="card card-hover border border-surface-200 rounded-xl shadow-card p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <div className="flex items-center">
              <div className="inline-flex items-center justify-center p-3 bg-purple-50 rounded-md">
                <ShoppingCart className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <h2 className="text-sm font-medium text-surface-500">Conversion Rate</h2>
                <p className="text-2xl font-semibold text-surface-900">{ebookStats.conversionRate}%</p>
              </div>
            </div>
            <div className="mt-4 space-y-1">
              <div className="flex justify-between items-center text-sm">
                <span className="text-surface-500">Total Sales</span>
                <span className="font-medium text-surface-900">{ebookSalesData.monthly.reduce((sum, item) => sum + item.sales, 0).toLocaleString()}</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="card card-hover border border-surface-200 rounded-xl shadow-card p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <div className="flex items-center">
              <div className="inline-flex items-center justify-center p-3 bg-amber-50 rounded-md">
                <Tag className="h-6 w-6 text-amber-600" />
              </div>
              <div className="ml-4">
                <h2 className="text-sm font-medium text-surface-500">Customer Acquisition Cost</h2>
                <p className="text-2xl font-semibold text-surface-900">${ebookStats.cac.toFixed(2)}</p>
              </div>
            </div>
            <div className="mt-4 space-y-1">
              <div className="flex justify-between items-center text-sm">
                <span className="text-surface-500">Downloads per eBook</span>
                <span className="font-medium text-surface-900">{ebookStats.downloadsPerEbook.toLocaleString()}</span>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <motion.div 
            className="card border border-surface-200 rounded-xl shadow-card p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-end items-center mb-4">
              <div className="flex space-x-2">
                {['daily', 'monthly', 'quarterly', 'yearly'].map(range => (
                  <button 
                    key={range}
                    onClick={() => setTimeRange(range)}
                    className={toggleButtonClass(timeRange === range)}
                  >
                    {range.charAt(0).toUpperCase() + range.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <div className="h-80">
              <Bar data={salesChartData} options={salesChartOptions} />
            </div>
          </motion.div>

          <motion.div 
            className="card border border-surface-200 rounded-xl shadow-card p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <div className="h-80">
              <Line data={revenueLineData} options={revenueLineOptions} />
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <motion.div 
            className="card border border-surface-200 rounded-xl shadow-card p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="h-80">
              <Pie data={revenueBreakdownData} options={revenueBreakdownOptions} />
            </div>
          </motion.div>

          <motion.div 
            className="card border border-surface-200 rounded-xl shadow-card p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <div className="h-80">
              <Pie data={customerTypeData} options={customerTypeOptions} />
            </div>
          </motion.div>
        </div>

        <div className="card border border-surface-200 rounded-xl shadow-card mb-8">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-surface-900">Top Performing eBooks</h2>
              <button
                onClick={() => setIsTopEbooksExpanded(!isTopEbooksExpanded)}
                className="text-brand-600 hover:text-brand-700 transition-colors duration-200"
              >
                {isTopEbooksExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </button>
            </div>
            {isTopEbooksExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-surface-200">
                    <thead>
                      <tr>
                        <th className="bg-surface-50 px-3 py-3.5 text-left text-xs font-semibold text-surface-500 uppercase tracking-wide">Title</th>
                        <th className="bg-surface-50 px-3 py-3.5 text-right text-xs font-semibold text-surface-500 uppercase tracking-wide">Sales</th>
                        <th className="bg-surface-50 px-3 py-3.5 text-right text-xs font-semibold text-surface-500 uppercase tracking-wide">Revenue</th>
                        <th className="bg-surface-50 px-3 py-3.5 text-right text-xs font-semibold text-surface-500 uppercase tracking-wide">Downloads</th>
                        <th className="bg-surface-50 px-3 py-3.5 text-right text-xs font-semibold text-surface-500 uppercase tracking-wide">Rating</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-surface-100">
                      {topEbooks.map((ebook) => (
                        <tr key={ebook.id} className="hover:bg-surface-50 transition-colors duration-150">
                          <td className="whitespace-nowrap px-3 py-4 text-sm font-medium text-surface-900">{ebook.title}</td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-surface-700">{ebook.sales.toLocaleString()}</td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-surface-700">{formatCurrency(ebook.revenue)}</td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-surface-700">{ebook.downloads.toLocaleString()}</td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-surface-700">
                            <div className="flex items-center justify-end">
                              {ebook.rating}
                              <Star className="h-4 w-4 text-amber-400 ml-1" />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-6 bg-surface-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-surface-700 mb-4">Performance Summary</h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-surface-100">
                      <div className="flex items-center">
                        <Eye className="h-5 w-5 text-emerald-600 mr-2" />
                        <div>
                          <p className="text-sm text-surface-600">Total Sales</p>
                          <p className="text-lg font-semibold text-surface-900">{topEbooks.reduce((sum, ebook) => sum + ebook.sales, 0).toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-surface-100">
                      <div className="flex items-center">
                        <DollarSign className="h-5 w-5 text-emerald-600 mr-2" />
                        <div>
                          <p className="text-sm text-surface-600">Total Revenue</p>
                          <p className="text-lg font-semibold text-surface-900">{formatCurrency(topEbooks.reduce((sum, ebook) => sum + ebook.revenue, 0))}</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-surface-100">
                      <div className="flex items-center">
                        <DownloadCloud className="h-5 w-5 text-amber-600 mr-2" />
                        <div>
                          <p className="text-sm text-surface-600">Total Downloads</p>
                          <p className="text-lg font-semibold text-surface-900">{topEbooks.reduce((sum, ebook) => sum + ebook.downloads, 0).toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-surface-100">
                      <div className="flex items-center">
                        <Star className="h-5 w-5 text-amber-400 mr-2" />
                        <div>
                          <p className="text-sm text-surface-600">Average Rating</p>
                          <p className="text-lg font-semibold text-surface-900">{(topEbooks.reduce((sum, ebook) => sum + ebook.rating, 0) / topEbooks.length).toFixed(1)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {error && (
          <motion.div 
            className="bg-red-50 border-l-4 border-red-400 p-4 mb-8 rounded-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-sm text-red-700">{error}</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default EbookAnalytics;
