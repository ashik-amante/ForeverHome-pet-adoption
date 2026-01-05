import React, { useState } from 'react';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useLoaderData, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Elements } from '@stripe/react-stripe-js';
// import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';

const DonationDetails = () => {
//   const stripe = useStripe();
//   const elements = useElements();
  const [amount, setAmount] = useState("");
  const { id } = useParams();
  const details = useLoaderData()
  const  isLoading = false

  console.log(id);

  // const {data:details={},isLoading} = useQuery({
  //   queryKey: ['details'],
  //   queryFn: async () => {
  //       const res = await fetch('/donations.json')
  //       const data = await res.json()
  //       return data.find(donation => donation.id.toString() === id.toString())
  //   }
  // })
  console.log(details);
//   const handleDonate = async (e) => {
//     e.preventDefault();
//     if (!stripe || !Elements) return;

//     // পেমেন্ট প্রসেসিং লজিক এখানে হবে [cite: 53, 55]
//     console.log("Donating:", amount);
//     alert("Thank you for your donation!");
//   };
if(isLoading){
  return <div>Loading...</div>
}   

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Details Section [cite: 52] */}
      <div className="max-w-4xl mx-auto bg-card p-8 rounded-3xl border border-border shadow-sm mb-16">
        <img src={details.image} className="w-full h-96 object-cover rounded-2xl mb-6" />
        <h1 className="text-4xl font-bold mb-4">{`Help ${details.petName} Get Surgery`}</h1>
        <p className="text-muted-foreground mb-8 text-lg">Detailed description of the donation cause goes here...</p>

        {/* Donate Now Modal  */}
        <Dialog>
          <DialogTrigger asChild>
            <Button size="lg" className="w-full md:w-auto px-10 h-14 text-lg">Donate Now</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Make a Donation</DialogTitle></DialogHeader>
            <form  className="space-y-6 pt-4">
              <div>
                <label className="text-sm font-bold">Amount ($)</label> 
                <input 
                  type="number" 
                  className="w-full p-3 mt-1 border rounded-xl"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required 
                />
              </div>
              {/* <div className="p-4 border rounded-xl bg-muted/30">
                <CardElement options={{ style: { base: { fontSize: '16px' } } }} /> [cite: 53, 54]
              </div> */}
              <Button type="submit" className="w-full h-12" >Pay Now</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Recommended Section [cite: 56] */}
      <div className="mt-12">
        <h3 className="text-2xl font-bold mb-6">Recommended Campaigns</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* এখানে ৩টি ক্যাম্পেইন কার্ড দেখাবেন */}
        </div>
      </div>
    </div>
  );
};

export default DonationDetails;