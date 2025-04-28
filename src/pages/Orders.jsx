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
  XCircle
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

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ChartTooltip,
  Legend
);

const Orders = () => {
  // State management for orders
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // State for filtering and pagination
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  
  // Modal state management
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedOrder, setSelectedOrder] = useState(null);
  
  // Status update state
  const [updatingStatus, setUpdatingStatus] = useState(false);

  // Stats for dashboard
  const [orderStats, setOrderStats] = useState({
    new: 0,
    pending: 0,
    shipped: 0,
    delivered: 0,
    total: 0
  });

  // Sample order data for demonstration
  const sampleOrders = [
    {
      id: "ORD-1001",
      customer: "John Smith",
      status: "new",
      totalPrice: 89.95,
      items: [
        { 
          id: 1, 
          name: "Chocolate Cake", 
          variant: "Large", 
          quantity: 1, 
          price: 54.95,
          specialInstructions: "Extra frosting please" 
        },
        { 
          id: 2, 
          name: "Cupcakes", 
          variant: "Red Velvet", 
          quantity: 6, 
          price: 35.00,
          specialInstructions: "" 
        }
      ],
      specialMessage: "Happy Birthday Mom!",
      createdAt: "2025-04-18T14:30:00",
      deliverySlot: "2025-04-20 14:00-16:00",
      address: "123 Main St, Anytown, ST 12345",
      phone: "555-123-4567",
      paymentMethod: "Credit Card"
    },
    {
      id: "ORD-1002",
      customer: "Sarah Johnson",
      status: "pending",
      totalPrice: 45.50,
      items: [
        { 
          id: 3, 
          name: "Cookies", 
          variant: "Chocolate Chip", 
          quantity: 12, 
          price: 24.00,
          specialInstructions: "Extra chips" 
        },
        { 
          id: 4, 
          name: "Brownies", 
          variant: "Walnut", 
          quantity: 6, 
          price: 21.50,
          specialInstructions: "" 
        }
      ],
      specialMessage: "",
      createdAt: "2025-04-19T09:15:00",
      deliverySlot: "2025-04-21 12:00-14:00",
      address: "456 Oak Ave, Springfield, ST 67890",
      phone: "555-987-6543",
      paymentMethod: "PayPal"
    },
    {
      id: "ORD-1003",
      customer: "Michael Williams",
      status: "shipped",
      totalPrice: 125.75,
      items: [
        { 
          id: 5, 
          name: "Wedding Cake", 
          variant: "Two-tier Vanilla", 
          quantity: 1, 
          price: 125.75,
          specialInstructions: "Silver decorations" 
        }
      ],
      specialMessage: "Congratulations on your special day!",
      createdAt: "2025-04-15T16:45:00",
      deliverySlot: "2025-04-20 10:00-12:00",
      address: "789 Pine St, Lakeville, ST 54321",
      phone: "555-456-7890",
      paymentMethod: "Credit Card"
    },
    {
      id: "ORD-1004",
      customer: "Emily Davis",
      status: "delivered",
      totalPrice: 67.25,
      items: [
        { 
          id: 6, 
          name: "Cheesecake", 
          variant: "Strawberry", 
          quantity: 1, 
          price: 42.25,
          specialInstructions: "" 
        },
        { 
          id: 7, 
          name: "Muffins", 
          variant: "Blueberry", 
          quantity: 5, 
          price: 25.00,
          specialInstructions: "Fresh berries on top" 
        }
      ],
      specialMessage: "",
      createdAt: "2025-04-16T11:20:00",
      deliverySlot: "2025-04-19 15:00-17:00",
      address: "321 Elm Blvd, River City, ST 13579",
      phone: "555-234-5678",
      paymentMethod: "Apple Pay"
    },
    {
      id: "ORD-1005",
      customer: "David Wilson",
      status: "new",
      totalPrice: 53.50,
      items: [
        { 
          id: 8, 
          name: "Apple Pie", 
          variant: "Dutch Style", 
          quantity: 1, 
          price: 32.50,
          specialInstructions: "Extra cinnamon" 
        },
        { 
          id: 9, 
          name: "Bread", 
          variant: "Sourdough", 
          quantity: 2, 
          price: 21.00,
          specialInstructions: "" 
        }
      ],
      specialMessage: "Thank you for the great service!",
      createdAt: "2025-04-19T13:10:00",
      deliverySlot: "2025-04-22 09:00-11:00",
      address: "654 Maple Dr, Hill Valley, ST 97531",
      phone: "555-876-5432",
      paymentMethod: "Credit Card"
    }
  ];

  // Fetch orders data
  useEffect(() => {
    // Simulate API fetch with sample data
    setTimeout(() => {
      setOrders(sampleOrders);
      setLoading(false);
      
      // Calculate stats
      const stats = {
        new: sampleOrders.filter(order => order.status === "new").length,
        pending: sampleOrders.filter(order => order.status === "pending").length,
        shipped: sampleOrders.filter(order => order.status === "shipped").length,
        delivered: sampleOrders.filter(order => order.status === "delivered").length,
        total: sampleOrders.length
      };
      setOrderStats(stats);
    }, 1000);
  }, []);

  // Function to open order detail modal
  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    onOpen();
  };

  // Function to update order status
  const updateOrderStatus = (orderId, newStatus) => {
    setUpdatingStatus(true);
    
    // Simulate API call
    setTimeout(() => {
      const updatedOrders = orders.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      );
      setOrders(updatedOrders);
      
      // Update stats
      const stats = {
        new: updatedOrders.filter(order => order.status === "new").length,
        pending: updatedOrders.filter(order => order.status === "pending").length,
        shipped: updatedOrders.filter(order => order.status === "shipped").length,
        delivered: updatedOrders.filter(order => order.status === "delivered").length,
        total: updatedOrders.length
      };
      setOrderStats(stats);
      
      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder({...selectedOrder, status: newStatus});
      }
      
      toast.success(`Order ${orderId} status updated to ${newStatus}`);
      setUpdatingStatus(false);
    }, 800);
  };

  // Function to filter orders
  const filteredOrders = orders.filter(order => {
    // Filter by status
    if (filterStatus !== "all" && order.status !== filterStatus) {
      return false;
    }
    
    // Filter by search query (check order ID, customer name)
    if (searchQuery && 
        !order.id.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !order.customer.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Filter by date range
    if (dateRange.start && new Date(order.createdAt) < new Date(dateRange.start)) {
      return false;
    }
    if (dateRange.end && new Date(order.createdAt) > new Date(dateRange.end)) {
      return false;
    }
    
    return true;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);

  // Function to export orders data
  const exportOrdersCSV = () => {
    const headers = "Order ID,Customer,Status,Total Price,Items,Special Message,Created At,Delivery Slot,Address,Phone,Payment Method\n";
    
    const csvContent = filteredOrders.reduce((acc, order) => {
      const itemsList = order.items.map(item => `${item.name} (${item.variant}) x${item.quantity}`).join("; ");
      const row = [
        order.id,
        order.customer,
        order.status,
        order.totalPrice,
        itemsList,
        order.specialMessage || "None",
        new Date(order.createdAt).toLocaleString(),
        order.deliverySlot,
        order.address,
        order.phone,
        order.paymentMethod
      ].map(field => `"${field}"`).join(",");
      
      return acc + row + "\n";
    }, headers);
    
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
    saveAs(blob, `kitchen-orders-${new Date().toISOString().slice(0, 10)}.csv`);
    toast.success("Orders exported successfully");
  };

  // Reset filters
  const resetFilters = () => {
    setFilterStatus("all");
    setSearchQuery("");
    setDateRange({ start: "", end: "" });
    setCurrentPage(1);
  };

  // Function to render status chip with appropriate color
  const getStatusColor = (status) => {
    switch(status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'shipped': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Chart data for the dashboard
  const chartData = {
    labels: ['New', 'Pending', 'Shipped', 'Delivered'],
    datasets: [
      {
        label: 'Number of Orders',
        data: [orderStats.new, orderStats.pending, orderStats.shipped, orderStats.delivered],
        backgroundColor: 'rgba(59, 130, 246, 0.6)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(59, 130, 246, 0.8)',
      },
    ],
  };

  // Chart options
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
          label: (context) => `${context.dataset.label}: ${context.parsed.y}`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
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
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen font-sans"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-between items-center mb-10"
        >
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Kitchen Team Order Management</h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={exportOrdersCSV}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow-md transition-all duration-300"
          >
            <FileText size={18} />
            <span>Export Data</span>
          </motion.button>
        </motion.div>
        
        {/* Order Stats Dashboard */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-10"
        >
          {[
            { title: "New Orders", value: orderStats.new, color: "blue", icon: Clock },
            { title: "Pending", value: orderStats.pending, color: "yellow", icon: Package },
            { title: "Shipped", value: orderStats.shipped, color: "purple", icon: Truck },
            { title: "Delivered", value: orderStats.delivered, color: "green", icon: CheckCircle },
            { title: "Total Orders", value: orderStats.total, color: "gray", icon: FileText },
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
                </div>
                <div className={`bg-${stat.color}-50 p-3 rounded-full`}>
                  <stat.icon size={24} className={`text-${stat.color}-600`} />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Chart Row */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-10"
        >
          <Card className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <CardBody className="h-80">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Orders by Status</h3>
              <Bar data={chartData} options={chartOptions} />
            </CardBody>
          </Card>
        </motion.div>
        
        {/* Filters and Actions */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-10"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 w-full md:w-auto">
            <Input
              placeholder="Search by order ID or customer..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              startContent={<Search size={16} />}
              className="w-full md:w-64 bg-white border border-gray-200 rounded-lg shadow-sm"
            />
            
            <Select
              placeholder="Filter by status"
              selectedKeys={[filterStatus]}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full md:w-40 bg-white border border-gray-200 rounded-lg shadow-sm"
            >
              <SelectItem key="all" value="all">All Statuses</SelectItem>
              <SelectItem key="new" value="new">New</SelectItem>
              <SelectItem key="pending" value="pending">Pending</SelectItem>
              <SelectItem key="shipped" value="shipped">Shipped</SelectItem>
              <SelectItem key="delivered" value="delivered">Delivered</SelectItem>
            </Select>
            
            <div className="flex gap-2 w-full md:w-auto">
              <Input
                type="date"
                placeholder="Start Date"
                value={dateRange.start}
                onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
                className="w-full md:w-40 bg-white border border-gray-200 rounded-lg shadow-sm"
              />
              <Input
                type="date"
                placeholder="End Date"
                value={dateRange.end}
                onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
                className="w-full md:w-40 bg-white border border-gray-200 rounded-lg shadow-sm"
              />
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={resetFilters}
              className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-5 py-2 rounded-lg shadow-sm transition-all duration-300"
            >
              <RefreshCcw size={18} />
              <span>Reset</span>
            </motion.button>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.print()}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow-md transition-all duration-300"
          >
            <Printer size={18} />
            <span>Print</span>
          </motion.button>
        </motion.div>
        
        {/* Orders Tabs */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-10"
        >
          <Tabs 
            aria-label="Order Status Tabs" 
            selectedKey={filterStatus}
            onSelectionChange={(key) => {
              setFilterStatus(key);
              setCurrentPage(1);
            }}
            className="bg-white rounded-xl shadow-lg p-4 border border-gray-100"
          >
            <Tab key="all" title={
              <div className="flex items-center gap-2 text-gray-700">
                <FileText size={16} />
                <span>All Orders ({orders.length})</span>
              </div>
            } />
            <Tab key="new" title={
              <div className="flex items-center gap-2 text-blue-600">
                <Clock size={16} />
                <span>New ({orderStats.new})</span>
              </div>
            } />
            <Tab key="pending" title={
              <div className="flex items-center gap-2 text-yellow-600">
                <Package size={16} />
                <span>Pending ({orderStats.pending})</span>
              </div>
            } />
            <Tab key="shipped" title={
              <div className="flex items-center gap-2 text-purple-600">
                <Truck size={16} />
                <span>Shipped ({orderStats.shipped})</span>
              </div>
            } />
            <Tab key="delivered" title={
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle size={16} />
                <span>Delivered ({orderStats.delivered})</span>
              </div>
            } />
          </Tabs>
        </motion.div>
        
        {/* Orders Table */}
        <AnimatePresence>
          {loading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center items-center h-64"
            >
              <Spinner size="lg" label="Loading orders..." />
            </motion.div>
          ) : error ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-red-100 p-4 rounded-lg text-red-700"
            >
              Error loading orders: {error}
            </motion.div>
          ) : currentOrders.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-gray-100 p-8 rounded-lg text-center"
            >
              <p className="text-lg text-gray-600">No orders found matching your filters</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={resetFilters}
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow-md transition-all duration-300"
              >
                Reset Filters
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Card className="bg-white rounded-xl shadow-lg border border-gray-100">
                <Table aria-label="Orders table" isHeaderSticky>
                  <TableHeader>
                    <TableColumn className="text-sm font-medium text-gray-500">ORDER ID</TableColumn>
                    <TableColumn className="text-sm font-medium text-gray-500">CUSTOMER</TableColumn>
                    <TableColumn className="text-sm font-medium text-gray-500">STATUS</TableColumn>
                    <TableColumn className="text-sm font-medium text-gray-500">ITEMS</TableColumn>
                    <TableColumn className="text-sm font-medium text-gray-500">TOTAL</TableColumn>
                    <TableColumn className="text-sm font-medium text-gray-500">DELIVERY SLOT</TableColumn>
                    <TableColumn className="text-sm font-medium text-gray-500">CREATED AT</TableColumn>
                    <TableColumn className="text-sm font-medium text-gray-500">ACTIONS</TableColumn>
                  </TableHeader>
                  <TableBody>
                    {currentOrders.map((order) => (
                      <TableRow key={order.id} className="hover:bg-gray-50 transition-colors duration-200">
                        <TableCell className="text-sm font-medium text-gray-700">{order.id}</TableCell>
                        <TableCell className="text-sm text-gray-700">{order.customer}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Tooltip content={order.items.map(item => `${item.name} (${item.variant}) x${item.quantity}`).join(", ")}>
                            <span className="text-sm text-gray-700">{order.items.length} item(s)</span>
                          </Tooltip>
                        </TableCell>
                        <TableCell className="text-sm font-medium text-gray-900">${order.totalPrice.toFixed(2)}</TableCell>
                        <TableCell className="text-sm text-gray-700">{order.deliverySlot}</TableCell>
                        <TableCell className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleString()}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleViewOrder(order)}
                              className="text-gray-500 hover:text-gray-700"
                            >
                              <Eye size={18} />
                            </motion.button>
                            
                            <Dropdown>
                              <DropdownTrigger>
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  className="text-gray-500 hover:text-gray-700"
                                >
                                  <MoreVertical size={18} />
                                </motion.button>
                              </DropdownTrigger>
                              <DropdownMenu aria-label="Order Actions">
                                <DropdownItem 
                                  startContent={<Eye size={16} />}
                                  onClick={() => handleViewOrder(order)}
                                >
                                  View Details
                                </DropdownItem>
                                
                                {order.status === "new" && (
                                  <DropdownItem 
                                    startContent={<Package size={16} />}
                                    onClick={() => updateOrderStatus(order.id, "pending")}
                                  >
                                    Mark as Pending
                                  </DropdownItem>
                                )}
                                
                                {order.status === "pending" && (
                                  <DropdownItem 
                                    startContent={<Truck size={16} />}
                                    onClick={() => updateOrderStatus(order.id, "shipped")}
                                  >
                                    Mark as Shipped
                                  </DropdownItem>
                                )}
                                
                                {order.status === "shipped" && (
                                  <DropdownItem 
                                    startContent={<CheckCircle size={16} />}
                                    onClick={() => updateOrderStatus(order.id, "delivered")}
                                  >
                                    Mark as Delivered
                                  </DropdownItem>
                                )}
                                
                                <DropdownItem 
                                  startContent={<Printer size={16} />}
                                  onClick={() => {
                                    handleViewOrder(order);
                                    setTimeout(() => window.print(), 500);
                                  }}
                                >
                                  Print Order
                                </DropdownItem>
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
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex justify-between items-center mt-6"
        >
          <div className="text-sm text-gray-500">
            Showing {filteredOrders.length > 0 ? indexOfFirstItem + 1 : 0} - {Math.min(indexOfLastItem, filteredOrders.length)} of {filteredOrders.length} orders
          </div>
          <div className="flex items-center gap-4">
            <Select
              selectedKeys={[itemsPerPage.toString()]}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="w-32 bg-white border border-gray-200 rounded-lg shadow-sm"
            >
              <SelectItem key="5" value="5">5 per page</SelectItem>
              <SelectItem key="10" value="10">10 per page</SelectItem>
              <SelectItem key="20" value="20">20 per page</SelectItem>
              <SelectItem key="50" value="50">50 per page</SelectItem>
            </Select>
            <Pagination
              total={totalPages}
              page={currentPage}
              onChange={setCurrentPage}
              showControls
              className="bg-white rounded-lg shadow-sm"
            />
          </div>
        </motion.div>
        
        {/* Order Detail Modal */}
        <Modal 
          isOpen={isOpen} 
          onClose={onClose}
          size="3xl"
          scrollBehavior="inside"
          className="bg-white rounded-xl shadow-lg border border-gray-100"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1 border-b border-gray-100">
                  {selectedOrder && (
                    <div className="flex justify-between items-center">
                      <h2 className="text-xl font-semibold text-gray-900">Order Details: {selectedOrder.id}</h2>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedOrder.status)}`}>
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
                          <h3 className="text-lg font-semibold text-gray-900 mb-3">Customer Information</h3>
                          <p className="text-sm text-gray-700"><strong>Name:</strong> {selectedOrder.customer}</p>
                          <p className="text-sm text-gray-700"><strong>Phone:</strong> {selectedOrder.phone}</p>
                          <p className="text-sm text-gray-700"><strong>Address:</strong> {selectedOrder.address}</p>
                          <p className="text-sm text-gray-700"><strong>Payment Method:</strong> {selectedOrder.paymentMethod}</p>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-3">Order Information</h3>
                          <p className="text-sm text-gray-700"><strong>Order Date:</strong> {new Date(selectedOrder.createdAt).toLocaleString()}</p>
                          <p className="text-sm text-gray-700"><strong>Delivery Slot:</strong> {selectedOrder.deliverySlot}</p>
                          <p className="text-sm text-gray-700"><strong>Total:</strong> ${selectedOrder.totalPrice.toFixed(2)}</p>
                          {selectedOrder.specialMessage && (
                            <div className="bg-purple-50 p-3 rounded-lg mt-3">
                              <p className="text-sm text-gray-700"><strong>Special Message:</strong></p>
                              <p className="text-sm italic text-gray-700">"{selectedOrder.specialMessage}"</p>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Order Items</h3>
                      <Table aria-label="Order items table">
                        <TableHeader>
                          <TableColumn className="text-sm font-medium text-gray-500">ITEM</TableColumn>
                          <TableColumn className="text-sm font-medium text-gray-500">VARIANT</TableColumn>
                          <TableColumn className="text-sm font-medium text-gray-500">QUANTITY</TableColumn>
                          <TableColumn className="text-sm font-medium text-gray-500">UNIT PRICE</TableColumn>
                          <TableColumn className="text-sm font-medium text-gray-500">TOTAL</TableColumn>
                        </TableHeader>
                        <TableBody>
                          {selectedOrder.items.map((item) => (
                            <TableRow key={item.id} className="hover:bg-gray-50 transition-colors duration-200">
                              <TableCell className="text-sm text-gray-700">{item.name}</TableCell>
                              <TableCell className="text-sm text-gray-700">{item.variant}</TableCell>
                              <TableCell className="text-sm text-gray-700">{item.quantity}</TableCell>
                              <TableCell className="text-sm text-gray-700">${(item.price / item.quantity).toFixed(2)}</TableCell>
                              <TableCell className="text-sm font-medium text-gray-900">${item.price.toFixed(2)}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                      
                      {selectedOrder.items.some(item => item.specialInstructions) && (
                        <div className="mt-6">
                          <h3 className="text-lg font-semibold text-gray-900 mb-3">Special Instructions</h3>
                          <Table aria-label="Special instructions table">
                            <TableHeader>
                              <TableColumn className="text-sm font-medium text-gray-500">ITEM</TableColumn>
                              <TableColumn className="text-sm font-medium text-gray-500">INSTRUCTIONS</TableColumn>
                            </TableHeader>
                            <TableBody>
                              {selectedOrder.items
                                .filter(item => item.specialInstructions)
                                .map((item) => (
                                  <TableRow key={item.id} className="hover:bg-gray-50 transition-colors duration-200">
                                    <TableCell className="text-sm text-gray-700">{item.name} ({item.variant})</TableCell>
                                    <TableCell className="text-sm text-gray-700">{item.specialInstructions}</TableCell>
                                  </TableRow>
                                ))}
                            </TableBody>
                          </Table>
                        </div>
                      )}
                    </>
                  )}
                </ModalBody>
                <ModalFooter className="border-t border-gray-100">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onClose}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-5 py-2 rounded-lg shadow-sm transition-all duration-300"
                  >
                    Close
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      handleViewOrder(selectedOrder);
                      setTimeout(() => window.print(), 500);
                    }}
                    className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow-md transition-all duration-300"
                  >
                    <Printer size={18} />
                    <span>Print Order</span>
                  </motion.button>
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