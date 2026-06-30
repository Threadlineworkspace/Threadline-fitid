import User from '../models/User.js';
import Admin from '../models/Admin.js';
import jwt from 'jsonwebtoken';

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    // Find admin
    const admin = await Admin.findOne({ email: email.toLowerCase().trim() });
    if (!admin) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check password
    const isValid = await admin.comparePassword(password);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check if active
    if (!admin.isActive) {
      return res.status(403).json({ error: 'Account disabled' });
    }

    // Update last login
    admin.lastLogin = new Date();
    await admin.save();

    // Generate JWT
    const token = jwt.sign(
      { 
        id: admin._id, 
        email: admin.email, 
        role: admin.role 
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE || '7d' }
    );

    res.json({
      success: true,
      data: {
        token,
        admin: {
          email: admin.email,
          role: admin.role
        }
      }
    });

  } catch (error) {
    console.error('❌ Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
};

/**
 * Get all users (with filters)
 * GET /api/admin/users
 */
export const getUsers = async (req, res) => {
  try {
    const { 
      search, 
      fitId, 
      country, 
      startDate, 
      endDate,
      page = 1,
      limit = 20
    } = req.query;

    // Build filter
    const filter = {};
    
    if (search) {
      filter.$or = [
        { email: { $regex: search, $options: 'i' } },
        { firstName: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (fitId) {
      filter.fitId = fitId;
    }
    
    if (country) {
      filter.country = country;
    }
    
    if (startDate || endDate) {
      filter.createdAt = {};
      if (startDate) filter.createdAt.$gte = new Date(startDate);
      if (endDate) filter.createdAt.$lte = new Date(endDate);
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const [users, total] = await Promise.all([
      User.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit)),
      User.countDocuments(filter)
    ]);

    res.json({
      success: true,
      data: {
        users,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / parseInt(limit))
        }
      }
    });

  } catch (error) {
    console.error('❌ Get users error:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

/**
 * Get user by ID
 * GET /api/admin/user/:id
 */
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json({ success: true, data: user });
  } catch (error) {
    console.error('❌ Get user error:', error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};

/**
 * Export users as CSV
 * GET /api/admin/export
 */
export const exportUsersCSV = async (req, res) => {
  try {
    const { fitId, country, startDate, endDate } = req.query;

    // Build filter
    const filter = {};
    if (fitId) filter.fitId = fitId;
    if (country) filter.country = country;
    if (startDate || endDate) {
      filter.createdAt = {};
      if (startDate) filter.createdAt.$gte = new Date(startDate);
      if (endDate) filter.createdAt.$lte = new Date(endDate);
    }

    const users = await User.find(filter).sort({ createdAt: -1 });

    if (users.length === 0) {
      return res.status(404).json({ error: 'No users found for export' });
    }

    // Define CSV headers
    const headers = [
      'Email',
      'First Name',
      'Country',
      'Trouser Size',
      'Trouser Fit',
      'Fit Issues',
      'Body Distribution',
      'Work Type',
      'Movements',
      'Fit Preference',
      'Body Scan Interest',
      'Smartphone',
      'FitID',
      'Email Status',
      'Email Sent At',
      'Submitted At'
    ];

    // Build CSV rows
    const rows = users.map(user => [
      user.email,
      user.firstName || '',
      user.country,
      user.trouserSize === 'Other' ? user.trouserSizeOther || 'Other' : user.trouserSize,
      user.trouserFit,
      (user.fitIssues || []).join('; '),
      user.bodyDistribution,
      user.workType === 'Other' ? user.workTypeOther || 'Other' : user.workType,
      (user.movements || []).join('; '),
      user.fitPreference,
      user.bodyScanInterest,
      user.smartphone,
      user.fitId,
      user.emailStatus,
      user.emailSentAt ? new Date(user.emailSentAt).toISOString() : '',
      new Date(user.createdAt).toISOString()
    ]);

    // Build CSV string
    let csv = headers.join(',') + '\n';
    rows.forEach(row => {
      csv += row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',') + '\n';
    });

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename=threadline-users-${new Date().toISOString().split('T')[0]}.csv`);
    res.send(csv);

  } catch (error) {
    console.error('❌ Export error:', error);
    res.status(500).json({ error: 'Failed to export users' });
  }
};

/**
 * Get dashboard stats
 * GET /api/admin/stats
 */
export const getStats = async (req, res) => {
  try {
    const [total, lift, triangle, rectangle, sent, failed] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ fitId: 'Lift' }),
      User.countDocuments({ fitId: 'Triangle' }),
      User.countDocuments({ fitId: 'Rectangle' }),
      User.countDocuments({ emailStatus: 'SENT' }),
      User.countDocuments({ emailStatus: 'FAILED' })
    ]);

    res.json({
      success: true,
      data: {
        total,
        lift,
        triangle,
        rectangle,
        emailSent: sent,
        emailFailed: failed,
        liftPercentage: total ? Math.round((lift / total) * 100) : 0,
        trianglePercentage: total ? Math.round((triangle / total) * 100) : 0,
        rectanglePercentage: total ? Math.round((rectangle / total) * 100) : 0
      }
    });

  } catch (error) {
    console.error('❌ Stats error:', error);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
};
