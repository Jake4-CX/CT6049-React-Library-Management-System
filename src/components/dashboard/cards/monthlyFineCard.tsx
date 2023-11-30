import { useQuery } from "@tanstack/react-query";
import { getAllUserFinesPaidBetweenDates } from "../../../api/loanFines";

const MonthlyFineCard: React.FC = () => {

  const userFine = useQuery({
    queryKey: ["userFine"],
    cacheTime: 1000 * 60 * 5, // 5 minutes
    staleTime: 1000 * 60 * 5,
    queryFn: async () => {
      return await ((await getAllUserFinesPaidBetweenDates(new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString(), new Date().toISOString())).data).loanFines as { id: string, loanId: string, fineAmount: number, paidAt?: Date }[];
    }
  })

  return (
    <>
      <div className="flex flex-row w-[11rem] h-[7rem] px-2 py-3 bg-red-500 rounded-lg">
        <div className="flex flex-col">
          <h2 className="text-lg font-semibold tracking-tight text-white">You've paid</h2>
          {
            userFine.isLoading ? (
              <h1 className="text-3xl font-bold text-white">£ 0.00</h1>
            ) : (
              <h1 className="text-3xl font-bold text-white">£ {userFine.data?.reduce((prev, curr) => curr.fineAmount ?? 0 + prev, 0).toFixed(2)}</h1>
            )
          }
          <p className="text-sm font-medium tracking-tight text-white">in Fines in the last 30 days</p>
        </div>
      </div>
    </>
  )
}

export default MonthlyFineCard;