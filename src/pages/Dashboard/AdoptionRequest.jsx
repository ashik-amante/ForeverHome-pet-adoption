import React, { useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender
} from '@tanstack/react-table';
import { Edit, Trash2, CheckCircle, ArrowUpDown, X } from 'lucide-react';
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

const AdoptionRequest = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth()

  const { data: adoptionRequests = [],refetch } = useQuery({
    queryKey: ['adoptionRequests', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/adoptionRequests/${user?.email}`)
      return res.data
    }
  })
  console.log(adoptionRequests);

  const handleStatus = async (id, status) => {
    console.log(id, status);
    const newStatus = status
    console.log(newStatus);
    const response = await axiosSecure.patch(`/adoptionRequests/${id}`, { status: newStatus })
    refetch()
    toast.success('Status updated successfully!')
    console.log(response.data);
  }

  const columns = useMemo(() => [

    {
      accessorKey: 'petImage',
      header: 'Pet Image',
      cell: ({ getValue }) => (
        <img src={getValue()} alt="pet" className="w-12 h-12 rounded-xl object-cover border border-rose-100" />
      ),
    },
    {
      accessorKey: 'userName',
      header: ' Requester Name'
    },
    {
      accessorKey: 'email',
      header: "Requester's Email",
    },
    {
      accessorKey: 'phone',
      header: "Requester's Phone",
    },
    {
      accessorKey: 'address',
      header: "Requester's Address",
    },


    {
      accessorKey: 'status',
      header: 'Adoption Status',
      cell: ({ row }) => {
        const { status } = row.original
        const statusClass = status === 'pending' ? 'bg-amber-100 text-amber-500' : status === 'accepted' ? 'bg-green-200 text--600' : 'bg-rose-100 text-rose-500'
        return (
          <span className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${statusClass} `}>
            {row.original.status}
          </span>
        )

      }
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <div className="flex items-center gap-4">

          {/* Shadcn Reject Modal */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button className="p-2 bg-rose-50 text-rose-600 rounded-lg hover:bg-rose-600 hover:text-white transition-all shadow-sm">
                <X size={16} />
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
                  onClick={() => handleStatus(row.original._id, "rejected")}
                  className="bg-rose-600 hover:bg-rose-700 text-white rounded-xl"
                >
                  Yes, Reject
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          {/* Adoption accept Button Modal */}
          {!row.original.adopted && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button className="p-2 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-600 hover:text-white transition-all shadow-sm">
                  <CheckCircle size={16} />
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent className="rounded-3xl">
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-xl font-bold text-emerald-600">Mark as Adopted?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Is <b>{row.original.name}</b> successfully adopted? This will update the status across the platform.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="rounded-xl">No</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => handleStatus(row.original._id, "accepted")}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl"
                  >
                    Yes, Adopted
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
      ),
    },
  ], [adoptionRequests]);

  const table = useReactTable({
    data: adoptionRequests,
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
          <h2 className="text-3xl font-extrabold text-slate-800 dark:text-white">Adoption Requests For Pets</h2>
          <p className="text-sm text-slate-500 mt-1 font-medium">Manage and track your adoption requested  pets effortlessly.</p>
        </div>
        <span className="text-sm font-bold text-rose-500 bg-rose-50 px-5 py-2 rounded-2xl border border-rose-100">
          Total: {adoptionRequests.length}
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
      {adoptionRequests.length > 10 && (
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

export default AdoptionRequest;