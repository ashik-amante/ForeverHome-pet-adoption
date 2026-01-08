import React, { useState, useMemo } from 'react';
import { 
  useReactTable, 
  getCoreRowModel, 
  getSortedRowModel, 
  flexRender 
} from '@tanstack/react-table';
import { Edit, Trash2, Pause, Play, ArrowUpDown, Banknote, ShieldAlert } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from 'sonner';

const AllDonations = () => {
 
  const [campaigns, setCampaigns] = useState([
    { id: 1, petName: "Max", maxAmount: 1000, donatedAmount: 450, owner: "admin@pet.com", isPaused: false },
    { id: 2, petName: "Bella", maxAmount: 500, donatedAmount: 500, owner: "user@test.com", isPaused: true },
  ]);

  
  const handleDelete = (id) => {
    setCampaigns(prev => prev.filter(camp => camp.id !== id));
    toast.error("Campaign deleted by Admin");
  };

  const togglePause = (id) => {
    setCampaigns(prev => prev.map(camp => 
      camp.id === id ? { ...camp, isPaused: !camp.isPaused } : camp
    ));
    toast.success("Campaign status updated");
  };

  const columns = useMemo(() => [
    {
      accessorKey: 'petName',
      header: 'Campaign Name',
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Banknote className="text-emerald-500" size={18} />
          <span className="font-bold">{row.original.petName}</span>
        </div>
      )
    },
    {
      accessorKey: 'owner',
      header: 'Organizer',
      cell: ({ getValue }) => <span className="text-xs text-muted-foreground">{getValue()}</span>
    },
    {
      header: 'Progress',
      cell: ({ row }) => {
        const progress = (row.original.donatedAmount / row.original.maxAmount) * 100;
        return (
          <div className="w-32 space-y-1">
            <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
              <div className="bg-emerald-500 h-full" style={{ width: `${progress}%` }}></div>
            </div>
            <p className="text-[10px] font-medium">${row.original.donatedAmount} / ${row.original.maxAmount}</p>
          </div>
        );
      }
    },
    {
      accessorKey: 'isPaused',
      header: 'Status',
      cell: ({ getValue }) => (
        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${getValue() ? 'bg-amber-100 text-amber-600' : 'bg-green-100 text-green-600'}`}>
          {getValue() ? 'Paused' : 'Active'}
        </span>
      ),
    },
    {
      id: 'actions',
      header: 'Admin Control',
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          {/* Edit Button */}
          <button 
            className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all"
            onClick={() => window.location.href = `/dashboard/edit-donation/${row.original.id}`}
          >
            <Edit size={16} />
          </button>

          {/* Pause/Play Toggle */}
          <button 
            onClick={() => togglePause(row.original.id)}
            className={`p-2 rounded-lg transition-all ${row.original.isPaused ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}
          >
            {row.original.isPaused ? <Play size={16} /> : <Pause size={16} />}
          </button>
          
          {/* Delete Action */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button className="p-2 bg-rose-50 text-rose-600 rounded-lg hover:bg-rose-600 hover:text-white transition-all">
                <Trash2 size={16} />
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent className="rounded-3xl">
              <AlertDialogHeader>
                <AlertDialogTitle className="font-bold text-rose-600 flex items-center gap-2">
                  <ShieldAlert /> Admin Intervention
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to permanently delete the donation campaign for <b>{row.original.petName}</b>?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="rounded-xl">Cancel</AlertDialogCancel>
                <AlertDialogAction 
                  onClick={() => handleDelete(row.original.id)}
                  className="bg-rose-600 text-white rounded-xl"
                >
                  Delete Campaign
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      ),
    },
  ], [campaigns]);

  const table = useReactTable({
    data: campaigns,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
      <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-gradient-to-r from-emerald-50/30 to-transparent">
        <div>
          <h2 className="text-2xl font-black text-slate-800">All Donation Campaigns</h2>
          <p className="text-sm text-slate-500 font-medium italic">Manage and moderate all fundraising activities on the platform.</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50/50">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id} className="p-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-slate-50">
            {table.getRowModel().rows.map(row => (
              <tr key={row.id} className="hover:bg-slate-50/30 transition-colors">
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="p-5 text-sm">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllDonations;