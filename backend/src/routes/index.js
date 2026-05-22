import express from 'express';
import authRoutes from './authRoutes.js';
import videoRoutes from './videoRoutes.js';
import streamRoutes from './streamRoutes.js';
import dashboardRoutes from './dashboardRoutes.js';

const router = express.Router();

// Mount routers
router.use('/auth', authRoutes);
router.use('/videos', videoRoutes);
router.use('/stream', streamRoutes);
router.use('/dashboard', dashboardRoutes);

/**
 * @route GET /api/health
 * @desc Check API health status
 * @access Public
 */
router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'VaultStream API is running',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

export default router;
