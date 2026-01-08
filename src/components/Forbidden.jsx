import React from 'react';
import { ShieldAlert, ArrowLeft, Home, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Forbidden = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary/10 px-4">
      <div className="max-w-2xl w-full text-center space-y-8 bg-background p-10 md:p-16 rounded-[3rem] shadow-2xl border border-border relative overflow-hidden">
        
        {/* Background Decorative Icon */}
        <div className="absolute top-[-20px] right-[-20px] text-primary/5 -rotate-12">
          <ShieldAlert size={200} />
        </div>

        {/* Animated Icon Section */}
        <div className="relative inline-flex items-center justify-center">
          <div className="absolute inset-0 bg-rose-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="relative bg-rose-50 text-rose-500 p-8 rounded-full border-4 border-white shadow-lg">
            <Lock size={64} strokeWidth={2.5} />
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-4">
          <h1 className="text-7xl font-black tracking-tighter text-foreground italic">403</h1>
          <h2 className="text-3xl font-bold text-slate-800 dark:text-white">
            Access <span className="text-rose-500">Forbidden</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-md mx-auto leading-relaxed">
            Oops! It looks like you've wandered into a restricted area. 
            Our furry guards only allow authorized personnel beyond this point.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
          <button 
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto px-8 py-4 bg-secondary text-secondary-foreground rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-secondary/80 transition-all border border-border"
          >
            <ArrowLeft size={20} /> Go Back
          </button>
          
          <button 
            onClick={() => navigate('/')}
            className="w-full sm:w-auto px-8 py-4 bg-primary text-primary-foreground rounded-2xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-lg shadow-primary/20"
          >
            <Home size={20} /> Back to Home
          </button>
        </div>

        {/* Extra Note */}
        <p className="text-xs text-muted-foreground pt-4">
          If you believe this is a mistake, please contact our support team.
        </p>
      </div>
    </div>
  );
};

export default Forbidden;