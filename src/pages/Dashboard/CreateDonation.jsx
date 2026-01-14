import { Calendar, FileText, HandHelping, ImagePlus, List, Loader2, PawPrint, Send, Text } from 'lucide-react'
import React, { useState } from 'react'
import DatePicker from 'react-datepicker';
import { Controller, useForm } from 'react-hook-form';
import "react-datepicker/dist/react-datepicker.css";
import useAuth from '@/hooks/useAuth';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import Select from 'react-select';
import imageUpload from '@/hooks/useImageUpload';
import { toast } from 'sonner';


const categoryOptions = [
  { value: 'dog', label: 'Dog' },
  { value: 'cat', label: 'Cat' },
  { value: 'rabbit', label: 'Rabbit' },
  { value: 'fish', label: 'Fish' },
  { value: 'bird', label: 'Bird' }
];

const CreateDonation = () => {
  const [loading, setLoading] = useState(false)
  const { user } = useAuth()
  const axiosSecure = useAxiosSecure()

  const { register, handleSubmit, control, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      const image = data.petImage[0]
      const formData = new FormData()
      formData.append('image', image)
      const url = await imageUpload(formData)

      const campaignData = {
        petName: data.petName,
        requiredAmount: parseFloat(data.requiredAmount),
        donatedAmount : 0,
        shortDescription: data.shortDescription,
        longDescription: data.longDescription,
        category: data.category.value,
        image: url,
        createdAt: new Date(),
        email: user?.email,
        donors: [],
        isPaused: false,
        lastDate: data.lastDate,
        location: data?.location || 'Dhaka,Bangladesh'
      }
      const response = await axiosSecure.post('/donationCampaigns', campaignData)
      console.log(response.data);
      toast.success('Campaign created successfully!')
      setLoading(false)
    } catch (error) {
      console.log(error);
      setLoading(false)
    }

  }
  return (
    <div className='p-8 md:p-6 dark:bg-slate-900 bg-background border border-slate-100 rounded-3xl overflow-hidden shadow-sm max-w-5xl mx-auto'>

      <div className='border-b border-slate-50 bg-linear-to-r from-rose-50 to bg-transparent p-6 rounded-t-3xl mb-8'>
        <h1 className='text-3xl font-bold flex items-center gap-2 text-primary'> <HandHelping size={32} /> Create Donation Campaign</h1>
        <p className='mt-2 text-muted-foreground'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deserunt, ipsa!</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {/* pet image */}
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
        {/*Maximum Domation amount */}
        <div className="space-y-2">
          <label className="text-sm font-semibold flex items-center gap-2 italic">
            <PawPrint size={16} className="text-primary" />Required Donation Amount
          </label>
          <input
            {...register("requiredAmount", { required: "MAx donation is required" })}
            placeholder="e.g. 5000"
            type='number'
            className="w-full px-4 py-3 rounded-xl border border-border bg-secondary/20 focus:ring-2 focus:ring-primary outline-none"
          />
          {errors.requiredAmount && <p className="text-xs text-red-500 mt-1">{errors.requiredAmount.message}</p>}
        </div>

        {/* Name */}
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

        {/* last date */}
        <div className='space-y-2'>
          <label htmlFor="">
            <p className='flex items-center gap-2 text-sm font-semibold italic mb-2'> <Calendar size={16} /> Last Date</p>
          </label>
          {/* datepicker */}
          <Controller
            {...register("lastDate", { required: "Last date is required" })}
            control={control}
            name='lastDate'
            defaultValue={new Date()}
            render={({ field }) => (
              <DatePicker
                showIcon
                selected={field.value}
                className='border-2 border-border rounded-xl '
                onChange={(date) => field.onChange(date)} />
            )}
          />
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
        {/* Short Description [cite: 84] */}
        <div className="md:col-span-2 space-y-2">
          <label className="text-sm font-semibold flex items-center gap-2 italic">
            <FileText size={16} className="text-primary" /> Short Description(Why this campaign)
          </label>
          <input
            {...register("shortDescription", { required: "Short description is required" })}
            placeholder="Briefly describe the pet..."
            className="w-full px-4 py-3 rounded-xl border border-border bg-secondary/20 focus:ring-2 focus:ring-primary outline-none"
          />
          {errors.shortDescription && <p className="text-xs text-red-500 mt-1">{errors.shortDescription.message}</p>}
        </div>
        {/* Long Description (Textarea) [cite: 85] */}
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
              loading ? <Loader2 className="animate-spin" /> : <span className='flex items-center justify-center gap-1'><Send size={18} /> Create campaign </span>
            }
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateDonation