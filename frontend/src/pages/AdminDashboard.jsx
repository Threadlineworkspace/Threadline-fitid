import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Users, 
  TrendingUp, 
  Mail, 
  Download, 
  Search, 
  LogOut,
  RefreshCw,
  Filter,
  ChevronLeft,
  ChevronRight,
  Eye,
  UserCircle,
  Calendar,
  BarChart3,
  Sparkles,
  Shield,
  ArrowUp,
  ArrowDown,
  Activity,
  Clock
} from 'lucide-react';
import { adminApi } from '../services/api';
import { toast } from 'sonner';

export const AdminDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, total: 0, pages: 1 });
  const [filters, setFilters] = useState({ search: '', fitId: '', country: '' });
  const [exporting, setExporting] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

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

  // Handle search with debounce
  const handleSearch = (value) => {
    setFilters(prev => ({ ...prev, search: value }));
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  // Handle filter change
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPagination(prev => ({ ...prev, page: 1 }));
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
      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${style.bg} ${style.text} ${style.border} border`}>
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

  if (loading && !stats) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F2EA]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#C76A32] border-t-transparent rounded-full animate-spin" />
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
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-[#323352] rounded-xl flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-[#323352] font-heading">Threadline Admin</h1>
                  <span className="text-xs text-[#5C5B77]">Dashboard</span>
                </div>
              </div>
              <div className="hidden md:flex items-center gap-2">
                <span className="px-3 py-1 bg-[#C76A32]/10 text-[#C76A32] text-xs font-semibold rounded-full">
                  {adminRole || 'Admin'}
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="text-sm text-[#5C5B77] hidden md:block">
                {adminEmail}
              </span>
              <button
                onClick={handleRefresh}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                disabled={refreshing}
              >
                <RefreshCw className={`w-5 h-5 text-[#5C5B77] ${refreshing ? 'animate-spin' : ''}`} />
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-colors text-sm font-medium"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        {stats && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-[#323352]/10 rounded-xl">
                  <Users className="w-6 h-6 text-[#323352]" />
                </div>
                <span className="text-xs text-[#5C5B77] font-medium">Total</span>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-3xl font-bold text-[#323352]">{stats.total}</p>
                  <p className="text-sm text-[#5C5B77]">All time submissions</p>
                </div>
                <div className="flex items-center gap-1 text-sm text-emerald-600">
                  <ArrowUp className="w-4 h-4" />
                  <span>12%</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-orange-100 rounded-xl">
                  <TrendingUp className="w-6 h-6 text-orange-600" />
                </div>
                <span className="text-xs text-[#5C5B77] font-medium">Lift</span>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-3xl font-bold text-orange-600">{stats.lift}</p>
                  <p className="text-sm text-[#5C5B77]">{stats.liftPercentage}% of users</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                  <span className="text-orange-600 font-bold text-sm">🦾</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <BarChart3 className="w-6 h-6 text-blue-600" />
                </div>
                <span className="text-xs text-[#5C5B77] font-medium">Triangle</span>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-3xl font-bold text-blue-600">{stats.triangle}</p>
                  <p className="text-sm text-[#5C5B77]">{stats.trianglePercentage}% of users</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-sm">🔺</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-emerald-100 rounded-xl">
                  <Activity className="w-6 h-6 text-emerald-600" />
                </div>
                <span className="text-xs text-[#5C5B77] font-medium">Rectangle</span>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-3xl font-bold text-emerald-600">{stats.rectangle}</p>
                  <p className="text-sm text-[#5C5B77]">{stats.rectanglePercentage}% of users</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
                  <span className="text-emerald-600 font-bold text-sm">▬</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Email Stats Bar */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Mail className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-[#5C5B77] font-medium">Emails Sent</p>
                  <p className="text-xl font-bold text-green-600">{stats.emailSent}</p>
                </div>
              </div>
              <span className="text-xs text-green-600 font-medium">✓ Delivered</span>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-100 rounded-lg">
                  <Mail className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <p className="text-xs text-[#5C5B77] font-medium">Emails Failed</p>
                  <p className="text-xl font-bold text-red-600">{stats.emailFailed}</p>
                </div>
              </div>
              <span className="text-xs text-red-600 font-medium">✗ Failed</span>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#323352]/10 rounded-lg">
                  <Clock className="w-5 h-5 text-[#323352]" />
                </div>
                <div>
                  <p className="text-xs text-[#5C5B77] font-medium">Total Users</p>
                  <p className="text-xl font-bold text-[#323352]">{stats.total}</p>
                </div>
              </div>
              <span className="text-xs text-[#5C5B77] font-medium">Active</span>
            </div>
          </div>
        )}

        {/* Users Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Table Header */}
          <div className="p-6 border-b border-gray-100">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-[#323352] flex items-center gap-2">
                  <Users className="w-5 h-5 text-[#C76A32]" />
                  User Submissions
                </h2>
                <p className="text-sm text-[#5C5B77]">Manage and view all FitID submissions</p>
              </div>
              
              <div className="flex flex-wrap items-center gap-3">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5C5B77]" />
                  <input
                    placeholder="Search email or name..."
                    className="pl-9 pr-4 py-2 bg-[#F5F2EA] border border-transparent rounded-lg focus:border-[#C76A32] focus:bg-white focus:outline-none transition-all text-sm w-[180px] md:w-[220px]"
                    value={filters.search}
                    onChange={(e) => handleSearch(e.target.value)}
                  />
                </div>

                {/* FitID Filter */}
                <select
                  className="px-3 py-2 bg-[#F5F2EA] border border-transparent rounded-lg focus:border-[#C76A32] focus:bg-white focus:outline-none transition-all text-sm"
                  value={filters.fitId}
                  onChange={(e) => handleFilterChange('fitId', e.target.value)}
                >
                  <option value="">All FitIDs</option>
                  <option value="Lift">Lift</option>
                  <option value="Triangle">Triangle</option>
                  <option value="Rectangle">Rectangle</option>
                </select>

                {/* Export Button */}
                <button
                  onClick={handleExport}
                  disabled={exporting}
                  className="flex items-center gap-2 px-4 py-2 bg-[#323352] text-white rounded-lg hover:bg-[#1a1a3e] transition-all text-sm font-medium disabled:opacity-50"
                >
                  <Download className="w-4 h-4" />
                  {exporting ? 'Exporting...' : 'Export CSV'}
                </button>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#F5F2EA]">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-[#5C5B77] uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-[#5C5B77] uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-[#5C5B77] uppercase tracking-wider">Country</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-[#5C5B77] uppercase tracking-wider">FitID</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-[#5C5B77] uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-[#5C5B77] uppercase tracking-wider">Submitted</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {users.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-[#5C5B77]">
                      <div className="flex flex-col items-center gap-2">
                        <Users className="w-8 h-8 text-[#5C5B77]/30" />
                        <p>No users found</p>
                        <p className="text-sm">Try adjusting your search or filters</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  users.map((user, index) => (
                    <motion.tr 
                      key={user._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.03 }}
                      className="hover:bg-[#F5F2EA]/50 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm font-medium text-[#323352]">{user.email}</td>
                      <td className="px-6 py-4 text-sm text-[#5C5B77]">{user.firstName || '—'}</td>
                      <td className="px-6 py-4 text-sm text-[#5C5B77]">{user.country}</td>
                      <td className="px-6 py-4 text-sm">{getFitIdBadge(user.fitId)}</td>
                      <td className="px-6 py-4 text-sm">{getEmailStatusBadge(user.emailStatus)}</td>
                      <td className="px-6 py-4 text-sm text-[#5C5B77] text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Calendar className="w-3 h-3" />
                          {new Date(user.createdAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </div>
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {pagination.total > 0 && (
            <div className="px-6 py-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-[#5C5B77]">
                Showing <span className="font-medium">{(pagination.page - 1) * 20 + 1}</span> to{' '}
                <span className="font-medium">{Math.min(pagination.page * 20, pagination.total)}</span> of{' '}
                <span className="font-medium">{pagination.total}</span> users
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
                  disabled={pagination.page === 1}
                  className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-4 h-4 text-[#5C5B77]" />
                </button>
                <span className="text-sm font-medium text-[#323352] px-3 py-1 bg-[#F5F2EA] rounded-lg">
                  {pagination.page} / {pagination.pages}
                </span>
                <button
                  onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                  disabled={pagination.page === pagination.pages}
                  className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight className="w-4 h-4 text-[#5C5B77]" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-xs text-[#5C5B77]">
          <p>© {new Date().getFullYear()} Threadline. All rights reserved.</p>
        </div>
      </main>
    </div>
  );
};