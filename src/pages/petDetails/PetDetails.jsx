import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { MapPin, Calendar, Heart, Phone, Home, Mail, User, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useLoaderData } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import { toast } from 'sonner';


const PetDetails = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { user } = useAuth()
    const pet = useLoaderData()
    const axiosSecure = useAxiosSecure()
    const [loading, setLoading] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm();
    console.log(pet);

    const onSubmit = async (data) => {
        try {
            setLoading(true)
            const adoptionData = {
                ...data,
                petId: pet._id,
                petName: pet.petName,
                petImage: pet.image,
                petOwner: pet.email,
                status: 'pending',
                requestedAt: new Date()
            };
            console.log("Adoption Request Submitted:", adoptionData);
            const response = await axiosSecure.post('/adoptionRequests', adoptionData);
            console.log(response.data);
            toast.success('Adoption request sent successfully!');
            setIsModalOpen(false);
            setLoading(false)
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
            setLoading(false)
        }
    };
    console.log(user.email, pet.email);
    if (!pet) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
                {/* Left: Pet Image */}
                <div className="rounded-3xl overflow-hidden shadow-xl">
                    <img src={pet.image} alt={pet.name} className="w-full h-[500px] object-cover" />
                </div>

                {/* Right: Pet Details  */}
                <div className="space-y-6">
                    <h1 className="text-5xl font-extrabold">{pet.petName}</h1>
                    <p className='text-slate-500'>{pet.longDescription}</p>
                    <div className="flex gap-4">
                        <span className="flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-semibold">
                            <Calendar size={16} /> {pet.age}
                        </span>
                        <span className="flex items-center gap-1 bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm font-semibold">
                            <MapPin size={16} /> {pet.location}
                        </span>
                    </div>

                    <p className="text-lg text-muted-foreground leading-relaxed">
                        {pet.description}
                    </p>

                    {/* Adopt Button to Open Modal  */}
                    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                        <DialogTrigger asChild>
                            <button disabled={user?.email === pet.email} size="lg" className="w-full md:w-auto px-12 py-5 text-2xl rounded-4xl flex items-center gap-3 bg-black text-white cursor-pointer disabled:bg-slate-300 disabled:cursor-not-allowed disabled:text-slate-500">
                                {
                                    user?.email === pet.email ? <span className='font-bold text-rose-500'>You can't adopt your own pet</span> : (
                                        <>
                                            <Heart className="fill-current" /> Adopt <span className='font-bold'>{pet.petName}</span>
                                        </>
                                    )
                                }
                            </button>
                        </DialogTrigger>

                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle className="text-2xl font-bold"> Adopt<span className='text-purple-500 italic'> {pet.name}</span></DialogTitle>
                            </DialogHeader>

                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
                                {/* User Name (Disabled)*/}
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold flex items-center gap-2">
                                        <User size={16} /> User Name
                                    </label>
                                    <Input {...register("userName")}
                                        defaultValue={user?.displayName}
                                        disabled className="bg-muted" />
                                </div>

                                {/* Email (Disabled)  */}
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold flex items-center gap-2">
                                        <Mail size={16} /> Email Address
                                    </label>
                                    <Input {...register("email")} disabled
                                        defaultValue={user?.email}
                                        className="bg-muted" />
                                </div>

                                {/* Phone Number */}
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold flex items-center gap-2">
                                        <Phone size={16} /> Phone Number
                                    </label>
                                    <Input
                                        type="tel"
                                        placeholder="Enter your phone number"
                                        {...register("phone", { required: "Phone number is required" })}
                                    />
                                    {errors.phone && <p className="text-xs text-red-500">{errors.phone.message}</p>}
                                </div>

                                {/* Address */}
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold flex items-center gap-2">
                                        <Home size={16} /> Address
                                    </label>
                                    <Input
                                        placeholder="Enter your full address"
                                        {...register("address", { required: "Address is required" })}
                                    />
                                    {errors.address && <p className="text-xs text-red-500">{errors.address.message}</p>}
                                </div>

                                {/* Submit Button */}
                                <Button type="submit" className="w-full h-12 text-lg">
                                    {
                                        loading ? <Loader2 className="animate-spin" /> : <span>Submit Adoption Request</span>
                                    }

                                </Button>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

export default PetDetails;