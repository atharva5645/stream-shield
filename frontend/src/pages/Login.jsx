import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate network request
    setTimeout(() => {
      // In a real app, this would redirect. For now, we redirect to dashboard.
      setIsLoading(false);
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <main className="flex w-full h-screen">
      {/* Left Side: Branding & Features (Hidden on mobile) */}
      <section className="hidden lg:flex w-1/2 relative bg-gradient-to-br from-[#4f46e5] to-[#3525cd] flex-col justify-between p-2xl overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9IiNmZmYiLz48L3N2Zz4=')] bg-[length:24px_24px]"></div>
        <div className="absolute -bottom-1/4 -right-1/4 w-3/4 h-3/4 rounded-full bg-white opacity-5 blur-[120px]"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-sm mb-lg">
            <span className="material-symbols-outlined text-on-primary text-[32px] fill">smart_display</span>
            <h1 className="font-headline-lg text-headline-lg text-on-primary">StreamOps SaaS</h1>
          </div>
          <p className="font-title-lg text-title-lg text-on-primary/80 max-w-md">Enterprise video delivery and oversight infrastructure.</p>
        </div>
        
        <div className="relative z-10 flex flex-col gap-xl">
          {/* Feature 1 */}
          <div className="flex items-start gap-md group">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0 border border-white/20 transition-transform duration-300 group-hover:-translate-y-1">
              <span className="material-symbols-outlined text-on-primary">bolt</span>
            </div>
            <div>
              <h3 className="font-title-md text-title-md text-on-primary mb-xs">Real-time Processing</h3>
              <p className="font-body-md text-body-md text-on-primary/70">Instant transcoding and delivery across global edge networks with sub-second latency.</p>
            </div>
          </div>
          {/* Feature 2 */}
          <div className="flex items-start gap-md group">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0 border border-white/20 transition-transform duration-300 group-hover:-translate-y-1">
              <span className="material-symbols-outlined text-on-primary">admin_panel_settings</span>
            </div>
            <div>
              <h3 className="font-title-md text-title-md text-on-primary mb-xs">Granular RBAC</h3>
              <p className="font-body-md text-body-md text-on-primary/70">Strict access controls, role assignments, and comprehensive audit logging for enterprise security.</p>
            </div>
          </div>
          {/* Feature 3 */}
          <div className="flex items-start gap-md group">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0 border border-white/20 transition-transform duration-300 group-hover:-translate-y-1">
              <span className="material-symbols-outlined text-on-primary">shield_lock</span>
            </div>
            <div>
              <h3 className="font-title-md text-title-md text-on-primary mb-xs">Secure Streaming</h3>
              <p className="font-body-md text-body-md text-on-primary/70">End-to-end encryption, DRM support, and dynamic watermarking to protect your assets.</p>
            </div>
          </div>
        </div>
        
        <div className="relative z-10">
          <p className="font-label-md text-label-md text-on-primary/60">© 2024 StreamOps SaaS. All rights reserved.</p>
        </div>
      </section>

      {/* Right Side: Login Form */}
      <section className="w-full lg:w-1/2 flex items-center justify-center bg-surface-dim p-margin-mobile md:p-margin-desktop relative">
        {/* Mobile Brand Header (Visible only on mobile) */}
        <div className="absolute top-margin-mobile left-margin-mobile flex lg:hidden items-center gap-sm">
          <span className="material-symbols-outlined text-primary text-[24px] fill">smart_display</span>
          <span className="font-title-md text-title-md text-on-surface">StreamOps SaaS</span>
        </div>
        
        <div className="w-full max-w-md">
          <div className="bg-surface-container-lowest rounded-2xl shadow-[0px_10px_15px_-3px_rgba(15,23,42,0.08)] border border-outline-variant/30 p-lg md:p-xl transition-all duration-300 hover:shadow-[0px_20px_25px_-5px_rgba(15,23,42,0.12)]">
            <div className="mb-lg text-center lg:text-left">
              <h2 className="font-headline-md text-headline-md text-on-surface mb-xs">Welcome Back</h2>
              <p className="font-body-md text-body-md text-on-surface-variant">Sign in to your administration workspace.</p>
            </div>
            
            <form className="space-y-lg" onSubmit={handleSubmit}>
              <div className="space-y-sm">
                <label className="block font-label-md text-label-md text-on-surface-variant uppercase tracking-wider" htmlFor="email">Email Address</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-outline">mail</span>
                  <input 
                    className="w-full pl-10 pr-sm py-[10px] bg-surface-container-lowest border border-outline-variant rounded-lg font-body-md text-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary-container/20 transition-all duration-200 placeholder:text-outline-variant" 
                    id="email" 
                    name="email" 
                    placeholder="admin@streamops.com" 
                    required 
                    type="email" 
                  />
                </div>
              </div>
              
              <div className="space-y-sm">
                <div className="flex justify-between items-center">
                  <label className="block font-label-md text-label-md text-on-surface-variant uppercase tracking-wider" htmlFor="password">Password</label>
                  <a className="font-label-md text-label-md text-primary hover:text-primary-container transition-colors" href="#">Forgot password?</a>
                </div>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-outline">lock</span>
                  <input 
                    className="w-full pl-10 pr-sm py-[10px] bg-surface-container-lowest border border-outline-variant rounded-lg font-body-md text-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary-container/20 transition-all duration-200 placeholder:text-outline-variant" 
                    id="password" 
                    name="password" 
                    placeholder="••••••••" 
                    required 
                    type="password" 
                  />
                </div>
              </div>
              
              <button 
                className={`w-full bg-primary hover:bg-primary-container text-on-primary font-title-md text-title-md py-[10px] px-lg rounded-lg border-t border-white/20 shadow-sm transition-all duration-200 flex justify-center items-center gap-sm active:scale-[0.98] ${isLoading ? 'opacity-90 cursor-not-allowed' : ''}`} 
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="material-symbols-outlined animate-spin text-[18px]">progress_activity</span>
                    <span>Authenticating...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </>
                )}
              </button>
            </form>
            
            <div className="mt-lg pt-lg border-t border-outline-variant/30">
              <div className="flex items-start gap-sm bg-surface-container-low p-sm rounded-lg">
                <span className="material-symbols-outlined text-secondary text-[20px] shrink-0 mt-0.5">info</span>
                <p className="font-body-md text-body-md text-on-surface-variant text-sm">
                  <strong>Demo Mode:</strong> Use any email/password combination. Roles (Admin, Editor, Viewer) can be switched later in the dashboard.
                </p>
              </div>
            </div>
            
          </div>
        </div>
      </section>
    </main>
  );
};

export default Login;
