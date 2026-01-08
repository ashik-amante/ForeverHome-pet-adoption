import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, RefreshCcw, Search } from 'lucide-react';

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary/10 px-4">
      <div className="max-w-3xl w-full text-center space-y-8 bg-background p-10 md:p-20 rounded-[3.5rem] shadow-2xl border border-border relative overflow-hidden">
        
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-purple-500/5 rounded-full translate-x-1/4 translate-y-1/4"></div>

        {/* 404 Visual with a Pet Twist */}
        <div className="relative inline-block">
          <h1 className="text-[10rem] md:text-[14rem] font-black leading-none text-slate-100 dark:text-slate-800 tracking-tighter">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-xl border-2 border-primary animate-bounce">
              <Search size={64} className="text-primary" />
            </div>
          </div>
        </div>

        {/* Message Content */}
        <div className="space-y-4 relative z-10">
          <h2 className="text-4xl font-extrabold text-slate-800 dark:text-white">
            Paws... <span className="text-primary">Something's Missing</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-md mx-auto leading-relaxed">
            The page you are looking for has wandered off. Maybe it's hiding under the sofa or chasing a butterfly?
          </p>
        </div>

        {/* Navigation Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-6">
          <button 
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto px-10 py-4 bg-secondary text-secondary-foreground rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-secondary/80 transition-all"
          >
            <RefreshCcw size={20} /> Try Again
          </button>
          
          <button 
            onClick={() => navigate('/')}
            className="w-full sm:w-auto px-10 py-4 bg-primary text-primary-foreground rounded-2xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-xl shadow-primary/30"
          >
            <Home size={20} /> Back to Home
          </button>
        </div>

        {/* Fun footer note */}
        <div className="pt-8 flex items-center justify-center gap-2 text-sm font-medium text-slate-400">
          <div className="w-8 h-px bg-slate-200"></div>
          <span>Don't worry, our team is on the scent!</span>
          <div className="w-8 h-px bg-slate-200"></div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;