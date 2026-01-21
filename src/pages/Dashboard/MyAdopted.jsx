import React, {  useMemo } from 'react';
import { 
  useReactTable, 
  getCoreRowModel, 
  getSortedRowModel, 
  getPaginationRowModel, 
  flexRender 
} from '@tanstack/react-table';
import {  ArrowUpDown } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import useAuth from '@/hooks/useAuth';


const MyAdopted = () => {
  const axiosSecure = useAxiosSecure();
  const {user} = useAuth()
  
  const {data: myAdopted =[]} = useQuery({
    queryKey: ['myAdded',user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/myAdoptedPets/${user?.email}`)
      return res.data
    }
  })
  console.log(myAdopted);

  const columns = useMemo(() => [
    {
      header: 'S/N',
      accessorFn: (row, index) => index + 1,
    },
    {
      accessorKey: 'petImage',
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
      accessorKey: 'petOwner',
      header: ({ column }) => (
        <button className="flex items-center gap-1 hover:text-primary font-bold" onClick={() => column.toggleSorting()}>
          Owner <ArrowUpDown size={14} />
        </button>
      ),
    },
    {
        accessorKey: 'phone',
        header: "Phone"
    },
    {
        accessorKey: 'address',
        header: "Location"
    },
    {
        accessorKey: 'statusUpdatedAt ',
        header: "Adoption timeline",
        cell: ({row}) => <span className="font-bold text-slate-700">{new Date(row.original.statusUpdatedAt || new Date(row.original.requestedAt)).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric' })}</span>
    },
    {
      accessorKey: 'status',
      header: 'Adoption Status',
      cell: ({ getValue }) => (
        <span className={`px-3 py-1 rounded-full text-xs font-bold ${getValue() === "accepted" ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'}`}>
          {getValue() === "accepted" ? 'Adopted' : 'Not Accepted'}
        </span>
      ),
    },
   
  ], [myAdopted]);

  const table = useReactTable({
    data:  myAdopted,
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
          <h2 className="text-3xl font-extrabold text-slate-800 dark:text-white">My Adopted Pets + Requested Pets</h2>
          <p className="text-sm text-slate-500 mt-1 font-medium">Manage and track your listed pets effortlessly.</p>
        </div>
        <span className="text-sm font-bold text-rose-500 bg-rose-50 px-5 py-2 rounded-2xl border border-rose-100">
          Total: {myAdopted.length}
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
      {myAdopted.length > 10 && (
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

export default MyAdopted;