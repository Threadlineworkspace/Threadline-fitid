// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { 
//   Users, 
//   TrendingUp, 
//   Mail, 
//   Download, 
//   Search, 
//   LogOut,
//   RefreshCw,
//   Filter,
//   ChevronLeft,
//   ChevronRight,
//   Eye,
//   UserCircle,
//   Calendar,
//   BarChart3,
//   Sparkles,
//   Shield,
//   ArrowUp,
//   ArrowDown,
//   Activity,
//   Clock
// } from 'lucide-react';
// import { adminApi } from '../services/api';
// import { toast } from 'sonner';

// export const AdminDashboard = () => {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);
//   const [stats, setStats] = useState(null);
//   const [users, setUsers] = useState([]);
//   const [pagination, setPagination] = useState({ page: 1, total: 0, pages: 1 });
//   const [filters, setFilters] = useState({ search: '', fitId: '', country: '' });
//   const [exporting, setExporting] = useState(false);
//   const [refreshing, setRefreshing] = useState(false);

//   const token = localStorage.getItem('adminToken');
//   const adminEmail = localStorage.getItem('adminEmail');
//   const adminRole = localStorage.getItem('adminRole');

//   // Redirect if no token
//   useEffect(() => {
//     if (!token) {
//       navigate('/admin/login');
//     }
//   }, [token, navigate]);

//   // Fetch data
//   const fetchData = async () => {
//     if (!token) return;
    
//     setLoading(true);
//     try {
//       const headers = { Authorization: `Bearer ${token}` };
      
//       const [statsRes, usersRes] = await Promise.all([
//         adminApi.getStats(),
//         adminApi.getUsers({ 
//           page: pagination.page, 
//           limit: 20,
//           ...filters 
//         })
//       ]);

//       setStats(statsRes.data.data);
//       setUsers(usersRes.data.data.users);
//       setPagination(usersRes.data.data.pagination);
//     } catch (error) {
//       if (error.response?.status === 401) {
//         localStorage.removeItem('adminToken');
//         localStorage.removeItem('adminEmail');
//         localStorage.removeItem('adminRole');
//         navigate('/admin/login');
//         toast.error('Session expired. Please login again.');
//       } else {
//         toast.error('Failed to fetch data');
//       }
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, [pagination.page, filters]);

//   // Handle refresh
//   const handleRefresh = () => {
//     setRefreshing(true);
//     fetchData();
//   };

//   // Handle search with debounce
//   const handleSearch = (value) => {
//     setFilters(prev => ({ ...prev, search: value }));
//     setPagination(prev => ({ ...prev, page: 1 }));
//   };

//   // Handle filter change
//   const handleFilterChange = (key, value) => {
//     setFilters(prev => ({ ...prev, [key]: value }));
//     setPagination(prev => ({ ...prev, page: 1 }));
//   };

//   // Handle logout
//   const handleLogout = () => {
//     localStorage.removeItem('adminToken');
//     localStorage.removeItem('adminEmail');
//     localStorage.removeItem('adminRole');
//     navigate('/admin/login');
//     toast.success('Logged out successfully');
//   };

//   // Handle CSV export
//   const handleExport = async () => {
//     setExporting(true);
//     try {
//       const response = await adminApi.exportCSV(filters);
      
//       const url = window.URL.createObjectURL(new Blob([response.data]));
//       const link = document.createElement('a');
//       link.href = url;
//       link.setAttribute('download', `threadline-users-${new Date().toISOString().split('T')[0]}.csv`);
//       document.body.appendChild(link);
//       link.click();
//       link.remove();
      
//       toast.success('Export successful!');
//     } catch (error) {
//       toast.error('Failed to export data');
//     } finally {
//       setExporting(false);
//     }
//   };

//   const getFitIdBadge = (fitId) => {
//     const styles = {
//       'Lift': { bg: 'bg-orange-100', text: 'text-orange-800', border: 'border-orange-200', icon: '🦾' },
//       'Triangle': { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-200', icon: '🔺' },
//       'Rectangle': { bg: 'bg-emerald-100', text: 'text-emerald-800', border: 'border-emerald-200', icon: '▬' },
//     };
//     const style = styles[fitId] || styles['Rectangle'];
//     return (
//       <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${style.bg} ${style.text} ${style.border} border`}>
//         <span>{style.icon}</span>
//         {fitId}
//       </span>
//     );
//   };

//   const getEmailStatusBadge = (status) => {
//     const styles = {
//       'SENT': { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-200', icon: '✓' },
//       'FAILED': { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-200', icon: '✗' },
//       'PENDING': { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-200', icon: '…' },
//     };
//     const style = styles[status] || styles['PENDING'];
//     return (
//       <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${style.bg} ${style.text} ${style.border} border`}>
//         {style.icon}
//         {status}
//       </span>
//     );
//   };

//   if (loading && !stats) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-[#F5F2EA]">
//         <div className="flex flex-col items-center gap-4">
//           <div className="w-12 h-12 border-4 border-[#C76A32] border-t-transparent rounded-full animate-spin" />
//           <span className="text-[#5C5B77] font-medium">Loading dashboard...</span>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#F5F2EA]">
//       {/* Header */}
//       <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
//         <div className="container mx-auto px-4 py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-4">
//               <div className="flex items-center gap-2">
//                 <div className="w-10 h-10 bg-[#323352] rounded-xl flex items-center justify-center">
//                   <Shield className="w-5 h-5 text-white" />
//                 </div>
//                 <div>
//                   <h1 className="text-xl font-bold text-[#323352] font-heading">Threadline Admin</h1>
//                   <span className="text-xs text-[#5C5B77]">Dashboard</span>
//                 </div>
//               </div>
//               <div className="hidden md:flex items-center gap-2">
//                 <span className="px-3 py-1 bg-[#C76A32]/10 text-[#C76A32] text-xs font-semibold rounded-full">
//                   {adminRole || 'Admin'}
//                 </span>
//               </div>
//             </div>
            
//             <div className="flex items-center gap-4">
//               <span className="text-sm text-[#5C5B77] hidden md:block">
//                 {adminEmail}
//               </span>
//               <button
//                 onClick={handleRefresh}
//                 className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
//                 disabled={refreshing}
//               >
//                 <RefreshCw className={`w-5 h-5 text-[#5C5B77] ${refreshing ? 'animate-spin' : ''}`} />
//               </button>
//               <button
//                 onClick={handleLogout}
//                 className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-colors text-sm font-medium"
//               >
//                 <LogOut className="w-4 h-4" />
//                 <span className="hidden sm:inline">Logout</span>
//               </button>
//             </div>
//           </div>
//         </div>
//       </header>

//       <main className="container mx-auto px-4 py-8">
//         {/* Stats Cards */}
//         {stats && (
//           <motion.div 
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
//           >
//             <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
//               <div className="flex items-center justify-between mb-4">
//                 <div className="p-3 bg-[#323352]/10 rounded-xl">
//                   <Users className="w-6 h-6 text-[#323352]" />
//                 </div>
//                 <span className="text-xs text-[#5C5B77] font-medium">Total</span>
//               </div>
//               <div className="flex items-end justify-between">
//                 <div>
//                   <p className="text-3xl font-bold text-[#323352]">{stats.total}</p>
//                   <p className="text-sm text-[#5C5B77]">All time submissions</p>
//                 </div>
//                 <div className="flex items-center gap-1 text-sm text-emerald-600">
//                   <ArrowUp className="w-4 h-4" />
//                   <span>12%</span>
//                 </div>
//               </div>
//             </div>

//             <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
//               <div className="flex items-center justify-between mb-4">
//                 <div className="p-3 bg-orange-100 rounded-xl">
//                   <TrendingUp className="w-6 h-6 text-orange-600" />
//                 </div>
//                 <span className="text-xs text-[#5C5B77] font-medium">Lift</span>
//               </div>
//               <div className="flex items-end justify-between">
//                 <div>
//                   <p className="text-3xl font-bold text-orange-600">{stats.lift}</p>
//                   <p className="text-sm text-[#5C5B77]">{stats.liftPercentage}% of users</p>
//                 </div>
//                 <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
//                   <span className="text-orange-600 font-bold text-sm">🦾</span>
//                 </div>
//               </div>
//             </div>

//             <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
//               <div className="flex items-center justify-between mb-4">
//                 <div className="p-3 bg-blue-100 rounded-xl">
//                   <BarChart3 className="w-6 h-6 text-blue-600" />
//                 </div>
//                 <span className="text-xs text-[#5C5B77] font-medium">Triangle</span>
//               </div>
//               <div className="flex items-end justify-between">
//                 <div>
//                   <p className="text-3xl font-bold text-blue-600">{stats.triangle}</p>
//                   <p className="text-sm text-[#5C5B77]">{stats.trianglePercentage}% of users</p>
//                 </div>
//                 <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
//                   <span className="text-blue-600 font-bold text-sm">🔺</span>
//                 </div>
//               </div>
//             </div>

//             <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
//               <div className="flex items-center justify-between mb-4">
//                 <div className="p-3 bg-emerald-100 rounded-xl">
//                   <Activity className="w-6 h-6 text-emerald-600" />
//                 </div>
//                 <span className="text-xs text-[#5C5B77] font-medium">Rectangle</span>
//               </div>
//               <div className="flex items-end justify-between">
//                 <div>
//                   <p className="text-3xl font-bold text-emerald-600">{stats.rectangle}</p>
//                   <p className="text-sm text-[#5C5B77]">{stats.rectanglePercentage}% of users</p>
//                 </div>
//                 <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
//                   <span className="text-emerald-600 font-bold text-sm">▬</span>
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         )}

//         {/* Email Stats Bar */}
//         {stats && (
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
//             <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center justify-between">
//               <div className="flex items-center gap-3">
//                 <div className="p-2 bg-green-100 rounded-lg">
//                   <Mail className="w-5 h-5 text-green-600" />
//                 </div>
//                 <div>
//                   <p className="text-xs text-[#5C5B77] font-medium">Emails Sent</p>
//                   <p className="text-xl font-bold text-green-600">{stats.emailSent}</p>
//                 </div>
//               </div>
//               <span className="text-xs text-green-600 font-medium">✓ Delivered</span>
//             </div>
//             <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center justify-between">
//               <div className="flex items-center gap-3">
//                 <div className="p-2 bg-red-100 rounded-lg">
//                   <Mail className="w-5 h-5 text-red-600" />
//                 </div>
//                 <div>
//                   <p className="text-xs text-[#5C5B77] font-medium">Emails Failed</p>
//                   <p className="text-xl font-bold text-red-600">{stats.emailFailed}</p>
//                 </div>
//               </div>
//               <span className="text-xs text-red-600 font-medium">✗ Failed</span>
//             </div>
//             <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center justify-between">
//               <div className="flex items-center gap-3">
//                 <div className="p-2 bg-[#323352]/10 rounded-lg">
//                   <Clock className="w-5 h-5 text-[#323352]" />
//                 </div>
//                 <div>
//                   <p className="text-xs text-[#5C5B77] font-medium">Total Users</p>
//                   <p className="text-xl font-bold text-[#323352]">{stats.total}</p>
//                 </div>
//               </div>
//               <span className="text-xs text-[#5C5B77] font-medium">Active</span>
//             </div>
//           </div>
//         )}

//         {/* Users Table */}
//         <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
//           {/* Table Header */}
//           <div className="p-6 border-b border-gray-100">
//             <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//               <div>
//                 <h2 className="text-lg font-bold text-[#323352] flex items-center gap-2">
//                   <Users className="w-5 h-5 text-[#C76A32]" />
//                   User Submissions
//                 </h2>
//                 <p className="text-sm text-[#5C5B77]">Manage and view all FitID submissions</p>
//               </div>
              
//               <div className="flex flex-wrap items-center gap-3">
//                 {/* Search */}
//                 <div className="relative">
//                   <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5C5B77]" />
//                   <input
//                     placeholder="Search email or name..."
//                     className="pl-9 pr-4 py-2 bg-[#F5F2EA] border border-transparent rounded-lg focus:border-[#C76A32] focus:bg-white focus:outline-none transition-all text-sm w-[180px] md:w-[220px]"
//                     value={filters.search}
//                     onChange={(e) => handleSearch(e.target.value)}
//                   />
//                 </div>

//                 {/* FitID Filter */}
//                 <select
//                   className="px-3 py-2 bg-[#F5F2EA] border border-transparent rounded-lg focus:border-[#C76A32] focus:bg-white focus:outline-none transition-all text-sm"
//                   value={filters.fitId}
//                   onChange={(e) => handleFilterChange('fitId', e.target.value)}
//                 >
//                   <option value="">All FitIDs</option>
//                   <option value="Lift">Lift</option>
//                   <option value="Triangle">Triangle</option>
//                   <option value="Rectangle">Rectangle</option>
//                 </select>

//                 {/* Export Button */}
//                 <button
//                   onClick={handleExport}
//                   disabled={exporting}
//                   className="flex items-center gap-2 px-4 py-2 bg-[#323352] text-white rounded-lg hover:bg-[#1a1a3e] transition-all text-sm font-medium disabled:opacity-50"
//                 >
//                   <Download className="w-4 h-4" />
//                   {exporting ? 'Exporting...' : 'Export CSV'}
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Table */}
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead className="bg-[#F5F2EA]">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-semibold text-[#5C5B77] uppercase tracking-wider">Email</th>
//                   <th className="px-6 py-3 text-left text-xs font-semibold text-[#5C5B77] uppercase tracking-wider">Name</th>
//                   <th className="px-6 py-3 text-left text-xs font-semibold text-[#5C5B77] uppercase tracking-wider">Country</th>
//                   <th className="px-6 py-3 text-left text-xs font-semibold text-[#5C5B77] uppercase tracking-wider">FitID</th>
//                   <th className="px-6 py-3 text-left text-xs font-semibold text-[#5C5B77] uppercase tracking-wider">Email</th>
//                   <th className="px-6 py-3 text-right text-xs font-semibold text-[#5C5B77] uppercase tracking-wider">Submitted</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-100">
//                 {users.length === 0 ? (
//                   <tr>
//                     <td colSpan={6} className="px-6 py-12 text-center text-[#5C5B77]">
//                       <div className="flex flex-col items-center gap-2">
//                         <Users className="w-8 h-8 text-[#5C5B77]/30" />
//                         <p>No users found</p>
//                         <p className="text-sm">Try adjusting your search or filters</p>
//                       </div>
//                     </td>
//                   </tr>
//                 ) : (
//                   users.map((user, index) => (
//                     <motion.tr 
//                       key={user._id}
//                       initial={{ opacity: 0, y: 10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ delay: index * 0.03 }}
//                       className="hover:bg-[#F5F2EA]/50 transition-colors"
//                     >
//                       <td className="px-6 py-4 text-sm font-medium text-[#323352]">{user.email}</td>
//                       <td className="px-6 py-4 text-sm text-[#5C5B77]">{user.firstName || '—'}</td>
//                       <td className="px-6 py-4 text-sm text-[#5C5B77]">{user.country}</td>
//                       <td className="px-6 py-4 text-sm">{getFitIdBadge(user.fitId)}</td>
//                       <td className="px-6 py-4 text-sm">{getEmailStatusBadge(user.emailStatus)}</td>
//                       <td className="px-6 py-4 text-sm text-[#5C5B77] text-right">
//                         <div className="flex items-center justify-end gap-2">
//                           <Calendar className="w-3 h-3" />
//                           {new Date(user.createdAt).toLocaleDateString('en-US', {
//                             month: 'short',
//                             day: 'numeric',
//                             year: 'numeric'
//                           })}
//                         </div>
//                       </td>
//                     </motion.tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>

//           {/* Pagination */}
//           {pagination.total > 0 && (
//             <div className="px-6 py-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
//               <p className="text-sm text-[#5C5B77]">
//                 Showing <span className="font-medium">{(pagination.page - 1) * 20 + 1}</span> to{' '}
//                 <span className="font-medium">{Math.min(pagination.page * 20, pagination.total)}</span> of{' '}
//                 <span className="font-medium">{pagination.total}</span> users
//               </p>
//               <div className="flex items-center gap-2">
//                 <button
//                   onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
//                   disabled={pagination.page === 1}
//                   className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                 >
//                   <ChevronLeft className="w-4 h-4 text-[#5C5B77]" />
//                 </button>
//                 <span className="text-sm font-medium text-[#323352] px-3 py-1 bg-[#F5F2EA] rounded-lg">
//                   {pagination.page} / {pagination.pages}
//                 </span>
//                 <button
//                   onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
//                   disabled={pagination.page === pagination.pages}
//                   className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                 >
//                   <ChevronRight className="w-4 h-4 text-[#5C5B77]" />
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Footer */}
//         <div className="mt-8 text-center text-xs text-[#5C5B77]">
//           <p>© {new Date().getFullYear()} Threadline. All rights reserved.</p>
//         </div>
//       </main>
//     </div>
//   );
// };


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  TrendingUp, 
  Mail, 
  Download, 
  Search, 
  LogOut,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Calendar,
  BarChart3,
  Shield,
  ArrowUp,
  Activity,
  Clock,
  Eye,
  ChevronDown,
  Filter,
  X,
  ChevronUp
} from 'lucide-react';
import { adminApi } from '../services/api';
import { toast } from 'sonner';

export const AdminDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, total: 0, pages: 1 });
  const [filters, setFilters] = useState({ 
    search: '', 
    fitId: '', 
    country: '',
    trouserSize: '',
    workType: '',
    fitIssue: '',
    movement: '',
    bodyDistribution: '',
    trouserFit: '',
    fitPreference: '',
    bodyScanInterest: '',
    smartphone: '',
    emailStatus: ''
  });
  const [exporting, setExporting] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserDetail, setShowUserDetail] = useState(false);

  const token = localStorage.getItem('adminToken');
  const adminEmail = localStorage.getItem('adminEmail');
  const adminRole = localStorage.getItem('adminRole');

  // Redirect if no token
  useEffect(() => {
    if (!token) {
      navigate('/admin/login');
    }
  }, [token, navigate]);

  // Fetch data
  const fetchData = async () => {
    if (!token) return;
    
    setLoading(true);
    try {
      const headers = { Authorization: `Bearer ${token}` };
      
      const [statsRes, usersRes] = await Promise.all([
        adminApi.getStats(),
        adminApi.getUsers({ 
          page: pagination.page, 
          limit: 20,
          ...filters 
        })
      ]);

      setStats(statsRes.data.data);
      setUsers(usersRes.data.data.users);
      setPagination(usersRes.data.data.pagination);
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminEmail');
        localStorage.removeItem('adminRole');
        navigate('/admin/login');
        toast.error('Session expired. Please login again.');
      } else {
        toast.error('Failed to fetch data');
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [pagination.page, filters]);

  // Handle refresh
  const handleRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  // Handle search
  const handleSearch = (value) => {
    setFilters(prev => ({ ...prev, search: value }));
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  // Handle filter change
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      search: '',
      fitId: '',
      country: '',
      trouserSize: '',
      workType: '',
      fitIssue: '',
      movement: '',
      bodyDistribution: '',
      trouserFit: '',
      fitPreference: '',
      bodyScanInterest: '',
      smartphone: '',
      emailStatus: ''
    });
    setPagination(prev => ({ ...prev, page: 1 }));
    // Optionally close filter panel after clearing
    // setShowFilters(false);
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminEmail');
    localStorage.removeItem('adminRole');
    navigate('/admin/login');
    toast.success('Logged out successfully');
  };

  // Handle CSV export
  const handleExport = async () => {
    setExporting(true);
    try {
      const response = await adminApi.exportCSV(filters);
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `threadline-users-${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      
      toast.success('Export successful!');
    } catch (error) {
      toast.error('Failed to export data');
    } finally {
      setExporting(false);
    }
  };

  const getFitIdBadge = (fitId) => {
    const styles = {
      'Lift': { bg: 'bg-orange-100', text: 'text-orange-800', border: 'border-orange-200', icon: '🦾' },
      'Triangle': { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-200', icon: '🔺' },
      'Rectangle': { bg: 'bg-emerald-100', text: 'text-emerald-800', border: 'border-emerald-200', icon: '▬' },
    };
    const style = styles[fitId] || styles['Rectangle'];
    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${style.bg} ${style.text} ${style.border} border`}>
        <span>{style.icon}</span>
        {fitId}
      </span>
    );
  };

  const getEmailStatusBadge = (status) => {
    const styles = {
      'SENT': { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-200', icon: '✓' },
      'FAILED': { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-200', icon: '✗' },
      'PENDING': { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-200', icon: '…' },
    };
    const style = styles[status] || styles['PENDING'];
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${style.bg} ${style.text} ${style.border} border`}>
        {style.icon}
        {status}
      </span>
    );
  };

  // Filter options for dropdowns
  const filterOptions = {
    country: ['UK', 'USA', 'Europe', 'Australia/NZ', 'Other'],
    trouserSize: ['UK 6 (US 2)', 'UK 8 (US 4)', 'UK 10 (US 6)', 'UK 12 (US 8)', 'UK 14 (US 10)', 'UK 16 (US 12)', 'UK 18 (US 14)', 'UK 20 (US 16)', 'UK 22 (US 18)', 'Other'],
    workType: ['Painting and decorating', 'Construction', 'Electrical', 'Plumbing', 'Welding', 'Gardening and landscaping', 'DIY', 'Other'],
    trouserFit: ['Too tight', 'Too loose', 'Fit in some areas but not others', 'Fit well'],
    bodyDistribution: ['More in hips', 'More in thighs', 'Evenly distributed', 'Not sure'],
    fitPreference: ['Stretch fabric', 'High waist', 'Loose fit', 'Specific brand', 'Nothing ever fits properly'],
    bodyScanInterest: ['Yes', 'Maybe - depending how it works', 'No'],
    smartphone: ['Yes', 'No'],
    emailStatus: ['SENT', 'FAILED', 'PENDING'],
    fitId: ['Lift', 'Triangle', 'Rectangle']
  };

  // Get filter label
  const getFilterLabel = (key, value) => {
    if (!value) return '';
    const labels = {
      country: 'Country',
      trouserSize: 'Trouser Size',
      workType: 'Work Type',
      trouserFit: 'Trouser Fit',
      bodyDistribution: 'Body Distribution',
      fitPreference: 'Fit Preference',
      bodyScanInterest: 'Body Scan Interest',
      smartphone: 'Smartphone',
      emailStatus: 'Email Status',
      fitId: 'FitID',
      fitIssue: 'Fit Issue',
      movement: 'Movement'
    };
    return labels[key] || key;
  };

  // Get active filters count
  const getActiveFilterCount = () => {
    const activeFilters = Object.entries(filters).filter(([key, value]) => 
      value && value !== '' && key !== 'search'
    );
    return activeFilters.length;
  };

  // View user details
  const viewUserDetails = (user) => {
    setSelectedUser(user);
    setShowUserDetail(true);
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
  };

  // Close user detail
  const closeUserDetail = () => {
    setShowUserDetail(false);
    document.body.style.overflow = 'unset';
  };

  if (loading && !stats) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F2EA]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#fa6902] border-t-transparent rounded-full animate-spin" />
          <span className="text-[#5C5B77] font-medium">Loading dashboard...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F2EA]">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 md:w-10 md:h-10 bg-[#323352] rounded-xl flex items-center justify-center flex-shrink-0">
                  <Shield className="w-4 h-4 md:w-5 md:h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-base md:text-xl font-bold text-[#323352] font-heading">Threadline Admin</h1>
                  <span className="text-xs text-[#5C5B77] hidden sm:inline">Data Dashboard</span>
                </div>
              </div>
              <div className="hidden md:flex items-center gap-2">
                <span className="px-3 py-1 bg-[#fa6902]/10 text-[#fa6902] text-xs font-semibold rounded-full">
                  {adminRole || 'Admin'}
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-2 md:gap-4">
              <span className="text-xs md:text-sm text-[#5C5B77] hidden lg:block">
                {adminEmail}
              </span>
              <button
                onClick={handleRefresh}
                className="p-1.5 md:p-2 hover:bg-gray-100 rounded-lg transition-colors"
                disabled={refreshing}
              >
                <RefreshCw className={`w-4 h-4 md:w-5 md:h-5 text-[#5C5B77] ${refreshing ? 'animate-spin' : ''}`} />
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 md:gap-2 px-2 md:px-4 py-1.5 md:py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-colors text-xs md:text-sm font-medium"
              >
                <LogOut className="w-3 h-3 md:w-4 md:h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-3 md:px-4 py-4 md:py-8">
        {/* Stats Cards - Responsive Grid */}
        {stats && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-4 md:mb-8"
          >
            <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-2 md:mb-4">
                <div className="p-2 md:p-3 bg-[#323352]/10 rounded-lg md:rounded-xl">
                  <Users className="w-4 h-4 md:w-6 md:h-6 text-[#323352]" />
                </div>
                <span className="text-[10px] md:text-xs text-[#5C5B77] font-medium">Total</span>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-xl md:text-3xl font-bold text-[#323352]">{stats.total}</p>
                  <p className="text-[10px] md:text-sm text-[#5C5B77]">Submissions</p>
                </div>
                <div className="flex items-center gap-0.5 md:gap-1 text-xs md:text-sm text-emerald-600">
                  <ArrowUp className="w-3 h-3 md:w-4 md:h-4" />
                  <span>12%</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-2 md:mb-4">
                <div className="p-2 md:p-3 bg-orange-100 rounded-lg md:rounded-xl">
                  <TrendingUp className="w-4 h-4 md:w-6 md:h-6 text-orange-600" />
                </div>
                <span className="text-[10px] md:text-xs text-[#5C5B77] font-medium">Lift</span>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-xl md:text-3xl font-bold text-orange-600">{stats.lift}</p>
                  <p className="text-[10px] md:text-sm text-[#5C5B77]">{stats.liftPercentage}%</p>
                </div>
                <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-orange-100 flex items-center justify-center">
                  <span className="text-orange-600 font-bold text-sm md:text-base">🦾</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-2 md:mb-4">
                <div className="p-2 md:p-3 bg-blue-100 rounded-lg md:rounded-xl">
                  <BarChart3 className="w-4 h-4 md:w-6 md:h-6 text-blue-600" />
                </div>
                <span className="text-[10px] md:text-xs text-[#5C5B77] font-medium">Triangle</span>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-xl md:text-3xl font-bold text-blue-600">{stats.triangle}</p>
                  <p className="text-[10px] md:text-sm text-[#5C5B77]">{stats.trianglePercentage}%</p>
                </div>
                <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-sm md:text-base">🔺</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-2 md:mb-4">
                <div className="p-2 md:p-3 bg-emerald-100 rounded-lg md:rounded-xl">
                  <Activity className="w-4 h-4 md:w-6 md:h-6 text-emerald-600" />
                </div>
                <span className="text-[10px] md:text-xs text-[#5C5B77] font-medium">Rectangle</span>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-xl md:text-3xl font-bold text-emerald-600">{stats.rectangle}</p>
                  <p className="text-[10px] md:text-sm text-[#5C5B77]">{stats.rectanglePercentage}%</p>
                </div>
                <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-emerald-100 flex items-center justify-center">
                  <span className="text-emerald-600 font-bold text-sm md:text-base">▬</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Email Stats Bar - Responsive */}
        {stats && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 mb-4 md:mb-8">
            <div className="bg-white rounded-xl p-3 md:p-4 shadow-sm border border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2 md:gap-3">
                <div className="p-1.5 md:p-2 bg-green-100 rounded-lg">
                  <Mail className="w-4 h-4 md:w-5 md:h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-[10px] md:text-xs text-[#5C5B77] font-medium">Sent</p>
                  <p className="text-base md:text-xl font-bold text-green-600">{stats.emailSent}</p>
                </div>
              </div>
              <span className="text-[10px] md:text-xs text-green-600 font-medium">✓ Delivered</span>
            </div>
            <div className="bg-white rounded-xl p-3 md:p-4 shadow-sm border border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2 md:gap-3">
                <div className="p-1.5 md:p-2 bg-red-100 rounded-lg">
                  <Mail className="w-4 h-4 md:w-5 md:h-5 text-red-600" />
                </div>
                <div>
                  <p className="text-[10px] md:text-xs text-[#5C5B77] font-medium">Failed</p>
                  <p className="text-base md:text-xl font-bold text-red-600">{stats.emailFailed}</p>
                </div>
              </div>
              <span className="text-[10px] md:text-xs text-red-600 font-medium">✗ Failed</span>
            </div>
            <div className="bg-white rounded-xl p-3 md:p-4 shadow-sm border border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2 md:gap-3">
                <div className="p-1.5 md:p-2 bg-[#323352]/10 rounded-lg">
                  <Clock className="w-4 h-4 md:w-5 md:h-5 text-[#323352]" />
                </div>
                <div>
                  <p className="text-[10px] md:text-xs text-[#5C5B77] font-medium">Total</p>
                  <p className="text-base md:text-xl font-bold text-[#323352]">{stats.total}</p>
                </div>
              </div>
              <span className="text-[10px] md:text-xs text-[#5C5B77] font-medium">Active</span>
            </div>
          </div>
        )}

        {/* Users Table with Filters */}
        <div className="bg-white rounded-xl md:rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Table Header */}
          <div className="p-4 md:p-6 border-b border-gray-100">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 md:gap-4">
              <div>
                <h2 className="text-base md:text-lg font-bold text-[#323352] flex items-center gap-2">
                  <Users className="w-4 h-4 md:w-5 md:h-5 text-[#fa6902]" />
                  User Submissions
                </h2>
                <p className="text-xs md:text-sm text-[#5C5B77] hidden sm:block">View and analyse all questionnaire responses</p>
              </div>
              
              <div className="flex flex-wrap items-center gap-2 md:gap-3">
                {/* Search - Full width on mobile */}
                <div className="relative flex-1 sm:flex-none">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 md:w-4 md:h-4 text-[#5C5B77]" />
                  <input
                    placeholder="Search..."
                    className="w-full sm:w-[140px] md:w-[220px] pl-8 md:pl-9 pr-3 py-1.5 md:py-2 bg-[#F5F2EA] border border-transparent rounded-lg focus:border-[#fa6902] focus:bg-white focus:outline-none transition-all text-xs md:text-sm"
                    value={filters.search}
                    onChange={(e) => handleSearch(e.target.value)}
                  />
                </div>

                {/* Filter Toggle Button */}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`flex items-center gap-1 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-lg transition-all text-xs md:text-sm font-medium ${
                    showFilters || getActiveFilterCount() > 0
                      ? 'bg-[#fa6902] text-white'
                      : 'bg-[#F5F2EA] text-[#5C5B77] hover:bg-gray-200'
                  }`}
                >
                  <Filter className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  <span className="hidden sm:inline">Filters</span>
                  {getActiveFilterCount() > 0 && (
                    <span className="ml-0.5 md:ml-1 px-1.5 md:px-2 py-0.5 bg-white/20 rounded-full text-[10px] md:text-xs">
                      {getActiveFilterCount()}
                    </span>
                  )}
                </button>

                {/* Export Button */}
                <button
                  onClick={handleExport}
                  disabled={exporting}
                  className="flex items-center gap-1 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-[#323352] text-white rounded-lg hover:bg-[#1a1a3e] transition-all text-xs md:text-sm font-medium disabled:opacity-50"
                >
                  <Download className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  <span className="hidden xs:inline">{exporting ? 'Exporting...' : 'Export'}</span>
                </button>
              </div>
            </div>

            {/* Filter Panel - With animation */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-gray-100 overflow-hidden"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                    {/* FitID Filter */}
                    <div>
                      <label className="text-[10px] md:text-xs font-medium text-[#5C5B77] block mb-1">FitID</label>
                      <select
                        className="w-full px-2 md:px-3 py-1.5 md:py-2 bg-[#F5F2EA] border border-transparent rounded-lg focus:border-[#fa6902] focus:bg-white focus:outline-none transition-all text-xs md:text-sm"
                        value={filters.fitId}
                        onChange={(e) => handleFilterChange('fitId', e.target.value)}
                      >
                        <option value="">All</option>
                        {filterOptions.fitId.map(option => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    </div>

                    {/* Country Filter */}
                    <div>
                      <label className="text-[10px] md:text-xs font-medium text-[#5C5B77] block mb-1">Country</label>
                      <select
                        className="w-full px-2 md:px-3 py-1.5 md:py-2 bg-[#F5F2EA] border border-transparent rounded-lg focus:border-[#fa6902] focus:bg-white focus:outline-none transition-all text-xs md:text-sm"
                        value={filters.country}
                        onChange={(e) => handleFilterChange('country', e.target.value)}
                      >
                        <option value="">All</option>
                        {filterOptions.country.map(option => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    </div>

                    {/* Work Type Filter */}
                    <div>
                      <label className="text-[10px] md:text-xs font-medium text-[#5C5B77] block mb-1">Work Type</label>
                      <select
                        className="w-full px-2 md:px-3 py-1.5 md:py-2 bg-[#F5F2EA] border border-transparent rounded-lg focus:border-[#fa6902] focus:bg-white focus:outline-none transition-all text-xs md:text-sm"
                        value={filters.workType}
                        onChange={(e) => handleFilterChange('workType', e.target.value)}
                      >
                        <option value="">All</option>
                        {filterOptions.workType.map(option => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    </div>

                    {/* Trouser Fit Filter */}
                    <div>
                      <label className="text-[10px] md:text-xs font-medium text-[#5C5B77] block mb-1">Trouser Fit</label>
                      <select
                        className="w-full px-2 md:px-3 py-1.5 md:py-2 bg-[#F5F2EA] border border-transparent rounded-lg focus:border-[#fa6902] focus:bg-white focus:outline-none transition-all text-xs md:text-sm"
                        value={filters.trouserFit}
                        onChange={(e) => handleFilterChange('trouserFit', e.target.value)}
                      >
                        <option value="">All</option>
                        {filterOptions.trouserFit.map(option => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    </div>

                    {/* Body Distribution Filter */}
                    <div>
                      <label className="text-[10px] md:text-xs font-medium text-[#5C5B77] block mb-1">Body Distribution</label>
                      <select
                        className="w-full px-2 md:px-3 py-1.5 md:py-2 bg-[#F5F2EA] border border-transparent rounded-lg focus:border-[#fa6902] focus:bg-white focus:outline-none transition-all text-xs md:text-sm"
                        value={filters.bodyDistribution}
                        onChange={(e) => handleFilterChange('bodyDistribution', e.target.value)}
                      >
                        <option value="">All</option>
                        {filterOptions.bodyDistribution.map(option => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    </div>

                    {/* Email Status Filter */}
                    <div>
                      <label className="text-[10px] md:text-xs font-medium text-[#5C5B77] block mb-1">Email Status</label>
                      <select
                        className="w-full px-2 md:px-3 py-1.5 md:py-2 bg-[#F5F2EA] border border-transparent rounded-lg focus:border-[#fa6902] focus:bg-white focus:outline-none transition-all text-xs md:text-sm"
                        value={filters.emailStatus}
                        onChange={(e) => handleFilterChange('emailStatus', e.target.value)}
                      >
                        <option value="">All</option>
                        {filterOptions.emailStatus.map(option => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    </div>

                    {/* Body Scan Interest */}
                    <div>
                      <label className="text-[10px] md:text-xs font-medium text-[#5C5B77] block mb-1">Scan Interest</label>
                      <select
                        className="w-full px-2 md:px-3 py-1.5 md:py-2 bg-[#F5F2EA] border border-transparent rounded-lg focus:border-[#fa6902] focus:bg-white focus:outline-none transition-all text-xs md:text-sm"
                        value={filters.bodyScanInterest}
                        onChange={(e) => handleFilterChange('bodyScanInterest', e.target.value)}
                      >
                        <option value="">All</option>
                        {filterOptions.bodyScanInterest.map(option => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    </div>

                    {/* Smartphone */}
                    <div>
                      <label className="text-[10px] md:text-xs font-medium text-[#5C5B77] block mb-1">Smartphone</label>
                      <select
                        className="w-full px-2 md:px-3 py-1.5 md:py-2 bg-[#F5F2EA] border border-transparent rounded-lg focus:border-[#fa6902] focus:bg-white focus:outline-none transition-all text-xs md:text-sm"
                        value={filters.smartphone}
                        onChange={(e) => handleFilterChange('smartphone', e.target.value)}
                      >
                        <option value="">All</option>
                        {filterOptions.smartphone.map(option => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    </div>

                    {/* Clear Filters - Full width on mobile */}
                    <div className="sm:col-span-2 lg:col-span-4 flex flex-col sm:flex-row gap-2 sm:gap-4 mt-2 sm:mt-0">
                      <button
                        onClick={clearFilters}
                        className="w-full sm:w-auto px-4 py-2 text-xs md:text-sm text-[#5C5B77] hover:text-[#fa6902] border border-gray-200 rounded-lg hover:border-[#fa6902] transition-colors flex items-center justify-center gap-2"
                      >
                        <X className="w-3.5 h-3.5 md:w-4 md:h-4" />
                        Clear All Filters
                      </button>
                      <button
                        onClick={() => setShowFilters(false)}
                        className="w-full sm:w-auto px-4 py-2 text-xs md:text-sm bg-[#fa6902] text-white rounded-lg hover:bg-[#e05e00] transition-colors flex items-center justify-center gap-2"
                      >
                        <ChevronUp className="w-3.5 h-3.5 md:w-4 md:h-4" />
                        Close Filters
                      </button>
                    </div>
                  </div>

                  {/* Active Filters Display - Scrollable on mobile */}
                  {getActiveFilterCount() > 0 && (
                    <div className="mt-3 md:mt-4 flex flex-wrap gap-1.5 md:gap-2 overflow-x-auto pb-1">
                      {Object.entries(filters).map(([key, value]) => {
                        if (!value || value === '' || key === 'search') return null;
                        return (
                          <span 
                            key={key}
                            className="inline-flex items-center gap-1 px-2 md:px-3 py-0.5 md:py-1 bg-[#fa6902]/10 text-[#fa6902] text-[10px] md:text-xs rounded-full border border-[#fa6902]/20 whitespace-nowrap"
                          >
                            {getFilterLabel(key, value)}: {value}
                            <button
                              onClick={() => handleFilterChange(key, '')}
                              className="hover:text-[#e05e00] transition-colors ml-0.5"
                            >
                              <X className="w-2.5 h-2.5 md:w-3 md:h-3" />
                            </button>
                          </span>
                        );
                      })}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Table - Horizontal scroll on mobile */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] md:min-w-0">
              <thead className="bg-[#F5F2EA]">
                <tr>
                  <th className="px-3 md:px-6 py-2 md:py-3 text-left text-[10px] md:text-xs font-semibold text-[#5C5B77] uppercase tracking-wider">Email</th>
                  <th className="px-3 md:px-6 py-2 md:py-3 text-left text-[10px] md:text-xs font-semibold text-[#5C5B77] uppercase tracking-wider">Name</th>
                  <th className="px-3 md:px-6 py-2 md:py-3 text-left text-[10px] md:text-xs font-semibold text-[#5C5B77] uppercase tracking-wider">FitID</th>
                  <th className="px-3 md:px-6 py-2 md:py-3 text-left text-[10px] md:text-xs font-semibold text-[#5C5B77] uppercase tracking-wider hidden sm:table-cell">Country</th>
                  <th className="px-3 md:px-6 py-2 md:py-3 text-left text-[10px] md:text-xs font-semibold text-[#5C5B77] uppercase tracking-wider hidden md:table-cell">Work Type</th>
                  <th className="px-3 md:px-6 py-2 md:py-3 text-left text-[10px] md:text-xs font-semibold text-[#5C5B77] uppercase tracking-wider hidden lg:table-cell">Email</th>
                  <th className="px-3 md:px-6 py-2 md:py-3 text-right text-[10px] md:text-xs font-semibold text-[#5C5B77] uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {users.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-3 md:px-6 py-8 md:py-12 text-center text-[#5C5B77]">
                      <div className="flex flex-col items-center gap-2">
                        <Users className="w-6 h-6 md:w-8 md:h-8 text-[#5C5B77]/30" />
                        <p className="text-sm md:text-base">No users found</p>
                        <p className="text-xs md:text-sm">Try adjusting your search or filters</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  users.map((user, index) => (
                    <motion.tr 
                      key={user._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: Math.min(index * 0.03, 0.5) }}
                      className="hover:bg-[#F5F2EA]/50 transition-colors cursor-pointer"
                      onClick={() => viewUserDetails(user)}
                    >
                      <td className="px-3 md:px-6 py-2 md:py-4 text-xs md:text-sm font-medium text-[#323352] truncate max-w-[100px] md:max-w-none">
                        {user.email}
                      </td>
                      <td className="px-3 md:px-6 py-2 md:py-4 text-xs md:text-sm text-[#5C5B77]">
                        {user.firstName || '—'}
                      </td>
                      <td className="px-3 md:px-6 py-2 md:py-4 text-xs md:text-sm">
                        {getFitIdBadge(user.fitId)}
                      </td>
                      <td className="px-3 md:px-6 py-2 md:py-4 text-xs md:text-sm text-[#5C5B77] hidden sm:table-cell">
                        {user.country}
                      </td>
                      <td className="px-3 md:px-6 py-2 md:py-4 text-xs md:text-sm text-[#5C5B77] hidden md:table-cell truncate max-w-[80px]">
                        {user.workType}
                      </td>
                      <td className="px-3 md:px-6 py-2 md:py-4 text-xs md:text-sm hidden lg:table-cell">
                        {getEmailStatusBadge(user.emailStatus)}
                      </td>
                      <td className="px-3 md:px-6 py-2 md:py-4 text-xs md:text-sm text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            viewUserDetails(user);
                          }}
                          className="p-1.5 md:p-2 hover:bg-gray-100 rounded-lg transition-colors text-[#5C5B77] hover:text-[#fa6902]"
                        >
                          <Eye className="w-3.5 h-3.5 md:w-4 md:h-4" />
                        </button>
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination - Responsive */}
          {pagination.total > 0 && (
            <div className="px-3 md:px-6 py-3 md:py-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3 md:gap-4">
              <p className="text-[10px] md:text-sm text-[#5C5B77] text-center sm:text-left">
                Showing <span className="font-medium">{(pagination.page - 1) * 20 + 1}</span> to{' '}
                <span className="font-medium">{Math.min(pagination.page * 20, pagination.total)}</span> of{' '}
                <span className="font-medium">{pagination.total}</span> users
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
                  disabled={pagination.page === 1}
                  className="p-1.5 md:p-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#5C5B77]" />
                </button>
                <span className="text-xs md:text-sm font-medium text-[#323352] px-2 md:px-3 py-0.5 md:py-1 bg-[#F5F2EA] rounded-lg">
                  {pagination.page} / {pagination.pages}
                </span>
                <button
                  onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                  disabled={pagination.page === pagination.pages}
                  className="p-1.5 md:p-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#5C5B77]" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-4 md:mt-8 text-center text-[10px] md:text-xs text-[#5C5B77]">
          <p>© {new Date().getFullYear()} Threadline. All rights reserved.</p>
        </div>
      </main>

      {/* User Detail Modal - Responsive */}
      <AnimatePresence>
        {showUserDetail && selectedUser && (
          <div 
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-3 md:p-4"
            onClick={closeUserDetail}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-xl md:rounded-2xl shadow-2xl max-w-3xl w-full max-h-[95vh] md:max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-white border-b border-gray-100 px-4 md:px-6 py-3 md:py-4 flex items-center justify-between z-10">
                <h3 className="text-base md:text-lg font-bold text-[#323352]">User Details</h3>
                <button
                  onClick={closeUserDetail}
                  className="p-1.5 md:p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4 md:w-5 md:h-5 text-[#5C5B77]" />
                </button>
              </div>
              <div className="p-4 md:p-6 space-y-4 md:space-y-6">
                {/* Personal Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                  <div>
                    <label className="text-[10px] md:text-xs font-medium text-[#5C5B77] uppercase tracking-wider">Email</label>
                    <p className="text-sm md:text-base font-medium text-[#323352] break-all">{selectedUser.email}</p>
                  </div>
                  <div>
                    <label className="text-[10px] md:text-xs font-medium text-[#5C5B77] uppercase tracking-wider">Name</label>
                    <p className="text-sm md:text-base font-medium text-[#323352]">{selectedUser.firstName || '—'}</p>
                  </div>
                  <div>
                    <label className="text-[10px] md:text-xs font-medium text-[#5C5B77] uppercase tracking-wider">Country</label>
                    <p className="text-sm md:text-base font-medium text-[#323352]">{selectedUser.country}</p>
                  </div>
                  <div>
                    <label className="text-[10px] md:text-xs font-medium text-[#5C5B77] uppercase tracking-wider">FitID</label>
                    <p className="text-sm md:text-base font-medium">{getFitIdBadge(selectedUser.fitId)}</p>
                  </div>
                </div>

                <hr className="border-gray-100" />

                {/* Size & Fit */}
                <div>
                  <h4 className="text-sm md:text-base font-semibold text-[#323352] mb-2 md:mb-3">Size & Fit</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                    <div>
                      <label className="text-[10px] md:text-xs font-medium text-[#5C5B77] uppercase tracking-wider">Trouser Size</label>
                      <p className="text-sm md:text-base font-medium text-[#323352]">{selectedUser.trouserSize === 'Other' ? selectedUser.trouserSizeOther || 'Other' : selectedUser.trouserSize}</p>
                    </div>
                    <div>
                      <label className="text-[10px] md:text-xs font-medium text-[#5C5B77] uppercase tracking-wider">Trouser Fit</label>
                      <p className="text-sm md:text-base font-medium text-[#323352]">{selectedUser.trouserFit}</p>
                    </div>
                    <div>
                      <label className="text-[10px] md:text-xs font-medium text-[#5C5B77] uppercase tracking-wider">Body Distribution</label>
                      <p className="text-sm md:text-base font-medium text-[#323352]">{selectedUser.bodyDistribution}</p>
                    </div>
                    <div>
                      <label className="text-[10px] md:text-xs font-medium text-[#5C5B77] uppercase tracking-wider">Fit Preference</label>
                      <p className="text-sm md:text-base font-medium text-[#323352]">{selectedUser.fitPreference}</p>
                    </div>
                  </div>
                </div>

                <hr className="border-gray-100" />

                {/* Fit Issues */}
                <div>
                  <h4 className="text-sm md:text-base font-semibold text-[#323352] mb-2 md:mb-3">Fit Issues</h4>
                  <div className="flex flex-wrap gap-1.5 md:gap-2">
                    {selectedUser.fitIssues && selectedUser.fitIssues.length > 0 ? (
                      selectedUser.fitIssues.map((issue, index) => (
                        <span key={index} className="px-2 md:px-3 py-0.5 md:py-1 bg-red-50 text-red-600 text-[10px] md:text-xs rounded-full border border-red-200">
                          {issue}
                        </span>
                      ))
                    ) : (
                      <span className="text-sm text-[#5C5B77]">No fit issues selected</span>
                    )}
                    {selectedUser.fitIssuesOther && (
                      <span className="px-2 md:px-3 py-0.5 md:py-1 bg-red-50 text-red-600 text-[10px] md:text-xs rounded-full border border-red-200">
                        Other: {selectedUser.fitIssuesOther}
                      </span>
                    )}
                  </div>
                </div>

                <hr className="border-gray-100" />

                {/* Work & Movement */}
                <div>
                  <h4 className="text-sm md:text-base font-semibold text-[#323352] mb-2 md:mb-3">Work & Movement</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                    <div>
                      <label className="text-[10px] md:text-xs font-medium text-[#5C5B77] uppercase tracking-wider">Work Type</label>
                      <p className="text-sm md:text-base font-medium text-[#323352]">{selectedUser.workType === 'Other' ? selectedUser.workTypeOther || 'Other' : selectedUser.workType}</p>
                    </div>
                    <div>
                      <label className="text-[10px] md:text-xs font-medium text-[#5C5B77] uppercase tracking-wider">Movements</label>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {selectedUser.movements && selectedUser.movements.length > 0 ? (
                          selectedUser.movements.map((movement, index) => (
                            <span key={index} className="px-1.5 md:px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] md:text-xs rounded-full border border-blue-200">
                              {movement}
                            </span>
                          ))
                        ) : (
                          <span className="text-sm text-[#5C5B77]">No movements selected</span>
                        )}
                        {selectedUser.movementsOther && (
                          <span className="px-1.5 md:px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] md:text-xs rounded-full border border-blue-200">
                            Other: {selectedUser.movementsOther}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <hr className="border-gray-100" />

                {/* Body Scanning */}
                <div>
                  <h4 className="text-sm md:text-base font-semibold text-[#323352] mb-2 md:mb-3">Body Scanning</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                    <div>
                      <label className="text-[10px] md:text-xs font-medium text-[#5C5B77] uppercase tracking-wider">Scan Interest</label>
                      <p className="text-sm md:text-base font-medium text-[#323352]">{selectedUser.bodyScanInterest}</p>
                    </div>
                    <div>
                      <label className="text-[10px] md:text-xs font-medium text-[#5C5B77] uppercase tracking-wider">Smartphone</label>
                      <p className="text-sm md:text-base font-medium text-[#323352]">{selectedUser.smartphone}</p>
                    </div>
                  </div>
                </div>

                <hr className="border-gray-100" />

                {/* Metadata */}
                <div>
                  <h4 className="text-sm md:text-base font-semibold text-[#323352] mb-2 md:mb-3">Metadata</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                    <div>
                      <label className="text-[10px] md:text-xs font-medium text-[#5C5B77] uppercase tracking-wider">Email Status</label>
                      <p className="text-sm md:text-base font-medium">{getEmailStatusBadge(selectedUser.emailStatus)}</p>
                    </div>
                    <div>
                      <label className="text-[10px] md:text-xs font-medium text-[#5C5B77] uppercase tracking-wider">Submitted</label>
                      <p className="text-sm md:text-base font-medium text-[#323352]">{new Date(selectedUser.createdAt).toLocaleString()}</p>
                    </div>
                    <div>
                      <label className="text-[10px] md:text-xs font-medium text-[#5C5B77] uppercase tracking-wider">Last Updated</label>
                      <p className="text-sm md:text-base font-medium text-[#323352]">{new Date(selectedUser.updatedAt).toLocaleString()}</p>
                    </div>
                    {selectedUser.emailSentAt && (
                      <div>
                        <label className="text-[10px] md:text-xs font-medium text-[#5C5B77] uppercase tracking-wider">Email Sent</label>
                        <p className="text-sm md:text-base font-medium text-[#323352]">{new Date(selectedUser.emailSentAt).toLocaleString()}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="sticky bottom-0 bg-gray-50 border-t border-gray-100 px-4 md:px-6 py-3 md:py-4 flex justify-end">
                <button
                  onClick={closeUserDetail}
                  className="px-4 md:px-6 py-1.5 md:py-2 bg-[#fa6902] hover:bg-[#e05e00] text-white rounded-lg transition-colors text-sm md:text-base"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};