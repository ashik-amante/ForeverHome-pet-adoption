import React from 'react';
import { useForm } from 'react-hook-form';
import { User, Mail, Lock, Image as ImageIcon, Github, Chrome, ArrowRight } from "lucide-react";
import { Link } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';


const Register = () => {
  const {createUser} = useAuth()

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit =async (data) => {
    console.log(data);
    try {
      const result = await createUser(data.email,data.password)
      console.log(result.user);
      alert("Registration successful!");

    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary/30 p-4 py-12">
      <div className="w-full max-w-xl bg-background border border-border rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row">
        
        {/* Registration Form Side */}
        <div className="w-full p-8 md:p-12">
          <div className="space-y-2 mb-8 text-center md:text-left">
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Create an account</h1>
            <p className="text-muted-foreground">Join our mission to unite pets with forever families.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Full Name */}
            <div className="space-y-2">
              <label className="text-sm font-semibold flex items-center gap-2">
                <User size={16} className="text-primary" /> Full Name
              </label>
              <input 
                {...register("fullName", { required: "Name is required" })}
                className="w-full px-4 py-3 rounded-xl border border-border bg-secondary/20 focus:ring-2 focus:ring-primary outline-none transition-all"
                placeholder="Your name"
              />
              {errors.fullName && <p className="text-xs text-red-500">{errors.fullName.message}</p>}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-semibold flex items-center gap-2">
                <Mail size={16} className="text-primary" /> Email
              </label>
              <input 
                type="email"
                {...register("email", { required: "Email is required" })}
                className="w-full px-4 py-3 rounded-xl border border-border bg-secondary/20 focus:ring-2 focus:ring-primary outline-none transition-all"
                placeholder="name@example.com"
              />
              {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-sm font-semibold flex items-center gap-2">
                <Lock size={16} className="text-primary" /> Password
              </label>
              <input 
                type="password"
                {...register("password", { 
                  required: "Password is required",
                  minLength: { value: 6, message: "Minimum 6 characters" }
                })}
                className="w-full px-4 py-3 rounded-xl border border-border bg-secondary/20 focus:ring-2 focus:ring-primary outline-none transition-all"
                placeholder="••••••••"
              />
              {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
            </div>

            {/* Profile Picture Upload  */}
            <div className="space-y-2">
              <label className="text-sm font-semibold flex items-center gap-2">
                <ImageIcon size={16} className="text-primary" /> Profile Picture
              </label>
              <div className="relative group">
                <input 
                  type="file"
                  accept="image/*"
                  {...register("image", { required: "Image is required" })}
                  className="w-full px-4 py-2 rounded-xl border border-dashed border-primary/40 bg-primary/5 cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:bg-primary/10 transition-all"
                />
              </div>
              {errors.image && <p className="text-xs text-red-500">{errors.image.message}</p>}
            </div>

            <button 
              type="submit" 
              className="w-full py-4 bg-primary text-primary-foreground rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-lg shadow-primary/20"
            >
              Register Now <ArrowRight size={18} />
            </button>
          </form>

          {/* Social Logins [cite: 61, 62] */}
          <div className="mt-8">
            <div className="relative flex items-center justify-center mb-6">
              <div className="w-full border-t border-border"></div>
              <span className="absolute px-3 bg-background text-xs text-muted-foreground uppercase tracking-wider">Or continue with</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-2 py-3 border border-border rounded-xl hover:bg-secondary/50 transition-all font-medium">
                <Chrome size={18} className="text-red-500" /> Google
              </button>
              <button className="flex items-center justify-center gap-2 py-3 border border-border rounded-xl hover:bg-secondary/50 transition-all font-medium">
                <Github size={18} /> GitHub
              </button>
            </div>
          </div>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Already have an account? <Link to="/login" className="text-primary font-bold hover:underline">Login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;