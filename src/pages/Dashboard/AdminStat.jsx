import React from 'react';
import { 
  Users, PawPrint, Heart, DollarSign, 
  TrendingUp, ArrowUpRight, Activity, Search,
  Calendar, Download, MoreHorizontal
} from "lucide-react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area 
} from 'recharts';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '@/hooks/useAxiosSecure';

const AdminDashboard = () => {
  const axiosSecure = useAxiosSecure();
  const {data: statistics = [], isLoading} = useQuery({
    queryKey: ['statistics'],
    queryFn: async () => {
      const res = await axiosSecure.get('/admin/stats');
      return res.data
    }
  })
  console.log(statistics);
  const stats = [
    { id: 1, title: "Total Users", value: statistics?.totalUsers, icon: Users, color: "text-blue-500", bg: "bg-blue-500/10", trend: "+12%" },
    { id: 2, title: "Pets Available", value: statistics?.notAdopted, icon: PawPrint, color: "text-rose-500", bg: "bg-rose-500/10", trend: "+5%" },
    { id: 3, title: "Adoptions", value: statistics?.adopted, icon: Heart, color: "text-emerald-500", bg: "bg-emerald-500/10", trend: "+18%" },
    { id: 4, title: "Donations", value: statistics?.totalDonation?.[0]?.totalDonationAmmount, icon: DollarSign, color: "text-amber-500", bg: "bg-amber-500/10", trend: "+24%" },
  ];

  const chartData = [
    { name: 'Jan', donations: 4000, adoptions: 2400 },
    { name: 'Feb', donations: 3000, adoptions: 1398 },
    { name: 'Mar', donations: 5000, adoptions: 3800 },
    { name: 'Apr', donations: 2780, adoptions: 3908 },
    { name: 'May', donations: 6890, adoptions: 4800 },
    { name: 'Jun', donations: 5390, adoptions: 3800 },
  ];

  const COLORS = ['#f43f5e', '#3b82f6', '#10b981', '#f59e0b'];

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-8 space-y-8 font-sans">
      
      {/* Upper Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Platform Analytics</span>
          <h1 className="text-4xl font-black text-slate-900 mt-1">Pet Adoption Dashboard</h1>
        </div>
        
        <div className="flex flex-wrap items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search statistics..." 
              className="pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 w-full md:w-64 shadow-sm"
            />
          </div>
          <button className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200">
            <Download size={18} /> Export Data
          </button>
        </div>
      </div>

      {/* Modern Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item) => (
          <div key={item.id} className="relative bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)] overflow-hidden group hover:-translate-y-1 transition-all duration-300">
            <div className="flex justify-between items-center relative z-10">
              <div className={`p-4 rounded-2xl ${item.bg} ${item.color}`}>
                <item.icon size={28} />
              </div>
              <div className="text-right">
                <span className="text-emerald-500 font-bold text-sm flex items-center gap-1 justify-end">
                  <TrendingUp size={14} /> {item.trend}
                </span>
                <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-tighter">{item.title}</p>
              </div>
            </div>
            <div className="mt-6 relative z-10">
              <h3 className="text-3xl font-black text-slate-900">{item.value}</h3>
              
            </div>
            {/* Background Decoration */}
            <div className={`absolute -right-4 -bottom-4 w-24 h-24 ${item.bg} rounded-full blur-2xl group-hover:scale-150 transition-all`}></div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Advanced Area Chart */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="text-xl font-black text-slate-900">Performance Flow</h3>
              <p className="text-sm text-slate-400 font-medium">Monthly <span className='text-rose-500'>Adoption</span> vs <span className='text-purple-500'>Donations</span></p>
            </div>
            <select className="bg-slate-50 border-none rounded-xl text-xs font-bold px-4 py-2 outline-none">
              <option>Last 6 Months</option>
              <option>Last Year</option>
            </select>
          </div>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorAdopt" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 12, fontWeight: 600}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 12, fontWeight: 600}} />
                <Tooltip 
                  contentStyle={{borderRadius: '24px', border: 'none', boxShadow: '0 20px 40px -10px rgba(0,0,0,0.1)', padding: '15px'}}
                />
                <Area type="monotone" dataKey="adoptions" stroke="#6366f1" strokeWidth={4} fillOpacity={1} fill="url(#colorAdopt)" />
                <Area type="monotone" dataKey="donations" stroke="#F43F5E" strokeWidth={4} fill="none" strokeDasharray="8 8" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Info Section: Quick Notifications/Status */}
        <div className="space-y-8">
          <div className="bg-indigo-900 p-8 rounded-[3rem] text-white shadow-xl shadow-indigo-200 relative overflow-hidden">
            <Activity className="absolute -right-4 -top-4 w-32 h-32 text-white/10" />
            <h3 className="text-lg font-bold mb-2">Campaign Target</h3>
            <p className="text-indigo-200 text-sm mb-6">You've reached 85% of this month's adoption goal.</p>
            <div className="h-3 w-full bg-white/10 rounded-full mb-4">
              <div className="h-full w-[85%] bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.5)]"></div>
            </div>
            <button className="w-full py-4 bg-white text-indigo-900 rounded-2xl font-black text-sm hover:bg-indigo-50 transition-all">
              Launch New Campaign
            </button>
          </div>
          
        {/* top category */}
          <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm">
            <h3 className="text-xl font-black text-slate-900 mb-6">Top Categories</h3>
            <div className="space-y-6">
              {[
                { label: 'Dogs', val: '45%', color: 'bg-rose-500' },
                { label: 'Cats', val: '32%', color: 'bg-blue-500' },
                { label: 'Birds', val: '15%', color: 'bg-emerald-500' }
              ].map((c, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between text-xs font-black uppercase tracking-widest text-slate-500">
                    <span>{c.label}</span>
                    <span>{c.val}</span>
                  </div>
                  <div className="h-2 w-full bg-slate-50 rounded-full">
                    <div className={`h-full ${c.color} rounded-full`} style={{width: c.val}}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Styled Transaction Table */}
      <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-8 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-black text-slate-900">Recent Adoptions</h3>
            <p className="text-sm text-slate-400 font-medium">Real-time update of pet adoptions</p>
          </div>
          <button className="p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-all">
            <MoreHorizontal className="text-slate-400" />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-y border-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                <th className="px-8 py-5">Applicant</th>
                <th className="px-8 py-5">Pet Detail</th>
                <th className="px-8 py-5">Status</th>
                <th className="px-8 py-5 text-right">Activity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {[
                { name: 'Alex Johnson', pet: 'Golden Retriever', status: 'Approved', time: 'Just now' },
                { name: 'Sarah Miller', pet: 'Persian Cat', status: 'Pending', time: '14m ago' },
                { name: 'David Wilson', pet: 'Parrot', status: 'In Review', time: '1h ago' },
              ].map((row, i) => (
                <tr key={i} className="group hover:bg-slate-50/50 transition-all">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500" />
                      <span className="font-bold text-slate-700">{row.name}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="font-medium text-slate-500">{row.pet}</span>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest ${
                      row.status === 'Approved' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                    }`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <span className="text-xs font-bold text-slate-400 italic">{row.time}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;