import React, { useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender
} from '@tanstack/react-table';
import { Edit, Trash2, Pause, Play, ArrowUpDown, Banknote, ShieldAlert, DollarSign } from 'lucide-react';
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
import Loading from '@/components/Loading';
import { Link } from 'react-router-dom';

const AllDonations = () => {
  const axiosSecure = useAxiosSecure();

  // fetch all donations
  const { data: campaigns = [], refetch, isLoading } = useQuery({
    queryKey: ['donations'],
    queryFn: async () => {
      const res = await axiosSecure.get('/donationCampaigns')
      return res.data
    }
  })

  const handleDelete = async (id) => {
    try {
      const response = await axiosSecure.delete(`/donationCampaigns/${id}`)
      console.log(response.data);
      toast.success('Campaign deleted successfully!')
      refetch()
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message)
    }
  };

  const togglePause = async (id, status) => {
    try {
      const newStatus = !status;
      const res = await axiosSecure.patch(`/donationCampaigns/${id}`, { status: newStatus })
      refetch()
      console.log(res.data);
      toast.success('Status updated successfully!')
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message)
    }
  };

  const columns = useMemo(() => [
    {
      accessorKey: 'petName',
      header: 'Campaign Name',
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <DollarSign className="text-emerald-500" size={18} />
          <span className="font-bold">{row.original.petName}</span>
        </div>
      )
    },
    {
      accessorKey: 'email',
      header: 'Organizer',
      cell: ({ getValue }) => <span className="text-xs text-muted-foreground">{getValue()}</span>
    },
    {
      header: 'Progress',
      cell: ({ row }) => {
        const progress = (row.original.donatedAmount / row.original.requiredAmount) * 100;
        return (
          <div className="w-32 space-y-1">
            <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
              <div className="bg-orange-400 h-full" style={{ width: `${progress}%` }}></div>
            </div>
            <p className="text-[10px] font-medium tracking-wider">${row.original.donatedAmount} / ${row.original.requiredAmount}</p>
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
          <Link to={`/dashboard/edit-donation/${row.original._id}`}>
            <button className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <Edit size={16} />
            </button>
          </Link>

          {/* Pause/Play Toggle */}
          <button
            onClick={() => togglePause(row.original._id, row.original.isPaused)}
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
                  onClick={() => handleDelete(row.original._id)}
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
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
      <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-gradient-to-r from-emerald-50/30 to-transparent">
        <div>
          <h2 className="text-2xl font-black text-slate-800">All Donation Campaigns</h2>
          <p className="text-sm text-slate-500 font-medium italic">Manage and moderate all fundraising activities on the platform.</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        {table.getRowModel().rows.length > 0 ? (
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
        ) : (
          <div className="p-5 text-center text-slate-500">No campaigns found.</div>
        )}
      </div>
    </div>
  );
};

export default AllDonations;