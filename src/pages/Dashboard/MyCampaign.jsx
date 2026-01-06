import React, { useState, useMemo } from 'react';
import { 
  useReactTable, 
  getCoreRowModel, 
  flexRender 
} from '@tanstack/react-table';
import { Edit3, Users, Pause, Play, HeartPulse, DollarSign } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useQuery } from '@tanstack/react-query';
import useAuth from '@/hooks/useAuth';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import { toast } from 'sonner';

const MyDonations = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDonors, setSelectedDonors] = useState([]);
  const {user} = useAuth()
  const axiosSecure = useAxiosSecure()

  // fetch my campaigns
   const { data: myCampaigns = [],refetch } = useQuery({
    queryKey: ['myCampaigns',user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donationCampaigns/${user?.email}`)
      return res.data
    }
  })
  console.log(myCampaigns);

  // pause and resume
  const togglePauseResume =async (id,status) => {
    const newStatus = !status;
    const res = await axiosSecure.patch(`/donationCampaigns/${id}`,{status:newStatus})
    refetch()
    console.log(res.data);
    toast.success('Status updated successfully!')
    console.log(id,status,newStatus);
  };

  // jandle modal open close
  const openDonorsModal = (donors) => {
    setSelectedDonors(donors);
    setIsModalOpen(true);
  };

  const columns = useMemo(() => [
    {
      header: 'Pet Name',
      accessorKey: 'petName',
      cell: ({ getValue }) => <span className="font-bold text-slate-700">{getValue()}</span>
    },
    {
      header: 'Required Amount',
      accessorKey: 'requiredAmount',
      cell: ({ getValue }) => <span>${getValue()}</span>
    },
    {
      header: 'Donation Progress',
      cell: ({ row }) => {
        const { donatedAmount, requiredAmount } = row.original;
        const progress = Math.min((donatedAmount / requiredAmount) * 100, 100);
        return (
          <div className="w-full max-w-[200px] space-y-1">
            <div className="flex justify-between text-[10px] font-bold text-slate-500">
              <span>{progress.toFixed(0)}%</span>
              <span>${donatedAmount} raised</span>
            </div>
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200">
              <div 
                className={`h-full transition-all duration-500 ${progress === 100 ? 'bg-emerald-500' : 'bg-rose-500'}`} 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        );
      }
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          {/* Pause/Play Button */}
          <button 
            onClick={() => togglePauseResume(row.original._id, row.original.isPaused)}
            className={`p-2 rounded-lg transition-all ${row.original.isPaused ? 'bg-amber-100 text-amber-600' : 'bg-slate-100 text-slate-600'}`}
            title={row.original.isPaused ? "Unpause" : "Pause"}
          >
            {row.original.isPaused ? <Play size={16} fill="currentColor" /> : <Pause size={16} fill="currentColor" />}
          </button>

          {/* Edit Button */}
          <button 
            className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all"
            onClick={() => window.location.href = `/dashboard/edit-donation/${row.original.id}`}
          >
            <Edit3 size={16} />
          </button>

          {/* View Donators Button */}
          <button 
            onClick={() => openDonorsModal(row.original.donors)}
            className="p-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-600 hover:text-white transition-all"
          >
            <Users size={16} />
          </button>
        </div>
      )
    }
  ], [myCampaigns]);

  const table = useReactTable({
    data: myCampaigns,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
      <div className="p-8 border-b border-slate-50 flex items-center gap-3 bg-gradient-to-r from-rose-50 to-transparent">
        <div className="p-3 rounded-2xl ">
          <DollarSign size={32} />
        </div>
        <div>
          <h2 className="text-2xl font-black text-slate-800">My Donation Campaigns</h2>
          <p className="text-sm text-slate-500 font-medium">Track and manage your pet's medical and support funds.</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50/50">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup._id}>
                {headerGroup.headers.map(header => (
                  <th key={header._id} className="p-5 text-xs font-black text-slate-400 uppercase tracking-widest">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-slate-50">
            {table.getRowModel().rows.map(row => (
              <tr key={row._id} className="hover:bg-slate-50/50 transition-colors">
                {row.getVisibleCells().map(cell => (
                  <td key={cell._id} className="p-5 text-sm font-medium">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Donators List Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="rounded-[2rem] sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold flex items-center gap-2">
              <Users className="text-purple-500" /> Donators List
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4 space-y-3">
            {selectedDonors.length > 0 ? (
              selectedDonors.map((donor, idx) => (
                <div key={idx} className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <span className="font-bold text-slate-700">{donor.name}</span>
                  <span className="text-emerald-600 font-black">${donor.amount}</span>
                </div>
              ))
            ) : (
              <p className="text-center text-muted-foreground py-10 italic">No donations yet.</p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MyDonations;