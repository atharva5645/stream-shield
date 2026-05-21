import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate network request
    setTimeout(() => {
      // In a real app, this would create account and redirect. For now, we redirect to dashboard.
      setIsLoading(false);
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <main className="flex min-h-screen w-full">
      {/* Left Panel: Branding / Image (Hidden on mobile, 50% width on desktop) */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-surface-dim items-center justify-center">
        {/* Background Image with highly detailed prompt */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-img-gradient" 
          data-alt="A highly abstract, modern 3D rendering of data streams and video nodes connecting in a sophisticated, ethereal network. The lighting is soft and cinematic, emphasizing a clean, light-mode aesthetic. The color palette revolves around crisp whites, soft silvers, and glowing accents of deep indigo and vibrant blue. The mood is cutting-edge, professional, and visually striking, representing enterprise-grade SaaS technology with a sense of order and structural hierarchy." 
          style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBFdPjpORS8KBHCyqeTZYwG2wFv8cdvcFz0cNA0Z0g0pJKACyhIRN7p3QV3YlXS7f9O57LzvJYrZllDotndZcO7AL_mPqV1PWqZmrsuzbdIw5bJvbAgKpmQqaJWxEPmNwDsEo_HR6ahl6x4-2ld6M66ORrfeB4WcebEmlYZ6zP5tIhbbUR-uTRc39NdM4NSGwZNbEATyN86NCFPiAppEnz1AC4EA8H3AzMxCxAaTzuxDjZ6GIL9H9RT_bjQpI7E-L2gBb8UmhgRcyFc')" }}
        >
        </div>
        
        <div className="relative z-10 px-margin-desktop max-w-lg text-on-primary">
          <div className="mb-lg flex items-center gap-sm">
            <span className="material-symbols-outlined text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }}>play_circle</span>
            <span className="font-headline-md text-headline-md font-bold tracking-tight">StreamOps</span>
          </div>
          
          <h1 className="font-display text-display mb-md">Enterprise video oversight, simplified.</h1>
          <p className="font-body-lg text-body-lg text-inverse-primary/80 mb-2xl">
            Join the premier platform for managing complex video assets, analytics, and library permissions with unparalleled clarity and efficiency.
          </p>
          
          {/* Testimonial/Trust Badge */}
          <div className="p-md rounded-xl bg-on-surface/10 backdrop-blur-md border border-on-primary/10">
            <p className="font-body-md text-body-md italic text-on-primary/90 mb-sm">"StreamOps transformed our editorial workflow. The granular role management alone saved us countless hours."</p>
            <div className="flex items-center gap-sm">
              <div className="h-8 w-8 rounded-full bg-surface-container-highest/30 flex items-center justify-center">
                <span className="material-symbols-outlined text-[16px]">person</span>
              </div>
              <div>
                <p className="font-label-md text-label-md">Sarah Jenkins</p>
                <p className="text-[12px] text-inverse-primary/70">VP of Media, TechCorp</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right Panel: Registration Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-margin-mobile md:p-margin-desktop bg-surface">
        <div className="w-full max-w-md">
          {/* Mobile Logo (Visible only on small screens) */}
          <div className="lg:hidden flex items-center gap-sm mb-xl justify-center text-primary">
            <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>play_circle</span>
            <span className="font-title-lg text-title-lg font-bold">StreamOps</span>
          </div>
          
          <div className="mb-xl text-center lg:text-left">
            <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-xs">Create your account</h2>
            <p className="font-body-md text-body-md text-on-surface-variant">Setup your workspace credentials to get started.</p>
          </div>
          
          <form className="space-y-lg" onSubmit={handleSubmit}>
            {/* Full Name */}
            <div className="space-y-xs">
              <label className="block font-label-md text-label-md text-on-surface-variant uppercase tracking-wider" htmlFor="fullName">Full Name</label>
              <input className="block w-full rounded-lg border border-outline-variant bg-surface-container-lowest px-md py-3 text-on-surface transition-colors duration-200 placeholder:text-outline focus:border-primary" id="fullName" name="fullName" placeholder="Jane Doe" required type="text" />
            </div>
            
            {/* Email */}
            <div className="space-y-xs">
              <label className="block font-label-md text-label-md text-on-surface-variant uppercase tracking-wider" htmlFor="email">Work Email</label>
              <input className="block w-full rounded-lg border border-outline-variant bg-surface-container-lowest px-md py-3 text-on-surface transition-colors duration-200 placeholder:text-outline focus:border-primary" id="email" name="email" placeholder="jane@company.com" required type="email" />
            </div>
            
            {/* Password Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
              <div className="space-y-xs">
                <label className="block font-label-md text-label-md text-on-surface-variant uppercase tracking-wider" htmlFor="password">Password</label>
                <div className="relative">
                  <input className="block w-full rounded-lg border border-outline-variant bg-surface-container-lowest px-md py-3 text-on-surface transition-colors duration-200 placeholder:text-outline focus:border-primary" id="password" name="password" placeholder="••••••••" required type="password" />
                </div>
              </div>
              <div className="space-y-xs">
                <label className="block font-label-md text-label-md text-on-surface-variant uppercase tracking-wider" htmlFor="confirmPassword">Confirm Password</label>
                <input className="block w-full rounded-lg border border-outline-variant bg-surface-container-lowest px-md py-3 text-on-surface transition-colors duration-200 placeholder:text-outline focus:border-primary" id="confirmPassword" name="confirmPassword" placeholder="••••••••" required type="password" />
              </div>
            </div>
            
            {/* Role Selection */}
            <div className="space-y-xs">
              <label className="block font-label-md text-label-md text-on-surface-variant uppercase tracking-wider" htmlFor="role">Initial Account Role</label>
              <div className="relative">
                <select className="appearance-none block w-full rounded-lg border border-outline-variant bg-surface-container-lowest px-md py-3 text-on-surface transition-colors duration-200 focus:border-primary cursor-pointer pr-10" id="role" name="role" required defaultValue="">
                  <option disabled value="">Select a role...</option>
                  <option value="viewer">Viewer (Read-only access)</option>
                  <option value="editor">Editor (Manage & modify content)</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-md text-outline">
                  <span className="material-symbols-outlined text-[20px]">expand_more</span>
                </div>
              </div>
              <p className="text-[12px] text-outline mt-1">Role identifiers govern default library permissions.</p>
            </div>
            
            {/* Terms & Conditions */}
            <div className="flex items-start gap-sm pt-sm">
              <div className="flex h-6 items-center">
                <input className="h-4 w-4 rounded border-outline-variant text-primary focus:ring-primary-container bg-surface-container-lowest cursor-pointer transition-colors duration-150" id="terms" name="terms" required type="checkbox" />
              </div>
              <div className="text-sm">
                <label className="font-body-md text-body-md text-on-surface-variant cursor-pointer" htmlFor="terms">
                  I agree to the <a className="font-medium text-primary hover:text-primary-container transition-colors underline underline-offset-2" href="#">Terms of Service</a> and <a className="font-medium text-primary hover:text-primary-container transition-colors underline underline-offset-2" href="#">Privacy Policy</a>.
                </label>
              </div>
            </div>
            
            {/* Submit Button */}
            <div className="pt-sm">
              <button 
                className={`w-full flex justify-center items-center gap-sm rounded-lg bg-primary px-lg py-3 font-title-md text-title-md text-on-primary shadow-sm hover:bg-primary-container transition-all duration-200 border-t border-on-primary/20 active:scale-[0.98] ${isLoading ? 'opacity-90 cursor-not-allowed' : ''}`}
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="material-symbols-outlined animate-spin text-[18px]">progress_activity</span>
                    <span>Creating Workspace...</span>
                  </>
                ) : (
                  <>
                    Create Workspace
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </>
                )}
              </button>
            </div>
          </form>
          
          {/* Login Redirect */}
          <p className="mt-xl text-center font-body-md text-body-md text-on-surface-variant">
            Already have an account? 
            <Link className="font-title-md text-title-md text-primary hover:text-primary-container transition-colors ml-1" to="/login">Log in here</Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default Register;
