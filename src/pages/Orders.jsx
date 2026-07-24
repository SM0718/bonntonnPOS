import React, { useState, useEffect } from 'react';
import { 
  Table, 
  TableHeader, 
  TableColumn, 
  TableBody, 
  TableRow, 
  TableCell,
  Chip,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Tabs,
  Tab,
  Card,
  CardBody,
  Pagination,
  Input,
  Select,
  SelectItem,
  Spinner,
  Tooltip
} from "@nextui-org/react";
import { saveAs } from 'file-saver';
import axios from 'axios';
import { toast } from 'react-toastify';
import { 
  Calendar, 
  ChevronDown, 
  Filter, 
  Search, 
  Eye, 
  Edit, 
  Truck, 
  Package, 
  CheckCircle, 
  Clock, 
  FileText, 
  Printer,
  RefreshCcw,
  MoreVertical,
  XCircle,
  ArrowUpRight,
  ArrowDownRight,
  ShoppingBag,
} from "lucide-react";
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip as ChartTooltip,
  Legend
} from 'chart.js';
import { motion, AnimatePresence } from 'framer-motion';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, ChartTooltip, Legend);

const statusColorMap = {
  new: 'bg-blue-50 text-blue-700 border border-blue-200',
  pending: 'bg-amber-50 text-amber-700 border border-amber-200',
  shipped: 'bg-purple-50 text-purple-700 border border-purple-200',
  delivered: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
  cancelled: 'bg-red-50 text-red-700 border border-red-200',
};

const statCardColors = {
  blue: 'bg-blue-50 text-blue-600',
  amber: 'bg-amber-50 text-amber-600',
  purple: 'bg-purple-50 text-purple-600',
  emerald: 'bg-emerald-50 text-emerald-600',
  surface: 'bg-surface-100 text-surface-600',
};

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  const [orderStats, setOrderStats] = useState({
    new: 0, pending: 0, shipped: 0, delivered: 0, total: 0
  });

  const sampleOrders = [
    {
      id: "ORD-1001", customer: "John Smith", status: "new", totalPrice: 89.95,
      items: [
        { id: 1, name: "Chocolate Cake", variant: "Large", quantity: 1, price: 54.95, specialInstructions: "Extra frosting please" },
        { id: 2, name: "Cupcakes", variant: "Red Velvet", quantity: 6, price: 35.00, specialInstructions: "" }
      ],
      specialMessage: "Happy Birthday Mom!", createdAt: "2025-04-18T14:30:00",
      deliverySlot: "2025-04-20 14:00-16:00", address: "123 Main St, Anytown, ST 12345",
      phone: "555-123-4567", paymentMethod: "Credit Card"
    },
    {
      id: "ORD-1002", customer: "Sarah Johnson", status: "pending", totalPrice: 45.50,
      items: [
        { id: 3, name: "Cookies", variant: "Chocolate Chip", quantity: 12, price: 24.00, specialInstructions: "Extra chips" },
        { id: 4, name: "Brownies", variant: "Walnut", quantity: 6, price: 21.50, specialInstructions: "" }
      ],
      specialMessage: "", createdAt: "2025-04-19T09:15:00",
      deliverySlot: "2025-04-21 12:00-14:00", address: "456 Oak Ave, Springfield, ST 67890",
      phone: "555-987-6543", paymentMethod: "PayPal"
    },
    {
      id: "ORD-1003", customer: "Michael Williams", status: "shipped", totalPrice: 125.75,
      items: [
        { id: 5, name: "Wedding Cake", variant: "Two-tier Vanilla", quantity: 1, price: 125.75, specialInstructions: "Silver decorations" }
      ],
      specialMessage: "Congratulations on your special day!", createdAt: "2025-04-15T16:45:00",
      deliverySlot: "2025-04-20 10:00-12:00", address: "789 Pine St, Lakeville, ST 54321",
      phone: "555-456-7890", paymentMethod: "Credit Card"
    },
    {
      id: "ORD-1004", customer: "Emily Davis", status: "delivered", totalPrice: 67.25,
      items: [
        { id: 6, name: "Cheesecake", variant: "Strawberry", quantity: 1, price: 42.25, specialInstructions: "" },
        { id: 7, name: "Muffins", variant: "Blueberry", quantity: 5, price: 25.00, specialInstructions: "Fresh berries on top" }
      ],
      specialMessage: "", createdAt: "2025-04-16T11:20:00",
      deliverySlot: "2025-04-19 15:00-17:00", address: "321 Elm Blvd, River City, ST 13579",
      phone: "555-234-5678", paymentMethod: "Apple Pay"
    },
    {
      id: "ORD-1005", customer: "David Wilson", status: "new", totalPrice: 53.50,
      items: [
        { id: 8, name: "Apple Pie", variant: "Dutch Style", quantity: 1, price: 32.50, specialInstructions: "Extra cinnamon" },
        { id: 9, name: "Bread", variant: "Sourdough", quantity: 2, price: 21.00, specialInstructions: "" }
      ],
      specialMessage: "Thank you for the great service!", createdAt: "2025-04-19T13:10:00",
      deliverySlot: "2025-04-22 09:00-11:00", address: "654 Maple Dr, Hill Valley, ST 97531",
      phone: "555-876-5432", paymentMethod: "Credit Card"
    }
  ];

  useEffect(() => {
    setTimeout(() => {
      setOrders(sampleOrders);
      setLoading(false);
      const stats = {
        new: sampleOrders.filter(o => o.status === "new").length,
        pending: sampleOrders.filter(o => o.status === "pending").length,
        shipped: sampleOrders.filter(o => o.status === "shipped").length,
        delivered: sampleOrders.filter(o => o.status === "delivered").length,
        total: sampleOrders.length
      };
      setOrderStats(stats);
    }, 1000);
  }, []);

  const handleViewOrder = (order) => { setSelectedOrder(order); onOpen(); };

  const updateOrderStatus = (orderId, newStatus) => {
    setUpdatingStatus(true);
    setTimeout(() => {
      const updatedOrders = orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o);
      setOrders(updatedOrders);
      const stats = {
        new: updatedOrders.filter(o => o.status === "new").length,
        pending: updatedOrders.filter(o => o.status === "pending").length,
        shipped: updatedOrders.filter(o => o.status === "shipped").length,
        delivered: updatedOrders.filter(o => o.status === "delivered").length,
        total: updatedOrders.length
      };
      setOrderStats(stats);
      if (selectedOrder && selectedOrder.id === orderId) setSelectedOrder({...selectedOrder, status: newStatus});
      toast.success(`Order ${orderId} status updated to ${newStatus}`);
      setUpdatingStatus(false);
    }, 800);
  };

  const filteredOrders = orders.filter(order => {
    if (filterStatus !== "all" && order.status !== filterStatus) return false;
    if (searchQuery && !order.id.toLowerCase().includes(searchQuery.toLowerCase()) && !order.customer.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (dateRange.start && new Date(order.createdAt) < new Date(dateRange.start)) return false;
    if (dateRange.end && new Date(order.createdAt) > new Date(dateRange.end)) return false;
    return true;
  });

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);

  const exportOrdersCSV = () => {
    const headers = "Order ID,Customer,Status,Total Price,Items,Special Message,Created At,Delivery Slot,Address,Phone,Payment Method\n";
    const csvContent = filteredOrders.reduce((acc, order) => {
      const itemsList = order.items.map(item => `${item.name} (${item.variant}) x${item.quantity}`).join("; ");
      const row = [order.id, order.customer, order.status, order.totalPrice, itemsList, order.specialMessage || "None",
        new Date(order.createdAt).toLocaleString(), order.deliverySlot, order.address, order.phone, order.paymentMethod
      ].map(field => `"${field}"`).join(",");
      return acc + row + "\n";
    }, headers);
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
    saveAs(blob, `kitchen-orders-${new Date().toISOString().slice(0, 10)}.csv`);
    toast.success("Orders exported successfully");
  };

  const resetFilters = () => { setFilterStatus("all"); setSearchQuery(""); setDateRange({ start: "", end: "" }); setCurrentPage(1); };

  const chartData = {
    labels: ['New', 'Pending', 'Shipped', 'Delivered'],
    datasets: [{
      label: 'Number of Orders',
      data: [orderStats.new, orderStats.pending, orderStats.shipped, orderStats.delivered],
      backgroundColor: ['rgba(59, 130, 246, 0.6)', 'rgba(245, 158, 11, 0.6)', 'rgba(139, 92, 246, 0.6)', 'rgba(16, 185, 129, 0.6)'],
      borderColor: ['rgb(59, 130, 246)', 'rgb(245, 158, 11)', 'rgb(139, 92, 246)', 'rgb(16, 185, 129)'],
      borderWidth: 1, borderRadius: 6, hoverBackgroundColor: ['rgba(59, 130, 246, 0.8)', 'rgba(245, 158, 11, 0.8)', 'rgba(139, 92, 246, 0.8)', 'rgba(16, 185, 129, 0.8)'],
    }],
  };

  const chartOptions = {
    responsive: true, maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { backgroundColor: 'rgba(17, 24, 39, 0.9)', titleFont: { family: 'Inter', size: 13 }, bodyFont: { family: 'Inter', size: 12 }, padding: 12, cornerRadius: 8, displayColors: false },
    },
    scales: {
      y: { beginAtZero: true, ticks: { stepSize: 1, font: { family: 'Inter', size: 11 }, color: '#9CA3AF', padding: 8 }, grid: { color: 'rgba(229, 231, 235, 0.4)', drawBorder: false }, border: { display: false } },
      x: { grid: { display: false }, ticks: { font: { family: 'Inter', size: 11 }, color: '#9CA3AF', padding: 8 }, border: { display: false } },
    },
    animation: { duration: 800, easing: 'easeOutQuart' },
  };

  const statsCards = [
    { title: "New Orders", value: orderStats.new, color: "blue", icon: Clock },
    { title: "Pending", value: orderStats.pending, color: "amber", icon: Package },
    { title: "Shipped", value: orderStats.shipped, color: "purple", icon: Truck },
    { title: "Delivered", value: orderStats.delivered, color: "emerald", icon: CheckCircle },
    { title: "Total Orders", value: orderStats.total, color: "surface", icon: ShoppingBag },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} className="p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-surface-900 tracking-tight">Order Management</h1>
            <p className="text-sm text-surface-500 mt-1">Track and manage kitchen orders</p>
          </div>
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={exportOrdersCSV} className="btn-primary">
            <FileText size={16} />
            <span>Export CSV</span>
          </motion.button>
        </motion.div>

        {/* Stats Cards */}
        <motion.div initial={{ y: 15, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.35, delay: 0.1 }} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          {statsCards.map((stat, index) => (
            <motion.div key={stat.title} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: index * 0.05 }} className="card p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs font-medium text-surface-500 uppercase tracking-wide">{stat.title}</p>
                  <h3 className="text-2xl font-bold text-surface-900 mt-1">{stat.value}</h3>
                </div>
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${statCardColors[stat.color]}`}>
                  <stat.icon size={18} />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Chart */}
        <motion.div initial={{ y: 15, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.35, delay: 0.2 }} className="card p-6 mb-8">
          <h3 className="text-base font-semibold text-surface-900 mb-5">Orders by Status</h3>
          <div className="h-64">
            <Bar data={chartData} options={chartOptions} />
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div initial={{ y: 15, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.35, delay: 0.3 }} className="card p-4 mb-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400" />
              <input
                placeholder="Search by order ID or customer..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-base pl-9"
              />
            </div>
            <Select
              placeholder="Filter by status"
              selectedKeys={[filterStatus]}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full md:w-44"
              size="sm"
              variant="bordered"
            >
              <SelectItem key="all" value="all">All Statuses</SelectItem>
              <SelectItem key="new" value="new">New</SelectItem>
              <SelectItem key="pending" value="pending">Pending</SelectItem>
              <SelectItem key="shipped" value="shipped">Shipped</SelectItem>
              <SelectItem key="delivered" value="delivered">Delivered</SelectItem>
            </Select>
            <input type="date" value={dateRange.start} onChange={(e) => setDateRange({...dateRange, start: e.target.value})} className="input-base w-full md:w-40" />
            <input type="date" value={dateRange.end} onChange={(e) => setDateRange({...dateRange, end: e.target.value})} className="input-base w-full md:w-40" />
            <button onClick={resetFilters} className="btn-ghost">
              <RefreshCcw size={14} />
              Reset
            </button>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div initial={{ y: 15, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.35, delay: 0.35 }} className="mb-6">
          <Tabs 
            aria-label="Order Status Tabs" 
            selectedKey={filterStatus}
            onSelectionChange={(key) => { setFilterStatus(key); setCurrentPage(1); }}
            variant="underlined"
            classNames={{
              tabList: "gap-4 border-b border-surface-200 pb-0",
              tab: "px-0 h-12",
              cursor: "bg-brand-600",
              tabContent: "group-data-[selected=true]:text-brand-700 font-medium text-sm",
            }}
          >
            <Tab key="all" title={<div className="flex items-center gap-2"><span>All Orders</span><span className="text-xs bg-surface-100 text-surface-600 px-1.5 py-0.5 rounded-full">{orders.length}</span></div>} />
            <Tab key="new" title={<div className="flex items-center gap-2"><span>New</span><span className="text-xs bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-full">{orderStats.new}</span></div>} />
            <Tab key="pending" title={<div className="flex items-center gap-2"><span>Pending</span><span className="text-xs bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full">{orderStats.pending}</span></div>} />
            <Tab key="shipped" title={<div className="flex items-center gap-2"><span>Shipped</span><span className="text-xs bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded-full">{orderStats.shipped}</span></div>} />
            <Tab key="delivered" title={<div className="flex items-center gap-2"><span>Delivered</span><span className="text-xs bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-full">{orderStats.delivered}</span></div>} />
          </Tabs>
        </motion.div>

        {/* Orders Table */}
        <AnimatePresence>
          {loading ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex justify-center items-center h-64">
              <Spinner size="lg" color="success" label="Loading orders..." />
            </motion.div>
          ) : error ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="card p-6 bg-red-50 border-red-200 text-red-700">
              Error loading orders: {error}
            </motion.div>
          ) : currentOrders.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="card p-12 text-center">
              <Package size={40} className="text-surface-300 mx-auto mb-4" />
              <p className="text-base font-medium text-surface-700 mb-1">No orders found</p>
              <p className="text-sm text-surface-500 mb-4">Try adjusting your filters</p>
              <button onClick={resetFilters} className="btn-primary">Reset Filters</button>
            </motion.div>
          ) : (
            <motion.div initial={{ y: 15, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.35, delay: 0.4 }}>
              <Card className="card overflow-hidden">
                <Table aria-label="Orders table" isHeaderSticky classNames={{ wrapper: "bg-transparent shadow-none" }}>
                  <TableHeader>
                    <TableColumn className="bg-surface-50 text-xs font-semibold text-surface-500 uppercase tracking-wide">Order ID</TableColumn>
                    <TableColumn className="bg-surface-50 text-xs font-semibold text-surface-500 uppercase tracking-wide">Customer</TableColumn>
                    <TableColumn className="bg-surface-50 text-xs font-semibold text-surface-500 uppercase tracking-wide">Status</TableColumn>
                    <TableColumn className="bg-surface-50 text-xs font-semibold text-surface-500 uppercase tracking-wide">Items</TableColumn>
                    <TableColumn className="bg-surface-50 text-xs font-semibold text-surface-500 uppercase tracking-wide">Total</TableColumn>
                    <TableColumn className="bg-surface-50 text-xs font-semibold text-surface-500 uppercase tracking-wide">Delivery</TableColumn>
                    <TableColumn className="bg-surface-50 text-xs font-semibold text-surface-500 uppercase tracking-wide">Date</TableColumn>
                    <TableColumn className="bg-surface-50 text-xs font-semibold text-surface-500 uppercase tracking-wide">Actions</TableColumn>
                  </TableHeader>
                  <TableBody>
                    {currentOrders.map((order) => (
                      <TableRow key={order.id} className="hover:bg-surface-50 transition-colors">
                        <TableCell><span className="text-sm font-medium text-surface-800">{order.id}</span></TableCell>
                        <TableCell><span className="text-sm text-surface-700">{order.customer}</span></TableCell>
                        <TableCell>
                          <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColorMap[order.status] || 'bg-surface-100 text-surface-600'}`}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Tooltip content={order.items.map(item => `${item.name} (${item.variant}) x${item.quantity}`).join(", ")}>
                            <span className="text-sm text-surface-600 cursor-help">{order.items.length} item(s)</span>
                          </Tooltip>
                        </TableCell>
                        <TableCell><span className="text-sm font-semibold text-surface-900">${order.totalPrice.toFixed(2)}</span></TableCell>
                        <TableCell><span className="text-sm text-surface-600">{order.deliverySlot}</span></TableCell>
                        <TableCell><span className="text-sm text-surface-500">{new Date(order.createdAt).toLocaleDateString()}</span></TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <button onClick={() => handleViewOrder(order)} className="p-1.5 text-surface-400 hover:text-surface-600 hover:bg-surface-100 rounded-lg transition-colors">
                              <Eye size={16} />
                            </button>
                            <Dropdown>
                              <DropdownTrigger>
                                <button className="p-1.5 text-surface-400 hover:text-surface-600 hover:bg-surface-100 rounded-lg transition-colors">
                                  <MoreVertical size={16} />
                                </button>
                              </DropdownTrigger>
                              <DropdownMenu aria-label="Order Actions" variant="faded">
                                <DropdownItem key="view" startContent={<Eye size={14} />} onClick={() => handleViewOrder(order)}>View Details</DropdownItem>
                                {order.status === "new" && <DropdownItem key="pending" startContent={<Package size={14} />} onClick={() => updateOrderStatus(order.id, "pending")}>Mark as Pending</DropdownItem>}
                                {order.status === "pending" && <DropdownItem key="shipped" startContent={<Truck size={14} />} onClick={() => updateOrderStatus(order.id, "shipped")}>Mark as Shipped</DropdownItem>}
                                {order.status === "shipped" && <DropdownItem key="delivered" startContent={<CheckCircle size={14} />} onClick={() => updateOrderStatus(order.id, "delivered")}>Mark as Delivered</DropdownItem>}
                                <DropdownItem key="print" startContent={<Printer size={14} />} onClick={() => { handleViewOrder(order); setTimeout(() => window.print(), 500); }}>Print Order</DropdownItem>
                              </DropdownMenu>
                            </Dropdown>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pagination */}
        {!loading && currentOrders.length > 0 && (
          <motion.div initial={{ y: 15, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.35, delay: 0.45 }} className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6">
            <div className="text-sm text-surface-500">
              Showing {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, filteredOrders.length)} of {filteredOrders.length} orders
            </div>
            <div className="flex items-center gap-4">
              <Select
                selectedKeys={[itemsPerPage.toString()]}
                onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}
                className="w-32"
                size="sm"
                variant="bordered"
              >
                <SelectItem key="5" value="5">5 / page</SelectItem>
                <SelectItem key="10" value="10">10 / page</SelectItem>
                <SelectItem key="20" value="20">20 / page</SelectItem>
                <SelectItem key="50" value="50">50 / page</SelectItem>
              </Select>
              <Pagination total={totalPages} page={currentPage} onChange={setCurrentPage} showControls className="bg-white rounded-lg" />
            </div>
          </motion.div>
        )}

        {/* Order Detail Modal */}
        <Modal isOpen={isOpen} onClose={onClose} size="3xl" scrollBehavior="inside" backdrop="blur">
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="border-b border-surface-100">
                  {selectedOrder && (
                    <div className="flex justify-between items-center">
                      <h2 className="text-lg font-semibold text-surface-900">Order {selectedOrder.id}</h2>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColorMap[selectedOrder.status] || 'bg-surface-100 text-surface-600'}`}>
                        {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                      </span>
                    </div>
                  )}
                </ModalHeader>
                <ModalBody className="p-6">
                  {selectedOrder && (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <h3 className="text-sm font-semibold text-surface-900 mb-3 uppercase tracking-wide">Customer Info</h3>
                          <div className="space-y-2">
                            <p className="text-sm text-surface-700"><span className="font-medium text-surface-500">Name:</span> {selectedOrder.customer}</p>
                            <p className="text-sm text-surface-700"><span className="font-medium text-surface-500">Phone:</span> {selectedOrder.phone}</p>
                            <p className="text-sm text-surface-700"><span className="font-medium text-surface-500">Address:</span> {selectedOrder.address}</p>
                            <p className="text-sm text-surface-700"><span className="font-medium text-surface-500">Payment:</span> {selectedOrder.paymentMethod}</p>
                          </div>
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-surface-900 mb-3 uppercase tracking-wide">Order Info</h3>
                          <div className="space-y-2">
                            <p className="text-sm text-surface-700"><span className="font-medium text-surface-500">Date:</span> {new Date(selectedOrder.createdAt).toLocaleString()}</p>
                            <p className="text-sm text-surface-700"><span className="font-medium text-surface-500">Delivery:</span> {selectedOrder.deliverySlot}</p>
                            <p className="text-sm text-surface-700"><span className="font-medium text-surface-500">Total:</span> <span className="font-bold">${selectedOrder.totalPrice.toFixed(2)}</span></p>
                            {selectedOrder.specialMessage && (
                              <div className="bg-brand-50 border border-brand-200 p-3 rounded-lg mt-2">
                                <p className="text-xs font-medium text-brand-700 mb-1">Special Message</p>
                                <p className="text-sm text-brand-800 italic">"{selectedOrder.specialMessage}"</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <h3 className="text-sm font-semibold text-surface-900 mb-3 uppercase tracking-wide">Order Items</h3>
                      <div className="border border-surface-200 rounded-lg overflow-hidden">
                        <Table aria-label="Order items table" classNames={{ wrapper: "bg-transparent shadow-none" }}>
                          <TableHeader>
                            <TableColumn className="bg-surface-50 text-xs font-semibold">Item</TableColumn>
                            <TableColumn className="bg-surface-50 text-xs font-semibold">Variant</TableColumn>
                            <TableColumn className="bg-surface-50 text-xs font-semibold">Qty</TableColumn>
                            <TableColumn className="bg-surface-50 text-xs font-semibold">Price</TableColumn>
                            <TableColumn className="bg-surface-50 text-xs font-semibold">Total</TableColumn>
                          </TableHeader>
                          <TableBody>
                            {selectedOrder.items.map((item) => (
                              <TableRow key={item.id}>
                                <TableCell className="text-sm">{item.name}</TableCell>
                                <TableCell className="text-sm">{item.variant}</TableCell>
                                <TableCell className="text-sm">{item.quantity}</TableCell>
                                <TableCell className="text-sm">${(item.price / item.quantity).toFixed(2)}</TableCell>
                                <TableCell className="text-sm font-semibold">${item.price.toFixed(2)}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>

                      {selectedOrder.items.some(item => item.specialInstructions) && (
                        <div className="mt-4">
                          <h3 className="text-sm font-semibold text-surface-900 mb-3 uppercase tracking-wide">Special Instructions</h3>
                          {selectedOrder.items.filter(item => item.specialInstructions).map((item) => (
                            <div key={item.id} className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg mb-2 last:mb-0">
                              <span className="text-sm font-medium text-amber-800">{item.name}:</span>
                              <span className="text-sm text-amber-700">{item.specialInstructions}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </ModalBody>
                <ModalFooter className="border-t border-surface-100">
                  <button onClick={onClose} className="btn-secondary">Close</button>
                  <button onClick={() => { handleViewOrder(selectedOrder); setTimeout(() => window.print(), 500); }} className="btn-primary">
                    <Printer size={14} />
                    Print Order
                  </button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </motion.div>
  );
};

export default Orders;
