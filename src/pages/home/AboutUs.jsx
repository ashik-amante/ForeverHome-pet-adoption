import React from 'react';
import { CheckCircle2, Heart, Users, ArrowRight } from "lucide-react";
import { Link } from 'react-router-dom';

const AboutUs = () => {
  return (
    <section className="py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Visual Side - Overlapping Images */}
          <div className="w-full lg:w-1/2 relative h-[500px]">
            <div className="absolute top-0 left-0 w-4/5 h-4/5 rounded-3xl overflow-hidden shadow-2xl z-10 border-4 border-background">
              <img 
                src="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=800" 
                alt="Happy Dog" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute bottom-0 right-0 w-3/4 h-3/4 rounded-3xl overflow-hidden shadow-2xl border-4 border-background">
              <img 
                src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=800" 
                alt="Fluffy Cat" 
                className="w-full h-full object-cover"
              />
            </div>
            {/* Experience Card Overlay */}
            <div className="absolute bottom-10 left-[-20px] bg-primary p-6 rounded-2xl shadow-xl z-20 hidden md:block animate-bounce-slow">
              <div className="flex items-center gap-4 text-primary-foreground">
                <Users size={40} />
                <div>
                  <p className="text-2xl font-bold">500+</p>
                  <p className="text-sm opacity-90">Pets Adopted</p>
                </div>
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div className="w-full lg:w-1/2 space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-bold tracking-wider">
                <Heart size={14} className="fill-current" />
                OUR MISSION
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
                Providing a <span className="text-primary">Second Chance</span> for Every Life
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our platform was designed to make pet adoption easy, transparent, and accessibl. We bridge the gap between pets in need and families ready to provide a forever home.
              </p>
            </div>

            {/* Workflow Points */}
            <div className="grid gap-6">
              <div className="flex gap-4 group">
                <div className="mt-1 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                  <CheckCircle2 size={20} />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-foreground">How it Works</h4>
                  <p className="text-muted-foreground italic">Search for your favorite category, connect with owners, and start the adoption journey programmatically.</p>
                </div>
              </div>

              <div className="flex gap-4 group">
                <div className="mt-1 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                  <CheckCircle2 size={20} />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-foreground">Why This Website?</h4>
                  <p className="text-muted-foreground italic">Created to leverage technology to unite pets with loving homes and give them a better life.</p>
                </div>
              </div>
            </div>

            <button className="flex items-center gap-2 text-primary font-bold text-lg hover:underline group">
              <Link to="/about">Learn more about our process</Link>
              <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;