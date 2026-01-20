import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import { ImagePlus, PawPrint, MapPin, Calendar, FileText, Send, Loader2 } from "lucide-react";
import useAxiosSecure from '@/hooks/useAxiosSecure';
import axios from 'axios';
import useAuth from '@/hooks/useAuth';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';


const categoryOptions = [
  { value: 'dog', label: 'Dog' },
  { value: 'cat', label: 'Cat' },
  { value: 'rabbit', label: 'Rabbit' },
  { value: 'fish', label: 'Fish' },
  { value: 'bird', label: 'Bird' }
];

const AddPet = () => {
  const { register, handleSubmit, control, formState: { errors } } = useForm();
  const axiosSecure = useAxiosSecure()
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const onSubmit = async (data) => {
    setLoading(true)
    const image = data.petImage[0]
    const formData = new FormData()
    formData.append('image', image)

    const petUrl = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_KEY}`, formData)
    console.log(petUrl);
    const imageUrl = petUrl?.data?.data?.url

    const petData = {
      petName: data.petName,
      age: data.petAge,                  
      location: data.petLocation,        
      shortDescription: data.shortDescription,
      longDescription: data.longDescription,
      category: data.category.value,
      image: imageUrl,
      addedDate: new Date(),
      adopted: false,
      email: user?.email
    };
    console.log("Submitting Pet Data:", petData);
    try {
      const response = await axiosSecure.post('/pets', petData);
      console.log(response.data);
      toast.success('Pet added successfully!')
      navigate('/dashboard/my-pets')
      setLoading(false)
    } catch (error) {
      console.log(error);
      setLoading(false)
    }

  };

  return (
    <div className="max-w-4xl mx-auto bg-background p-8 rounded-3xl border border-border shadow-sm">
      <div className="mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <PawPrint className="text-primary" /> Add a New Pet
        </h1>
        <p className="text-muted-foreground">Fill in the details to find a forever home for this pet.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Pet Image  */}
        <div className="md:col-span-2 space-y-2">
          <label className="text-sm font-semibold flex items-center gap-2 italic">
            <ImagePlus size={16} className="text-primary" /> Pet Image
          </label>
          <input
            type="file"
            accept="image/*"
            {...register("petImage", { required: "Pet image is required" })}
            className="w-full px-4 py-2 rounded-xl border-2 border-dashed border-primary/20 bg-primary/5 cursor-pointer file:bg-primary file:text-primary-foreground file:border-0 file:rounded-full file:px-4 file:py-1 file:mr-4 hover:bg-primary/10 transition-all"
          />
          {errors.petImage && <p className="text-xs text-red-500 mt-1">{errors.petImage.message}</p>}
        </div>

        {/* Pet Name  */}
        <div className="space-y-2">
          <label className="text-sm font-semibold flex items-center gap-2 italic">
            <PawPrint size={16} className="text-primary" /> Pet Name
          </label>
          <input
            {...register("petName", { required: "Pet name is required" })}
            placeholder="e.g. Buddy"
            className="w-full px-4 py-3 rounded-xl border border-border bg-secondary/20 focus:ring-2 focus:ring-primary outline-none"
          />
          {errors.petName && <p className="text-xs text-red-500 mt-1">{errors.petName.message}</p>}
        </div>

        {/* Pet Age  */}
        <div className="space-y-2">
          <label className="text-sm font-semibold flex items-center gap-2 italic">
            <Calendar size={16} className="text-primary" /> Pet Age
          </label>
          <input
            {...register("petAge", { required: "Pet age is required" })}
            placeholder="e.g. 2 years"
            className="w-full px-4 py-3 rounded-xl border border-border bg-secondary/20 focus:ring-2 focus:ring-primary outline-none"
          />
          {errors.petAge && <p className="text-xs text-red-500 mt-1">{errors.petAge.message}</p>}
        </div>

        {/* Pet Category  */}
        <div className="space-y-2">
          <label className="text-sm font-semibold flex items-center gap-2 italic">
            <FileText size={16} className="text-primary" /> Pet Category
          </label>
          <Controller
            name="category"
            control={control}
            rules={{ required: "Category is required" }}
            render={({ field }) => (
              <Select
                {...field}
                options={categoryOptions}
                placeholder="Select category..."
                className="react-select-container"
                classNamePrefix="react-select"
              />
            )}
          />
          {errors.category && <p className="text-xs text-red-500 mt-1">{errors.category.message}</p>}
        </div>

        {/* Pet Location  */}
        <div className="space-y-2">
          <label className="text-sm font-semibold flex items-center gap-2 italic">
            <MapPin size={16} className="text-primary" /> Pet Location
          </label>
          <input
            {...register("petLocation", { required: "Location is required" })}
            placeholder="e.g. Dhaka, Bangladesh"
            className="w-full px-4 py-3 rounded-xl border border-border bg-secondary/20 focus:ring-2 focus:ring-primary outline-none"
          />
          {errors.petLocation && <p className="text-xs text-red-500 mt-1">{errors.petLocation.message}</p>}
        </div>

        {/* Short Description  */}
        <div className="md:col-span-2 space-y-2">
          <label className="text-sm font-semibold flex items-center gap-2 italic">
            <FileText size={16} className="text-primary" /> Short Description
          </label>
          <input
            {...register("shortDescription", { required: "Short description is required" })}
            placeholder="Briefly describe the pet..."
            className="w-full px-4 py-3 rounded-xl border border-border bg-secondary/20 focus:ring-2 focus:ring-primary outline-none"
          />
          {errors.shortDescription && <p className="text-xs text-red-500 mt-1">{errors.shortDescription.message}</p>}
        </div>

        {/* Long Description (Textarea) */}
        <div className="md:col-span-2 space-y-2">
          <label className="text-sm font-semibold flex items-center gap-2 italic">
            <FileText size={16} className="text-primary" /> Long Description
          </label>
          <textarea
            rows="5"
            {...register("longDescription", { required: "Detailed description is required" })}
            placeholder="Provide all details about the pet..."
            className="w-full px-4 py-3 rounded-xl border border-border bg-secondary/20 focus:ring-2 focus:ring-primary outline-none resize-none"
          ></textarea>
          {errors.longDescription && <p className="text-xs text-red-500 mt-1">{errors.longDescription.message}</p>}
        </div>

        {/* Submit Button  */}
        <div className="md:col-span-2 pt-4">
          <button
            type="submit"
            className="w-full py-4 bg-primary text-primary-foreground rounded-2xl font-bold flex items-center justify-center gap-2 hover:shadow-lg transition-all"
          >
            {
              loading ? <Loader2 className="animate-spin" /> : <span className='flex items-center justify-center gap-1'><Send size={18} /> Add Pet to Database</span>
            }
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPet;