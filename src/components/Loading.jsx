import { PawPrint } from "lucide-react";
import React from "react";
import { ScaleLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-slate-50 dark:bg-slate-950">
      <div className="flex flex-col items-center gap-4">
        <ScaleLoader
          color="#6366f1" 
          height={40}
          width={5}
          radius={3}
          margin={4}
        />
        <p className=" flex items-center justify-center gap-4 text-sm sm:text-base lg:text-2xl font-semibold text-slate-500 dark:text-slate-400 italic">
          <PawPrint className="text-primary" size={32}/> Loading, please wait...
        </p>
      </div>
    </div>
  );
};

export default Loading;
