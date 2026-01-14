import React, { useState, useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender
} from '@tanstack/react-table';
import { Edit, Trash2, CheckCircle, XCircle, ArrowUpDown, ShieldCheck } from 'lucide-react';
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
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '@/hooks/useAxiosSecure';

const AllPets = () => {
  const axiosSecure = useAxiosSecure()
  const { data: pets = [], refetch } = useQuery({
    queryKey: ['pets'],
    queryFn: async () => {
      const res = await axiosSecure.get('/pets');
      return res.data;
    }
  })
  // handle delete
  const handleDelete = (id) => {
    try {
      const response = axiosSecure.delete(`/pets/${id}`)
      console.log(response.data);
      toast.success('Pet deleted successfully!')
      refetch()
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message)
    }
  };
  // handle toggle status
  const toggleAdoptionStatus = async (id, status) => {
    try {
      console.log(id);
      const NewStatus = !status
      const response = await axiosSecure.patch(`/pets/status/${id}`, { status: NewStatus })
      console.log(response.data);
      toast.success('Status updated successfully!')
      refetch()
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message)
    }
  };

  const columns = useMemo(() => [
    {
      accessorKey: 'image',
      header: 'Pet',
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <img src={row.original.image} alt="" className="w-12 h-12 rounded-xl object-cover" />
          <div>
            <p className="font-bold text-slate-800">{row.original.petName}</p>
            <p className="text-[10px] text-muted-foreground uppercase">{row.original.category}</p>
          </div>
        </div>
      ),
    },
    {
      accessorKey: 'email',
      header: 'Added By',
      cell: ({ getValue }) => <span className="text-xs font-medium text-slate-500">{getValue()}</span>
    },
    {
      accessorKey: 'adopted',
      header: 'Status',
      cell: ({ getValue }) => (
        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${getValue() ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'}`}>
          {getValue() ? 'Adopted' : 'Not Adopted'}
        </span>
      ),
    },
    {
      id: 'actions',
      header: 'Admin Actions',
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          {/* Update Button */}
          <button
            className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all"
            onClick={() => window.location.href = `/dashboard/update-pet/${row.original._id}`}
          >
            <Edit size={16} />
          </button>

          {/* Toggle Status Button */}
          <button
            onClick={() => toggleAdoptionStatus(row.original._id, row.original.adopted)}
            className={`p-2 rounded-lg transition-all ${row.original.adopted ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'}`}
            title="Change Status"
          >
            {row.original.adopted ? <XCircle size={16} /> : <CheckCircle size={16} />}
          </button>

          {/* Delete Button with Shadcn Modal */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button className="p-2 bg-rose-50 text-rose-600 rounded-lg hover:bg-rose-600 hover:text-white transition-all">
                <Trash2 size={16} />
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent className="rounded-3xl">
              <AlertDialogHeader>
                <AlertDialogTitle className="font-bold text-rose-600">Admin Action: Permanent Deletion</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete <b>{row.original.petName}</b>? This pet was added by <b>{row.original.email}</b>.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="rounded-xl">Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => handleDelete(row.original._id)}
                  className="bg-rose-600 text-white rounded-xl"
                >
                  Confirm Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      ),
    },
  ], [pets]);

  const table = useReactTable({
    data: pets,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
      <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-blue-50/30 to-transparent">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-600 rounded-2xl text-white shadow-lg shadow-blue-200">
            <ShieldCheck size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-800">All Pets Inventory</h2>
            <p className="text-sm text-slate-500 font-medium">Admin control panel for managing all pet listings across the site.</p>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50/50">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id} className="p-5 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-slate-50">
            {table.getRowModel().rows.map(row => (
              <tr key={row.id} className="hover:bg-blue-50/20 transition-colors">
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

export default AllPets;