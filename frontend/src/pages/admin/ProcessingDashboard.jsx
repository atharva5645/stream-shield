import React from 'react';
import ProcessingQueue from '../../components/admin/processing/ProcessingQueue';
import LiveActivityFeed from '../../components/admin/processing/LiveActivityFeed';
import SocketConnectionIndicator from '../../components/admin/processing/SocketConnectionIndicator';
import { useSocket } from '../../context/SocketContext';

const ProcessingDashboard = () => {
  const { isSimulating, setIsSimulating } = useSocket();

  return (
    <div className="min-h-screen bg-[#0a0c10] text-gray-200 -mt-8 -mx-8 p-8 font-sans">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Video Processing Pipeline</h1>
          <p className="text-gray-400">Real-time monitoring of video ingestion and encoding queues.</p>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsSimulating(!isSimulating)}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-sm font-medium transition-colors"
          >
            {isSimulating ? 'Stop Simulation' : 'Start Simulation'}
          </button>
          <SocketConnectionIndicator />
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[calc(100vh-180px)]">
        
        {/* Left Column: Active Queue (Takes up 2 columns on large screens) */}
        <div className="lg:col-span-2 h-full">
          <ProcessingQueue />
        </div>

        {/* Right Column: Live Activity Feed */}
        <div className="h-full">
          <LiveActivityFeed />
        </div>

      </div>
    </div>
  );
};

export default ProcessingDashboard;
