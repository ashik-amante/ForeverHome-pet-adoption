import React, {  useMemo } from 'react';
import { 
  useReactTable, 
  getCoreRowModel, 
  getSortedRowModel, 
  getPaginationRowModel, 
  flexRender 
} from '@tanstack/react-table';
import {Trash2,ArrowUpDown, AlertCircle } from 'lucide-react';
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
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import useAuth from '@/hooks/useAuth';
import { toast } from 'sonner';

const MyDonation = () => {
  const axiosSecure = useAxiosSecure();
  const {user} = useAuth()
  
  const {data: donations =[],refetch} = useQuery({
    queryKey: ['donations',user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-donations/${user?.email}`)
      return res.data
    }
  })
  console.log(donations);

  const handleRefund = async (id, campaignId,amount)=>{
    try {
      console.log(id,campaignId,amount);
    const res = await axiosSecure.delete(`/refund-donation/${id}`, {data:{campaignId,amount}})
    console.log(res.data);
    if(res.data.deletedCount  && res.data.modifiedCount){
      toast.success('Refund successful!')
      refetch()
    }
    } catch (error) {
      console.log(error);
      toast.error('Refund failed!')
    }
    
  }

  const columns = useMemo(() => [
 
    {
      accessorKey: 'petName',
      header: 'Pet Name',
      cell: ({ getValue }) => <span className="font-bold">{getValue()}</span>,
    },
   {
    accessorKey: "amount",
    header: ({column})=>(
      <button onClick={()=> column.toggleSorting()} className='flex gap-2 items-center '>
        Donated Amount <ArrowUpDown size={14} />
      </button>
    ),
    cell: ({ getValue }) => <span className="font-bold ">$ {getValue()}</span>,
   },
    {
      accessorKey: 'paidAt',
      header: 'Donation Date',
      cell: ({getValue})=>{
        const date = new Date(getValue()).toLocaleDateString('en-US', {day: 'numeric', month: 'short', year: 'numeric'})
        return  <span>{date}</span>
      }
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          {/* Shadcn Delete Modal */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button className="p-2 bg-rose-50 text-rose-600 rounded-lg hover:bg-rose-600 hover:text-white transition-all shadow-sm flex items-center gap-2">
                <Trash2 size={16} /> Ask for Refund
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent className="rounded-3xl">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-xl font-bold text-rose-600 flex items-center gap-2"> <AlertCircle size={16} /> Confirm Refund?</AlertDialogTitle>
                <AlertDialogDescription className="text-muted-foreground">
                  Are you sure you want to ask for a refund? This will remove your <b>${row.original.amount}</b> contribution from <b>{row.original.petName}'s</b> campaign.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="rounded-xl border-slate-200">Cancel</AlertDialogCancel>
                <AlertDialogAction 
                  onClick={() => handleRefund(row.original._id, row.original.campaignId, row.original.amount)}
                  className="bg-rose-600 hover:bg-rose-700 text-white rounded-xl"
                >
                  Yes, Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

        </div>
      ),
    },
  ], [donations]);

  const table = useReactTable({
    data:  donations,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 5 } },
  });

  return (
    <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 shadow-sm
     overflow-hidden">
      <div className="p-6 md:p-8 border-b border-slate-50 flex justify-between items-center bg-linear-to-r from-rose-50 to-transparent">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-800 dark:text-white">My Donations</h2>
          <p className="text-sm text-slate-500 mt-1 font-medium">History of all your contributions to our furry friends.</p>
        </div>
        <span className="text-sm font-bold text-rose-500 bg-rose-50 px-5 py-2 rounded-2xl border border-rose-100">
          Total: {donations.length}
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50/80 dark:bg-slate-800/80 backdrop-blur-sm">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id} className="p-5 text-xs font-black text-slate-500 uppercase tracking-widest">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-slate-50">
            {table.getRowModel().rows.map(row => (
              <tr key={row.id} className="hover:bg-rose-50/30 transition-all duration-200 group">
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="p-5 text-sm font-medium text-slate-700 dark:text-slate-300">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {donations.length > 10 && (
        <div className="p-6 border-t border-slate-50 flex items-center justify-between bg-white">
          <div className="flex gap-3">
            <button 
              className="px-6 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-100 disabled:opacity-30 transition-all"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </button>
            <button 
              className="px-6 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-100 disabled:opacity-30 transition-all"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </button>
          </div>
          <p className="text-sm font-bold text-slate-400">
            Page <span className="text-slate-800">{table.getState().pagination.pageIndex + 1}</span> of {table.getPageCount()}
          </p>
        </div>
      )}
    </div>
  );
};

export default MyDonation;