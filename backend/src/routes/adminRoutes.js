import express from 'express';
import {
  getPendingEditorRequests,
  approveEditorRequest,
  rejectEditorRequest,
} from '../controllers/adminController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

// All admin routes must be protected and restricted to 'admin' role
router.use(protect);
router.use(authorize('admin'));

router.get('/editor-requests', getPendingEditorRequests);
router.put('/editor-requests/:id/approve', approveEditorRequest);
router.put('/editor-requests/:id/reject', rejectEditorRequest);

export default router;
