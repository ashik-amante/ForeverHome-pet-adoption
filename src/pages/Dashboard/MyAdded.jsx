import React, {  useMemo } from 'react';
import { 
  useReactTable, 
  getCoreRowModel, 
  getSortedRowModel, 
  getPaginationRowModel, 
  flexRender 
} from '@tanstack/react-table';
import { Edit, Trash2, CheckCircle, ArrowUpDown } from 'lucide-react';
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
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import useAuth from '@/hooks/useAuth';
import { toast } from 'sonner';
import Loading from '@/components/Loading';

const MyAdded = () => {
  const axiosSecure = useAxiosSecure();
  const {user} = useAuth()
  
  const {data: myAdded =[],refetch,isLoading} = useQuery({
    queryKey: ['myAdded',user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/pets/${user?.email}`)
      return res.data
    }
  })
  console.log(myAdded);

  const handleDelete =async (id) => {
    console.log(id);
    const response = await axiosSecure.delete(`/pets/${id}`)
    console.log(response.data);
    toast.success('Pet deleted successfully!')
    refetch()
  };

  const columns = useMemo(() => [
    {
      header: 'S/N',
      accessorFn: (row, index) => index + 1,
    },
    {
      accessorKey: 'image',
      header: 'Image',
      cell: ({ getValue }) => (
        <img src={getValue()} alt="pet" className="w-12 h-12 rounded-xl object-cover border border-rose-100" />
      ),
    },
    {
      accessorKey: 'petName',
      header: ({ column }) => (
        <button className="flex items-center gap-1 hover:text-primary font-bold" onClick={() => column.toggleSorting()}>
          Name <ArrowUpDown size={14} />
        </button>
      ),
    },
    {
      accessorKey: 'category',
      header: ({ column }) => (
        <button className="flex items-center gap-1 hover:text-primary font-bold" onClick={() => column.toggleSorting()}>
          Category <ArrowUpDown size={14} />
        </button>
      ),
    },
    {
      accessorKey: 'adopted',
      header: 'Adoption Status',
      cell: ({ getValue }) => (
        <span className={`px-3 py-1 rounded-full text-xs font-bold ${getValue() ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'}`}>
          {getValue() ? 'Adopted' : 'Not Adopted'}
        </span>
      ),
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          {/* Update Button */}
          <button className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all shadow-sm">
            <Link to={`/dashboard/update-pet/${row.original._id}`}>
              <Edit size={16} />
            </Link>
          </button>
          
          {/* Shadcn Delete Modal */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button className="p-2 bg-rose-50 text-rose-600 rounded-lg hover:bg-rose-600 hover:text-white transition-all shadow-sm">
                <Trash2 size={16} />
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent className="rounded-3xl">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-xl font-bold text-rose-600">Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription className="text-muted-foreground">
                  This action cannot be undone. This will permanently delete <b>{row.original.name}</b> from your listing.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="rounded-xl border-slate-200">Cancel</AlertDialogCancel>
                <AlertDialogAction 
                  onClick={() => handleDelete(row.original._id)}
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
  ], [myAdded]);

  const table = useReactTable({
    data:  myAdded,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 5 } },
  });

  if(isLoading) return <Loading/>
  return (
    <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 shadow-sm
     overflow-hidden">
      <div className="p-6 md:p-8 border-b border-slate-50 flex justify-between items-center bg-linear-to-r from-rose-50 to-transparent">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-800 dark:text-white">My Added Pets</h2>
          <p className="text-sm text-slate-500 mt-1 font-medium">Manage and track your listed pets effortlessly.</p>
        </div>
        <span className="text-sm font-bold text-rose-500 bg-rose-50 px-5 py-2 rounded-2xl border border-rose-100">
          Total: {myAdded.length}
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
      {myAdded.length > 10 && (
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

export default MyAdded;