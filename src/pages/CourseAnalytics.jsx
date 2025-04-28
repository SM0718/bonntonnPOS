// import React, { useState, useEffect, useRef } from 'react';
// import { 
//   BarChart, 
//   TrendingUp, 
//   BookOpen, 
//   Video, 
//   Users, 
//   Calendar, 
//   CreditCard, 
//   Award, 
//   AlertCircle, 
//   ChevronDown, 
//   ChevronUp, 
//   Download, 
//   Circle, 
//   User, 
//   DollarSign,
//   ArrowUpRight,
//   ArrowDownRight,
//   Percent,
//   Clock,
//   ChevronRight,
//   Eye,
//   PlayCircle,
//   GraduationCap,
//   FileText,
//   Star,
//   MessageSquare,
//   Coffee,
//   Zap,
//   Target,
//   Tag
// } from 'lucide-react';
// import axios from 'axios';
// import { saveAs } from 'file-saver';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, LineElement, PointElement } from 'chart.js';
// import { Bar, Line } from 'react-chartjs-2';

// ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);

// // Sample data for the dashboard
// const enrollmentData = {
//   daily: [
//     { day: 'Mon', enrollments: 85 },
//     { day: 'Tue', enrollments: 110 },
//     { day: 'Wed', enrollments: 95 },
//     { day: 'Thu', enrollments: 130 },
//     { day: 'Fri', enrollments: 150 },
//     { day: 'Sat', enrollments: 200 },
//     { day: 'Sun', enrollments: 170 }
//   ],
//   monthly: [
//     { month: 'Jan', enrollments: 1250 },
//     { month: 'Feb', enrollments: 1320 },
//     { month: 'Mar', enrollments: 1480 },
//     { month: 'Apr', enrollments: 1560 },
//     { month: 'May', enrollments: 1720 },
//     { month: 'Jun', enrollments: 1830 },
//     { month: 'Jul', enrollments: 1660 },
//     { month: 'Aug', enrollments: 1780 },
//     { month: 'Sep', enrollments: 1900 },
//     { month: 'Oct', enrollments: 2050 },
//     { month: 'Nov', enrollments: 2180 },
//     { month: 'Dec', enrollments: 2320 }
//   ],
//   quarterly: [
//     { quarter: 'Q1', enrollments: 4050 }, // Jan-Mar
//     { quarter: 'Q2', enrollments: 5110 }, // Apr-Jun
//     { quarter: 'Q3', enrollments: 5340 }, // Jul-Sep
//     { quarter: 'Q4', enrollments: 6550 }  // Oct-Dec
//   ],
//   yearly: [
//     { year: '2023', enrollments: 18000 },
//     { year: '2024', enrollments: 21050 },
//     { year: '2025', enrollments: 24580 }
//   ]
// };

// const courseStats = {
//   totalCourses: 145,
//   activeCourses: 128,
//   draftCourses: 17,
//   newCourses: 8,
//   courseGrowth: 12.5
// };

// const revenueStats = {
//   totalRevenue: 3784500,
//   monthlyRevenue: 295000,
//   weeklyRevenue: 72500,
//   averageCourseValue: 3850,
//   revenueGrowth: 22.7,
//   refundRate: 2.3
// };

// const learningStats = {
//   totalLearningHours: 587530,
//   averageCompletion: 68.4,
//   averageEngagement: 76.2,
//   certificatesIssued: 14350
// };

// const topCourses = [
//   { id: 1, name: "Advanced Machine Learning", enrollments: 2450, revenue: 980000, rating: 4.8 },
//   { id: 2, name: "Web Development Bootcamp", enrollments: 2180, revenue: 872000, rating: 4.7 },
//   { id: 3, name: "Data Science Fundamentals", enrollments: 1950, revenue: 780000, rating: 4.9 },
//   { id: 4, name: "UI/UX Design Masterclass", enrollments: 1720, revenue: 688000, rating: 4.6 },
//   { id: 5, name: "Python Programming A-Z", enrollments: 1540, revenue: 616000, rating: 4.8 }
// ];

// const topInstructors = [
//   { id: 1, name: "Dr. Sarah Johnson", courses: 12, students: 9850, revenue: 3940000, rating: 4.9 },
//   { id: 2, name: "Prof. Michael Chen", courses: 8, students: 7650, revenue: 3060000, rating: 4.8 },
//   { id: 3, name: "Priya Sharma", courses: 10, students: 6820, revenue: 2728000, rating: 4.7 },
//   { id: 4, name: "Thomas Walker", courses: 7, students: 5740, revenue: 2296000, rating: 4.8 },
//   { id: 5, name: "Anita Desai", courses: 6, students: 4980, revenue: 1992000, rating: 4.9 }
// ];

// const promotions = [
//   { code: "SUMMER25", uses: 1245, discount: "25%", revenue: 498000 },
//   { code: "NEWUSER30", uses: 865, discount: "30%", revenue: 346000 },
//   { code: "FLASHSALE40", uses: 720, discount: "40%", revenue: 288000 },
//   { code: "REFER15", uses: 620, discount: "15%", revenue: 248000 },
//   { code: "EARLYBIRD20", uses: 510, discount: "20%", revenue: 204000 }
// ];

// const recentEnrollments = [
//   { id: "#ENR12983", student: "Emma Wilson", course: "Advanced Machine Learning", date: "2025-04-19", amount: 4000, status: "Completed" },
//   { id: "#ENR12982", student: "James Brown", course: "Web Development Bootcamp", date: "2025-04-19", amount: 3800, status: "In Progress" },
//   { id: "#ENR12981", student: "Olivia Smith", course: "Data Science Fundamentals", date: "2025-04-18", amount: 4500, status: "Just Started" },
//   { id: "#ENR12980", student: "Noah Johnson", course: "UI/UX Design Masterclass", date: "2025-04-18", amount: 3500, status: "Pending" },
//   { id: "#ENR12979", student: "Sophia Davis", course: "Python Programming A-Z", date: "2025-04-17", amount: 3200, status: "Completed" }
// ];

// const studentStats = {
//   totalStudents: 48250,
//   newStudents: 1850,
//   activeStudents: 32400,
//   completionRate: 72.6,
//   studentGrowth: 15.4
// };

// const videoEngagementStats = [
//   { id: 1, title: "Introduction to Neural Networks", duration: "18:45", views: 3850, completion: 92, questions: 78 },
//   { id: 2, title: "Building Your First React App", duration: "24:30", views: 3240, completion: 88, questions: 65 },
//   { id: 3, title: "Data Visualization Techniques", duration: "32:15", views: 2980, completion: 83, questions: 92 },
//   { id: 4, title: "Responsive Design Principles", duration: "21:50", views: 2760, completion: 90, questions: 48 },
//   { id: 5, title: "Python for Data Analysis", duration: "27:20", views: 2640, completion: 87, questions: 83 }
// ];

// const marketingChannelStats = {
//   totalAquisitions: 12800,
//   channels: [
//     { id: 1, name: "Organic Search", students: 4850, cost: 12000, cpa: 2.47, conversion: 3.8 },
//     { id: 2, name: "Paid Search", students: 2950, cost: 35000, cpa: 11.86, conversion: 2.7 },
//     { id: 3, name: "Social Media", students: 3250, cost: 28000, cpa: 8.62, conversion: 3.2 },
//     { id: 4, name: "Email Marketing", students: 1750, cost: 8000, cpa: 4.57, conversion: 4.5 }
//   ]
// };

// function CourseAnalytics() {
//   const [timeRange, setTimeRange] = useState('weekly');
//   const [enrollmentTimeRange, setEnrollmentTimeRange] = useState('daily');
//   const [isTopCoursesExpanded, setIsTopCoursesExpanded] = useState(false);
//   const [isTopInstructorsExpanded, setIsTopInstructorsExpanded] = useState(false);
//   const [isRecentEnrollmentsExpanded, setIsRecentEnrollmentsExpanded] = useState(true);
//   const [isVideoStatsExpanded, setIsVideoStatsExpanded] = useState(true);
//   const [error, setError] = useState(null);

//   const chartRef = useRef(null);

//   const handleDownload = async () => {
//     try {
//       const response = await axios.get("api/v1/courses/download-analytics", {
//         responseType: "blob",
//       });
//       const blob = new Blob([response.data], {
//         type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
//       });
//       saveAs(blob, "courseAnalytics.xlsx");
//       setError(null);
//     } catch (error) {
//       console.error("Error downloading the Excel file:", error);
//       setError("Failed to download report. Please try again.");
//     }
//   };

//   const getStatusColor = (status) => {
//     switch(status) {
//       case 'Completed': return 'bg-green-100 text-green-800';
//       case 'In Progress': return 'bg-blue-100 text-blue-800';
//       case 'Just Started': return 'bg-purple-100 text-purple-800';
//       case 'Pending': return 'bg-yellow-100 text-yellow-800';
//       case 'Refunded': return 'bg-red-100 text-red-800';
//       case 'Active': return 'bg-green-100 text-green-800';
//       case 'Draft': return 'bg-gray-100 text-gray-800';
//       case 'Paused': return 'bg-gray-100 text-gray-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   const formatCurrency = (amount) => {
//     return new Intl.NumberFormat('en-US', { 
//       style: 'currency', 
//       currency: 'USD',
//       maximumFractionDigits: 0
//     }).format(amount);
//   };

//   // Chart data for enrollment Chart.js
//   const enrollmentChartData = {
//     labels: enrollmentTimeRange === 'daily' 
//       ? enrollmentData.daily.map(item => item.day)
//       : enrollmentTimeRange === 'monthly'
//       ? enrollmentData.monthly.map(item => item.month)
//       : enrollmentTimeRange === 'quarterly'
//       ? enrollmentData.quarterly.map(item => item.quarter)
//       : enrollmentData.yearly.map(item => item.year),
//     datasets: [{
//       label: 'Course Enrollments',
//       data: enrollmentTimeRange === 'daily' 
//         ? enrollmentData.daily.map(item => item.enrollments)
//         : enrollmentTimeRange === 'monthly'
//         ? enrollmentData.monthly.map(item => item.enrollments)
//         : enrollmentTimeRange === 'quarterly'
//         ? enrollmentData.quarterly.map(item => item.enrollments)
//         : enrollmentData.yearly.map(item => item.enrollments),
//       backgroundColor: 'rgba(59, 130, 246, 0.6)',
//       borderColor: 'rgb(59, 130, 246)',
//       borderWidth: 1,
//       hoverBackgroundColor: 'rgba(59, 130, 246, 0.8)',
//     }],
//   };

//   const enrollmentChartOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: { display: false },
//       tooltip: {
//         backgroundColor: 'rgba(0, 0, 0, 0.8)',
//         titleFont: { size: 14 },
//         bodyFont: { size: 12 },
//         callbacks: {
//           label: (context) => `Enrollments: ${context.parsed.y}`,
//         },
//       },
//     },
//     scales: {
//       y: {
//         beginAtZero: true,
//         grid: { color: 'rgba(229, 231, 235, 0.5)' },
//       },
//       x: {
//         grid: { display: false },
//       },
//     },
//     animation: {
//       duration: 1000,
//       easing: 'easeOutQuart',
//     },
//   };

//   // Revenue trend data for line chart
//   const revenueLineData = {
//     labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
//     datasets: [
//       {
//         label: 'Monthly Revenue',
//         data: [250000, 265000, 290000, 255000, 270000, 295000, 280000, 300000, 310000, 330000, 350000, 375000],
//         borderColor: 'rgb(34, 197, 94)',
//         backgroundColor: 'rgba(34, 197, 94, 0.1)',
//         fill: true,
//         tension: 0.4,
//       },
//       {
//         label: 'Monthly Expenses',
//         data: [150000, 160000, 170000, 155000, 165000, 175000, 160000, 170000, 180000, 185000, 190000, 195000],
//         borderColor: 'rgb(239, 68, 68)',
//         backgroundColor: 'rgba(239, 68, 68, 0.1)',
//         fill: true,
//         tension: 0.4,
//       }
//     ],
//   };

//   const revenueLineOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       tooltip: {
//         backgroundColor: 'rgba(0, 0, 0, 0.8)',
//         titleFont: { size: 14 },
//         bodyFont: { size: 12 },
//         callbacks: {
//           label: (context) => `${context.dataset.label}: ${formatCurrency(context.parsed.y)}`,
//         },
//       },
//     },
//     scales: {
//       y: {
//         beginAtZero: true,
//         ticks: {
//           callback: (value) => `$${(value / 1000).toFixed(0)}K`,
//         },
//         grid: { color: 'rgba(229, 231, 235, 0.5)' },
//       },
//       x: {
//         grid: { display: false },
//       },
//     },
//     animation: {
//       duration: 1000,
//       easing: 'easeOutQuart',
//     },
//   };

//   return (
//     <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen w-full font-sans">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         {/* Header Section */}
//         <motion.div 
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="flex justify-between items-center mb-10"
//         >
//           <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Course Analytics Dashboard</h1>
//           <div className="flex space-x-4">
//             <select 
//               className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition-all duration-300"
//               value={timeRange}
//               onChange={(e) => setTimeRange(e.target.value)}
//             >
//               <option value="weekly">Last 7 Days</option>
//               <option value="monthly">Last 30 Days</option>
//               <option value="quarterly">Last Quarter</option>
//               <option value="yearly">Last Year</option>
//             </select>
//             <motion.button 
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={handleDownload}
//               className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow-md transition-all duration-300"
//             >
//               <Download size={18} />
//               <span>Export Data</span>
//             </motion.button>
//           </div>
//         </motion.div>

//         {/* Error Message */}
//         <AnimatePresence>
//           {error && (
//             <motion.div
//               initial={{ opacity: 0, y: -10 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -10 }}
//               className="mb-6 p-4 bg-red-100 text-red-800 rounded-lg flex items-center"
//             >
//               <AlertCircle size={20} className="mr-2" />
//               {error}
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Overview Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
//           {[
//             { title: 'Total Revenue', value: formatCurrency(revenueStats.totalRevenue), growth: revenueStats.revenueGrowth, icon: DollarSign, color: 'green' },
//             { title: 'Active Students', value: studentStats.activeStudents.toLocaleString(), growth: studentStats.studentGrowth, icon: Users, color: 'blue' },
//             { title: 'Course Completion', value: `${learningStats.averageCompletion}%`, growth: 3.8, icon: Award, color: 'amber' },
//             { title: 'Learning Hours', value: (learningStats.totalLearningHours / 1000).toFixed(1) + 'K', growth: 8.5, icon: Clock, color: 'purple' },
//           ].map((stat, index) => (
//             <motion.div
//               key={stat.title}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: index * 0.1 }}
//               className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300"
//             >
//               <div className="flex justify-between items-center">
//                 <div>
//                   <p className="text-sm text-gray-500 mb-2">{stat.title}</p>
//                   <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
//                   <div className="flex items-center mt-3">
//                     <span className={`flex items-center text-sm ${stat.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
//                       {stat.growth >= 0 ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
//                       {Math.abs(stat.growth)}%
//                     </span>
//                     <span className="text-xs text-gray-500 ml-2">vs last {timeRange}</span>
//                   </div>
//                 </div>
//                 <div className={`bg-${stat.color}-50 p-3 rounded-full`}>
//                   <stat.icon size={24} className={`text-${stat.color}-600`} />
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>

//         {/* Charts Section */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
//           {/* Enrollment Chart */}
//           <motion.div
//             initial={{ opacity: 0, scale: 0.95 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.5 }}
//             className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 lg:col-span-2"
//           >
//             <div className="flex justify-between items-center mb-6">
//               <h3 className="text-xl font-semibold text-gray-900">Enrollment Trends</h3>
//               <div className="flex space-x-2">
//                 {['daily', 'monthly', 'quarterly', 'yearly'].map((range) => (
//                   <motion.button 
//                     key={range}
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     className={`px-4 py-2 rounded-lg text-sm font-medium capitalize ${enrollmentTimeRange === range ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
//                     onClick={() => setEnrollmentTimeRange(range)}
//                   >
//                     {range}
//                   </motion.button>
//                 ))}
//               </div>
//             </div>
//             <div className="h-80">
//               <Bar ref={chartRef} data={enrollmentChartData} options={enrollmentChartOptions} />
//             </div>
//           </motion.div>

//           {/* Course Stats */}
//           <motion.div
//             initial={{ opacity: 0, scale: 0.95 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.5 }}
//             className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
//           >
//             <h3 className="text-xl font-semibold text-gray-900 mb-6">Course Statistics</h3>
//             <div className="space-y-4">
//               {[
//                 { label: 'Total Courses', value: courseStats.totalCourses, icon: BookOpen, color: 'blue' },
//                 { label: 'Active Courses', value: courseStats.activeCourses, icon: Zap, color: 'green' },
//                 { label: 'Draft Courses', value: courseStats.draftCourses, icon: FileText, color: 'yellow' },
//                 { label: 'New This Month', value: courseStats.newCourses, icon: Calendar, color: 'purple' },
//               ].map((status) => (
//                 <motion.div
//                   key={status.label}
//                   whileHover={{ scale: 1.02 }}
//                   className={`p-4 bg-${status.color}-50 rounded-lg`}
//                 >
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center">
//                       <status.icon size={20} className={`text-${status.color}-600 mr-3`} />
//                       <span className="text-gray-700 font-medium">{status.label}</span>
//                     </div>
//                     <span className="text-lg font-semibold text-gray-900">{status.value.toLocaleString()}</span>
//                   </div>
//                 </motion.div>
//               ))}
//               <motion.div
//                 whileHover={{ scale: 1.05 }}
//                 className="pt-2"
//               >
//                 <button className="w-full flex items-center justify-center text-blue-600 hover:text-blue-700 text-sm font-medium">
//                   Course Management
//                   <ChevronRight size={16} className="ml-1" />
//                 </button>
//               </motion.div>
//             </div>
//           </motion.div>
//         </div>

//         {/* Revenue & Financial Section */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
//           {/* Revenue Line Chart */}
//           <motion.div
//             initial={{ opacity: 0, scale: 0.95 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.5 }}
//             className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 lg:col-span-2"
//           >
//             <div className="flex justify-between items-center mb-6">
//               <h3 className="text-xl font-semibold text-gray-900">Revenue vs Expenses</h3>
//               <div className="flex items-center text-sm text-gray-500">
//                 <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-1"></span>
//                 Revenue
//                 <span className="inline-block w-3 h-3 bg-red-500 rounded-full ml-3 mr-1"></span>
//                 Expenses
//               </div>
//             </div>
//             <div className="h-80">
//               <Line data={revenueLineData} options={revenueLineOptions} />
//             </div>
//           </motion.div>

//           {/* Financial Metrics */}
//           <motion.div
//             initial={{ opacity: 0, scale: 0.95 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.5 }}
//             className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
//           >
//             <h3 className="text-xl font-semibold text-gray-900 mb-6">Financial Health</h3>
//             <div className="space-y-5">
//               {[
//                 { label: 'Monthly Revenue', value: formatCurrency(revenueStats.monthlyRevenue), growth: 7.2, icon: DollarSign, color: 'green' },
//                 { label: 'Avg. Course Price', value: formatCurrency(revenueStats.averageCourseValue), growth: 2.5, icon: Tag, color: 'blue' },
//                 { label: 'Net Profit Margin', value: '64%', growth: 3.8, icon: TrendingUp, color: 'purple' },
//                 { label: 'Refund Rate', value: `${revenueStats.refundRate}%`, growth: -0.7, isNegativeGood: true, icon: CreditCard, color: 'amber' },
//               ].map((metric) => (
//                 <div key={metric.label} className="flex justify-between items-center">
//                   <div className="flex items-center">
//                     <div className={`p-2 rounded-lg bg-${metric.color}-50 mr-3`}>
//                       <metric.icon size={18} className={`text-${metric.color}-600`} />
//                     </div>
//                     <div>
//                       <p className="text-sm text-gray-500">{metric.label}</p>
//                       <p className="text-lg font-semibold text-gray-900">{metric.value}</p>
//                     </div>
//                   </div>
//                   <div className={`flex items-center ${(metric.growth >= 0 && !metric.isNegativeGood) || (metric.growth < 0 && metric.isNegativeGood) ? 'text-green-600' : 'text-red-600'}`}>
//                     {(metric.growth >= 0 && !metric.isNegativeGood) || (metric.growth < 0 && metric.isNegativeGood) ? 
//                       <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
//                     <span className="text-sm font-medium ml-1">{Math.abs(metric.growth)}%</span>
//                   </div>
//                 </div>
//               ))}
//               <motion.div
//                 whileHover={{ scale: 1.05 }}
//                 className="pt-2"
//               >
//                 <button className="w-full flex items-center justify-center text-blue-600 hover:text-blue-700 text-sm font-medium">
//                   Full Financial Report
//                   <ChevronRight size={16} className="ml-1" />
//                 </button>
//               </motion.div>
//             </div>
//           </motion.div>
//         </div>

//         {/* Top Courses & Instructors Section */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
//           {/* Top Courses */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
//           >
//             <div className="flex justify-between items-center mb-6">
//               <h3 className="text-xl font-semibold text-gray-900">Top Performing Courses</h3>
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 onClick={() => setIsTopCoursesExpanded(!isTopCoursesExpanded)}
//                 className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center"
//               >
//                 {isTopCoursesExpanded ? 'Collapse' : 'View All'}
//                 {isTopCoursesExpanded ? <ChevronUp size={16} className="ml-1" /> : <ChevronDown size={16} className="ml-1" />}
//               </motion.button>
//             </div>
//             <AnimatePresence>
//               {isTopCoursesExpanded && (
//                 <motion.div
//                   initial={{ height: 0, opacity: 0 }}
//                   animate={{ height: 'auto', opacity: 1 }}
//                   exit={{ height: 0, opacity: 0 }}
//                   transition={{ duration: 0.3 }}
//                   className="overflow-x-auto"
//                 >
//                   <table className="min-w-full">
//                     <thead>
//                       <tr className="border-b border-gray-200">
//                         <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Course</th>
//                         <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">Enrollments</th>
//                         <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">Revenue</th>
//                         <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">Rating</th>
//                       </tr>
//                     </thead>
//                     <tbody className="divide-y divide-gray-100">
//                       {topCourses.map((course) => (
//                         <motion.tr 
//                           key={course.id}
//                           whileHover={{ backgroundColor: 'rgba(243, 244, 246, 0.5)' }}
//                           className="cursor-pointer"
//                         >
//                           <td className="py-3 px-4">
//                             <div className="flex items-center">
//                               <div className="bg-blue-50 p-2 rounded-lg mr-3">
//                                 <BookOpen size={16} className="text-blue-600" />
//                               </div>
//                               <span className="font-medium text-gray-800">{course.name}</span>
//                             </div>
//                           </td>
//                           <td className="py-3 px-4 text-right text-gray-800">{course.enrollments.toLocaleString()}</td>
//                           <td className="py-3 px-4 text-right text-gray-800">{formatCurrency(course.revenue)}</td>
//                           <td className="py-3 px-4 text-right">
//                             <div className="flex items-center justify-end">
//                               <Star size={16} className="text-amber-500 mr-1" />
//                               <span className="text-gray-800">{course.rating}</span>
//                             </div>
//                           </td>
//                         </motion.tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </motion.div>
//               )}
//             </AnimatePresence>
//             {!isTopCoursesExpanded && (
//               <div className="space-y-3">
//                 {topCourses.slice(0, 3).map((course) => (
//                   <motion.div 
//                     key={course.id}
//                     whileHover={{ scale: 1.02 }}
//                     className="p-3 bg-gray-50 rounded-lg flex items-center justify-between"
//                   >
//                     <div className="flex items-center">
//                       <div className="bg-blue-100 p-2 rounded-lg mr-3">
//                         <BookOpen size={16} className="text-blue-600" />
//                       </div>
//                       <div>
//                         <h4 className="text-gray-800 font-medium">{course.name}</h4>
//                         <div className="flex items-center text-sm text-gray-500">
//                           <Users size={14} className="mr-1" />
//                           {course.enrollments.toLocaleString()} students
//                         </div>
//                       </div>
//                     </div>
//                     <div className="flex items-center text-amber-500">
//                       <Star size={16} className="mr-1" />
//                       {course.rating}
//                     </div>
//                   </motion.div>
//                 ))}
//               </div>
//             )}
//           </motion.div>

//           {/* Top Instructors */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.1 }}
//             className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
//           >
//             <div className="flex justify-between items-center mb-6">
//               <h3 className="text-xl font-semibold text-gray-900">Top Instructors</h3>
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 onClick={() => setIsTopInstructorsExpanded(!isTopInstructorsExpanded)}
//                 className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center"
//               >
//                 {isTopInstructorsExpanded ? 'Collapse' : 'View All'}
//                 {isTopInstructorsExpanded ? <ChevronUp size={16} className="ml-1" /> : <ChevronDown size={16} className="ml-1" />}
//               </motion.button>
//             </div>
//             <AnimatePresence>
//               {isTopInstructorsExpanded && (
//                 <motion.div
//                   initial={{ height: 0, opacity: 0 }}
//                   animate={{ height: 'auto', opacity: 1 }}
//                   exit={{ height: 0, opacity: 0 }}
//                   transition={{ duration: 0.3 }}
//                   className="overflow-x-auto"
//                 >
//                   <table className="min-w-full">
//                     <thead>
//                       <tr className="border-b border-gray-200">
//                         <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Instructor</th>
//                         <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">Courses</th>
//                         <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">Students</th>
//                         <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">Revenue</th>
//                         <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">Rating</th>
//                       </tr>
//                     </thead>
//                     <tbody className="divide-y divide-gray-100">
//                       {topInstructors.map((instructor) => (
//                         <motion.tr 
//                           key={instructor.id}
//                           whileHover={{ backgroundColor: 'rgba(243, 244, 246, 0.5)' }}
//                           className="cursor-pointer"
//                         >
//                           <td className="py-3 px-4">
//                             <div className="flex items-center">
//                               <div className="bg-purple-50 p-2 rounded-full mr-3">
//                                 <User size={16} className="text-purple-600" />
//                               </div>
//                               <span className="font-medium text-gray-800">{instructor.name}</span>
//                             </div>
//                           </td>
//                           <td className="py-3 px-4 text-right text-gray-800">{instructor.courses}</td>
//                           <td className="py-3 px-4 text-right text-gray-800">{instructor.students.toLocaleString()}</td>
//                           <td className="py-3 px-4 text-right text-gray-800">{formatCurrency(instructor.revenue)}</td>
//                           <td className="py-3 px-4 text-right">
//                             <div className="flex items-center justify-end">
//                               <Star size={16} className="text-amber-500 mr-1" />
//                               <span className="text-gray-800">{instructor.rating}</span>
//                             </div>
//                           </td>
//                         </motion.tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </motion.div>
//               )}
//             </AnimatePresence>
//             {!isTopInstructorsExpanded && (
//               <div className="space-y-3">
//                 {topInstructors.slice(0, 3).map((instructor) => (
//                   <motion.div 
//                     key={instructor.id}
//                     whileHover={{ scale: 1.02 }}
//                     className="p-3 bg-gray-50 rounded-lg flex items-center justify-between"
//                   >
//                     <div className="flex items-center">
//                       <div className="bg-purple-100 p-2 rounded-full mr-3">
//                         <User size={16} className="text-purple-600" />
//                       </div>
//                       <div>
//                         <h4 className="text-gray-800 font-medium">{instructor.name}</h4>
//                         <div className="flex items-center text-sm text-gray-500">
//                           <BookOpen size={14} className="mr-1" />
//                           {instructor.courses} courses
//                         </div>
//                       </div>
//                     </div>
//                     <div className="text-right">
//                       <div className="text-gray-800 font-medium">{instructor.students.toLocaleString()} students</div>
//                       <div className="flex items-center justify-end text-amber-500">
//                         <Star size={14} className="mr-1" />
//                         {instructor.rating}
//                       </div>
//                     </div>
//                   </motion.div>
//                 ))}
//               </div>
//             )}
//           </motion.div>
//         </div>

//         {/* Learning & Engagement Sections */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
//           {/* Recent Enrollments */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
//           >
//             <div className="flex justify-between items-center mb-6">
//               <h3 className="text-xl font-semibold text-gray-900">Recent Enrollments</h3>
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 onClick={() => setIsRecentEnrollmentsExpanded(!isRecentEnrollmentsExpanded)}
//                 className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center"
//               >
//                 {isRecentEnrollmentsExpanded ? 'Collapse' : 'View All'}
//                 {isRecentEnrollmentsExpanded ? <ChevronUp size={16} className="ml-1" /> : <ChevronDown size={16} className="ml-1" />}
//               </motion.button>
//             </div>
//             <AnimatePresence>
//               {isRecentEnrollmentsExpanded && (
//                 <motion.div
//                   initial={{ height: 0, opacity: 0 }}
//                   animate={{ height: 'auto', opacity: 1 }}
//                   exit={{ height: 0, opacity: 0 }}
//                   transition={{ duration: 0.3 }}
//                   className="overflow-x-auto"
//                 >
//                   <table className="min-w-full">
//                     <thead>
//                       <tr className="border-b border-gray-200">
//                         <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">ID</th>
//                         <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Student</th>
//                         <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Course</th>
//                         <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">Date</th>
//                         <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">Amount</th>
//                         <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">Status</th>
//                       </tr>
//                     </thead>
//                     <tbody className="divide-y divide-gray-100">
//                       {recentEnrollments.map((enrollment) => (
//                         <motion.tr 
//                           key={enrollment.id}
//                           whileHover={{ backgroundColor: 'rgba(243, 244, 246, 0.5)' }}
//                           className="cursor-pointer"
//                         >
//                           <td className="py-3 px-4 text-gray-500">{enrollment.id}</td>
//                           <td className="py-3 px-4">
//                             <div className="flex items-center">
//                               <div className="bg-gray-100 p-2 rounded-full mr-2">
//                                 <User size={14} className="text-gray-600" />
//                               </div>
//                               <span className="text-gray-800">{enrollment.student}</span>
//                             </div>
//                           </td>
//                           <td className="py-3 px-4 text-gray-800">{enrollment.course}</td>
//                           <td className="py-3 px-4 text-right text-gray-500">{new Date(enrollment.date).toLocaleDateString()}</td>
//                           <td className="py-3 px-4 text-right text-gray-800">{formatCurrency(enrollment.amount)}</td>
//                           <td className="py-3 px-4 text-right">
//                             <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(enrollment.status)}`}>
//                               {enrollment.status}
//                             </span>
//                           </td>
//                         </motion.tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </motion.div>

//           {/* Video Engagement */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.1 }}
//             className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
//           >
//             <div className="flex justify-between items-center mb-6">
//               <h3 className="text-xl font-semibold text-gray-900">Video Engagement</h3>
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 onClick={() => setIsVideoStatsExpanded(!isVideoStatsExpanded)}
//                 className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center"
//               >
//                 {isVideoStatsExpanded ? 'Collapse' : 'View All'}
//                 {isVideoStatsExpanded ? <ChevronUp size={16} className="ml-1" /> : <ChevronDown size={16} className="ml-1" />}
//               </motion.button>
//             </div>
//             <AnimatePresence>
//               {isVideoStatsExpanded && (
//                 <motion.div
//                   initial={{ height: 0, opacity: 0 }}
//                   animate={{ height: 'auto', opacity: 1 }}
//                   exit={{ height: 0, opacity: 0 }}
//                   transition={{ duration: 0.3 }}
//                   className="overflow-x-auto"
//                 >
//                   <table className="min-w-full">
//                     <thead>
//                       <tr className="border-b border-gray-200">
//                         <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Video Title</th>
//                         <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">Duration</th>
//                         <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">Views</th>
//                         <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">Completion</th>
//                         <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">Questions</th>
//                       </tr>
//                     </thead>
//                     <tbody className="divide-y divide-gray-100">
//                       {videoEngagementStats.map((video) => (
//                         <motion.tr 
//                           key={video.id}
//                           whileHover={{ backgroundColor: 'rgba(243, 244, 246, 0.5)' }}
//                           className="cursor-pointer"
//                         >
//                           <td className="py-3 px-4">
//                             <div className="flex items-center">
//                               <div className="bg-red-50 p-2 rounded-lg mr-3">
//                                 <PlayCircle size={16} className="text-red-600" />
//                               </div>
//                               <span className="text-gray-800">{video.title}</span>
//                             </div>
//                           </td>
//                           <td className="py-3 px-4 text-right text-gray-500">{video.duration}</td>
//                           <td className="py-3 px-4 text-right text-gray-800">{video.views.toLocaleString()}</td>
//                           <td className="py-3 px-4 text-right">
//                             <div className="flex items-center justify-end">
//                               <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
//                                 <div 
//                                   className="bg-green-600 h-2 rounded-full" 
//                                   style={{ width: `${video.completion}%` }}
//                                 ></div>
//                               </div>
//                               <span className="text-gray-800">{video.completion}%</span>
//                             </div>
//                           </td>
//                           <td className="py-3 px-4 text-right">
//                             <div className="flex items-center justify-end text-gray-800">
//                               <MessageSquare size={16} className="text-blue-600 mr-1" />
//                               {video.questions}
//                             </div>
//                           </td>
//                         </motion.tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </motion.div>
//         </div>

//         {/* Marketing & Promotion Section */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//           {/* Marketing Channels */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
//           >
//             <h3 className="text-xl font-semibold text-gray-900 mb-6">Marketing Channels</h3>
//             <div className="mb-4">
//               <p className="text-sm text-gray-500">Total Acquisitions</p>
//               <div className="flex items-center justify-between">
//                 <h4 className="text-2xl font-bold text-gray-900">{marketingChannelStats.totalAquisitions.toLocaleString()}</h4>
//                 <div className="flex items-center text-green-600">
//                   <ArrowUpRight size={16} />
//                   <span className="text-sm font-medium ml-1">18.2%</span>
//                 </div>
//               </div>
//             </div>
//             <div className="space-y-4">
//               {marketingChannelStats.channels.map((channel) => (
//                 <div key={channel.id} className="bg-gray-50 p-4 rounded-lg">
//                   <div className="flex justify-between items-center mb-3">
//                     <div className="flex items-center">
//                       <div className="bg-blue-100 p-2 rounded-lg mr-3">
//                         <Target size={16} className="text-blue-600" />
//                       </div>
//                       <div>
//                         <h4 className="font-medium text-gray-800">{channel.name}</h4>
//                         <p className="text-sm text-gray-500">{channel.students.toLocaleString()} students</p>
//                       </div>
//                     </div>
//                     <div className="text-right">
//                       <p className="text-sm text-gray-500">Cost</p>
//                       <p className="text-gray-800 font-medium">{formatCurrency(channel.cost)}</p>
//                     </div>
//                   </div>
//                   <div className="flex justify-between text-sm">
//                     <div>
//                       <span className="text-gray-500">Cost Per Acquisition: </span>
//                       <span className="text-gray-800 font-medium">{formatCurrency(channel.cpa)}</span>
//                     </div>
//                     <div>
//                       <span className="text-gray-500">Conversion Rate: </span>
//                       <span className="text-gray-800 font-medium">{channel.conversion}%</span>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </motion.div>

//           {/* Promotion Codes */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.1 }}
//             className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
//           >
//             <h3 className="text-xl font-semibold text-gray-900 mb-6">Active Promotions</h3>
//             <div className="overflow-x-auto">
//               <table className="min-w-full">
//                 <thead>
//                   <tr className="border-b border-gray-200">
//                     <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Code</th>
//                     <th className="text-center py-3 px-4 text-sm font-medium text-gray-500">Uses</th>
//                     <th className="text-center py-3 px-4 text-sm font-medium text-gray-500">Discount</th>
//                     <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">Revenue</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-100">
//                   {promotions.map((promo, index) => (
//                     <motion.tr 
//                       key={promo.code}
//                       whileHover={{ backgroundColor: 'rgba(243, 244, 246, 0.5)' }}
//                       className="cursor-pointer"
//                     >
//                       <td className="py-3 px-4">
//                         <div className="flex items-center">
//                           <div className="bg-yellow-50 p-2 rounded-lg mr-3">
//                             <Percent size={16} className="text-yellow-600" />
//                           </div>
//                           <span className="font-medium text-gray-800">{promo.code}</span>
//                         </div>
//                       </td>
//                       <td className="py-3 px-4 text-center text-gray-800">{promo.uses.toLocaleString()}</td>
//                       <td className="py-3 px-4 text-center">
//                         <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
//                           {promo.discount}
//                         </span>
//                       </td>
//                       <td className="py-3 px-4 text-right text-gray-800">{formatCurrency(promo.revenue)}</td>
//                     </motion.tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//             <motion.div
//               whileHover={{ scale: 1.05 }}
//               className="mt-6"
//             >
//               <button className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg shadow-sm transition-all duration-300">
//                 Create New Promotion
//               </button>
//             </motion.div>
//           </motion.div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CourseAnalytics;



import React, { useState, useEffect, useRef } from 'react';
import { 
  BarChart, 
  TrendingUp, 
  BookOpen, 
  Video, 
  Users, 
  Calendar, 
  CreditCard, 
  Award, 
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
  PlayCircle,
  GraduationCap,
  FileText,
  Star,
  MessageSquare,
  Coffee,
  Zap,
  Target,
  Tag,
  TrendingDown,
  BarChart2,
  RefreshCw,
  Filter,
  Briefcase,
  PieChart,
  Activity,
  Sliders,
  DollarSign as Dollar,
  CheckCircle,
  AlertTriangle,
  Globe,
  ShoppingCart,
  Settings,
  Hash,
  HelpCircle,
  Info,
  Save,
  AlertOctagon,
  Layers,
  Hexagon,
  Diamond,
  ArrowRight,
  Plus,
  Minus,
  X,
  Search
} from 'lucide-react';
import axios from 'axios';
import { saveAs } from 'file-saver';
import { motion, AnimatePresence } from 'framer-motion';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, LineElement, PointElement, ArcElement, RadialLinearScale, Filler } from 'chart.js';
import { Bar, Line, Pie, Doughnut, PolarArea, Radar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale, 
  LinearScale, 
  BarElement, 
  LineElement, 
  PointElement, 
  ArcElement, 
  RadialLinearScale,
//   PointStyle,
  Title, 
  Tooltip, 
  Legend,
  Filler
);

// Sample data for the dashboard
const enrollmentData = {
  daily: [
    { day: 'Mon', enrollments: 85 },
    { day: 'Tue', enrollments: 110 },
    { day: 'Wed', enrollments: 95 },
    { day: 'Thu', enrollments: 130 },
    { day: 'Fri', enrollments: 150 },
    { day: 'Sat', enrollments: 200 },
    { day: 'Sun', enrollments: 170 }
  ],
  monthly: [
    { month: 'Jan', enrollments: 1250 },
    { month: 'Feb', enrollments: 1320 },
    { month: 'Mar', enrollments: 1480 },
    { month: 'Apr', enrollments: 1560 },
    { month: 'May', enrollments: 1720 },
    { month: 'Jun', enrollments: 1830 },
    { month: 'Jul', enrollments: 1660 },
    { month: 'Aug', enrollments: 1780 },
    { month: 'Sep', enrollments: 1900 },
    { month: 'Oct', enrollments: 2050 },
    { month: 'Nov', enrollments: 2180 },
    { month: 'Dec', enrollments: 2320 }
  ],
  quarterly: [
    { quarter: 'Q1', enrollments: 4050 }, // Jan-Mar
    { quarter: 'Q2', enrollments: 5110 }, // Apr-Jun
    { quarter: 'Q3', enrollments: 5340 }, // Jul-Sep
    { quarter: 'Q4', enrollments: 6550 }  // Oct-Dec
  ],
  yearly: [
    { year: '2023', enrollments: 18000 },
    { year: '2024', enrollments: 21050 },
    { year: '2025', enrollments: 24580 }
  ]
};

const courseStats = {
  totalCourses: 145,
  activeCourses: 128,
  draftCourses: 17,
  newCourses: 8,
  courseGrowth: 12.5
};

const revenueStats = {
  totalRevenue: 3784500,
  monthlyRevenue: 295000,
  weeklyRevenue: 72500,
  averageCourseValue: 3850,
  revenueGrowth: 22.7,
  refundRate: 2.3,
  grossMargin: 76.4,
  netMargin: 42.8,
  operatingMargin: 46.2,
  ebitda: 1624335,
  ebitdaMargin: 42.9,
  cac: 42.5,
  ltv: 785,
  ltvCacRatio: 18.5,
  churnRate: 3.2,
  arpu: 128.50,
  mrr: 248500,
  arr: 2982000
};

const learningStats = {
  totalLearningHours: 587530,
  averageCompletion: 68.4,
  averageEngagement: 76.2,
  certificatesIssued: 14350
};

const topCourses = [
  { id: 1, name: "Advanced Machine Learning", enrollments: 2450, revenue: 980000, rating: 4.8 },
  { id: 2, name: "Web Development Bootcamp", enrollments: 2180, revenue: 872000, rating: 4.7 },
  { id: 3, name: "Data Science Fundamentals", enrollments: 1950, revenue: 780000, rating: 4.9 },
  { id: 4, name: "UI/UX Design Masterclass", enrollments: 1720, revenue: 688000, rating: 4.6 },
  { id: 5, name: "Python Programming A-Z", enrollments: 1540, revenue: 616000, rating: 4.8 }
];

const topInstructors = [
  { id: 1, name: "Dr. Sarah Johnson", courses: 12, students: 9850, revenue: 3940000, rating: 4.9 },
  { id: 2, name: "Prof. Michael Chen", courses: 8, students: 7650, revenue: 3060000, rating: 4.8 },
  { id: 3, name: "Priya Sharma", courses: 10, students: 6820, revenue: 2728000, rating: 4.7 },
  { id: 4, name: "Thomas Walker", courses: 7, students: 5740, revenue: 2296000, rating: 4.8 },
  { id: 5, name: "Anita Desai", courses: 6, students: 4980, revenue: 1992000, rating: 4.9 }
];

const promotions = [
  { code: "SUMMER25", uses: 1245, discount: "25%", revenue: 498000 },
  { code: "NEWUSER30", uses: 865, discount: "30%", revenue: 346000 },
  { code: "FLASHSALE40", uses: 720, discount: "40%", revenue: 288000 },
  { code: "REFER15", uses: 620, discount: "15%", revenue: 248000 },
  { code: "EARLYBIRD20", uses: 510, discount: "20%", revenue: 204000 }
];

const recentEnrollments = [
  { id: "#ENR12983", student: "Emma Wilson", course: "Advanced Machine Learning", date: "2025-04-19", amount: 4000, status: "Completed" },
  { id: "#ENR12982", student: "James Brown", course: "Web Development Bootcamp", date: "2025-04-19", amount: 3800, status: "In Progress" },
  { id: "#ENR12981", student: "Olivia Smith", course: "Data Science Fundamentals", date: "2025-04-18", amount: 4500, status: "Just Started" },
  { id: "#ENR12980", student: "Noah Johnson", course: "UI/UX Design Masterclass", date: "2025-04-18", amount: 3500, status: "Pending" },
  { id: "#ENR12979", student: "Sophia Davis", course: "Python Programming A-Z", date: "2025-04-17", amount: 3200, status: "Completed" }
];

const studentStats = {
  totalStudents: 48250,
  newStudents: 1850,
  activeStudents: 32400,
  completionRate: 72.6,
  studentGrowth: 15.4
};

const videoEngagementStats = [
  { id: 1, title: "Introduction to Neural Networks", duration: "18:45", views: 3850, completion: 92, questions: 78 },
  { id: 2, title: "Building Your First React App", duration: "24:30", views: 3240, completion: 88, questions: 65 },
  { id: 3, title: "Data Visualization Techniques", duration: "32:15", views: 2980, completion: 83, questions: 92 },
  { id: 4, title: "Responsive Design Principles", duration: "21:50", views: 2760, completion: 90, questions: 48 },
  { id: 5, title: "Python for Data Analysis", duration: "27:20", views: 2640, completion: 87, questions: 83 }
];

const marketingChannelStats = {
  totalAquisitions: 12800,
  channels: [
    { id: 1, name: "Organic Search", students: 4850, cost: 12000, cpa: 2.47, conversion: 3.8, roi: 952 },
    { id: 2, name: "Paid Search", students: 2950, cost: 35000, cpa: 11.86, conversion: 2.7, roi: 224 },
    { id: 3, name: "Social Media", students: 3250, cost: 28000, cpa: 8.62, conversion: 3.2, roi: 350 },
    { id: 4, name: "Email Marketing", students: 1750, cost: 8000, cpa: 4.57, conversion: 4.5, roi: 720 }
  ]
};

// New financial data
const financialMetrics = {
  profitabilityRatios: {
    grossProfitMargin: 78.2,
    operatingProfitMargin: 46.2,
    netProfitMargin: 38.5,
    ebitdaMargin: 52.3,
    returnOnAssets: 24.8,
    returnOnEquity: 35.6,
    returnOnInvestment: 42.3
  },
  operatingMetrics: {
    revenuePerEmployee: 420000,
    profitPerEmployee: 168000,
    operatingExpenseRatio: 32.5,
    fixedAssetTurnover: 8.2,
    assetTurnover: 1.8
  },
  liquidityRatios: {
    currentRatio: 3.2,
    quickRatio: 2.8,
    cashRatio: 1.5,
    operatingCashFlowRatio: 1.8
  },
  valuationMultiples: {
    enterpriseValue: 45200000,
    evToRevenue: 12.5,
    evToEbitda: 24.2,
    priceToEarnings: 28.5,
    priceToSales: 7.2
  }
};

const cashFlowData = {
  operatingCashFlow: [
    { month: 'Jan', value: 190000 },
    { month: 'Feb', value: 205000 },
    { month: 'Mar', value: 225000 },
    { month: 'Apr', value: 215000 },
    { month: 'May', value: 235000 },
    { month: 'Jun', value: 250000 },
    { month: 'Jul', value: 230000 },
    { month: 'Aug', value: 245000 },
    { month: 'Sep', value: 260000 },
    { month: 'Oct', value: 280000 },
    { month: 'Nov', value: 295000 },
    { month: 'Dec', value: 315000 },
  ],
  investments: [
    { month: 'Jan', value: -45000 },
    { month: 'Feb', value: -40000 },
    { month: 'Mar', value: -65000 },
    { month: 'Apr', value: -35000 },
    { month: 'May', value: -50000 },
    { month: 'Jun', value: -70000 },
    { month: 'Jul', value: -40000 },
    { month: 'Aug', value: -55000 },
    { month: 'Sep', value: -60000 },
    { month: 'Oct', value: -75000 },
    { month: 'Nov', value: -65000 },
    { month: 'Dec', value: -85000 },
  ],
  financing: [
    { month: 'Jan', value: -20000 },
    { month: 'Feb', value: -20000 },
    { month: 'Mar', value: -20000 },
    { month: 'Apr', value: -25000 },
    { month: 'May', value: -25000 },
    { month: 'Jun', value: -25000 },
    { month: 'Jul', value: -30000 },
    { month: 'Aug', value: -30000 },
    { month: 'Sep', value: -30000 },
    { month: 'Oct', value: -35000 },
    { month: 'Nov', value: -35000 },
    { month: 'Dec', value: -35000 },
  ]
};

const revenueBreakdown = {
  courseTypes: [
    { name: 'Technical Courses', value: 1652000 },
    { name: 'Business Courses', value: 985000 },
    { name: 'Creative Courses', value: 625000 },
    { name: 'Academic Courses', value: 420000 },
    { name: 'Personal Development', value: 285000 }
  ],
  subscriptionTiers: [
    { name: 'Basic', value: 620000 },
    { name: 'Premium', value: 1450000 },
    { name: 'Enterprise', value: 986000 },
    { name: 'Individual Purchases', value: 935000 }
  ],
  geographicalRegions: [
    { name: 'North America', value: 1850000 },
    { name: 'Europe', value: 1125000 },
    { name: 'Asia Pacific', value: 780000 },
    { name: 'Latin America', value: 325000 },
    { name: 'Africa & Middle East', value: 195000 }
  ]
};

const forecastData = {
  revenue: [
    { month: 'May', actual: 295000, forecast: 300000 },
    { month: 'Jun', actual: null, forecast: 315000 },
    { month: 'Jul', actual: null, forecast: 325000 },
    { month: 'Aug', actual: null, forecast: 340000 },
    { month: 'Sep', actual: null, forecast: 360000 },
    { month: 'Oct', actual: null, forecast: 385000 }
  ],
  enrollments: [
    { month: 'May', actual: 2320, forecast: 2350 },
    { month: 'Jun', actual: null, forecast: 2420 },
    { month: 'Jul', actual: null, forecast: 2480 },
    { month: 'Aug', actual: null, forecast: 2550 },
    { month: 'Sep', actual: null, forecast: 2650 },
    { month: 'Oct', actual: null, forecast: 2780 }
  ],
  expenses: [
    { month: 'May', actual: 168000, forecast: 165000 },
    { month: 'Jun', actual: null, forecast: 172000 },
    { month: 'Jul', actual: null, forecast: 175000 },
    { month: 'Aug', actual: null, forecast: 180000 },
    { month: 'Sep', actual: null, forecast: 185000 },
    { month: 'Oct', actual: null, forecast: 190000 }
  ]
};

const expenseCategories = [
  { name: 'Instructor Payouts', value: 854000 },
  { name: 'Marketing & Sales', value: 425000 },
  { name: 'Platform Development', value: 380000 },
  { name: 'Customer Support', value: 225000 },
  { name: 'Administration', value: 190000 },
  { name: 'Infrastructure & Hosting', value: 175000 },
  { name: 'Content Production', value: 160000 }
];

const quarterlyFinancials = [
  { 
    quarter: 'Q1 2025',
    revenue: 875000,
    expenses: 482000,
    profit: 393000,
    margin: 44.9,
    studentAcquisition: 5800,
    courseReleases: 12
  },
  { 
    quarter: 'Q2 2025',
    revenue: 920000,
    expenses: 496000,
    profit: 424000,
    margin: 46.1,
    studentAcquisition: 6200,
    courseReleases: 14
  },
  { 
    quarter: 'Q3 2025',
    revenue: 982000,
    expenses: 524000,
    profit: 458000,
    margin: 46.6,
    studentAcquisition: 6650,
    courseReleases: 15
  },
  { 
    quarter: 'Q4 2025 (Projected)',
    revenue: 1050000,
    expenses: 555000,
    profit: 495000,
    margin: 47.1,
    studentAcquisition: 7100,
    courseReleases: 18
  }
];

const courseROIData = [
  { name: 'Advanced Machine Learning', development: 125000, marketing: 85000, revenue: 980000, roi: 365 },
  { name: 'Web Development Bootcamp', development: 105000, marketing: 72000, revenue: 872000, roi: 392 },
  { name: 'Data Science Fundamentals', development: 110000, marketing: 78000, revenue: 780000, roi: 315 },
  { name: 'UI/UX Design Masterclass', development: 95000, marketing: 68000, revenue: 688000, roi: 322 },
  { name: 'Python Programming A-Z', development: 90000, marketing: 65000, revenue: 616000, roi: 298 }
];

function CourseAnalytics() {
  const [timeRange, setTimeRange] = useState('weekly');
  const [enrollmentTimeRange, setEnrollmentTimeRange] = useState('daily');
  const [isTopCoursesExpanded, setIsTopCoursesExpanded] = useState(false);
  const [isTopInstructorsExpanded, setIsTopInstructorsExpanded] = useState(false);
  const [isRecentEnrollmentsExpanded, setIsRecentEnrollmentsExpanded] = useState(true);
  const [isVideoStatsExpanded, setIsVideoStatsExpanded] = useState(true);
  const [isFinancialMetricsExpanded, setIsFinancialMetricsExpanded] = useState(false);
  const [isQuarterlyFinancialsExpanded, setIsQuarterlyFinancialsExpanded] = useState(false);
  const [isCourseROIExpanded, setIsCourseROIExpanded] = useState(false);
  const [revenueBreakdownType, setRevenueBreakdownType] = useState('courseTypes');
  const [cashFlowTimeRange, setCashFlowTimeRange] = useState('quarterly');
  const [selectedForecastMetric, setSelectedForecastMetric] = useState('revenue');
  const [error, setError] = useState(null);
  const [showFinancialTooltip, setShowFinancialTooltip] = useState(false);
  const [tooltipMetric, setTooltipMetric] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [filterPanelOpen, setFilterPanelOpen] = useState(false);

  const chartRef = useRef(null);

  const handleDownload = async () => {
    try {
      const response = await axios.get("api/v1/courses/download-analytics", {
        responseType: "blob",
      });
      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      saveAs(blob, "courseAnalytics.xlsx");
      setError(null);
    } catch (error) {
      console.error("Error downloading the Excel file:", error);
      setError("Failed to download report. Please try again.");
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Just Started': return 'bg-purple-100 text-purple-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Refunded': return 'bg-red-100 text-red-800';
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Draft': return 'bg-gray-100 text-gray-800';
      case 'Paused': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const handleMetricHover = (metric, name, description, x, y) => {
    setTooltipMetric({ name, description });
    setTooltipPosition({ x, y });
    setShowFinancialTooltip(true);
  };

  const handleMetricLeave = () => {
    setShowFinancialTooltip(false);
  };

  // Chart data for enrollment Chart.js
  const enrollmentChartData = {
    labels: enrollmentTimeRange === 'daily' 
      ? enrollmentData.daily.map(item => item.day)
      : enrollmentTimeRange === 'monthly'
      ? enrollmentData.monthly.map(item => item.month)
      : enrollmentTimeRange === 'quarterly'
      ? enrollmentData.quarterly.map(item => item.quarter)
      : enrollmentData.yearly.map(item => item.year),
    datasets: [{
      label: 'Course Enrollments',
      data: enrollmentTimeRange === 'daily' 
        ? enrollmentData.daily.map(item => item.enrollments)
        : enrollmentTimeRange === 'monthly'
        ? enrollmentData.monthly.map(item => item.enrollments)
        : enrollmentTimeRange === 'quarterly'
        ? enrollmentData.quarterly.map(item => item.enrollments)
        : enrollmentData.yearly.map(item => item.enrollments),
      backgroundColor: 'rgba(59, 130, 246, 0.6)',
      borderColor: 'rgb(59, 130, 246)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(59, 130, 246, 0.8)',
    }],
  };

  const enrollmentChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleFont: { size: 14 },
        bodyFont: { size: 12 },
        callbacks: {
          label: (context) => `Enrollments: ${context.parsed.y}`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
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

  // Revenue trend data for line chart
  const revenueLineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Monthly Revenue',
        data: [250000, 265000, 290000, 255000, 270000, 295000, 280000, 300000, 310000, 330000, 350000, 375000],
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Monthly Expenses',
        data: [150000, 160000, 170000, 155000, 165000, 175000, 160000, 170000, 180000, 185000, 190000, 195000],
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        fill: true,
        tension: 0.4,
      }
    ],
  };

  const revenueLineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleFont: { size: 14 },
        bodyFont: { size: 12 },
        callbacks: {
          label: (context) => `${context.dataset.label}: ${formatCurrency(context.parsed.y)}`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => `$${(value / 1000).toFixed(0)}K`,
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

  // Revenue breakdown pie chart data
  const revenueBreakdownData = {
    labels: revenueBreakdownType === 'courseTypes' 
      ? revenueBreakdown.courseTypes.map(item => item.name)
      : revenueBreakdownType === 'subscriptionTiers'
      ? revenueBreakdown.subscriptionTiers.map(item => item.name)
      : revenueBreakdown.geographicalRegions.map(item => item.name),
    datasets: [
      {
        data: revenueBreakdownType === 'courseTypes' 
          ? revenueBreakdown.courseTypes.map(item => item.value)
          : revenueBreakdownType === 'subscriptionTiers'
          ? revenueBreakdown.subscriptionTiers.map(item => item.value)
          : revenueBreakdown.geographicalRegions.map(item => item.value),
        backgroundColor: [
          'rgba(59, 130, 246, 0.7)',
          'rgba(16, 185, 129, 0.7)',
          'rgba(245, 158, 11, 0.7)',
          'rgba(139, 92, 246, 0.7)',
          'rgba(239, 68, 68, 0.7)',
          'rgba(14, 165, 233, 0.7)',
          'rgba(168, 85, 247, 0.7)',
        ],
        borderColor: [
          'rgb(59, 130, 246)',
          'rgb(16, 185, 129)',
          'rgb(245, 158, 11)',
          'rgb(139, 92, 246)',
          'rgb(239, 68, 68)',
          'rgb(14, 165, 233)',
          'rgb(168, 85, 247)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const revenueBreakdownOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: { 
          boxWidth: 12,
          font: { size: 11 }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleFont: { size: 14 },
        bodyFont: { size: 12 },
        callbacks: {
          label: (context) => `${context.label}: ${formatCurrency(context.raw)} (${(context.raw / context.dataset.data.reduce((a, b) => a + b, 0) * 100).toFixed(1)}%)`,
        },
      }
    },
    animation: {
      animateScale: true,
      animateRotate: true
    }
  };

  // Cash flow chart data
  const cashFlowChartData = {
    labels: cashFlowData.operatingCashFlow.map(item => item.month),
    datasets: [
      {
        label: 'Operating Cash Flow',
        data: cashFlowData.operatingCashFlow.map(item => item.value),
        backgroundColor: 'rgba(34, 197, 94, 0.5)',
        borderColor: 'rgb(34, 197, 94)',
        borderWidth: 2,
        pointBackgroundColor: 'rgb(34, 197, 94)',
        tension: 0.4,
      },
      {
        label: 'Investing Cash Flow',
        data: cashFlowData.investments.map(item => item.value),
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 2,
        pointBackgroundColor: 'rgb(59, 130, 246)',
        tension: 0.4,
      },
      {
        label: 'Financing Cash Flow',
        data: cashFlowData.financing.map(item => item.value),
        backgroundColor: 'rgba(239, 68, 68, 0.5)',
        borderColor: 'rgb(239, 68, 68)',
        borderWidth: 2,
        pointBackgroundColor: 'rgb(239, 68, 68)',
        tension: 0.4,
      },
    ],
  };

  const cashFlowChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleFont: { size: 14 },
        bodyFont: { size: 12 },
        callbacks: {
          label: (context) => `${context.dataset.label}: ${formatCurrency(context.parsed.y)}`,
        },
      },
    },
    scales: {
      y: {
        grid: { color: 'rgba(229, 231, 235, 0.5)' },
        ticks: {
          callback: (value) => `$${(value / 1000).toFixed(0)}K`,
        }
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

  // Forecast chart data
  const forecastChartData = {
    labels: forecastData[selectedForecastMetric].map(item => item.month),
    datasets: [
      {
        label: 'Actual',
        data: forecastData[selectedForecastMetric].map(item => item.actual),
        backgroundColor: 'rgba(59, 130, 246, 0.7)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 2,
        pointBackgroundColor: 'rgb(59, 130, 246)',
        pointRadius: 4,
        tension: 0.1,
      },
      {
        label: 'Forecast',
        data: forecastData[selectedForecastMetric].map(item => item.forecast),
        backgroundColor: 'rgba(168, 85, 247, 0.4)',
        borderColor: 'rgba(168, 85, 247, 0.7)',
        borderWidth: 2,
        borderDash: [5, 5],
        pointBackgroundColor: 'rgba(168, 85, 247, 0.7)',
        pointRadius: 4,
        tension: 0.1,
      },
    ],
  };

  const forecastChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleFont: { size: 14 },
        bodyFont: { size: 12 },
        callbacks: {
          label: (context) => {
            if (selectedForecastMetric === 'revenue' || selectedForecastMetric === 'expenses') {
              return `${context.dataset.label}: ${formatCurrency(context.parsed.y)}`;
            } else {
              return `${context.dataset.label}: ${context.parsed.y}`;
            }
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        grid: { color: 'rgba(229, 231, 235, 0.5)' },
        ticks: {
          callback: (value) => {
            if (selectedForecastMetric === 'revenue' || selectedForecastMetric === 'expenses') {
              return `$${(value / 1000).toFixed(0)}K`;
            } else {
              return value;
            }
          },
        }
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

  // Expense categories doughnut chart
  const expenseDoughnutData = {
    labels: expenseCategories.map(item => item.name),
    datasets: [
      {
        data: expenseCategories.map(item => item.value),
        backgroundColor: [
          'rgba(239, 68, 68, 0.7)',
          'rgba(245, 158, 11, 0.7)',
          'rgba(59, 130, 246, 0.7)',
          'rgba(16, 185, 129, 0.7)',
          'rgba(139, 92, 246, 0.7)',
          'rgba(14, 165, 233, 0.7)',
          'rgba(168, 85, 247, 0.7)',
        ],
        borderColor: [
          'rgb(239, 68, 68)',
          'rgb(245, 158, 11)',
          'rgb(59, 130, 246)',
          'rgb(16, 185, 129)',
          'rgb(139, 92, 246)',
          'rgb(14, 165, 233)',
          'rgb(168, 85, 247)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const expenseDoughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '65%',
    plugins: {
      legend: {
        position: 'right',
        labels: { 
          boxWidth: 12,
          font: { size: 11 }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleFont: { size: 14 },
        bodyFont: { size: 12 },
        callbacks: {
          label: (context) => `${context.label}: ${formatCurrency(context.raw)} (${(context.raw / context.dataset.data.reduce((a, b) => a + b, 0) * 100).toFixed(1)}%)`,
        },
      }
    },
    animation: {
      animateScale: true,
      animateRotate: true
    }
  };

  // Marketing channels radar chart
  const marketingRadarData = {
    labels: marketingChannelStats.channels.map(channel => channel.name),
    datasets: [
      {
        label: 'Conversion Rate (%)',
        data: marketingChannelStats.channels.map(channel => channel.conversion),
        backgroundColor: 'rgba(59, 130, 246, 0.3)',
        borderColor: 'rgb(59, 130, 246)',
        pointBackgroundColor: 'rgb(59, 130, 246)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(59, 130, 246)',
        borderWidth: 2,
      },
      {
        label: 'ROI (Scaled %)',
        data: marketingChannelStats.channels.map(channel => channel.roi / 10), // Scaled for visualization
        backgroundColor: 'rgba(16, 185, 129, 0.3)',
        borderColor: 'rgb(16, 185, 129)',
        pointBackgroundColor: 'rgb(16, 185, 129)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(16, 185, 129)',
        borderWidth: 2,
      }
    ],
  };

  const marketingRadarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleFont: { size: 14 },
        bodyFont: { size: 12 },
        callbacks: {
          label: (context) => {
            if (context.dataset.label === 'ROI (Scaled %)') {
              return `ROI: ${context.raw * 10}%`;
            } else {
              return `${context.dataset.label}: ${context.raw}%`;
            }
          },
        },
      },
    },
    scales: {
      r: {
        angleLines: {
          display: true,
          color: 'rgba(229, 231, 235, 0.5)',
        },
        grid: {
          color: 'rgba(229, 231, 235, 0.5)',
        },
        pointLabels: {
          font: {
            size: 11
          }
        },
        min: 0,
      }
    },
    animation: {
      duration: 1000,
      easing: 'easeOutQuart',
    },
  };

  // Financial metrics visualization
  const financialRadarData = {
    labels: ['Gross Margin', 'Operating Margin', 'Net Margin', 'EBITDA Margin', 'ROA', 'ROE', 'ROI'],
    datasets: [
      {
        label: 'Current (%)',
        data: [
          financialMetrics.profitabilityRatios.grossProfitMargin,
          financialMetrics.profitabilityRatios.operatingProfitMargin,
          financialMetrics.profitabilityRatios.netProfitMargin,
          financialMetrics.profitabilityRatios.ebitdaMargin,
          financialMetrics.profitabilityRatios.returnOnAssets,
          financialMetrics.profitabilityRatios.returnOnEquity,
          financialMetrics.profitabilityRatios.returnOnInvestment
        ],
        backgroundColor: 'rgba(16, 185, 129, 0.3)',
        borderColor: 'rgb(16, 185, 129)',
        pointBackgroundColor: 'rgb(16, 185, 129)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(16, 185, 129)',
        borderWidth: 2,
      },
      {
        label: 'Industry Benchmark (%)',
        data: [72.5, 41.0, 32.8, 48.5, 21.5, 30.2, 38.0],
        backgroundColor: 'rgba(168, 85, 247, 0.3)',
        borderColor: 'rgb(168, 85, 247)',
        pointBackgroundColor: 'rgb(168, 85, 247)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(168, 85, 247)',
        borderWidth: 2,
      }
    ],
  };

  const financialRadarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleFont: { size: 14 },
        bodyFont: { size: 12 },
        callbacks: {
          label: (context) => `${context.dataset.label}: ${context.raw}%`,
        },
      },
    },
    scales: {
      r: {
        angleLines: {
          display: true,
          color: 'rgba(229, 231, 235, 0.5)',
        },
        grid: {
          color: 'rgba(229, 231, 235, 0.5)',
        },
        pointLabels: {
          font: {
            size: 11
          }
        },
        min: 0,
        max: 100,
      }
    },
    animation: {
      duration: 1000,
      easing: 'easeOutQuart',
    },
  };

  const convertDateFormat = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    }).format(date);
  };

  return (
    <div className="bg-slate-50 min-h-screen w-full">
      {/* Dashboard Header */}
      <div className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-gray-900">Course Analytics Dashboard</h1>
              <p className="mt-1 text-sm text-gray-500">Comprehensive analytics for courses, enrollments, and financial performance</p>
            </div>
            <div className="mt-4 md:mt-0 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
              <div className="relative">
                <button 
                  onClick={() => setFilterPanelOpen(!filterPanelOpen)}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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
                      className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10"
                    >
                      <div className="py-1" role="menu" aria-orientation="vertical">
                        <div className="px-4 py-2 text-xs font-semibold text-gray-500">Date Range</div>
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Last 7 days</a>
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Last 30 days</a>
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Last 90 days</a>
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">This year</a>
                        <div className="border-t border-gray-100 my-1"></div>
                        <div className="px-4 py-2 text-xs font-semibold text-gray-500">Course Category</div>
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">All Categories</a>
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Technical</a>
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Business</a>
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Creative</a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <button
                onClick={handleDownload}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Enrollment KPI */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-md">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <h2 className="text-sm font-medium text-gray-500">Total Students</h2>
                <div className="flex items-baseline">
                  <p className="text-2xl font-semibold text-gray-900">{studentStats.totalStudents.toLocaleString()}</p>
                  <p className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                    <ArrowUpRight className="self-center flex-shrink-0 h-4 w-4 text-green-500" />
                    <span>{studentStats.studentGrowth}%</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">New students</span>
                <span className="font-medium text-gray-900">{studentStats.newStudents.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center text-sm mt-1">
                <span className="text-gray-500">Active students</span>
                <span className="font-medium text-gray-900">{studentStats.activeStudents.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center text-sm mt-1">
                <span className="text-gray-500">Completion rate</span>
                <span className="font-medium text-gray-900">{studentStats.completionRate}%</span>
              </div>
            </div>
          </div>

          {/* Course Stats KPI */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="inline-flex items-center justify-center p-3 bg-green-100 rounded-md">
                <BookOpen className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <h2 className="text-sm font-medium text-gray-500">Total Courses</h2>
                <div className="flex items-baseline">
                  <p className="text-2xl font-semibold text-gray-900">{courseStats.totalCourses}</p>
                  <p className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                    <ArrowUpRight className="self-center flex-shrink-0 h-4 w-4 text-green-500" />
                    <span>{courseStats.courseGrowth}%</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Active courses</span>
                <span className="font-medium text-gray-900">{courseStats.activeCourses}</span>
              </div>
              <div className="flex justify-between items-center text-sm mt-1">
                <span className="text-gray-500">Draft courses</span>
                <span className="font-medium text-gray-900">{courseStats.draftCourses}</span>
              </div>
              <div className="flex justify-between items-center text-sm mt-1">
                <span className="text-gray-500">New this month</span>
                <span className="font-medium text-gray-900">{courseStats.newCourses}</span>
              </div>
            </div>
          </div>

          {/* Revenue KPI */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="inline-flex items-center justify-center p-3 bg-purple-100 rounded-md">
                <DollarSign className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <h2 className="text-sm font-medium text-gray-500">Total Revenue</h2>
                <div className="flex items-baseline">
                  <p className="text-2xl font-semibold text-gray-900">{formatCurrency(revenueStats.totalRevenue)}</p>
                  <p className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                    <ArrowUpRight className="self-center flex-shrink-0 h-4 w-4 text-green-500" />
                    <span>{revenueStats.revenueGrowth}%</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Monthly revenue</span>
                <span className="font-medium text-gray-900">{formatCurrency(revenueStats.monthlyRevenue)}</span>
              </div>
              <div className="flex justify-between items-center text-sm mt-1">
                <span className="text-gray-500">Avg. course value</span>
                <span className="font-medium text-gray-900">{formatCurrency(revenueStats.averageCourseValue)}</span>
              </div>
              <div className="flex justify-between items-center text-sm mt-1">
                <span className="text-gray-500">MRR</span>
                <span className="font-medium text-gray-900">{formatCurrency(revenueStats.mrr)}</span>
              </div>
            </div>
          </div>

          {/* Learning Stats KPI */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="inline-flex items-center justify-center p-3 bg-yellow-100 rounded-md">
                <Video className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <h2 className="text-sm font-medium text-gray-500">Learning Time</h2>
                <div className="flex items-baseline">
                  <p className="text-2xl font-semibold text-gray-900">{(learningStats.totalLearningHours / 1000).toFixed(1)}K hrs</p>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Completion rate</span>
                <span className="font-medium text-gray-900">{learningStats.averageCompletion}%</span>
              </div>
              <div className="flex justify-between items-center text-sm mt-1">
                <span className="text-gray-500">Engagement score</span>
                <span className="font-medium text-gray-900">{learningStats.averageEngagement}%</span>
              </div>
              <div className="flex justify-between items-center text-sm mt-1">
                <span className="text-gray-500">Certificates issued</span>
                <span className="font-medium text-gray-900">{learningStats.certificatesIssued.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Enrollment Chart */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-900">Course Enrollments</h2>
              <div className="flex space-x-2">
                <button 
                  onClick={() => setEnrollmentTimeRange('daily')}
                  className={`px-3 py-1 text-xs font-medium rounded-md ${
                    enrollmentTimeRange === 'daily' 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Daily
                </button>
                <button 
                  onClick={() => setEnrollmentTimeRange('monthly')}
                  className={`px-3 py-1 text-xs font-medium rounded-md ${
                    enrollmentTimeRange === 'monthly' 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Monthly
                </button>
                <button 
                  onClick={() => setEnrollmentTimeRange('quarterly')}
                  className={`px-3 py-1 text-xs font-medium rounded-md ${
                    enrollmentTimeRange === 'quarterly' 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Quarterly
                </button>
                <button 
                  onClick={() => setEnrollmentTimeRange('yearly')}
                  className={`px-3 py-1 text-xs font-medium rounded-md ${
                    enrollmentTimeRange === 'yearly' 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Yearly
                </button>
              </div>
            </div>
            <div className="h-72">
              <Bar data={enrollmentChartData} options={enrollmentChartOptions} />
            </div>
          </div>

          {/* Revenue vs Expenses Chart */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-900">Revenue vs Expenses</h2>
              <div className="flex space-x-2">
                <button 
                  onClick={() => setTimeRange('weekly')}
                  className={`px-3 py-1 text-xs font-medium rounded-md ${
                    timeRange === 'weekly' 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Weekly
                </button>
                <button 
                  onClick={() => setTimeRange('monthly')}
                  className={`px-3 py-1 text-xs font-medium rounded-md ${
                    timeRange === 'monthly' 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Monthly
                </button>
                <button 
                  onClick={() => setTimeRange('quarterly')}
                  className={`px-3 py-1 text-xs font-medium rounded-md ${
                    timeRange === 'quarterly' 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Quarterly
                </button>
              </div>
            </div>
            <div className="h-72">
              <Line data={revenueLineData} options={revenueLineOptions} />
            </div>
          </div>
        </div>

        {/* Fiscal Health Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Revenue Breakdown */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-900">Revenue Breakdown</h2>
              <div className="flex space-x-2">
                <button 
                  onClick={() => setRevenueBreakdownType('courseTypes')}
                  className={`px-3 py-1 text-xs font-medium rounded-md ${
                    revenueBreakdownType === 'courseTypes' 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Course Types
                </button>
                <button 
                  onClick={() => setRevenueBreakdownType('subscriptionTiers')}
                  className={`px-3 py-1 text-xs font-medium rounded-md ${
                    revenueBreakdownType === 'subscriptionTiers' 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Subscriptions
                </button>
                <button 
                  onClick={() => setRevenueBreakdownType('geographicalRegions')}
                  className={`px-3 py-1 text-xs font-medium rounded-md ${
                    revenueBreakdownType === 'geographicalRegions' 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}>
                  Regions
                </button>
              </div>
            </div>
            <div className="h-72">
              <Pie data={revenueBreakdownData} options={revenueBreakdownOptions} />
            </div>
          </div>

          {/* Expense Categories */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-900">Expense Categories</h2>
              <div className="text-sm text-gray-500">
                Total: {formatCurrency(expenseCategories.reduce((sum, item) => sum + item.value, 0))}
              </div>
            </div>
            <div className="h-72">
              <Doughnut data={expenseDoughnutData} options={expenseDoughnutOptions} />
            </div>
          </div>
        </div>

        {/* Cash Flow and Forecast */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Cash Flow Analysis */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-900">Cash Flow Analysis</h2>
              <div className="flex space-x-2">
                <button 
                  onClick={() => setCashFlowTimeRange('monthly')}
                  className={`px-3 py-1 text-xs font-medium rounded-md ${
                    cashFlowTimeRange === 'monthly' 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Monthly
                </button>
                <button 
                  onClick={() => setCashFlowTimeRange('quarterly')}
                  className={`px-3 py-1 text-xs font-medium rounded-md ${
                    cashFlowTimeRange === 'quarterly' 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Quarterly
                </button>
              </div>
            </div>
            <div className="h-72">
              <Line data={cashFlowChartData} options={cashFlowChartOptions} />
            </div>
          </div>

          {/* Forecast Chart */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-900">Forecast Analysis</h2>
              <div className="flex space-x-2">
                <button 
                  onClick={() => setSelectedForecastMetric('revenue')}
                  className={`px-3 py-1 text-xs font-medium rounded-md ${
                    selectedForecastMetric === 'revenue' 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Revenue
                </button>
                <button 
                  onClick={() => setSelectedForecastMetric('enrollments')}
                  className={`px-3 py-1 text-xs font-medium rounded-md ${
                    selectedForecastMetric === 'enrollments' 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Enrollments
                </button>
                <button 
                  onClick={() => setSelectedForecastMetric('expenses')}
                  className={`px-3 py-1 text-xs font-medium rounded-md ${
                    selectedForecastMetric === 'expenses' 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Expenses
                </button>
              </div>
            </div>
            <div className="h-72">
              <Line data={forecastChartData} options={forecastChartOptions} />
            </div>
          </div>
        </div>

        {/* Marketing and Top Performers */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
          {/* Marketing Channel Performance */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Marketing Channel Performance</h2>
            <div className="h-64">
              <Radar data={marketingRadarData} options={marketingRadarOptions} />
            </div>
            <div className="mt-4">
              <div className="overflow-x-auto -mx-4 -my-2 sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle px-4 sm:px-6 lg:px-8">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead>
                      <tr>
                        <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Channel
                        </th>
                        <th scope="col" className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Students
                        </th>
                        <th scope="col" className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          CPA
                        </th>
                        <th scope="col" className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          ROI
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {marketingChannelStats.channels.map((channel) => (
                        <tr key={channel.id}>
                          <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                            {channel.name}
                          </td>
                          <td className="px-3 py-2 whitespace-nowrap text-sm text-right text-gray-700">
                            {channel.students.toLocaleString()}
                          </td>
                          <td className="px-3 py-2 whitespace-nowrap text-sm text-right text-gray-700">
                            ${channel.cpa.toFixed(2)}
                          </td>
                          <td className="px-3 py-2 whitespace-nowrap text-sm text-right text-gray-700">
                            {channel.roi}%
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Financial Metrics */}
          <div className="bg-white rounded-lg shadow p-6 xl:col-span-2">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-900">Financial Metrics</h2>
              <button
                onClick={() => setIsFinancialMetricsExpanded(!isFinancialMetricsExpanded)}
                className="text-gray-500 hover:text-gray-700"
              >
                {isFinancialMetricsExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </button>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-xs font-medium text-blue-700 uppercase mb-2 flex items-center">
                  <PieChart className="inline h-4 w-4 mr-1" />
                  Profitability
                </h3>
                <div className="space-y-2">
                  <div 
                    className="flex justify-between" 
                    onMouseEnter={(e) => handleMetricHover('grossMargin', 'Gross Profit Margin', 'Revenue minus cost of goods sold, divided by revenue', e.clientX, e.clientY)}
                    onMouseLeave={handleMetricLeave}
                  >
                    <span className="text-sm text-gray-600">Gross Margin</span>
                    <span className="text-sm font-medium text-gray-900">{financialMetrics.profitabilityRatios.grossProfitMargin}%</span>
                  </div>
                  <div 
                    className="flex justify-between"
                    onMouseEnter={(e) => handleMetricHover('operatingMargin', 'Operating Profit Margin', 'Operating income divided by revenue', e.clientX, e.clientY)}
                    onMouseLeave={handleMetricLeave}
                  >
                    <span className="text-sm text-gray-600">Operating Margin</span>
                    <span className="text-sm font-medium text-gray-900">{financialMetrics.profitabilityRatios.operatingProfitMargin}%</span>
                  </div>
                  <div 
                    className="flex justify-between"
                    onMouseEnter={(e) => handleMetricHover('netMargin', 'Net Profit Margin', 'Net income divided by revenue', e.clientX, e.clientY)}
                    onMouseLeave={handleMetricLeave}
                  >
                    <span className="text-sm text-gray-600">Net Margin</span>
                    <span className="text-sm font-medium text-gray-900">{financialMetrics.profitabilityRatios.netProfitMargin}%</span>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="text-xs font-medium text-green-700 uppercase mb-2 flex items-center">
                  <BarChart className="inline h-4 w-4 mr-1" />
                  SaaS Metrics
                </h3>
                <div className="space-y-2">
                  <div 
                    className="flex justify-between"
                    onMouseEnter={(e) => handleMetricHover('ltv', 'Lifetime Value', 'The predicted revenue a customer will generate over their lifetime', e.clientX, e.clientY)}
                    onMouseLeave={handleMetricLeave}
                  >
                    <span className="text-sm text-gray-600">LTV</span>
                    <span className="text-sm font-medium text-gray-900">${revenueStats.ltv}</span>
                  </div>
                  <div 
                    className="flex justify-between"
                    onMouseEnter={(e) => handleMetricHover('cac', 'Customer Acquisition Cost', 'The cost associated with acquiring a new customer', e.clientX, e.clientY)}
                    onMouseLeave={handleMetricLeave}
                  >
                    <span className="text-sm text-gray-600">CAC</span>
                    <span className="text-sm font-medium text-gray-900">${revenueStats.cac}</span>
                  </div>
                  <div 
                    className="flex justify-between"
                    onMouseEnter={(e) => handleMetricHover('churnRate', 'Churn Rate', 'The percentage of customers who stop using your service over a given time period', e.clientX, e.clientY)}
                    onMouseLeave={handleMetricLeave}
                  >
                    <span className="text-sm text-gray-600">Churn Rate</span>
                    <span className="text-sm font-medium text-gray-900">{revenueStats.churnRate}%</span>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="text-xs font-medium text-purple-700 uppercase mb-2 flex items-center">
                  <TrendingUp className="inline h-4 w-4 mr-1" />
                  Returns
                </h3>
                <div className="space-y-2">
                  <div 
                    className="flex justify-between"
                    onMouseEnter={(e) => handleMetricHover('roa', 'Return on Assets', 'Net income divided by total assets', e.clientX, e.clientY)}
                    onMouseLeave={handleMetricLeave}
                  >
                    <span className="text-sm text-gray-600">ROA</span>
                    <span className="text-sm font-medium text-gray-900">{financialMetrics.profitabilityRatios.returnOnAssets}%</span>
                  </div>
                  <div 
                    className="flex justify-between"
                    onMouseEnter={(e) => handleMetricHover('roe', 'Return on Equity', 'Net income divided by shareholders\' equity', e.clientX, e.clientY)}
                    onMouseLeave={handleMetricLeave}
                  >
                    <span className="text-sm text-gray-600">ROE</span>
                    <span className="text-sm font-medium text-gray-900">{financialMetrics.profitabilityRatios.returnOnEquity}%</span>
                  </div>
                  <div 
                    className="flex justify-between"
                    onMouseEnter={(e) => handleMetricHover('roi', 'Return on Investment', 'Gain from investment minus cost of investment, divided by cost of investment', e.clientX, e.clientY)}
                    onMouseLeave={handleMetricLeave}
                  >
                    <span className="text-sm text-gray-600">ROI</span>
                    <span className="text-sm font-medium text-gray-900">{financialMetrics.profitabilityRatios.returnOnInvestment}%</span>
                  </div>
                </div>
              </div>

              <div className="bg-orange-50 p-4 rounded-lg">
                <h3 className="text-xs font-medium text-orange-700 uppercase mb-2 flex items-center">
                  <Activity className="inline h-4 w-4 mr-1" />
                  Liquidity
                </h3>
                <div className="space-y-2">
                  <div 
                    className="flex justify-between"
                    onMouseEnter={(e) => handleMetricHover('currentRatio', 'Current Ratio', 'Current assets divided by current liabilities', e.clientX, e.clientY)}
                    onMouseLeave={handleMetricLeave}
                  >
                    <span className="text-sm text-gray-600">Current Ratio</span>
                    <span className="text-sm font-medium text-gray-900">{financialMetrics.liquidityRatios.currentRatio}</span>
                  </div>
                  <div 
                    className="flex justify-between"
                    onMouseEnter={(e) => handleMetricHover('quickRatio', 'Quick Ratio', 'Current assets minus inventory, divided by current liabilities', e.clientX, e.clientY)}
                    onMouseLeave={handleMetricLeave}
                  >
                    <span className="text-sm text-gray-600">Quick Ratio</span>
                    <span className="text-sm font-medium text-gray-900">{financialMetrics.liquidityRatios.quickRatio}</span>
                  </div>
                  <div 
                    className="flex justify-between"
                    onMouseEnter={(e) => handleMetricHover('cashRatio', 'Cash Ratio', 'Cash and cash equivalents divided by current liabilities', e.clientX, e.clientY)}
                    onMouseLeave={handleMetricLeave}
                  >
                    <span className="text-sm text-gray-600">Cash Ratio</span>
                    <span className="text-sm font-medium text-gray-900">{financialMetrics.liquidityRatios.cashRatio}</span>
                  </div>
                </div>
              </div>
            </div>

            {isFinancialMetricsExpanded && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6"
              >
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Financial Performance vs. Industry</h3>
                  <div className="h-64">
                    <Radar data={financialRadarData} options={financialRadarOptions} />
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Valuation Metrics</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Enterprise Value</span>
                      <span className="text-sm font-medium text-gray-900">{formatCurrency(financialMetrics.valuationMultiples.enterpriseValue)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">EV/Revenue</span>
                      <span className="text-sm font-medium text-gray-900">{financialMetrics.valuationMultiples.evToRevenue}x</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">EV/EBITDA</span>
                      <span className="text-sm font-medium text-gray-900">{financialMetrics.valuationMultiples.evToEbitda}x</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">P/E Ratio</span>
                      <span className="text-sm font-medium text-gray-900">{financialMetrics.valuationMultiples.priceToEarnings}x</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">P/S Ratio</span>
                      <span className="text-sm font-medium text-gray-900">{financialMetrics.valuationMultiples.priceToSales}x</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Revenue per Employee</span>
                      <span className="text-sm font-medium text-gray-900">{formatCurrency(financialMetrics.operatingMetrics.revenuePerEmployee)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Profit per Employee</span>
                      <span className="text-sm font-medium text-gray-900">{formatCurrency(financialMetrics.operatingMetrics.profitPerEmployee)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Operating Expense Ratio</span>
                      <span className="text-sm font-medium text-gray-900">{financialMetrics.operatingMetrics.operatingExpenseRatio}%</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Quarterly Financials */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-900">Quarterly Financial Performance</h2>
              <button
                onClick={() => setIsQuarterlyFinancialsExpanded(!isQuarterlyFinancialsExpanded)}
                className="text-gray-500 hover:text-gray-700"
              >
                {isQuarterlyFinancialsExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </button>
            </div>
            <div className="overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle px-4 sm:px-6 lg:px-8">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead>
                    <tr>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Quarter</th>
                      <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">Revenue</th>
                      <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">Expenses</th>
                      <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">Profit</th>
                      <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">Margin</th>
                      <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">New Students</th>
                      <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">New Courses</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {quarterlyFinancials.map((quarter, index) => (
                      <tr key={index} className={index === quarterlyFinancials.length - 1 ? "bg-blue-50" : ""}>
                        <td className="whitespace-nowrap px-3 py-4 text-sm font-medium text-gray-900">{quarter.quarter}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-gray-700">{formatCurrency(quarter.revenue)}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-gray-700">{formatCurrency(quarter.expenses)}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-gray-700">{formatCurrency(quarter.profit)}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-gray-700">{quarter.margin}%</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-gray-700">{quarter.studentAcquisition.toLocaleString()}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-gray-700">{quarter.courseReleases}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {isQuarterlyFinancialsExpanded && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-6"
              >
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-4">Quarter-over-Quarter Growth</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="rounded-full bg-blue-100 p-2">
                            <TrendingUp className="h-5 w-5 text-blue-600" />
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-700">Revenue Growth</p>
                            <p className="text-lg font-semibold text-gray-900">6.7%</p>
                          </div>
                        </div>
                        <div className="text-green-500 flex items-center">
                          <ArrowUpRight className="h-4 w-4" />
                          <span className="text-xs font-medium ml-1">+0.9%</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="rounded-full bg-green-100 p-2">
                            <Users className="h-5 w-5 text-green-600" />
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-700">Student Growth</p>
                            <p className="text-lg font-semibold text-gray-900">7.3%</p>
                          </div>
                        </div>
                        <div className="text-green-500 flex items-center">
                          <ArrowUpRight className="h-4 w-4" />
                          <span className="text-xs font-medium ml-1">+0.5%</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="rounded-full bg-purple-100 p-2">
                            <Percent className="h-5 w-5 text-purple-600" />
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-700">Margin Improvement</p>
                            <p className="text-lg font-semibold text-gray-900">0.5%</p>
                          </div>
                        </div>
                        <div className="text-green-500 flex items-center">
                          <ArrowUpRight className="h-4 w-4" />
                          <span className="text-xs font-medium ml-1">+0.1%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Course ROI Analysis */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-900">Course ROI Analysis</h2>
              <button
                onClick={() => setIsCourseROIExpanded(!isCourseROIExpanded)}
                className="text-gray-500 hover:text-gray-700"
              >
                {isCourseROIExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </button>
            </div>
            <div className="overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle px-4 sm:px-6 lg:px-8">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead>
                    <tr>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Course Name</th>
                      <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">Development Cost</th>
                      <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">Marketing Cost</th>
                      <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">Total Revenue</th>
                      <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">ROI</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {courseROIData.map((course, index) => (
                      <tr key={index}>
                        <td className="whitespace-nowrap px-3 py-4 text-sm font-medium text-gray-900">{course.name}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-gray-700">{formatCurrency(course.development)}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-gray-700">{formatCurrency(course.marketing)}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-gray-700">{formatCurrency(course.revenue)}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-gray-700">{course.roi}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {isCourseROIExpanded && (
              <motion.div 
                initial={{ opacity: 0, height:0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-6"
              >
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-4">ROI Performance Analysis</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Investment Efficiency</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Average ROI</span>
                          <span className="text-sm font-medium text-gray-900">{(courseROIData.reduce((sum, course) => sum + course.roi, 0) / courseROIData.length).toFixed(1)}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Total Investment</span>
                          <span className="text-sm font-medium text-gray-900">{formatCurrency(courseROIData.reduce((sum, course) => sum + course.development + course.marketing, 0))}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Total Return</span>
                          <span className="text-sm font-medium text-gray-900">{formatCurrency(courseROIData.reduce((sum, course) => sum + course.revenue, 0))}</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Performance Trends</h4>
                      <div className="h-32">
                        <Line
                          data={{
                            labels: courseROIData.map(course => course.name.split(' ').slice(0, 2).join(' ')),
                            datasets: [{
                              label: 'ROI %',
                              data: courseROIData.map(course => course.roi),
                              borderColor: 'rgb(59, 130, 246)',
                              backgroundColor: 'rgba(59, 130, 246, 0.1)',
                              fill: true,
                              tension: 0.4,
                            }],
                          }}
                          options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: { legend: { display: false } },
                            scales: {
                              y: { beginAtZero: false, grid: { color: 'rgba(229, 231, 235, 0.5)' } },
                              x: { grid: { display: false }, ticks: { autoSkip: false, maxRotation: 45, minRotation: 45 } },
                            },
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Top Courses */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-900">Top Performing Courses</h2>
              <button
                onClick={() => setIsTopCoursesExpanded(!isTopCoursesExpanded)}
                className="text-gray-500 hover:text-gray-700"
              >
                {isTopCoursesExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </button>
            </div>
            <div className="overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle px-4 sm:px-6 lg:px-8">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead>
                    <tr>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Course Name</th>
                      <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">Enrollments</th>
                      <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">Revenue</th>
                      <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">Rating</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {topCourses.map((course) => (
                      <tr key={course.id}>
                        <td className="whitespace-nowrap px-3 py-4 text-sm font-medium text-gray-900">{course.name}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-gray-700">{course.enrollments.toLocaleString()}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-gray-700">{formatCurrency(course.revenue)}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-gray-700">
                          <div className="flex items-center justify-end">
                            {course.rating}
                            <Star className="h-4 w-4 text-yellow-400 ml-1" />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            {isTopCoursesExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-6"
              >
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-4">Course Performance Metrics</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <div className="flex items-center">
                        <Users className="h-5 w-5 text-blue-600 mr-2" />
                        <div>
                          <p className="text-sm text-gray-600">Total Enrollments</p>
                          <p className="text-lg font-semibold text-gray-900">{topCourses.reduce((sum, course) => sum + course.enrollments, 0).toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <div className="flex items-center">
                        <DollarSign className="h-5 w-5 text-green-600 mr-2" />
                        <div>
                          <p className="text-sm text-gray-600">Total Revenue</p>
                          <p className="text-lg font-semibold text-gray-900">{formatCurrency(topCourses.reduce((sum, course) => sum + course.revenue, 0))}</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <div className="flex items-center">
                        <Star className="h-5 w-5 text-yellow-400 mr-2" />
                        <div>
                          <p className="text-sm text-gray-600">Average Rating</p>
                          <p className="text-lg font-semibold text-gray-900">{(topCourses.reduce((sum, course) => sum + course.rating, 0) / topCourses.length).toFixed(1)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Top Instructors */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-900">Top Instructors</h2>
              <button
                onClick={() => setIsTopInstructorsExpanded(!isTopInstructorsExpanded)}
                className="text-gray-500 hover:text-gray-700"
              >
                {isTopInstructorsExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </button>
            </div>
            <div className="overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle px-4 sm:px-6 lg:px-8">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead>
                    <tr>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Instructor</th>
                      <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">Courses</th>
                      <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">Students</th>
                      <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">Revenue</th>
                      <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">Rating</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {topInstructors.map((instructor) => (
                      <tr key={instructor.id}>
                        <td className="whitespace-nowrap px-3 py-4 text-sm font-medium text-gray-900">{instructor.name}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-gray-700">{instructor.courses}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-gray-700">{instructor.students.toLocaleString()}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-gray-700">{formatCurrency(instructor.revenue)}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-gray-700">
                          <div className="flex items-center justify-end">
                            {instructor.rating}
                            <Star className="h-4 w-4 text-yellow-400 ml-1" />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            {isTopInstructorsExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-6"
              >
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-4">Instructor Impact Analysis</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <div className="flex items-center">
                        <BookOpen className="h-5 w-5 text-blue-600 mr-2" />
                        <div>
                          <p className="text-sm text-gray-600">Total Courses</p>
                          <p className="text-lg font-semibold text-gray-900">{topInstructors.reduce((sum, instructor) => sum + instructor.courses, 0)}</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <div className="flex items-center">
                        <Users className="h-5 w-5 text-green-600 mr-2" />
                        <div>
                          <p className="text-sm text-gray-600">Total Students</p>
                          <p className="text-lg font-semibold text-gray-900">{topInstructors.reduce((sum, instructor) => sum + instructor.students, 0).toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <div className="flex items-center">
                        <DollarSign className="h-5 w-5 text-purple-600 mr-2" />
                        <div>
                          <p className="text-sm text-gray-600">Total Revenue</p>
                          <p className="text-lg font-semibold text-gray-900">{formatCurrency(topInstructors.reduce((sum, instructor) => sum + instructor.revenue, 0))}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Recent Enrollments */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-900">Recent Enrollments</h2>
              <button
                onClick={() => setIsRecentEnrollmentsExpanded(!isRecentEnrollmentsExpanded)}
                className="text-gray-500 hover:text-gray-700"
              >
                {isRecentEnrollmentsExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </button>
            </div>
            {isRecentEnrollmentsExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 align-middle px-4 sm:px-6 lg:px-8">
                    <table className="min-w-full divide-y divide-gray-300">
                      <thead>
                        <tr>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Enrollment ID</th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Student</th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Course</th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Date</th>
                          <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">Amount</th>
                          <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {recentEnrollments.map((enrollment) => (
                          <tr key={enrollment.id}>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-700">{enrollment.id}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm font-medium text-gray-900">{enrollment.student}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-700">{enrollment.course}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-700">{convertDateFormat(enrollment.date)}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-gray-700">{formatCurrency(enrollment.amount)}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-right">
                              <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(enrollment.status)}`}>
                                {enrollment.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Video Engagement Stats */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-900">Video Engagement Statistics</h2>
              <button
                onClick={() => setIsVideoStatsExpanded(!isVideoStatsExpanded)}
                className="text-gray-500 hover:text-gray-700"
              >
                { isVideoStatsExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </button>
            </div>
            {isVideoStatsExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 align-middle px-4 sm:px-6 lg:px-8">
                    <table className="min-w-full divide-y divide-gray-300">
                      <thead>
                        <tr>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Video Title</th>
                          <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">Duration</th>
                          <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">Views</th>
                          <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">Completion</th>
                          <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">Questions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {videoEngagementStats.map((video) => (
                          <tr key={video.id}>
                            <td className="whitespace-nowrap px-3 py-4 text-sm font-medium text-gray-900">{video.title}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-gray-700">{video.duration}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-gray-700">{video.views.toLocaleString()}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-gray-700">{video.completion}%</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-gray-700">{video.questions}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="mt-6 bg-gray-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-4">Engagement Metrics</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <div className="flex items-center">
                        <Eye className="h-5 w-5 text-blue-600 mr-2" />
                        <div>
                          <p className="text-sm text-gray-600">Total Views</p>
                          <p className="text-lg font-semibold text-gray-900">{videoEngagementStats.reduce((sum, video) => sum + video.views, 0).toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <div className="flex items-center">
                        <PlayCircle className="h-5 w-5 text-green-600 mr-2" />
                        <div>
                          <p className="text-sm text-gray-600">Avg. Completion</p>
                          <p className="text-lg font-semibold text-gray-900">{(videoEngagementStats.reduce((sum, video) => sum + video.completion, 0) / videoEngagementStats.length).toFixed(1)}%</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <div className="flex items-center">
                        <MessageSquare className="h-5 w-5 text-purple-600 mr-2" />
                        <div>
                          <p className="text-sm text-gray-600">Total Questions</p>
                          <p className="text-lg font-semibold text-gray-900">{videoEngagementStats.reduce((sum, video) => sum + video.questions, 0)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Promotions Analysis */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Promotions Analysis</h2>
            <div className="overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle px-4 sm:px-6 lg:px-8">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead>
                    <tr>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Promo Code</th>
                      <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">Uses</th>
                      <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">Discount</th>
                      <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">Revenue Impact</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {promotions.map((promo, index) => (
                      <tr key={index}>
                        <td className="whitespace-nowrap px-3 py-4 text-sm font-medium text-gray-900">{promo.code}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-gray-700">{promo.uses.toLocaleString()}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-gray-700">{promo.discount}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-gray-700">{formatCurrency(promo.revenue)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="mt-6 bg-gray-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-700 mb-4">Promotion Effectiveness</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center">
                    <Tag className="h-5 w-5 text-blue-600 mr-2" />
                    <div>
                      <p className="text-sm text-gray-600">Total Uses</p>
                      <p className="text-lg font-semibold text-gray-900">{promotions.reduce((sum, promo) => sum + promo.uses, 0).toLocaleString()}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center">
                    <DollarSign className="h-5 w-5 text-green-600 mr-2" />
                    <div>
                      <p className="text-sm text-gray-600">Total Revenue Impact</p>
                      <p className="text-lg font-semibold text-gray-900">{formatCurrency(promotions.reduce((sum, promo) => sum + promo.revenue, 0))}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Financial Tooltip */}
        {showFinancialTooltip && tooltipMetric && (
          <div
            className="fixed bg-gray-800 text-white text-sm rounded-lg p-3 shadow-lg z-50 max-w-xs"
            style={{ top: tooltipPosition.y + 10, left: tooltipPosition.x + 10 }}
          >
            <h4 className="font-semibold">{tooltipMetric.name}</h4>
            <p className="mt-1">{tooltipMetric.description}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CourseAnalytics;