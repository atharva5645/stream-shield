import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import User from './src/models/User.js';

dotenv.config();

const updateAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      maxPoolSize: 10,
    });
    console.log('MongoDB Connected');

    const adminEmail = 'vaultstream@gmail.com';
    const adminPassword = '1234567';

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(adminPassword, salt);

    // Update any existing admin to the new email and password
    const result = await User.findOneAndUpdate(
      { role: 'admin' },
      { email: adminEmail, password: hashedPassword },
      { new: true }
    );

    if (result) {
      console.log('Admin user updated successfully to vaultstream@gmail.com');
    } else {
      console.log('No admin user found to update');
      // Create if it doesn't exist
      await User.create({
        name: 'Super Admin',
        email: adminEmail,
        password: adminPassword,
        role: 'admin'
      });
      console.log('Created new admin user vaultstream@gmail.com');
    }

    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

updateAdmin();
