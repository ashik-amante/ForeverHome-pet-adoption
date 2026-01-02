import React, {  useState } from 'react';
import { useForm } from 'react-hook-form';
import { MapPin, Calendar, Heart, Phone, Home, Mail, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

const PetDetails = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { id } = useParams()

    const { data: pet } = useQuery({
        queryKey: ['pet', id],
        queryFn: async () => {
            const res = await fetch('/pets.json')
            const data = await res.json()
            return data.find(pet => pet._id === id)
        }
    })
    console.log(pet);


    // ডামি ইউজার ডেটা (Firebase/Auth থেকে আসবে)
    const currentUser = {
        name: "John Doe",
        email: "john@example.com"
    };

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            userName: currentUser.name,
            email: currentUser.email
        }
    });

    const onSubmit = (data) => {
        const adoptionData = {
            ...data,
            petId: pet.id,
            petName: pet.name,
            petImage: pet.image,
        };

        console.log("Adoption Request Submitted:", adoptionData);
        alert("Adoption request sent successfully!");
        setIsModalOpen(false);
    };

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

                {/* Right: Pet Details [cite: 35] */}
                <div className="space-y-6">
                    <h1 className="text-5xl font-extrabold">{pet.name}</h1>
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
                            <Button size="lg" className="w-full md:w-auto px-12 py-7 text-lg rounded-2xl gap-2">
                                <Heart className="fill-current" /> Adopt {pet.name}
                            </Button>
                        </DialogTrigger>

                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle className="text-2xl font-bold">Adopt {pet.name}</DialogTitle>
                            </DialogHeader>

                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
                                {/* User Name (Disabled)*/}
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold flex items-center gap-2">
                                        <User size={16} /> User Name
                                    </label>
                                    <Input {...register("userName")} disabled className="bg-muted" />
                                </div>

                                {/* Email (Disabled)  */}
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold flex items-center gap-2">
                                        <Mail size={16} /> Email Address
                                    </label>
                                    <Input {...register("email")} disabled className="bg-muted" />
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
                                    Submit Adoption Request
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