import Video from '../models/Video.js';
import {
  emitProcessingStarted,
  emitProcessingProgress,
  emitProcessingCompleted,
} from '../sockets/socketHandler.js';

/**
 * Simulates a video processing queue and AI sensitivity analysis
 * @param {Object} io - Socket.io instance
 * @param {String} userId - ID of the user who uploaded the video
 * @param {String} videoId - MongoDB ID of the video
 */
export const processVideoAsync = async (io, userId, videoId) => {
  try {
    // 1. Notify user that processing has started
    emitProcessingStarted(io, userId, { videoId });

    // Update DB status to processing
    await Video.findByIdAndUpdate(videoId, { status: 'processing' });

    // 2. Simulate processing progress over 10 seconds (5 steps)
    const steps = 5;
    for (let i = 1; i <= steps; i++) {
      // Wait 2 seconds per step
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      const percent = (i / steps) * 100;
      
      // Emit progress event
      emitProcessingProgress(io, userId, {
        videoId,
        percent,
        message: `Analyzing content... ${percent}%`,
      });
    }

    // 3. Simulate AI Sensitivity Classification
    // In a real app, this would be an API call to a vision AI model
    // Here we'll randomly flag 20% of videos, or safe 80%
    const isFlagged = Math.random() < 0.2;
    const finalSensitivity = isFlagged ? 'flagged' : 'safe';

    // 4. Update Database with final results
    const updatedVideo = await Video.findByIdAndUpdate(
      videoId,
      {
        status: 'completed',
        sensitivity: finalSensitivity,
      },
      { new: true }
    );

    // 5. Notify user that processing is complete
    emitProcessingCompleted(io, userId, {
      videoId: updatedVideo._id,
      sensitivity: updatedVideo.sensitivity,
      status: updatedVideo.status,
    });

    console.log(`Video processing completed for ${videoId}. Result: ${finalSensitivity}`);

  } catch (error) {
    console.error(`Error processing video ${videoId}:`, error);
    
    // Attempt to mark as failed in DB
    try {
      await Video.findByIdAndUpdate(videoId, { status: 'failed' });
    } catch (e) {
      console.error('Failed to update status to failed', e);
    }
  }
};
