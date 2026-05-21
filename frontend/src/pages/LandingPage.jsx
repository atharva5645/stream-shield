import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Menu, X, Video, Upload, Shield, Play, Users, Check, 
  Activity, Star, ChevronRight, Eye, Edit3, Settings, ArrowRight
} from 'lucide-react';
import { FaTwitter as Twitter, FaGithub as Github, FaLinkedin as Linkedin } from 'react-icons/fa';

const LandingPage = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* 1. Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="bg-indigo-600 p-2 rounded-lg text-white">
                <Video size={24} />
              </div>
              <span className="font-bold text-xl tracking-tight">VideoVault</span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">Product</a>
              <a href="#" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">Features</a>
              <a href="#" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">Pricing</a>
              <a href="#" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">Resources</a>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <Link to="/register" className="text-gray-600 hover:text-gray-900 font-medium">Sign In</Link>
              <Link to="/register" className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-all shadow-sm hover:shadow">
                Start Free Trial
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-600 hover:text-gray-900 focus:outline-none"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-gray-100 px-4 pt-2 pb-4 space-y-1">
            <a href="#" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50 rounded-md">Product</a>
            <a href="#" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50 rounded-md">Features</a>
            <a href="#" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50 rounded-md">Pricing</a>
            <a href="#" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50 rounded-md">Resources</a>
            <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col space-y-2">
              <Link to="/register" className="block px-3 py-2 text-base font-medium text-center text-gray-700 hover:bg-gray-50 rounded-md">Sign In</Link>
              <Link to="/register" className="block w-full bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium text-center hover:bg-indigo-700 transition-all">
                Start Free Trial
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* 2. Hero Section */}
      <section className="relative bg-white pt-16 pb-24 lg:pt-24 lg:pb-32 overflow-hidden border-b border-gray-100">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-indigo-50 blur-3xl opacity-50 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column */}
            <div className="flex flex-col items-start space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-sm font-medium border border-indigo-100">
                <span className="flex h-2 w-2 rounded-full bg-indigo-600"></span>
                Launching Soon 2.0
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 leading-[1.1]">
                Secure Video Management for <span className="text-indigo-600">Modern Teams</span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 max-w-lg leading-relaxed">
                Upload, analyze, stream, and collaborate – all in one enterprise-grade platform with real-time processing and role-based access.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-2">
                <Link to="/register" className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-medium text-lg hover:bg-indigo-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center">
                Start your 14-day free trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
                <button 
                  onClick={() => alert('Demo requested')}
                  className="w-full sm:w-auto bg-white text-gray-900 border border-gray-200 px-8 py-3.5 rounded-lg font-medium hover:bg-gray-50 transition-all shadow-sm hover:shadow flex items-center justify-center"
                >
                  Request Demo
                </button>
              </div>
              
              <div className="pt-8 flex items-center gap-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className={`w-10 h-10 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-500 z-[${5-i}] overflow-hidden`}>
                      <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="avatar" />
                    </div>
                  ))}
                </div>
                <div className="text-sm text-gray-600 font-medium">
                  Trusted by <span className="text-gray-900 font-bold">500+</span> creative teams
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="relative w-full aspect-video rounded-2xl border border-gray-200 shadow-xl overflow-hidden bg-gray-900 group cursor-pointer" onClick={() => alert('Demo video would play here')}>
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-900/80 to-purple-900/40 z-10 group-hover:opacity-80 transition-opacity"></div>
              <img src="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80" alt="Platform Dashboard" className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay" />
              
              <div className="absolute inset-0 z-20 flex items-center justify-center">
                <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform duration-300">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-indigo-600 shadow-lg">
                    <Play size={28} className="ml-1" fill="currentColor" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Feature Section */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Everything you need to manage video content</h2>
          <p className="text-lg text-gray-600">Powerful tools for upload, processing, streaming, and collaboration designed for scale.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Feature Card 1 */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition p-8 flex flex-col items-start text-left">
            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-6">
              <Upload size={24} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Smart Upload & Processing</h3>
            <p className="text-gray-600 leading-relaxed">Lightning-fast uploads with automatic transcoding and multi-resolution generation out of the box.</p>
          </div>

          {/* Feature Card 2 */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition p-8 flex flex-col items-start text-left">
            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-6">
              <Shield size={24} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Enterprise Security</h3>
            <p className="text-gray-600 leading-relaxed">End-to-end encryption, advanced DRM, and strict access controls keep your IP completely safe.</p>
          </div>

          {/* Feature Card 3 */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition p-8 flex flex-col items-start text-left">
            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-6">
              <Play size={24} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Global CDN Streaming</h3>
            <p className="text-gray-600 leading-relaxed">Deliver buffer-free video globally through our massively distributed edge streaming network.</p>
          </div>
        </div>

        {/* Highlight Card */}
        <div className="bg-indigo-600 rounded-2xl shadow-xl overflow-hidden text-white relative">
          <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-indigo-500 to-transparent opacity-30"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center p-8 md:p-12 relative z-10">
            <div>
              <div className="flex items-center gap-2 text-indigo-200 mb-4 font-medium">
                <Activity size={20} /> Real-time capabilities
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Real-time sensitivity analysis</h3>
              <p className="text-indigo-100 text-lg mb-6 leading-relaxed">
                Our AI instantly scans uploads for sensitive content, flagging timestamps and generating automated content warnings before publishing.
              </p>
              <button className="bg-white text-indigo-600 px-6 py-2.5 rounded-lg font-medium hover:bg-indigo-50 transition-colors shadow-sm">
                Explore AI Features
              </button>
            </div>
            <div className="hidden md:flex justify-end">
              <div className="w-full max-w-sm bg-indigo-800/50 backdrop-blur-sm rounded-xl border border-indigo-500/30 p-6 shadow-2xl">
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm text-indigo-200">
                    <span>Analysis Progress</span>
                    <span>87%</span>
                  </div>
                  <div className="w-full bg-indigo-950/50 rounded-full h-2">
                    <div className="bg-green-400 h-2 rounded-full w-[87%]"></div>
                  </div>
                  <div className="space-y-2 mt-4">
                    <div className="flex items-center gap-3 text-sm bg-indigo-900/40 p-2 rounded-lg">
                      <Check size={16} className="text-green-400" />
                      <span>Audio Transcription</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm bg-indigo-900/40 p-2 rounded-lg">
                      <Check size={16} className="text-green-400" />
                      <span>Object Detection</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm bg-indigo-900/40 p-2 rounded-lg border border-indigo-400/30">
                      <Activity size={16} className="text-indigo-300 animate-pulse" />
                      <span>Sensitivity Scanning...</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. How It Works */}
      <section className="bg-white py-16 md:py-24 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How it works</h2>
            <p className="text-lg text-gray-600">From raw file to global audience in three simple steps.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-gray-100"></div>
            
            {/* Step 1 */}
            <div className="relative text-center flex flex-col items-center">
              <div className="w-24 h-24 bg-white rounded-full border-4 border-indigo-50 flex items-center justify-center shadow-sm relative z-10 mb-6 text-indigo-600">
                <Upload size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">1. Upload Video</h3>
              <p className="text-gray-600">Drag and drop raw footage up to 4K resolution. We handle the heavy lifting instantly.</p>
            </div>

            {/* Step 2 */}
            <div className="relative text-center flex flex-col items-center">
              <div className="w-24 h-24 bg-white rounded-full border-4 border-indigo-50 flex items-center justify-center shadow-sm relative z-10 mb-6 text-indigo-600">
                <Activity size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">2. AI Analysis</h3>
              <p className="text-gray-600">Our engine transcodes, captions, and flags sensitive material completely automatically.</p>
            </div>

            {/* Step 3 */}
            <div className="relative text-center flex flex-col items-center">
              <div className="w-24 h-24 bg-white rounded-full border-4 border-indigo-50 flex items-center justify-center shadow-sm relative z-10 mb-6 text-indigo-600">
                <Users size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">3. Stream & Share</h3>
              <p className="text-gray-600">Publish securely to assigned roles or embed the lightning-fast player anywhere.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Role-Based Access Showcase */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Granular Access Control</h2>
          <p className="text-lg text-gray-600">Ensure the right people have the exact right permissions across your workspace.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Viewer */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition p-8">
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
                <Eye size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Viewer</h3>
                <p className="text-sm text-gray-500">Read-only consumption</p>
              </div>
            </div>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Check size={20} className="text-green-500 shrink-0 mt-0.5" />
                <span className="text-gray-600">Watch approved videos</span>
              </li>
              <li className="flex items-start gap-3">
                <Check size={20} className="text-green-500 shrink-0 mt-0.5" />
                <span className="text-gray-600">View safe/flagged badges</span>
              </li>
              <li className="flex items-start gap-3">
                <Check size={20} className="text-green-500 shrink-0 mt-0.5" />
                <span className="text-gray-600">Comment on specific timestamps</span>
              </li>
            </ul>
          </div>

          {/* Editor */}
          <div className="bg-white rounded-2xl border-2 border-indigo-600 shadow-md hover:shadow-lg transition p-8 relative">
            <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
              Standard
            </div>
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center">
                <Edit3 size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Editor</h3>
                <p className="text-sm text-gray-500">Content management</p>
              </div>
            </div>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Check size={20} className="text-indigo-600 shrink-0 mt-0.5" />
                <span className="text-gray-900 font-medium">All Viewer permissions</span>
              </li>
              <li className="flex items-start gap-3">
                <Check size={20} className="text-green-500 shrink-0 mt-0.5" />
                <span className="text-gray-600">Upload & delete videos</span>
              </li>
              <li className="flex items-start gap-3">
                <Check size={20} className="text-green-500 shrink-0 mt-0.5" />
                <span className="text-gray-600">Monitor real-time processing</span>
              </li>
              <li className="flex items-start gap-3">
                <Check size={20} className="text-green-500 shrink-0 mt-0.5" />
                <span className="text-gray-600">Manage metadata & tags</span>
              </li>
            </ul>
          </div>

          {/* Admin */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition p-8">
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
              <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center">
                <Settings size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Admin</h3>
                <p className="text-sm text-gray-500">Full workspace control</p>
              </div>
            </div>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Check size={20} className="text-purple-600 shrink-0 mt-0.5" />
                <span className="text-gray-900 font-medium">All Editor permissions</span>
              </li>
              <li className="flex items-start gap-3">
                <Check size={20} className="text-green-500 shrink-0 mt-0.5" />
                <span className="text-gray-600">Invite & remove users</span>
              </li>
              <li className="flex items-start gap-3">
                <Check size={20} className="text-green-500 shrink-0 mt-0.5" />
                <span className="text-gray-600">Manage billing & limits</span>
              </li>
              <li className="flex items-start gap-3">
                <Check size={20} className="text-green-500 shrink-0 mt-0.5" />
                <span className="text-gray-600">Access audit logs</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 6. Pricing Section */}
      <section className="bg-white py-16 md:py-24 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Simple, transparent pricing</h2>
            <p className="text-lg text-gray-600">No hidden fees. Scale your video infrastructure as your team grows.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition p-8 flex flex-col">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Free</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-gray-900">$0</span>
                  <span className="text-gray-500 font-medium">/mo</span>
                </div>
                <p className="text-sm text-gray-500 mt-3">Perfect for testing the waters.</p>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-start gap-3 text-gray-600"><Check size={20} className="text-indigo-500 shrink-0" /> Basic upload & streaming</li>
                <li className="flex items-start gap-3 text-gray-600"><Check size={20} className="text-indigo-500 shrink-0" /> 5GB Storage limit</li>
                <li className="flex items-start gap-3 text-gray-600"><Check size={20} className="text-indigo-500 shrink-0" /> Up to 2 team members</li>
              </ul>
              <button className="w-full bg-white text-indigo-600 border border-indigo-200 px-4 py-2.5 rounded-lg font-medium hover:bg-indigo-50 transition-colors">
                Get Started
              </button>
            </div>

            {/* Pro */}
            <div className="bg-indigo-900 rounded-2xl border border-indigo-800 shadow-xl hover:shadow-2xl transition p-8 flex flex-col relative scale-105 z-10">
              <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 bg-indigo-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                Most Popular
              </div>
              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-2">Pro</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-white">$29</span>
                  <span className="text-indigo-300 font-medium">/mo</span>
                </div>
                <p className="text-sm text-indigo-200 mt-3">For professional video teams.</p>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-start gap-3 text-indigo-50"><Check size={20} className="text-indigo-400 shrink-0" /> Advanced AI processing</li>
                <li className="flex items-start gap-3 text-indigo-50"><Check size={20} className="text-indigo-400 shrink-0" /> 100GB Storage limit</li>
                <li className="flex items-start gap-3 text-indigo-50"><Check size={20} className="text-indigo-400 shrink-0" /> Up to 10 team members</li>
                <li className="flex items-start gap-3 text-indigo-50"><Check size={20} className="text-indigo-400 shrink-0" /> Advanced RBAC controls</li>
              </ul>
              <button className="w-full bg-indigo-500 text-white px-4 py-2.5 rounded-lg font-bold hover:bg-indigo-400 transition-colors shadow-lg">
                Get Started
              </button>
            </div>

            {/* Enterprise */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition p-8 flex flex-col">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Enterprise</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-gray-900">Custom</span>
                </div>
                <p className="text-sm text-gray-500 mt-3">For large scale organizations.</p>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-start gap-3 text-gray-600"><Check size={20} className="text-indigo-500 shrink-0" /> Unlimited everything</li>
                <li className="flex items-start gap-3 text-gray-600"><Check size={20} className="text-indigo-500 shrink-0" /> Custom integrations</li>
                <li className="flex items-start gap-3 text-gray-600"><Check size={20} className="text-indigo-500 shrink-0" /> SAML SSO & SCIM</li>
                <li className="flex items-start gap-3 text-gray-600"><Check size={20} className="text-indigo-500 shrink-0" /> 24/7 Dedicated Support</li>
              </ul>
              <button className="w-full bg-white text-gray-900 border border-gray-300 px-4 py-2.5 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Testimonials */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-16">Loved by creative teams</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Testimonial 1 */}
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex gap-1 text-yellow-400 mb-6">
                {[1,2,3,4,5].map(i => <Star key={i} size={20} fill="currentColor" />)}
              </div>
              <p className="text-lg text-gray-700 italic mb-8">
                "VideoVault completely changed how our agency manages client deliveries. The automatic transcoding and secure streaming links save us dozens of hours a week."
              </p>
            </div>
            <div className="flex items-center gap-4">
              <img src="https://i.pravatar.cc/150?img=47" alt="User" className="w-12 h-12 rounded-full bg-gray-200" />
              <div>
                <h4 className="font-bold text-gray-900">Marcus Chen</h4>
                <p className="text-sm text-gray-500">Post-Production Lead, PixelHaus</p>
              </div>
            </div>
          </div>

          {/* Testimonial 2 */}
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex gap-1 text-yellow-400 mb-6">
                {[1,2,3,4,5].map(i => <Star key={i} size={20} fill="currentColor" />)}
              </div>
              <p className="text-lg text-gray-700 italic mb-8">
                "The AI sensitivity scanning gives our legal team immense peace of mind before we publish internally. A phenomenal enterprise product that feels like magic."
              </p>
            </div>
            <div className="flex items-center gap-4">
              <img src="https://i.pravatar.cc/150?img=32" alt="User" className="w-12 h-12 rounded-full bg-gray-200" />
              <div>
                <h4 className="font-bold text-gray-900">Elena Rostova</h4>
                <p className="text-sm text-gray-500">VP Communications, FinEdge</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Call-to-Action (CTA) */}
      <section className="bg-indigo-600 py-20 text-center px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to transform your video workflow?</h2>
          <p className="text-xl text-indigo-100 mb-10">Join hundreds of teams using VideoVault to manage their assets securely and efficiently.</p>
          <button 
            onClick={() => alert('Trial started')}
            className="bg-white text-indigo-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
          >
            Start free trial – no credit card required
          </button>
        </div>
      </section>

      {/* 9. Footer */}
      <footer className="bg-white pt-16 pb-8 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
            <div className="col-span-2 lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-indigo-600 p-1.5 rounded-lg text-white">
                  <Video size={20} />
                </div>
                <span className="font-bold text-xl tracking-tight text-gray-900">VideoVault</span>
              </div>
              <p className="text-gray-500 max-w-xs leading-relaxed mb-6">
                Enterprise-grade video management, streaming, and AI-powered analysis for modern organizations.
              </p>
              <div className="flex gap-4">
                <a href="#" className="text-gray-400 hover:text-indigo-600 transition-colors"><Twitter size={20} /></a>
                <a href="#" className="text-gray-400 hover:text-indigo-600 transition-colors"><Github size={20} /></a>
                <a href="#" className="text-gray-400 hover:text-indigo-600 transition-colors"><Linkedin size={20} /></a>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-gray-900 mb-4">Product</h4>
              <ul className="space-y-3 text-sm text-gray-600">
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Integrations</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Changelog</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-gray-900 mb-4">Resources</h4>
              <ul className="space-y-3 text-sm text-gray-600">
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">API Reference</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Community</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-gray-900 mb-4">Company</h4>
              <ul className="space-y-3 text-sm text-gray-600">
                <li><a href="#" className="hover:text-indigo-600 transition-colors">About</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Legal</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">© 2026 VideoVault Inc. All rights reserved.</p>
            <div className="flex gap-4 text-sm text-gray-500">
              <a href="#" className="hover:text-gray-900 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-gray-900 transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
