import React from 'react';
import { ArrowRight, DollarSign } from "lucide-react";

const DonationCampaigns = () => {
  // ডামি ডেটা (Sorted by date descending) 
  const campaigns = [
    { id: 1, petName: "Max", image: "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8", maxAmount: 500, donatedAmount: 250 },
    { id: 2, petName: "Bella", image: "https://images.unsplash.com/photo-1583511655826-05700d52f4d9", maxAmount: 1000, donatedAmount: 400 },
    
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-4xl font-bold mb-10 text-center">Donation Campaigns</h2>
      
      {/* 3 Column Grid  */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {campaigns.map((camp) => (
          <div key={camp.id} className="bg-background border border-border rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all">
            <img src={camp.image} alt={camp.petName} className="w-full h-56 object-cover" />
            
            <div className="p-6 space-y-4">
              <h3 className="text-2xl font-bold">{camp.petName}</h3> 
              
              <div className="flex justify-between text-sm font-medium">
                <span>Goal: ${camp.maxAmount}</span> 
                <span className="text-primary">Raised: ${camp.donatedAmount}</span> 
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-primary h-full transition-all" 
                  style={{ width: `${(camp.donatedAmount / camp.maxAmount) * 100}%` }}
                ></div>
              </div>

              <button 
                className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-bold flex items-center justify-center gap-2"
                onClick={() => window.location.href = `/donation-details/${camp.id}`}
              >
                View Details <ArrowRight size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* Infinite Scroll  */}
    </div>
  );
};

export default DonationCampaigns;