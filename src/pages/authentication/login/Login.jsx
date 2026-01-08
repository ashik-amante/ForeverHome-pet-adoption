import React from 'react';
import { useForm } from 'react-hook-form';
import { Mail, Lock, Github, Chrome, ArrowRight, LogIn } from "lucide-react";
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';
import useAxiosPublic from '@/hooks/useAxiosPublic';
import { toast } from 'sonner';

const Login = () => {
  const { loginUser,googleSignin } = useAuth()
  const axiosPublic = useAxiosPublic()
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    console.log("Login Data:", data);
    try {
      const result = await loginUser(data.email, data.password)
      console.log(result.user);
      alert("Login successful!");
    } catch (error) {
      console.log(error);
    }
  };

  // google login
  const handleGoogleLogin = async () => {
    const result = await googleSignin()
    const userData = {
      name: result.user.displayName,
      email: result.user.email,
      image: result.user.photoURL,
      role: "user",
      createdAt: new Date()
    }

    const saveUser = await axiosPublic.post('/users', userData)
    console.log('save user info', saveUser);
    toast.success(' Successful!')
    navigate('/')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary/30 p-4 py-12">
      <div className="w-full max-w-md bg-background border border-border rounded-[2.5rem] shadow-2xl p-8 md:p-12">

        {/* Header */}
        <div className="text-center space-y-2 mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-primary/10 text-primary mb-4">
            <LogIn size={32} />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Welcome Back</h1>
          <p className="text-muted-foreground text-sm">Please enter your details to login</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email Field */}
          <div className="space-y-2">
            <label className="text-sm font-semibold flex items-center gap-2 text-foreground/80">
              <Mail size={16} className="text-primary" /> Email Address
            </label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" }
              })}
              className="w-full px-4 py-3 rounded-2xl border border-border bg-secondary/20 focus:ring-2 focus:ring-primary outline-none transition-all placeholder:text-muted-foreground/50"
              placeholder="name@example.com"
            />
            {errors.email && <p className="text-xs text-red-500 font-medium ml-1">{errors.email.message}</p>}
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold flex items-center gap-2 text-foreground/80">
                <Lock size={16} className="text-primary" /> Password
              </label>
              <a href="#" className="text-xs text-primary hover:underline font-medium">Forgot Password?</a>
            </div>
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              className="w-full px-4 py-3 rounded-2xl border border-border bg-secondary/20 focus:ring-2 focus:ring-primary outline-none transition-all placeholder:text-muted-foreground/50"
              placeholder="••••••••"
            />
            {errors.password && <p className="text-xs text-red-500 font-medium ml-1">{errors.password.message}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-4 bg-primary text-primary-foreground rounded-2xl font-bold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-primary/30 transition-all active:scale-[0.98]"
          >
            Login <ArrowRight size={18} />
          </button>
        </form>

        {/* Divider */}
        <div className="relative flex items-center justify-center my-8">
          <div className="w-full border-t border-border"></div>
          <span className="absolute px-4 bg-background text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-bold">Or login with</span>
        </div>

        {/* Social Logins  */}
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={handleGoogleLogin}
            className="flex items-center justify-center gap-3 py-3.5 border border-border rounded-2xl hover:bg-secondary/50 transition-all font-semibold text-sm shadow-sm"
          >
            <Chrome size={18} className="text-red-500" /> Google
          </button>
          <button
            
            className="flex items-center justify-center gap-3 py-3.5 border border-border rounded-2xl hover:bg-secondary/50 transition-all font-semibold text-sm shadow-sm"
          >
            <Github size={18} /> GitHub
          </button>
        </div>

        {/* Footer Link */}
        <p className="mt-10 text-center text-sm text-muted-foreground">
          Don't have an account? <Link to="/register" className="text-primary font-bold hover:underline">Create one</Link>
        </p>
      </div>
    </div>
  );
};

export default Login; 