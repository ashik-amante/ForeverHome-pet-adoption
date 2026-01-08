import React from 'react';
import { PawPrint } from 'lucide-react';

const Loading = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/80 backdrop-blur-md">
      <div className="relative flex flex-col items-center">
        
        {/* Main Animated Icon */}
        <div className="relative mb-8">
          <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping"></div>
          <div className="relative bg-primary p-6 rounded-full shadow-2xl shadow-primary/40 animate-bounce">
            <PawPrint size={48} className="text-primary-foreground fill-current" />
          </div>
        </div>

        {/* Text Animation */}
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-black tracking-tight text-foreground flex items-center gap-2">
            Finding <span className="text-primary">Forever</span> Homes
          </h2>
          
          <div className="flex justify-center gap-1">
            <div className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-2 h-2 rounded-full bg-primary animate-bounce"></div>
          </div>
          
          <p className="text-muted-foreground font-medium italic animate-pulse">
            Please wait, our furry friends are getting ready...
          </p>
        </div>

        {/* Decorative Background Elements */}
        <div className="absolute -z-10 w-64 h-64 bg-primary/10 blur-[100px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
      </div>
    </div>
  );
};

export default Loading;