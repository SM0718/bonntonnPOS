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
  Title, 
  Tooltip, 
  Legend,
  Filler
);

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
    { quarter: 'Q1', enrollments: 4050 },
    { quarter: 'Q2', enrollments: 5110 },
    { quarter: 'Q3', enrollments: 5340 },
    { quarter: 'Q4', enrollments: 6550 }
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
      case 'Completed': return 'bg-emerald-50 text-emerald-700 border border-emerald-200';
      case 'In Progress': return 'bg-brand-50 text-brand-700 border border-brand-200';
      case 'Just Started': return 'bg-purple-50 text-purple-700 border border-purple-200';
      case 'Pending': return 'bg-amber-50 text-amber-700 border border-amber-200';
      case 'Refunded': return 'bg-red-50 text-red-700 border border-red-200';
      case 'Active': return 'bg-emerald-50 text-emerald-700 border border-emerald-200';
      case 'Draft': return 'bg-surface-100 text-surface-600 border border-surface-200';
      case 'Paused': return 'bg-surface-100 text-surface-600 border border-surface-200';
      default: return 'bg-surface-100 text-surface-600 border border-surface-200';
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
      backgroundColor: 'rgba(16, 185, 129, 0.6)',
      borderColor: 'rgb(16, 185, 129)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(16, 185, 129, 0.8)',
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
          'rgba(16, 185, 129, 0.7)',
          'rgba(139, 92, 246, 0.7)',
          'rgba(245, 158, 11, 0.7)',
          'rgba(236, 72, 153, 0.7)',
          'rgba(239, 68, 68, 0.7)',
          'rgba(14, 165, 233, 0.7)',
          'rgba(168, 85, 247, 0.7)',
        ],
        borderColor: [
          'rgb(16, 185, 129)',
          'rgb(139, 92, 246)',
          'rgb(245, 158, 11)',
          'rgb(236, 72, 153)',
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
        backgroundColor: 'rgba(16, 185, 129, 0.5)',
        borderColor: 'rgb(16, 185, 129)',
        borderWidth: 2,
        pointBackgroundColor: 'rgb(16, 185, 129)',
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

  const forecastChartData = {
    labels: forecastData[selectedForecastMetric].map(item => item.month),
    datasets: [
      {
        label: 'Actual',
        data: forecastData[selectedForecastMetric].map(item => item.actual),
        backgroundColor: 'rgba(16, 185, 129, 0.7)',
        borderColor: 'rgb(16, 185, 129)',
        borderWidth: 2,
        pointBackgroundColor: 'rgb(16, 185, 129)',
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

  const expenseDoughnutData = {
    labels: expenseCategories.map(item => item.name),
    datasets: [
      {
        data: expenseCategories.map(item => item.value),
        backgroundColor: [
          'rgba(239, 68, 68, 0.7)',
          'rgba(245, 158, 11, 0.7)',
          'rgba(16, 185, 129, 0.7)',
          'rgba(139, 92, 246, 0.7)',
          'rgba(236, 72, 153, 0.7)',
          'rgba(14, 165, 233, 0.7)',
          'rgba(168, 85, 247, 0.7)',
        ],
        borderColor: [
          'rgb(239, 68, 68)',
          'rgb(245, 158, 11)',
          'rgb(16, 185, 129)',
          'rgb(139, 92, 246)',
          'rgb(236, 72, 153)',
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

  const marketingRadarData = {
    labels: marketingChannelStats.channels.map(channel => channel.name),
    datasets: [
      {
        label: 'Conversion Rate (%)',
        data: marketingChannelStats.channels.map(channel => channel.conversion),
        backgroundColor: 'rgba(16, 185, 129, 0.3)',
        borderColor: 'rgb(16, 185, 129)',
        pointBackgroundColor: 'rgb(16, 185, 129)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(16, 185, 129)',
        borderWidth: 2,
      },
      {
        label: 'ROI (Scaled %)',
        data: marketingChannelStats.channels.map(channel => channel.roi / 10),
        backgroundColor: 'rgba(139, 92, 246, 0.3)',
        borderColor: 'rgb(139, 92, 246)',
        pointBackgroundColor: 'rgb(139, 92, 246)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(139, 92, 246)',
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
        angleLines: { display: true, color: 'rgba(229, 231, 235, 0.5)' },
        grid: { color: 'rgba(229, 231, 235, 0.5)' },
        pointLabels: { font: { size: 11 } },
        min: 0,
      }
    },
    animation: { duration: 1000, easing: 'easeOutQuart' },
  };

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
        angleLines: { display: true, color: 'rgba(229, 231, 235, 0.5)' },
        grid: { color: 'rgba(229, 231, 235, 0.5)' },
        pointLabels: { font: { size: 11 } },
        min: 0,
        max: 100,
      }
    },
    animation: { duration: 1000, easing: 'easeOutQuart' },
  };

  const convertDateFormat = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    }).format(date);
  };

  const toggleButtonClass = (isActive) =>
    `px-3 py-1 text-xs font-medium rounded-md transition-colors duration-200 ${
      isActive ? 'bg-brand-600 text-white' : 'bg-surface-100 text-surface-600 hover:bg-surface-200'
    }`;

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="page-title">Course Analytics</h1>
            <p className="mt-1 text-sm text-surface-500">Comprehensive analytics for courses, enrollments, and financial performance</p>
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
                    className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10"
                  >
                    <div className="py-1" role="menu">
                      <div className="px-4 py-2 text-xs font-semibold text-surface-500">Date Range</div>
                      <a href="#" className="block px-4 py-2 text-sm text-surface-700 hover:bg-surface-50" role="menuitem">Last 7 days</a>
                      <a href="#" className="block px-4 py-2 text-sm text-surface-700 hover:bg-surface-50" role="menuitem">Last 30 days</a>
                      <a href="#" className="block px-4 py-2 text-sm text-surface-700 hover:bg-surface-50" role="menuitem">Last 90 days</a>
                      <a href="#" className="block px-4 py-2 text-sm text-surface-700 hover:bg-surface-50" role="menuitem">This year</a>
                      <div className="border-t border-surface-100 my-1"></div>
                      <div className="px-4 py-2 text-xs font-semibold text-surface-500">Course Category</div>
                      <a href="#" className="block px-4 py-2 text-sm text-surface-700 hover:bg-surface-50" role="menuitem">All Categories</a>
                      <a href="#" className="block px-4 py-2 text-sm text-surface-700 hover:bg-surface-50" role="menuitem">Technical</a>
                      <a href="#" className="block px-4 py-2 text-sm text-surface-700 hover:bg-surface-50" role="menuitem">Business</a>
                      <a href="#" className="block px-4 py-2 text-sm text-surface-700 hover:bg-surface-50" role="menuitem">Creative</a>
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

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg flex items-center border border-red-200"
            >
              <AlertCircle size={20} className="mr-2" />
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div 
            className="card card-hover border border-surface-200 rounded-xl shadow-card p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center">
              <div className="inline-flex items-center justify-center p-3 bg-emerald-50 rounded-md">
                <Users className="h-6 w-6 text-emerald-600" />
              </div>
              <div className="ml-4">
                <h2 className="text-sm font-medium text-surface-500">Total Students</h2>
                <div className="flex items-baseline">
                  <p className="text-2xl font-semibold text-surface-900">{studentStats.totalStudents.toLocaleString()}</p>
                  <p className="ml-2 flex items-baseline text-sm font-semibold text-emerald-600">
                    <ArrowUpRight className="self-center flex-shrink-0 h-4 w-4" />
                    <span>{studentStats.studentGrowth}%</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-4 space-y-1">
              <div className="flex justify-between items-center text-sm">
                <span className="text-surface-500">New students</span>
                <span className="font-medium text-surface-900">{studentStats.newStudents.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-surface-500">Active students</span>
                <span className="font-medium text-surface-900">{studentStats.activeStudents.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-surface-500">Completion rate</span>
                <span className="font-medium text-surface-900">{studentStats.completionRate}%</span>
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
                <BookOpen className="h-6 w-6 text-emerald-600" />
              </div>
              <div className="ml-4">
                <h2 className="text-sm font-medium text-surface-500">Total Courses</h2>
                <div className="flex items-baseline">
                  <p className="text-2xl font-semibold text-surface-900">{courseStats.totalCourses}</p>
                  <p className="ml-2 flex items-baseline text-sm font-semibold text-emerald-600">
                    <ArrowUpRight className="self-center flex-shrink-0 h-4 w-4" />
                    <span>{courseStats.courseGrowth}%</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-4 space-y-1">
              <div className="flex justify-between items-center text-sm">
                <span className="text-surface-500">Active courses</span>
                <span className="font-medium text-surface-900">{courseStats.activeCourses}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-surface-500">Draft courses</span>
                <span className="font-medium text-surface-900">{courseStats.draftCourses}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-surface-500">New this month</span>
                <span className="font-medium text-surface-900">{courseStats.newCourses}</span>
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
                <DollarSign className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <h2 className="text-sm font-medium text-surface-500">Total Revenue</h2>
                <div className="flex items-baseline">
                  <p className="text-2xl font-semibold text-surface-900">{formatCurrency(revenueStats.totalRevenue)}</p>
                  <p className="ml-2 flex items-baseline text-sm font-semibold text-emerald-600">
                    <ArrowUpRight className="self-center flex-shrink-0 h-4 w-4" />
                    <span>{revenueStats.revenueGrowth}%</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-4 space-y-1">
              <div className="flex justify-between items-center text-sm">
                <span className="text-surface-500">Monthly revenue</span>
                <span className="font-medium text-surface-900">{formatCurrency(revenueStats.monthlyRevenue)}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-surface-500">Avg. course value</span>
                <span className="font-medium text-surface-900">{formatCurrency(revenueStats.averageCourseValue)}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-surface-500">MRR</span>
                <span className="font-medium text-surface-900">{formatCurrency(revenueStats.mrr)}</span>
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
                <Video className="h-6 w-6 text-amber-600" />
              </div>
              <div className="ml-4">
                <h2 className="text-sm font-medium text-surface-500">Learning Time</h2>
                <div className="flex items-baseline">
                  <p className="text-2xl font-semibold text-surface-900">{(learningStats.totalLearningHours / 1000).toFixed(1)}K hrs</p>
                </div>
              </div>
            </div>
            <div className="mt-4 space-y-1">
              <div className="flex justify-between items-center text-sm">
                <span className="text-surface-500">Completion rate</span>
                <span className="font-medium text-surface-900">{learningStats.averageCompletion}%</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-surface-500">Engagement score</span>
                <span className="font-medium text-surface-900">{learningStats.averageEngagement}%</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-surface-500">Certificates issued</span>
                <span className="font-medium text-surface-900">{learningStats.certificatesIssued.toLocaleString()}</span>
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
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-surface-900">Course Enrollments</h2>
              <div className="flex space-x-2">
                <button onClick={() => setEnrollmentTimeRange('daily')} className={toggleButtonClass(enrollmentTimeRange === 'daily')}>Daily</button>
                <button onClick={() => setEnrollmentTimeRange('monthly')} className={toggleButtonClass(enrollmentTimeRange === 'monthly')}>Monthly</button>
                <button onClick={() => setEnrollmentTimeRange('quarterly')} className={toggleButtonClass(enrollmentTimeRange === 'quarterly')}>Quarterly</button>
                <button onClick={() => setEnrollmentTimeRange('yearly')} className={toggleButtonClass(enrollmentTimeRange === 'yearly')}>Yearly</button>
              </div>
            </div>
            <div className="h-72">
              <Bar ref={chartRef} data={enrollmentChartData} options={enrollmentChartOptions} />
            </div>
          </motion.div>

          <motion.div 
            className="card border border-surface-200 rounded-xl shadow-card p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-surface-900">Revenue vs Expenses</h2>
              <div className="flex space-x-2">
                <button onClick={() => setTimeRange('weekly')} className={toggleButtonClass(timeRange === 'weekly')}>Weekly</button>
                <button onClick={() => setTimeRange('monthly')} className={toggleButtonClass(timeRange === 'monthly')}>Monthly</button>
                <button onClick={() => setTimeRange('quarterly')} className={toggleButtonClass(timeRange === 'quarterly')}>Quarterly</button>
              </div>
            </div>
            <div className="h-72">
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
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-surface-900">Revenue Breakdown</h2>
              <div className="flex space-x-2">
                <button onClick={() => setRevenueBreakdownType('courseTypes')} className={toggleButtonClass(revenueBreakdownType === 'courseTypes')}>Course Types</button>
                <button onClick={() => setRevenueBreakdownType('subscriptionTiers')} className={toggleButtonClass(revenueBreakdownType === 'subscriptionTiers')}>Subscriptions</button>
                <button onClick={() => setRevenueBreakdownType('geographicalRegions')} className={toggleButtonClass(revenueBreakdownType === 'geographicalRegions')}>Regions</button>
              </div>
            </div>
            <div className="h-72">
              <Pie data={revenueBreakdownData} options={revenueBreakdownOptions} />
            </div>
          </motion.div>

          <motion.div 
            className="card border border-surface-200 rounded-xl shadow-card p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-surface-900">Expense Categories</h2>
              <div className="text-sm text-surface-500">
                Total: {formatCurrency(expenseCategories.reduce((sum, item) => sum + item.value, 0))}
              </div>
            </div>
            <div className="h-72">
              <Doughnut data={expenseDoughnutData} options={expenseDoughnutOptions} />
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
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-surface-900">Cash Flow Analysis</h2>
              <div className="flex space-x-2">
                <button onClick={() => setCashFlowTimeRange('monthly')} className={toggleButtonClass(cashFlowTimeRange === 'monthly')}>Monthly</button>
                <button onClick={() => setCashFlowTimeRange('quarterly')} className={toggleButtonClass(cashFlowTimeRange === 'quarterly')}>Quarterly</button>
              </div>
            </div>
            <div className="h-72">
              <Line data={cashFlowChartData} options={cashFlowChartOptions} />
            </div>
          </motion.div>

          <motion.div 
            className="card border border-surface-200 rounded-xl shadow-card p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-surface-900">Forecast Analysis</h2>
              <div className="flex space-x-2">
                <button onClick={() => setSelectedForecastMetric('revenue')} className={toggleButtonClass(selectedForecastMetric === 'revenue')}>Revenue</button>
                <button onClick={() => setSelectedForecastMetric('enrollments')} className={toggleButtonClass(selectedForecastMetric === 'enrollments')}>Enrollments</button>
                <button onClick={() => setSelectedForecastMetric('expenses')} className={toggleButtonClass(selectedForecastMetric === 'expenses')}>Expenses</button>
              </div>
            </div>
            <div className="h-72">
              <Line data={forecastChartData} options={forecastChartOptions} />
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
          <motion.div 
            className="card border border-surface-200 rounded-xl shadow-card p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-lg font-medium text-surface-900 mb-4">Marketing Channel Performance</h2>
            <div className="h-64">
              <Radar data={marketingRadarData} options={marketingRadarOptions} />
            </div>
            <div className="mt-4">
              <table className="min-w-full divide-y divide-surface-200">
                <thead>
                  <tr>
                    <th className="bg-surface-50 px-3 py-2 text-left text-xs font-semibold text-surface-500 uppercase tracking-wide">Channel</th>
                    <th className="bg-surface-50 px-3 py-2 text-right text-xs font-semibold text-surface-500 uppercase tracking-wide">Students</th>
                    <th className="bg-surface-50 px-3 py-2 text-right text-xs font-semibold text-surface-500 uppercase tracking-wide">CPA</th>
                    <th className="bg-surface-50 px-3 py-2 text-right text-xs font-semibold text-surface-500 uppercase tracking-wide">ROI</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-100">
                  {marketingChannelStats.channels.map((channel) => (
                    <tr key={channel.id} className="hover:bg-surface-50 transition-colors">
                      <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-surface-900">{channel.name}</td>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-right text-surface-700">{channel.students.toLocaleString()}</td>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-right text-surface-700">${channel.cpa.toFixed(2)}</td>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-right text-surface-700">{channel.roi}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          <motion.div 
            className="card border border-surface-200 rounded-xl shadow-card p-6 xl:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-surface-900">Financial Metrics</h2>
              <button
                onClick={() => setIsFinancialMetricsExpanded(!isFinancialMetricsExpanded)}
                className="text-brand-600 hover:text-brand-700 transition-colors"
              >
                {isFinancialMetricsExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </button>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-emerald-50 p-4 rounded-lg">
                <h3 className="text-xs font-medium text-emerald-700 uppercase mb-2 flex items-center">
                  <PieChart className="inline h-4 w-4 mr-1" />
                  Profitability
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between" onMouseEnter={(e) => handleMetricHover('grossMargin', 'Gross Profit Margin', 'Revenue minus cost of goods sold, divided by revenue', e.clientX, e.clientY)} onMouseLeave={handleMetricLeave}>
                    <span className="text-sm text-surface-600">Gross Margin</span>
                    <span className="text-sm font-medium text-surface-900">{financialMetrics.profitabilityRatios.grossProfitMargin}%</span>
                  </div>
                  <div className="flex justify-between" onMouseEnter={(e) => handleMetricHover('operatingMargin', 'Operating Profit Margin', 'Operating income divided by revenue', e.clientX, e.clientY)} onMouseLeave={handleMetricLeave}>
                    <span className="text-sm text-surface-600">Operating Margin</span>
                    <span className="text-sm font-medium text-surface-900">{financialMetrics.profitabilityRatios.operatingProfitMargin}%</span>
                  </div>
                  <div className="flex justify-between" onMouseEnter={(e) => handleMetricHover('netMargin', 'Net Profit Margin', 'Net income divided by revenue', e.clientX, e.clientY)} onMouseLeave={handleMetricLeave}>
                    <span className="text-sm text-surface-600">Net Margin</span>
                    <span className="text-sm font-medium text-surface-900">{financialMetrics.profitabilityRatios.netProfitMargin}%</span>
                  </div>
                </div>
              </div>

              <div className="bg-emerald-50 p-4 rounded-lg">
                <h3 className="text-xs font-medium text-emerald-700 uppercase mb-2 flex items-center">
                  <BarChart className="inline h-4 w-4 mr-1" />
                  SaaS Metrics
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between" onMouseEnter={(e) => handleMetricHover('ltv', 'Lifetime Value', 'The predicted revenue a customer will generate over their lifetime', e.clientX, e.clientY)} onMouseLeave={handleMetricLeave}>
                    <span className="text-sm text-surface-600">LTV</span>
                    <span className="text-sm font-medium text-surface-900">${revenueStats.ltv}</span>
                  </div>
                  <div className="flex justify-between" onMouseEnter={(e) => handleMetricHover('cac', 'Customer Acquisition Cost', 'The cost associated with acquiring a new customer', e.clientX, e.clientY)} onMouseLeave={handleMetricLeave}>
                    <span className="text-sm text-surface-600">CAC</span>
                    <span className="text-sm font-medium text-surface-900">${revenueStats.cac}</span>
                  </div>
                  <div className="flex justify-between" onMouseEnter={(e) => handleMetricHover('churnRate', 'Churn Rate', 'The percentage of customers who stop using your service over a given time period', e.clientX, e.clientY)} onMouseLeave={handleMetricLeave}>
                    <span className="text-sm text-surface-600">Churn Rate</span>
                    <span className="text-sm font-medium text-surface-900">{revenueStats.churnRate}%</span>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="text-xs font-medium text-purple-700 uppercase mb-2 flex items-center">
                  <TrendingUp className="inline h-4 w-4 mr-1" />
                  Returns
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between" onMouseEnter={(e) => handleMetricHover('roa', 'Return on Assets', 'Net income divided by total assets', e.clientX, e.clientY)} onMouseLeave={handleMetricLeave}>
                    <span className="text-sm text-surface-600">ROA</span>
                    <span className="text-sm font-medium text-surface-900">{financialMetrics.profitabilityRatios.returnOnAssets}%</span>
                  </div>
                  <div className="flex justify-between" onMouseEnter={(e) => handleMetricHover('roe', 'Return on Equity', "Net income divided by shareholders' equity", e.clientX, e.clientY)} onMouseLeave={handleMetricLeave}>
                    <span className="text-sm text-surface-600">ROE</span>
                    <span className="text-sm font-medium text-surface-900">{financialMetrics.profitabilityRatios.returnOnEquity}%</span>
                  </div>
                  <div className="flex justify-between" onMouseEnter={(e) => handleMetricHover('roi', 'Return on Investment', 'Gain from investment minus cost of investment, divided by cost of investment', e.clientX, e.clientY)} onMouseLeave={handleMetricLeave}>
                    <span className="text-sm text-surface-600">ROI</span>
                    <span className="text-sm font-medium text-surface-900">{financialMetrics.profitabilityRatios.returnOnInvestment}%</span>
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 p-4 rounded-lg">
                <h3 className="text-xs font-medium text-amber-700 uppercase mb-2 flex items-center">
                  <Activity className="inline h-4 w-4 mr-1" />
                  Liquidity
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between" onMouseEnter={(e) => handleMetricHover('currentRatio', 'Current Ratio', 'Current assets divided by current liabilities', e.clientX, e.clientY)} onMouseLeave={handleMetricLeave}>
                    <span className="text-sm text-surface-600">Current Ratio</span>
                    <span className="text-sm font-medium text-surface-900">{financialMetrics.liquidityRatios.currentRatio}</span>
                  </div>
                  <div className="flex justify-between" onMouseEnter={(e) => handleMetricHover('quickRatio', 'Quick Ratio', 'Current assets minus inventory, divided by current liabilities', e.clientX, e.clientY)} onMouseLeave={handleMetricLeave}>
                    <span className="text-sm text-surface-600">Quick Ratio</span>
                    <span className="text-sm font-medium text-surface-900">{financialMetrics.liquidityRatios.quickRatio}</span>
                  </div>
                  <div className="flex justify-between" onMouseEnter={(e) => handleMetricHover('cashRatio', 'Cash Ratio', 'Cash and cash equivalents divided by current liabilities', e.clientX, e.clientY)} onMouseLeave={handleMetricLeave}>
                    <span className="text-sm text-surface-600">Cash Ratio</span>
                    <span className="text-sm font-medium text-surface-900">{financialMetrics.liquidityRatios.cashRatio}</span>
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
                <div className="bg-surface-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-surface-700 mb-3">Financial Performance vs. Industry</h3>
                  <div className="h-64">
                    <Radar data={financialRadarData} options={financialRadarOptions} />
                  </div>
                </div>
                <div className="bg-surface-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-surface-700 mb-3">Valuation Metrics</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-surface-600">Enterprise Value</span>
                      <span className="text-sm font-medium text-surface-900">{formatCurrency(financialMetrics.valuationMultiples.enterpriseValue)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-surface-600">EV/Revenue</span>
                      <span className="text-sm font-medium text-surface-900">{financialMetrics.valuationMultiples.evToRevenue}x</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-surface-600">EV/EBITDA</span>
                      <span className="text-sm font-medium text-surface-900">{financialMetrics.valuationMultiples.evToEbitda}x</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-surface-600">P/E Ratio</span>
                      <span className="text-sm font-medium text-surface-900">{financialMetrics.valuationMultiples.priceToEarnings}x</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-surface-600">P/S Ratio</span>
                      <span className="text-sm font-medium text-surface-900">{financialMetrics.valuationMultiples.priceToSales}x</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-surface-600">Revenue per Employee</span>
                      <span className="text-sm font-medium text-surface-900">{formatCurrency(financialMetrics.operatingMetrics.revenuePerEmployee)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-surface-600">Profit per Employee</span>
                      <span className="text-sm font-medium text-surface-900">{formatCurrency(financialMetrics.operatingMetrics.profitPerEmployee)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-surface-600">Operating Expense Ratio</span>
                      <span className="text-sm font-medium text-surface-900">{financialMetrics.operatingMetrics.operatingExpenseRatio}%</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>

        <motion.div 
          className="card border border-surface-200 rounded-xl shadow-card mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-surface-900">Quarterly Financial Performance</h2>
              <button onClick={() => setIsQuarterlyFinancialsExpanded(!isQuarterlyFinancialsExpanded)} className="text-brand-600 hover:text-brand-700 transition-colors">
                {isQuarterlyFinancialsExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-surface-200">
                <thead>
                  <tr>
                    <th className="bg-surface-50 px-3 py-3.5 text-left text-xs font-semibold text-surface-500 uppercase tracking-wide">Quarter</th>
                    <th className="bg-surface-50 px-3 py-3.5 text-right text-xs font-semibold text-surface-500 uppercase tracking-wide">Revenue</th>
                    <th className="bg-surface-50 px-3 py-3.5 text-right text-xs font-semibold text-surface-500 uppercase tracking-wide">Expenses</th>
                    <th className="bg-surface-50 px-3 py-3.5 text-right text-xs font-semibold text-surface-500 uppercase tracking-wide">Profit</th>
                    <th className="bg-surface-50 px-3 py-3.5 text-right text-xs font-semibold text-surface-500 uppercase tracking-wide">Margin</th>
                    <th className="bg-surface-50 px-3 py-3.5 text-right text-xs font-semibold text-surface-500 uppercase tracking-wide">New Students</th>
                    <th className="bg-surface-50 px-3 py-3.5 text-right text-xs font-semibold text-surface-500 uppercase tracking-wide">New Courses</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-100">
                  {quarterlyFinancials.map((quarter, index) => (
                    <tr key={index} className={`hover:bg-surface-50 transition-colors ${index === quarterlyFinancials.length - 1 ? "bg-emerald-50/50" : ""}`}>
                      <td className="whitespace-nowrap px-3 py-4 text-sm font-medium text-surface-900">{quarter.quarter}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-surface-700">{formatCurrency(quarter.revenue)}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-surface-700">{formatCurrency(quarter.expenses)}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-surface-700">{formatCurrency(quarter.profit)}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-surface-700">{quarter.margin}%</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-surface-700">{quarter.studentAcquisition.toLocaleString()}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-surface-700">{quarter.courseReleases}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {isQuarterlyFinancialsExpanded && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }} className="mt-6">
                <div className="bg-surface-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-surface-700 mb-4">Quarter-over-Quarter Growth</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-surface-100">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="rounded-full bg-emerald-100 p-2"><TrendingUp className="h-5 w-5 text-emerald-600" /></div>
                          <div className="ml-3"><p className="text-sm font-medium text-surface-700">Revenue Growth</p><p className="text-lg font-semibold text-surface-900">6.7%</p></div>
                        </div>
                        <div className="text-emerald-600 flex items-center"><ArrowUpRight className="h-4 w-4" /><span className="text-xs font-medium ml-1">+0.9%</span></div>
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-surface-100">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="rounded-full bg-emerald-100 p-2"><Users className="h-5 w-5 text-emerald-600" /></div>
                          <div className="ml-3"><p className="text-sm font-medium text-surface-700">Student Growth</p><p className="text-lg font-semibold text-surface-900">7.3%</p></div>
                        </div>
                        <div className="text-emerald-600 flex items-center"><ArrowUpRight className="h-4 w-4" /><span className="text-xs font-medium ml-1">+0.5%</span></div>
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-surface-100">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="rounded-full bg-purple-100 p-2"><Percent className="h-5 w-5 text-purple-600" /></div>
                          <div className="ml-3"><p className="text-sm font-medium text-surface-700">Margin Improvement</p><p className="text-lg font-semibold text-surface-900">0.5%</p></div>
                        </div>
                        <div className="text-emerald-600 flex items-center"><ArrowUpRight className="h-4 w-4" /><span className="text-xs font-medium ml-1">+0.1%</span></div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        <motion.div 
          className="card border border-surface-200 rounded-xl shadow-card mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-surface-900">Course ROI Analysis</h2>
              <button onClick={() => setIsCourseROIExpanded(!isCourseROIExpanded)} className="text-brand-600 hover:text-brand-700 transition-colors">
                {isCourseROIExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-surface-200">
                <thead>
                  <tr>
                    <th className="bg-surface-50 px-3 py-3.5 text-left text-xs font-semibold text-surface-500 uppercase tracking-wide">Course Name</th>
                    <th className="bg-surface-50 px-3 py-3.5 text-right text-xs font-semibold text-surface-500 uppercase tracking-wide">Development Cost</th>
                    <th className="bg-surface-50 px-3 py-3.5 text-right text-xs font-semibold text-surface-500 uppercase tracking-wide">Marketing Cost</th>
                    <th className="bg-surface-50 px-3 py-3.5 text-right text-xs font-semibold text-surface-500 uppercase tracking-wide">Total Revenue</th>
                    <th className="bg-surface-50 px-3 py-3.5 text-right text-xs font-semibold text-surface-500 uppercase tracking-wide">ROI</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-100">
                  {courseROIData.map((course, index) => (
                    <tr key={index} className="hover:bg-surface-50 transition-colors">
                      <td className="whitespace-nowrap px-3 py-4 text-sm font-medium text-surface-900">{course.name}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-surface-700">{formatCurrency(course.development)}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-surface-700">{formatCurrency(course.marketing)}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-surface-700">{formatCurrency(course.revenue)}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-surface-700">{course.roi}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {isCourseROIExpanded && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }} className="mt-6">
                <div className="bg-surface-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-surface-700 mb-4">ROI Performance Analysis</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-surface-100">
                      <h4 className="text-sm font-medium text-surface-700 mb-2">Investment Efficiency</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-surface-600">Average ROI</span>
                          <span className="text-sm font-medium text-surface-900">{(courseROIData.reduce((sum, course) => sum + course.roi, 0) / courseROIData.length).toFixed(1)}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-surface-600">Total Investment</span>
                          <span className="text-sm font-medium text-surface-900">{formatCurrency(courseROIData.reduce((sum, course) => sum + course.development + course.marketing, 0))}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-surface-600">Total Return</span>
                          <span className="text-sm font-medium text-surface-900">{formatCurrency(courseROIData.reduce((sum, course) => sum + course.revenue, 0))}</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-surface-100">
                      <h4 className="text-sm font-medium text-surface-700 mb-2">Performance Trends</h4>
                      <div className="h-32">
                        <Line
                          data={{
                            labels: courseROIData.map(course => course.name.split(' ').slice(0, 2).join(' ')),
                            datasets: [{
                              label: 'ROI %',
                              data: courseROIData.map(course => course.roi),
                              borderColor: 'rgb(16, 185, 129)',
                              backgroundColor: 'rgba(16, 185, 129, 0.1)',
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
        </motion.div>

        <motion.div 
          className="card border border-surface-200 rounded-xl shadow-card mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-surface-900">Top Performing Courses</h2>
              <button onClick={() => setIsTopCoursesExpanded(!isTopCoursesExpanded)} className="text-brand-600 hover:text-brand-700 transition-colors">
                {isTopCoursesExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-surface-200">
                <thead>
                  <tr>
                    <th className="bg-surface-50 px-3 py-3.5 text-left text-xs font-semibold text-surface-500 uppercase tracking-wide">Course Name</th>
                    <th className="bg-surface-50 px-3 py-3.5 text-right text-xs font-semibold text-surface-500 uppercase tracking-wide">Enrollments</th>
                    <th className="bg-surface-50 px-3 py-3.5 text-right text-xs font-semibold text-surface-500 uppercase tracking-wide">Revenue</th>
                    <th className="bg-surface-50 px-3 py-3.5 text-right text-xs font-semibold text-surface-500 uppercase tracking-wide">Rating</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-100">
                  {topCourses.map((course) => (
                    <tr key={course.id} className="hover:bg-surface-50 transition-colors">
                      <td className="whitespace-nowrap px-3 py-4 text-sm font-medium text-surface-900">{course.name}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-surface-700">{course.enrollments.toLocaleString()}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-surface-700">{formatCurrency(course.revenue)}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-surface-700">
                        <div className="flex items-center justify-end">{course.rating}<Star className="h-4 w-4 text-amber-400 ml-1" /></div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {isTopCoursesExpanded && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }} className="mt-6">
                <div className="bg-surface-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-surface-700 mb-4">Course Performance Metrics</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-surface-100">
                      <div className="flex items-center"><Users className="h-5 w-5 text-emerald-600 mr-2" /><div><p className="text-sm text-surface-600">Total Enrollments</p><p className="text-lg font-semibold text-surface-900">{topCourses.reduce((sum, c) => sum + c.enrollments, 0).toLocaleString()}</p></div></div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-surface-100">
                      <div className="flex items-center"><DollarSign className="h-5 w-5 text-emerald-600 mr-2" /><div><p className="text-sm text-surface-600">Total Revenue</p><p className="text-lg font-semibold text-surface-900">{formatCurrency(topCourses.reduce((sum, c) => sum + c.revenue, 0))}</p></div></div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-surface-100">
                      <div className="flex items-center"><Star className="h-5 w-5 text-amber-400 mr-2" /><div><p className="text-sm text-surface-600">Average Rating</p><p className="text-lg font-semibold text-surface-900">{(topCourses.reduce((sum, c) => sum + c.rating, 0) / topCourses.length).toFixed(1)}</p></div></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        <motion.div 
          className="card border border-surface-200 rounded-xl shadow-card mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-surface-900">Top Instructors</h2>
              <button onClick={() => setIsTopInstructorsExpanded(!isTopInstructorsExpanded)} className="text-brand-600 hover:text-brand-700 transition-colors">
                {isTopInstructorsExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-surface-200">
                <thead>
                  <tr>
                    <th className="bg-surface-50 px-3 py-3.5 text-left text-xs font-semibold text-surface-500 uppercase tracking-wide">Instructor</th>
                    <th className="bg-surface-50 px-3 py-3.5 text-right text-xs font-semibold text-surface-500 uppercase tracking-wide">Courses</th>
                    <th className="bg-surface-50 px-3 py-3.5 text-right text-xs font-semibold text-surface-500 uppercase tracking-wide">Students</th>
                    <th className="bg-surface-50 px-3 py-3.5 text-right text-xs font-semibold text-surface-500 uppercase tracking-wide">Revenue</th>
                    <th className="bg-surface-50 px-3 py-3.5 text-right text-xs font-semibold text-surface-500 uppercase tracking-wide">Rating</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-100">
                  {topInstructors.map((instructor) => (
                    <tr key={instructor.id} className="hover:bg-surface-50 transition-colors">
                      <td className="whitespace-nowrap px-3 py-4 text-sm font-medium text-surface-900">{instructor.name}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-surface-700">{instructor.courses}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-surface-700">{instructor.students.toLocaleString()}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-surface-700">{formatCurrency(instructor.revenue)}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-surface-700">
                        <div className="flex items-center justify-end">{instructor.rating}<Star className="h-4 w-4 text-amber-400 ml-1" /></div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {isTopInstructorsExpanded && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }} className="mt-6">
                <div className="bg-surface-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-surface-700 mb-4">Instructor Impact Analysis</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-surface-100">
                      <div className="flex items-center"><BookOpen className="h-5 w-5 text-emerald-600 mr-2" /><div><p className="text-sm text-surface-600">Total Courses</p><p className="text-lg font-semibold text-surface-900">{topInstructors.reduce((sum, i) => sum + i.courses, 0)}</p></div></div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-surface-100">
                      <div className="flex items-center"><Users className="h-5 w-5 text-emerald-600 mr-2" /><div><p className="text-sm text-surface-600">Total Students</p><p className="text-lg font-semibold text-surface-900">{topInstructors.reduce((sum, i) => sum + i.students, 0).toLocaleString()}</p></div></div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-surface-100">
                      <div className="flex items-center"><DollarSign className="h-5 w-5 text-purple-600 mr-2" /><div><p className="text-sm text-surface-600">Total Revenue</p><p className="text-lg font-semibold text-surface-900">{formatCurrency(topInstructors.reduce((sum, i) => sum + i.revenue, 0))}</p></div></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        <motion.div 
          className="card border border-surface-200 rounded-xl shadow-card mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-surface-900">Recent Enrollments</h2>
              <button onClick={() => setIsRecentEnrollmentsExpanded(!isRecentEnrollmentsExpanded)} className="text-brand-600 hover:text-brand-700 transition-colors">
                {isRecentEnrollmentsExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </button>
            </div>
            {isRecentEnrollmentsExpanded && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }}>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-surface-200">
                    <thead>
                      <tr>
                        <th className="bg-surface-50 px-3 py-3.5 text-left text-xs font-semibold text-surface-500 uppercase tracking-wide">Enrollment ID</th>
                        <th className="bg-surface-50 px-3 py-3.5 text-left text-xs font-semibold text-surface-500 uppercase tracking-wide">Student</th>
                        <th className="bg-surface-50 px-3 py-3.5 text-left text-xs font-semibold text-surface-500 uppercase tracking-wide">Course</th>
                        <th className="bg-surface-50 px-3 py-3.5 text-left text-xs font-semibold text-surface-500 uppercase tracking-wide">Date</th>
                        <th className="bg-surface-50 px-3 py-3.5 text-right text-xs font-semibold text-surface-500 uppercase tracking-wide">Amount</th>
                        <th className="bg-surface-50 px-3 py-3.5 text-right text-xs font-semibold text-surface-500 uppercase tracking-wide">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-surface-100">
                      {recentEnrollments.map((enrollment) => (
                        <tr key={enrollment.id} className="hover:bg-surface-50 transition-colors">
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-surface-700">{enrollment.id}</td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm font-medium text-surface-900">{enrollment.student}</td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-surface-700">{enrollment.course}</td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-surface-700">{convertDateFormat(enrollment.date)}</td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-surface-700">{formatCurrency(enrollment.amount)}</td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-right">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(enrollment.status)}`}>{enrollment.status}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        <motion.div 
          className="card border border-surface-200 rounded-xl shadow-card mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-surface-900">Video Engagement Statistics</h2>
              <button onClick={() => setIsVideoStatsExpanded(!isVideoStatsExpanded)} className="text-brand-600 hover:text-brand-700 transition-colors">
                {isVideoStatsExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </button>
            </div>
            {isVideoStatsExpanded && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }}>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-surface-200">
                    <thead>
                      <tr>
                        <th className="bg-surface-50 px-3 py-3.5 text-left text-xs font-semibold text-surface-500 uppercase tracking-wide">Video Title</th>
                        <th className="bg-surface-50 px-3 py-3.5 text-right text-xs font-semibold text-surface-500 uppercase tracking-wide">Duration</th>
                        <th className="bg-surface-50 px-3 py-3.5 text-right text-xs font-semibold text-surface-500 uppercase tracking-wide">Views</th>
                        <th className="bg-surface-50 px-3 py-3.5 text-right text-xs font-semibold text-surface-500 uppercase tracking-wide">Completion</th>
                        <th className="bg-surface-50 px-3 py-3.5 text-right text-xs font-semibold text-surface-500 uppercase tracking-wide">Questions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-surface-100">
                      {videoEngagementStats.map((video) => (
                        <tr key={video.id} className="hover:bg-surface-50 transition-colors">
                          <td className="whitespace-nowrap px-3 py-4 text-sm font-medium text-surface-900">{video.title}</td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-surface-700">{video.duration}</td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-surface-700">{video.views.toLocaleString()}</td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-surface-700">{video.completion}%</td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-surface-700">{video.questions}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-6 bg-surface-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-surface-700 mb-4">Engagement Metrics</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-surface-100">
                      <div className="flex items-center"><Eye className="h-5 w-5 text-emerald-600 mr-2" /><div><p className="text-sm text-surface-600">Total Views</p><p className="text-lg font-semibold text-surface-900">{videoEngagementStats.reduce((sum, v) => sum + v.views, 0).toLocaleString()}</p></div></div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-surface-100">
                      <div className="flex items-center"><PlayCircle className="h-5 w-5 text-emerald-600 mr-2" /><div><p className="text-sm text-surface-600">Avg. Completion</p><p className="text-lg font-semibold text-surface-900">{(videoEngagementStats.reduce((sum, v) => sum + v.completion, 0) / videoEngagementStats.length).toFixed(1)}%</p></div></div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-surface-100">
                      <div className="flex items-center"><MessageSquare className="h-5 w-5 text-purple-600 mr-2" /><div><p className="text-sm text-surface-600">Total Questions</p><p className="text-lg font-semibold text-surface-900">{videoEngagementStats.reduce((sum, v) => sum + v.questions, 0)}</p></div></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        <motion.div 
          className="card border border-surface-200 rounded-xl shadow-card mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="p-6">
            <h2 className="text-lg font-medium text-surface-900 mb-4">Promotions Analysis</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-surface-200">
                <thead>
                  <tr>
                    <th className="bg-surface-50 px-3 py-3.5 text-left text-xs font-semibold text-surface-500 uppercase tracking-wide">Promo Code</th>
                    <th className="bg-surface-50 px-3 py-3.5 text-right text-xs font-semibold text-surface-500 uppercase tracking-wide">Uses</th>
                    <th className="bg-surface-50 px-3 py-3.5 text-right text-xs font-semibold text-surface-500 uppercase tracking-wide">Discount</th>
                    <th className="bg-surface-50 px-3 py-3.5 text-right text-xs font-semibold text-surface-500 uppercase tracking-wide">Revenue Impact</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-100">
                  {promotions.map((promo, index) => (
                    <tr key={index} className="hover:bg-surface-50 transition-colors">
                      <td className="whitespace-nowrap px-3 py-4 text-sm font-medium text-surface-900">{promo.code}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-surface-700">{promo.uses.toLocaleString()}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-surface-700">{promo.discount}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-surface-700">{formatCurrency(promo.revenue)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-6 bg-surface-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-surface-700 mb-4">Promotion Effectiveness</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-sm border border-surface-100">
                  <div className="flex items-center"><Tag className="h-5 w-5 text-emerald-600 mr-2" /><div><p className="text-sm text-surface-600">Total Uses</p><p className="text-lg font-semibold text-surface-900">{promotions.reduce((sum, p) => sum + p.uses, 0).toLocaleString()}</p></div></div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border border-surface-100">
                  <div className="flex items-center"><DollarSign className="h-5 w-5 text-emerald-600 mr-2" /><div><p className="text-sm text-surface-600">Total Revenue Impact</p><p className="text-lg font-semibold text-surface-900">{formatCurrency(promotions.reduce((sum, p) => sum + p.revenue, 0))}</p></div></div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {showFinancialTooltip && tooltipMetric && (
          <div
            className="fixed bg-surface-900 text-white text-sm rounded-lg p-3 shadow-lg z-50 max-w-xs"
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
