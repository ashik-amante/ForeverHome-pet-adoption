import React, { useState,  } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useLoaderData, useNavigate, useParams } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import CheckoutForm from '../payment/CheckoutForm';
import { useQuery } from '@tanstack/react-query';
import PetCard from '../shared/PetCard';
import useAuth from '@/hooks/useAuth';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

const DonationDetails = () => {
  const [amount, setAmount] = useState("");
  const [open, setOpen] = useState(false); 
  const { id } = useParams();
  const pet = useLoaderData();
  const axiosSecure = useAxiosSecure();
  const {user} = useAuth()
  const navigate = useNavigate()
  console.log(pet);


  const {data : recommended = [],refetch} = useQuery({
    queryKey: ['recommended'],
    queryFn: async () => {
      const res = await axiosSecure.get('/donationCampaigns')
      const filtered = res.data.filter(item=> item._id !== id).slice(0,3)
      return filtered
    }
  })
  console.log(recommended);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto bg-card p-8 rounded-[2.5rem] border border-border shadow-sm mb-16 overflow-hidden">
        {/* Pet Image */}
        <img 
          src={pet.image} 
          className="w-full h-96 object-cover rounded-3xl mb-8 shadow-md" 
          alt={pet.petName} 
        />
        
        <div className="space-y-4">
          <h1 className="text-4xl font-black text-slate-800 tracking-tight">
            {`Help ${pet.petName} Get Surgery`}
          </h1>
          
          <div className="flex items-center gap-4 text-sm font-bold uppercase tracking-wider text-slate-500">
            <span className="bg-primary/10 text-primary px-4 py-1 rounded-full border border-primary/20">
              Goal: ${pet.requiredAmount}
            </span>
            <span className="bg-emerald-100 text-emerald-600 px-4 py-1 rounded-full border border-emerald-200">
              Raised: ${pet.donatedAmount || 0}
            </span>
          </div>

          <p className="text-muted-foreground text-lg leading-relaxed pt-4">
            {pet.longDescription}
          </p>
        </div>

        {/* Donate Now Modal Button */}
        <div className="mt-10">
          <Dialog open={open} onOpenChange={setOpen}>
            
              <Button  onClick ={()=>{
                if(!user){
                  navigate('/login', {state : {from : location.pathname}})
                }else{
                  setOpen(true)
                }
              }} size="lg" className="w-full md:w-auto px-12 h-14 text-lg rounded-2xl shadow-xl shadow-primary/20 cursor-pointer">
                Donate Now
              </Button>
            
            
            <DialogContent className="rounded-[2rem] sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">Donate for {pet.petName}</DialogTitle>
              </DialogHeader>
              
              <div className="space-y-6 pt-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold block mb-2 italic text-slate-600">
                    Enter Donation Amount ($)
                  </label>
                  <input
                    type="number"
                    className="w-full p-4 border-2 rounded-2xl outline-none focus:border-primary bg-secondary/20 transition-all font-black text-lg"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                  />
                </div>

                {/*  Stripe Elements Wrapper */}
                <Elements stripe={stripePromise}>
                  <CheckoutForm 
                    amount={amount} 
                    petId={pet._id} 
                    petName={pet.petName}
                    refetch={refetch}
                    closeModal={() => setOpen(false)} 
                  />
                </Elements>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Recommended Campaigns Section */}
      <div className="mt-20 border-t pt-16">
        <h3 className="text-3xl font-black mb-10 text-center md:text-left">
          Other Active <span className="text-primary">Campaigns</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recommended.length > 0 ? (
            recommended.map((item) => (
              <PetCard key={item._id} pet={item} />
            ))
          ) : (
            <p className="text-muted-foreground italic col-span-full text-center">No other active campaigns found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DonationDetails;