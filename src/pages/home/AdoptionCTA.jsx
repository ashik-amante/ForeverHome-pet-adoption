import React from 'react';

import { HeartHandshake, Home } from "lucide-react";
import { Link } from 'react-router-dom';

const AdoptionCTA = () => {
  return (
    <section className="py-20 bg-primary/5">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12 bg-background rounded-3xl overflow-hidden shadow-xl border border-border">
          
          {/* Left Side*/}
          <div className="w-full lg:w-1/2 h-[400px] relative">
            <img 
              src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&q=80&w=1000" 
              alt=" a rescued dog and a cat" 
              className="w-full h-full object-cover rounded "
            />
            {/* Overlay Gradient  */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-8">
              <p className="text-white italic font-medium">
                "Every animal deserves a home, and every home deserves a friend."
              </p>
            </div>
          </div>

          {/* Right Side */}
          <div className="w-full lg:w-1/2 p-8 lg:p-12 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold">
              <HeartHandshake size={24} />
              <span>Make a Difference</span>
            </div>
            
            <h2 className="text-4xl font-bold tracking-tight text-foreground leading-tight">
              Open Your Heart, <br /> 
              <span className="text-primary">Change a Life Today</span>
            </h2>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              Thousands of pets are waiting for a second chance. By adopting, you aren't just giving them a place to stay—you are giving them a family, safety, and a lifetime of love.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <button 
                className="px-8 py-4 bg-primary text-primary-foreground rounded-xl font-bold hover:opacity-90 transition-all flex items-center gap-2 shadow-lg shadow-primary/20"
              >
                <Home size={20} />
                <Link to='/pet-listing'>Find Your Pet</Link>
              </button>
              
              <button 
                className="px-8 py-4 border-2 border-primary text-primary rounded-xl font-bold hover:bg-primary/5 transition-all"
              >
                <Link to="/about">Learn More</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdoptionCTA;