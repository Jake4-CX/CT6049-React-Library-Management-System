import { useQuery } from "@tanstack/react-query";
import { getAllUserFinesPaid } from "../../../api/loanFines";

const MonthlyFineCard: React.FC = () => {

  const userFine = useQuery({
    queryKey: ["userFine"],
    cacheTime: 1000 * 60 * 5, // 5 minutes
    staleTime: 1000 * 60 * 5,
    queryFn: async () => {

      return await ((await getAllUserFinesPaid()).data).loanFines as { id: string, loanId: string, amountPaid: number, paidAt: Date }[];
    }
  })

  return (
    <>
      <div className="flex flex-row w-[9rem] h-[6rem] p-4 bg-red-500 rounded-lg">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold text-white">£ { userFine.data?.reduce((prev, curr) => curr.amountPaid + prev, 0) }</h1>
          <p className="text-sm font-light tracking-tight text-white">Monthly Fine</p>
        </div>
      </div>
    </>
  )
}

export default MonthlyFineCard;