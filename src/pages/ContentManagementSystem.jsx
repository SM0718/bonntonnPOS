import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  ChevronDown, 
  ChevronUp, 
  MoreVertical, 
  Edit, 
  Trash2, 
  Eye, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Sample data
const coursesData = [
  { id: 1, title: "Python Mastery", instructor: "John Doe", enrollments: 1200, revenue: 35950, status: "Active" },
  { id: 2, title: "Web Development", instructor: "Jane Smith", enrollments: 850, revenue: 25500, status: "Inactive" },
  { id: 3, title: "Data Science 101", instructor: "Bob Wilson", enrollments: 650, revenue: 19450, status: "Active" },
  { id: 4, title: "UX Design", instructor: "Alice Brown", enrollments: 450, revenue: 13495, status: "Active" },
  { id: 5, title: "Leadership Skills", instructor: "Emma Davis", enrollments: 300, revenue: 8995, status: "Inactive" },
  { id: 6, title: "AI Fundamentals", instructor: "Tom Clark", enrollments: 700, revenue: 20995, status: "Active" },
  { id: 7, title: "Cloud Computing", instructor: "Sara Lee", enrollments: 500, revenue: 14995, status: "Active" },
  { id: 8, title: "Cybersecurity", instructor: "Mike Adams", enrollments: 400, revenue: 11995, status: "Inactive" },
  { id: 9, title: "Blockchain Basics", instructor: "Lisa Wong", enrollments: 350, revenue: 10495, status: "Active" },
  { id: 10, title: "Marketing 101", instructor: "Chris Evans", enrollments: 600, revenue: 17995, status: "Active" },
  { id: 11, title: "Graphic Design", instructor: "Laura King", enrollments: 550, revenue: 16495, status: "Active" },
  { id: 12, title: "Project Management", instructor: "David Lee", enrollments: 750, revenue: 22495, status: "Inactive" },
];

const ebooksData = [
  { id: 1, title: "Mastering Python", category: "Technical", sales: 450, revenue: 13495, status: "Active" },
  { id: 2, title: "UX Design Guide", category: "Design", sales: 380, revenue: 11395, status: "Active" },
  { id: 3, title: "Data Science 101", category: "Technical", sales: 320, revenue: 9595, status: "Inactive" },
  { id: 4, title: "Leadership Essentials", category: "Business", sales: 290, revenue: 8695, status: "Active" },
  { id: 5, title: "Marketing Strategy", category: "Business", sales: 250, revenue: 7495, status: "Active" },
  { id: 6, title: "AI for Beginners", category: "Technical", sales: 400, revenue: 11995, status: "Active" },
  { id: 7, title: "Web Dev Guide", category: "Technical", sales: 350, revenue: 10495, status: "Inactive" },
  { id: 8, title: "Product Management", category: "Business", sales: 300, revenue: 8995, status: "Active" },
  { id: 9, title: "Cloud Basics", category: "Technical", sales: 280, revenue: 8395, status: "Active" },
  { id: 10, title: "Design Thinking", category: "Design", sales: 310, revenue: 9295, status: "Active" },
  { id: 11, title: "SEO Mastery", category: "Marketing", sales: 270, revenue: 8095, status: "Inactive" },
  { id: 12, title: "Finance 101", category: "Business", sales: 260, revenue: 7795, status: "Active" },
];

const couponsData = [
  { id: 1, code: "SAVE10", discount: "10%", uses: 150, expiry: "2025-12-31", status: "Active" },
  { id: 2, code: "FREESHIP", discount: "Free Shipping", uses: 200, expiry: "2025-06-30", status: "Active" },
  { id: 3, code: "WELCOME20", discount: "20%", uses: 100, expiry: "2025-03-31", status: "Inactive" },
  { id: 4, code: "SUMMER25", discount: "25%", uses: 80, expiry: "2025-08-31", status: "Active" },
  { id: 5, code: "FIRSTBUY", discount: "15%", uses: 120, expiry: "2025-12-31", status: "Active" },
  { id: 6, code: "LOYALTY10", discount: "10%", uses: 90, expiry: "2025-09-30", status: "Active" },
  { id: 7, code: "BACK2SCHOOL", discount: "20%", uses: 110, expiry: "2025-09-15", status: "Inactive" },
  { id: 8, code: "HALLOWEEN", discount: "30%", uses: 70, expiry: "2025-10-31", status: "Active" },
  { id: 9, code: "BLACKFRIDAY", discount: "40%", uses: 60, expiry: "2025-11-30", status: "Active" },
  { id: 10, title: "CYBERMONDAY", discount: "35%", uses: 65, expiry: "2025-12-01", status: "Active" },
  { id: 11, code: "WINTER15", discount: "15%", uses: 85, expiry: "2026-01-31", status: "Active" },
  { id: 12, code: "SPRING20", discount: "20%", uses: 95, expiry: "2025-04-30", status: "Active" },
];

function ContentManagement() {
  const [activeTab, setActiveTab] = useState('courses');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterCategory, setFilterCategory] = useState('All'); // For eBooks
  const [currentPage, setCurrentPage] = useState(1);
  const [menuOpen, setMenuOpen] = useState(null);
  const itemsPerPage = 10;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const sortData = (data, key, direction) => {
    return [...data].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });
  };

  const filterData = (data) => {
    let filtered = data;

    // Search
    if (searchQuery) {
      filtered = filtered.filter(item => 
        Object.values(item).some(value => 
          value.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    // Status Filter
    if (filterStatus !== 'All') {
      filtered = filtered.filter(item => item.status === filterStatus);
    }

    // Category Filter (for eBooks)
    if (activeTab === 'ebooks' && filterCategory !== 'All') {
      filtered = filtered.filter(item => item.category === filterCategory);
    }

    // Sort
    if (sortConfig.key) {
      filtered = sortData(filtered, sortConfig.key, sortConfig.direction);
    }

    return filtered;
  };

  const paginateData = (data) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return data.slice(startIndex, startIndex + itemsPerPage);
  };

  const getData = () => {
    switch (activeTab) {
      case 'courses':
        return coursesData;
      case 'ebooks':
        return ebooksData;
      case 'coupons':
        return couponsData;
      default:
        return [];
    }
  };

  const filteredData = filterData(getData());
  const paginatedData = paginateData(filteredData);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handleAction = (action, item) => {
    console.log(`${action} on item:`, item);
    setMenuOpen(null);
  };

  const renderTableHeader = () => {
    const headers = activeTab === 'courses'
      ? ['Title', 'Instructor', 'Enrollments', 'Revenue', 'Status']
      : activeTab === 'ebooks'
      ? ['Title', 'Category', 'Sales', 'Revenue', 'Status']
      : ['Code', 'Discount', 'Uses', 'Expiry', 'Status'];

    return (
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th 
              key={index} 
              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 cursor-pointer hover:bg-gray-50"
              onClick={() => handleSort(header.toLowerCase())}
            >
              <div className="flex items-center">
                {header}
                {sortConfig.key === header.toLowerCase() && (
                  sortConfig.direction === 'asc' ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />
                )}
              </div>
            </th>
          ))}
          <th className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">Actions</th>
        </tr>
      </thead>
    );
  };

  const renderTableBody = () => {
    return (
      <tbody className="divide-y divide-gray-200">
        {paginatedData.map((item) => (
          <tr key={item.id} className="hover:bg-gray-50 transition-colors duration-150">
            {activeTab === 'courses' && (
              <>
                <td className="whitespace-nowrap px-3 py-4 text-sm font-medium text-gray-900">{item.title}</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-700">{item.instructor}</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-700">{item.enrollments.toLocaleString()}</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-700">{formatCurrency(item.revenue)}</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-700">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${item.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {item.status}
                  </span>
                </td>
              </>
            )}
            {activeTab === 'ebooks' && (
              <>
                <td className="whitespace-nowrap px-3 py-4 text-sm font-medium text-gray-900">{item.title}</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-700">{item.category}</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-700">{item.sales.toLocaleString()}</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-700">{formatCurrency(item.revenue)}</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-700">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${item.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {item.status}
                  </span>
                </td>
              </>
            )}
            {activeTab === 'coupons' && (
              <>
                <td className="whitespace-nowrap px-3 py-4 text-sm font-medium text-gray-900">{item.code}</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-700">{item.discount}</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-700">{item.uses.toLocaleString()}</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-700">{item.expiry}</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-700">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${item.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {item.status}
                  </span>
                </td>
              </>
            )}
            <td className="whitespace-nowrap px-3 py-4 text-sm text-right relative">
              <button
                onClick={() => setMenuOpen(menuOpen === item.id ? null : item.id)}
                className="text-gray-500 hover:text-gray-700"
              >
                <MoreVertical className="h-5 w-5" />
              </button>
              <AnimatePresence>
                {menuOpen === item.id && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10"
                  >
                    <div className="py-1">
                      <button
                        onClick={() => handleAction('Edit', item)}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <Edit className="h-4 w-4 mr-2" /> Edit
                      </button>
                      <button
                        onClick={() => handleAction('Delete', item)}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      >
                        <Trash2 className="h-4 w-4 mr-2" /> Delete
                      </button>
                      <button
                        onClick={() => handleAction('View', item)}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <Eye className="h-4 w-4 mr-2" /> View Details
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </td>
          </tr>
        ))}
      </tbody>
    );
  };

  return (
    <div className="bg-slate-50 min-h-screen w-full">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Content Management</h1>
          <p className="mt-1 text-sm text-gray-500">Manage courses, eBooks, and coupon codes</p>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {['courses', 'ebooks', 'coupons'].map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setSearchQuery('');
                  setFilterStatus('All');
                  setFilterCategory('All');
                  setCurrentPage(1);
                  setSortConfig({ key: null, direction: 'asc' });
                }}
                className={`${
                  activeTab === tab
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm capitalize`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        {/* Controls */}
        <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder={`Search ${activeTab}...`}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex space-x-3">
            <div className="relative">
              <select
                value={filterStatus}
                onChange={(e) => {
                  setFilterStatus(e.target.value);
                  setCurrentPage(1);
                }}
                className="appearance-none pl-4 pr-8 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              <Filter className="absolute left-1 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
            {activeTab === 'ebooks' && (
              <div className="relative">
                <select
                  value={filterCategory}
                  onChange={(e) => {
                    setFilterCategory(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="appearance-none pl-4 pr-8 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option value="All">All Categories</option>
                  <option value="Technical">Technical</option>
                  <option value="Business">Business</option>
                  <option value="Design">Design</option>
                  <option value="Marketing">Marketing</option>
                </select>
                <Filter className="absolute left-1 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            )}
          </div>
        </div>

        {/* Table */}
        <div className="mt-6 bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              {renderTableHeader()}
              {renderTableBody()}
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Showing {((currentPage - 1) * itemsPerPage + 1)} to {Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length} results
          </p>
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-2 border border-gray-300 rounded-md text-sm font-medium ${
                  currentPage === page ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContentManagement;