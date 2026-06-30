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
  BarChart3
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';
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

  const token = localStorage.getItem('adminToken');

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
    }
  };

  useEffect(() => {
    fetchData();
  }, [pagination.page, filters]);

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
      
      // Create download link
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
      'Lift': { bg: 'bg-orange-100', text: 'text-orange-800', border: 'border-orange-200' },
      'Triangle': { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-200' },
      'Rectangle': { bg: 'bg-emerald-100', text: 'text-emerald-800', border: 'border-emerald-200' },
    };
    const style = styles[fitId] || styles['Rectangle'];
    return (
      <Badge className={`${style.bg} ${style.text} ${style.border} border`}>
        {fitId}
      </Badge>
    );
  };

  const getEmailStatusBadge = (status) => {
    const styles = {
      'SENT': { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-200' },
      'FAILED': { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-200' },
      'PENDING': { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-200' },
    };
    const style = styles[status] || styles['PENDING'];
    return (
      <Badge variant="outline" className={`${style.bg} ${style.text} ${style.border} border`}>
        {status}
      </Badge>
    );
  };

  if (loading && !stats) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center gap-3">
          <RefreshCw className="w-6 h-6 animate-spin text-primary" />
          <span className="text-muted-foreground">Loading dashboard...</span>
        </div>
      </div>
    );
  }

  const adminEmail = localStorage.getItem('adminEmail');

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-foreground">Threadline Admin</h1>
              <Badge variant="outline" className="text-xs">
                {localStorage.getItem('adminRole')}
              </Badge>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground hidden md:block">
                {adminEmail}
              </span>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
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
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Users
                </CardTitle>
                <Users className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.total}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  All time submissions
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Lift
                </CardTitle>
                <TrendingUp className="w-4 h-4 text-orange-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-orange-600">{stats.lift}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stats.liftPercentage}% of users
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Triangle
                </CardTitle>
                <BarChart3 className="w-4 h-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600">{stats.triangle}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stats.trianglePercentage}% of users
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Rectangle
                </CardTitle>
                <BarChart3 className="w-4 h-4 text-emerald-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-emerald-600">{stats.rectangle}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stats.rectanglePercentage}% of users
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Email Status
                </CardTitle>
                <Mail className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <div>
                    <div className="text-2xl font-bold text-green-600">{stats.emailSent}</div>
                    <p className="text-xs text-muted-foreground">Sent</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-red-600">{stats.emailFailed}</div>
                    <p className="text-xs text-muted-foreground">Failed</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Users Table */}
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <CardTitle>User Submissions</CardTitle>
              
              <div className="flex flex-wrap items-center gap-3">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by email or name..."
                    className="pl-9 w-[200px] md:w-[250px]"
                    value={filters.search}
                    onChange={(e) => handleSearch(e.target.value)}
                  />
                </div>

                {/* FitID Filter */}
                <Select
                  value={filters.fitId}
                  onValueChange={(value) => handleFilterChange('fitId', value)}
                >
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="All FitIDs" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All FitIDs</SelectItem>
                    <SelectItem value="Lift">Lift</SelectItem>
                    <SelectItem value="Triangle">Triangle</SelectItem>
                    <SelectItem value="Rectangle">Rectangle</SelectItem>
                  </SelectContent>
                </Select>

                {/* Export Button */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleExport}
                  disabled={exporting}
                  className="flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  {exporting ? 'Exporting...' : 'Export CSV'}
                </Button>

                {/* Refresh Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={fetchData}
                  className="flex items-center gap-2"
                >
                  <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[250px]">Email</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Country</TableHead>
                    <TableHead>FitID</TableHead>
                    <TableHead>Email Status</TableHead>
                    <TableHead className="text-right">Submitted</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                        No users found
                      </TableCell>
                    </TableRow>
                  ) : (
                    users.map((user) => (
                      <TableRow key={user._id}>
                        <TableCell className="font-medium">{user.email}</TableCell>
                        <TableCell>{user.firstName || '—'}</TableCell>
                        <TableCell>{user.country}</TableCell>
                        <TableCell>{getFitIdBadge(user.fitId)}</TableCell>
                        <TableCell>{getEmailStatusBadge(user.emailStatus)}</TableCell>
                        <TableCell className="text-right text-sm text-muted-foreground">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            {pagination.total > 0 && (
              <div className="flex items-center justify-between mt-4">
                <p className="text-sm text-muted-foreground">
                  Showing {(pagination.page - 1) * 20 + 1} to {Math.min(pagination.page * 20, pagination.total)} of {pagination.total} users
                </p>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
                    disabled={pagination.page === 1}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <span className="text-sm">
                    Page {pagination.page} of {pagination.pages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                    disabled={pagination.page === pagination.pages}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};