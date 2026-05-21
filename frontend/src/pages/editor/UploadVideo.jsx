import React, { useState } from 'react';
import { Upload, Loader2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import BackButton from '../../components/common/BackButton';

const UploadVideo = () => {
  const [dragActive, setDragActive] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const { role } = useAuth();

  return (
    <div className="max-w-4xl mx-auto">
      <BackButton to={`/${role}/dashboard`} label="Back to Dashboard" />
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Upload Video</h2>
      
      <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm">
        {showSuccess ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Video Uploaded Successfully!</h3>
            <p className="text-gray-500 mb-6">Your video "{title}" has been added to your dashboard.</p>
            <button
              onClick={() => {
                setShowSuccess(false);
                setTitle('');
                setFile(null);
              }}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium"
            >
              Upload Another Video
            </button>
          </div>
        ) : (
          <form className="space-y-6" onSubmit={(e) => { 
            e.preventDefault(); 
            if (!file) return alert('Please select a video file to upload.');
            setIsUploading(true); 
            setTimeout(() => {
              setIsUploading(false);
              setShowSuccess(true);
              
              const existingVideos = JSON.parse(localStorage.getItem('mockVideos') || '[]');
              const newVideo = {
                id: Math.random().toString(36).substr(2, 9),
                title,
                fileName: file.name,
                size: file.size,
                date: new Date().toISOString(),
                status: 'Processed', // Changed to Processed to allow instant playback
                videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' // Mock video url
              };
              localStorage.setItem('mockVideos', JSON.stringify([...existingVideos, newVideo]));
            }, 2000); 
          }}>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 block">Video Title *</label>
            <input 
              type="text" 
              placeholder="Enter video title" 
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all shadow-sm"
            />
          </div>

          <div 
            className={`relative border-2 border-dashed rounded-xl p-12 flex flex-col items-center justify-center text-center transition-all duration-200 cursor-pointer ${dragActive ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 bg-gray-50 hover:bg-gray-100 hover:border-gray-400'}`}
            onDragEnter={(e) => { e.preventDefault(); setDragActive(true); }}
            onDragLeave={(e) => { e.preventDefault(); setDragActive(false); }}
            onDrop={(e) => { 
              e.preventDefault(); 
              setDragActive(false);
              if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                setFile(e.dataTransfer.files[0]);
              }
            }}
            onDragOver={(e) => e.preventDefault()}
          >
            <input 
              type="file" 
              id="video-upload" 
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
              accept="video/*"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setFile(e.target.files[0]);
                }
              }}
            />
            {file ? (
              <>
                <div className="mb-4 text-green-500">
                  <svg className="w-10 h-10 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-gray-900 font-medium mb-1">{file.name}</h3>
                <p className="text-sm text-gray-500">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
              </>
            ) : (
              <>
                <div className="mb-4 text-indigo-500"><Upload size={40} /></div>
                <h3 className="text-gray-900 font-medium mb-1">Drag and drop your video here</h3>
                <p className="text-sm text-gray-500">or click to browse files</p>
              </>
            )}
          </div>

          <button 
            type="submit"
            disabled={isUploading}
            className="w-full py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2 bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm active:scale-[0.98] disabled:opacity-50"
          >
            {isUploading ? <><Loader2 size={18} className="animate-spin" /> Uploading...</> : 'Upload Video'}
          </button>
        </form>
        )}
      </div>
    </div>
  );
};

export default UploadVideo;
