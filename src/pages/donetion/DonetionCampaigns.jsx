import React from 'react';
import { ArrowRight, DollarSign, Pause } from "lucide-react";
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import Loading from '@/components/Loading';

const DonationCampaigns = () => {
  const axiosSecure = useAxiosSecure()

  const { data: donations = [],isLoading } = useQuery({
    queryKey: ['donations'],
    queryFn: async () => {
      const res = await axiosSecure.get('/donationCampaigns')
      return res.data
    }
  })
  console.log(donations);

  if(isLoading) return <Loading/>

  return (
    <div className="container mx-auto px-4 py-12 ">
      <h2 className="text-4xl font-bold mb-10 text-center">Donation Campaigns</h2>

      {/* 3 Column Grid  */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

        {donations.map((camp) => {
          const isGoalReached = camp.donatedAmount >= camp.requiredAmount;
          const isDisabled = camp.isPaused || isGoalReached;
          const progress = Math.min((camp.donatedAmount / camp.requiredAmount) * 100, 100);

          return (
            <div key={camp._id} className="bg-background border border-border rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all">
              <img src={camp.image} alt={camp.petName} className="w-full h-56 object-cover" />

              <div className="p-6">
                <h3 className="text-2xl font-bold italic">{camp.petName}</h3>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex justify-between text-sm font-medium">
                  <span>Goal: ${camp.requiredAmount}</span>
                  <span className="text-primary">Raised: ${camp.donatedAmount}</span>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-secondary h-3 rounded-full overflow-hidden">
                  <div
                    className={` h-full transition-all ${camp.donatedAmount >= camp.requiredAmount ? 'bg-green-500' : 'bg-orange-400'}`}
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>

                {
                  isDisabled ? (
                    <button
                      className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-bold flex items-center justify-center gap-2 disabled:bg-slate-300"
                      disabled
                    >
                      <span className='flex items-center gap-2'>
                        Paused <Pause size={16} />
                      </span>
                    </button>
                  ) : (
                    <Link className='w-full py-3 bg-primary text-primary-foreground rounded-xl font-bold flex items-center justify-center gap-2' to={`/donationDetails/${camp._id}`}>
                      <span className='flex items-center gap-2'>View Details <ArrowRight size={18} /></span>
                    </Link>
                  )
                }

              </div>
            </div>
          )
        })}
      </div>
      {/* Infinite Scroll  */}
    </div>
  );
};

export default DonationCampaigns;