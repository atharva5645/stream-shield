import User from '../models/User.js';
import Notification from '../models/Notification.js';
import { emitNotification } from '../sockets/socketHandler.js';

// @desc    Get all pending editor requests
// @route   GET /api/admin/editor-requests
// @access  Private/Admin
export const getPendingEditorRequests = async (req, res, next) => {
  try {
    const requests = await User.find({ editorRequestStatus: 'pending' })
      .select('-password')
      .sort({ updatedAt: -1 });

    res.status(200).json({
      success: true,
      count: requests.length,
      requests,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Approve an editor request
// @route   PUT /api/admin/editor-requests/:id/approve
// @access  Private/Admin
export const approveEditorRequest = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      res.status(404);
      return next(new Error('User not found'));
    }

    if (user.editorRequestStatus !== 'pending') {
      res.status(400);
      return next(new Error('This user does not have a pending request'));
    }

    user.role = 'editor';
    user.editorRequestStatus = 'none';
    await user.save();

    // Create a persistent notification in DB
    const notification = await Notification.create({
      userId: user._id,
      title: 'Creator Access Granted!',
      message: 'Your request to switch from Viewer to Creator/Editor has been approved by the admin. You can now upload and manage videos!',
      type: 'success',
    });

    // Emit real-time socket notification
    const io = req.app.get('io');
    if (io) {
      emitNotification(io, user._id.toString(), notification);
    }

    res.status(200).json({
      success: true,
      message: 'Editor request approved successfully',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Reject an editor request
// @route   PUT /api/admin/editor-requests/:id/reject
// @access  Private/Admin
export const rejectEditorRequest = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      res.status(404);
      return next(new Error('User not found'));
    }

    if (user.editorRequestStatus !== 'pending') {
      res.status(400);
      return next(new Error('This user does not have a pending request'));
    }

    user.editorRequestStatus = 'rejected';
    await user.save();

    // Create a persistent notification in DB
    const notification = await Notification.create({
      userId: user._id,
      title: 'Creator Request Not Approved',
      message: 'Your request to switch to Creator/Editor mode was not approved by the admin at this time. Please contact support for more information.',
      type: 'warning',
    });

    // Emit real-time socket notification
    const io = req.app.get('io');
    if (io) {
      emitNotification(io, user._id.toString(), notification);
    }

    res.status(200).json({
      success: true,
      message: 'Editor request rejected',
    });
  } catch (error) {
    next(error);
  }
};
