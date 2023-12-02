import { useQuery } from "@tanstack/react-query";
import { getAdminStatisticsOverview } from "../../../api/statistics";

import { BsPeopleFill } from "react-icons/bs";
import { PiBooksFill } from "react-icons/pi";
import { FaBookOpen } from "react-icons/fa";

const AdminStatisticsOverviewCards: React.FC = () => {

  const adminStatistics = useQuery({
    queryKey: ["adminStatisticsOverview"],
    cacheTime: 1000 * 60 * 5, // 5 minutes
    staleTime: 1000 * 60 * 5,
    queryFn: async () => {

      return ((await getAdminStatisticsOverview()).data).stats as { totalBooks: number, totalUsers: number, totalIssuedBooks: number, totalOverdueBooks: number };
    }
  });

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3 xl:gap-4">

        {/* Books */}
        <div className="w-full flex flex-row space-x-3 bg-[#8395fb] text-white rounded-lg p-4">
          <PiBooksFill className="w-8 h-8 opacity-80 my-auto" />
          <div className="flex flex-col">
            <h1 className="text-xl font-bold line-clamp-1">Books</h1>
            <div className="flex flex-row space-x-1">
              <span className="opacity-90 text-sm font-medium tracking-tight">Total: {adminStatistics.data?.totalBooks ?? 0}</span>
            </div>
          </div>
        </div>

        {/* Members */}
        <div className="w-full flex flex-row space-x-3 bg-[#7fd81e] text-white rounded-lg p-4">
          <BsPeopleFill className="w-8 h-8 opacity-80 my-auto" />
          <div className="flex flex-col">
            <h1 className="text-xl font-bold line-clamp-1">Members</h1>
            <div className="flex flex-row space-x-1">
              <span className="opacity-90 text-sm font-medium tracking-tight">Total: {adminStatistics.data?.totalUsers ?? 0}</span>
            </div>
          </div>
        </div>

        {/* Issued Books */}
        <div className="w-full flex flex-row space-x-3 bg-[#00c6ff] text-white rounded-lg p-4">
          <FaBookOpen className="w-8 h-8 opacity-80 my-auto" />
          <div className="flex flex-col">
            <h1 className="text-xl font-bold line-clamp-1">Issued Books</h1>
            <div className="flex flex-row space-x-1">
              <span className="opacity-90 text-sm font-medium tracking-tight">Total: {adminStatistics.data?.totalIssuedBooks ?? 0}</span>
            </div>
          </div>
        </div>

        {/* Overdue Books */}
        <div className="w-full flex flex-row space-x-3 bg-[#ff0000] text-white rounded-lg p-4">
          <FaBookOpen className="w-8 h-8 opacity-80 my-auto" />
          <div className="flex flex-col">
            <h1 className="text-xl font-bold line-clamp-1">Overdue Books</h1>
            <div className="flex flex-row space-x-1">
              <span className="opacity-90 text-sm font-medium tracking-tight">Total: {adminStatistics.data?.totalOverdueBooks ?? 0}</span>
            </div>
          </div>
        </div>

      </div>
    </>
  )

}

export default AdminStatisticsOverviewCards;