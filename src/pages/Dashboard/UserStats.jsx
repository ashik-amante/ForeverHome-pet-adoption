import React from 'react';
import {
  Heart, Dog, LayoutList, HandCoins, TrendingUp,
  CircleDollarSign, ArrowRight, Award,
  User
} from "lucide-react";
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import useAuth from '@/hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import { Link } from 'react-router-dom';
import Loading from '@/components/Loading';

const UserStats = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: userStats = [],isLoading } = useQuery({
    queryKey: ['userStats', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/user-stats/${user?.email}`)
      return res.data
    }
  })
  console.log(userStats);

  const stats = [
    { id: 1, title: "My Donations", value: userStats?.donationCount, subtitle: "Loves Contributed", icon: Heart, color: "text-rose-500", bg: "bg-rose-50", darkBg: "dark:bg-rose-500/10" },
    { id: 2, title: "Total Donated", value: `$${userStats?.totalDonations?.[0]?.totalDonations}`, subtitle: "Amount Given", icon: CircleDollarSign, color: "text-emerald-500", bg: "bg-emerald-50", darkBg: "dark:bg-emerald-500/10" },
    { id: 3, title: "Pets Adopted", value: userStats?.petAdopted, subtitle: "Forever Homes", icon: Dog, color: "text-blue-500", bg: "bg-blue-50", darkBg: "dark:bg-blue-500/10" },
    { id: 4, title: "My Added Pets", value: userStats?.addedPets, subtitle: "Listings Created", icon: LayoutList, color: "text-amber-500", bg: "bg-amber-50", darkBg: "dark:bg-amber-500/10" },
  ];

  const pieData = [
    { name: 'Donations', value: userStats?.totalDonations?.[0]?.count },
    { name: 'Adopted', value: userStats.petAdopted },
    { name: 'Added Pets', value: userStats.addedPets },
    { name: 'Campaigns', value: userStats.campaignCount },
  ];

  const COLORS = ['#f43f5e', '#3b82f6', '#f59e0b', '#8b5cf6'];

  if(isLoading) return<Loading/>

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 md:p-8 space-y-10 transition-colors duration-300">

      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-black text-slate-800 dark:text-white tracking-tight">
            Hello, <span className="text-primary">{user?.displayName || 'Friend'}!</span> 🐾
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Your love and support make a difference every day.</p>
        </div>
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-3xl flex items-center justify-between gap-6 shadow-sm">
          <p className="text-[10px] font-black uppercase text-emerald-500 tracking-widest">Ongoing Campaigns</p>
          
          <p className="text-xl font-bold text-slate-800 dark:text-white">{userStats.campaignCount}</p>
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item) => (
          <div key={item.id} className="group bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden relative">
            <div className="relative z-10 flex justify-between items-start">
              <div className={`p-4 rounded-2xl ${item.bg} ${item.darkBg} ${item.color} group-hover:scale-110 transition-transform`}>
                <item.icon size={28} />
              </div>
              <div className="bg-slate-100 dark:bg-slate-800 p-2 rounded-xl">
                <TrendingUp size={16} className="text-emerald-500" />
              </div>
            </div>

            <div className="mt-6 relative z-10">
              <p className="text-xs font-black uppercase tracking-widest text-slate-400">{item.title}</p>
              <h3 className="text-4xl font-black text-slate-800 dark:text-white mt-1">{item.value}</h3>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-1 italic">{item.subtitle}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Analytics & Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Pie Chart Card */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-8 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-slate-800 dark:text-white tracking-tight"> Overview</h3>
            <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">Lifetime Activity</span>
          </div>

          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}

                  outerRadius={120}
                  paddingAngle={0}
                  dataKey="value"
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} strokeWidth={0} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    borderRadius: '15px',
                    border: 'none',
                    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'
                  }}
                />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Milestone & Quick Action */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-primary to-indigo-600 p-8 rounded-[3rem] text-white shadow-xl relative overflow-hidden group">
            <div className="relative z-10">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                <Award size={24} />
              </div>
              <h3 className="text-2xl font-black mb-2">Be a Hero!</h3>
              <p className="text-white/80 text-sm mb-8">Every contribution counts. Start a new donation campaign today.</p>
              <Link to='/dashboard/create-donation' className="flex items-center gap-2 bg-white text-primary px-6 py-4 rounded-2xl font-black text-sm hover:gap-4 transition-all">
                Create Campaign <ArrowRight size={18} />
              </Link>
            </div>
            <div className="absolute -right-6 -bottom-6 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-all duration-700"></div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-8 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-6 italic">Current Milestone</h3>
            <div className="space-y-4">
              <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-widest">
                <span>Adoption Goal</span>
                <span className="text-primary">{userStats.petAdopted}/5</span>
              </div>
              <div className="h-3 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-1000 shadow-[0_0_10px_rgba(var(--primary),0.5)]"
                  style={{ width: `${(userStats.petAdopted / 5) * 100}%` }}
                ></div>
              </div>
              <p className="text-xs text-slate-400 font-medium">Adopt more pets to reach the next level!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserStats;