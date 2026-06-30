import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Admin from '../models/Admin.js';

dotenv.config();

const createAdmin = async () => {
  try {
    // Connect without deprecated options
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB Atlas');
    
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@threadline.work';
    const adminPassword = process.env.ADMIN_PASSWORD || 'TempAdmin123!';
    
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: adminEmail });
    if (existingAdmin) {
      console.log('⚠️ Admin already exists:', adminEmail);
      await mongoose.disconnect();
      process.exit(0);
    }
    
    // Create admin
    const admin = new Admin({
      email: adminEmail,
      password: adminPassword,
      role: 'superadmin',
      isActive: true
    });
    
    await admin.save();
    console.log('✅ Admin created successfully:');
    console.log(`   Email: ${adminEmail}`);
    console.log(`   Password: ${adminPassword}`);
    console.log('   Please change password on first login!');
    
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating admin:', error);
    process.exit(1);
  }
};

createAdmin();