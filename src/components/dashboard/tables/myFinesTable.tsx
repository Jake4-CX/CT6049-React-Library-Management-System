import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table";
import moment from "moment";
import PaginationComponent from "../../global/pagination";
import { getAllUserFinesBetweenDates, payUserFine } from "../../../api/loanFines";
import DaysOverdueBadge from "../../global/badges/daysOverdueBadge";
import toast from "react-hot-toast";
import DateRangePickerComponent from "../../global/inputs/dateRangePicker";
import React, { useEffect, useState } from "react";


const MyFinesTable: React.FC = () => {

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [date, setDate] = useState<{ startDate: Date, endDate: Date }>({
    startDate: new Date(new Date().setDate(new Date().getDate() - 14)),
    endDate: new Date()
  });

  const [dateCache, setDateCache] = useState<{ startDate: Date, endDate: Date }>({
    startDate: date.startDate,
    endDate: date.endDate
  });

  const myFines = useQuery({
    queryKey: [`myFines`],
    cacheTime: 1000 * 60 * 5, // 5 minutes
    staleTime: 1000 * 60 * 5,
    queryFn: async () => {

      return await ((await getAllUserFinesBetweenDates(date.startDate.toISOString(), date.endDate.toISOString())).data).loanedBooks as LoanedBook[];
    }
  });

  useEffect(() => {

    if (dateCache.startDate === date.startDate && dateCache.endDate === date.endDate) return;

    setTimeout(() => {
      setDateCache(date);
      myFines.refetch();
    }, 100);
  }, [date, dateCache, myFines]);

  const { mutate: payFineMutate, isLoading: payFineIsLoading } = useMutation({
    mutationFn: payUserFine,
    mutationKey: "payFine",
    onSuccess: async () => {
      toast.success("Fine paid successfully!");
      queryClient.invalidateQueries([`myFines`]);
      queryClient.invalidateQueries([`userMonthlyFines`]);
    },
    onError: async () => {
      toast.error("Error paying fine!");
      await myFines.refetch();
    }
  });

  const columns: ColumnDef<LoanedBook>[] = [
    {
      header: "Loaned At",
      cell: ({ row }) => (
        <div className="flex items-center justify-center">
          {moment(row.original.loanedAt).format("DD/MM/YY")}
        </div>
      )
    },
    {
      header: "Book Name",
      cell: ({ row }) => (
        <>
          <a onClick={() => void navigate("/book/" + row.original.book?.bookId)} title={row.original.book?.bookName} className="text-blue-500 hover:underline cursor-pointer">
            {row.original.book?.bookName}
          </a>
        </>
      )
    },
    {
      header: "Fine Amount",
      cell: ({ row }) => (
        <div className="flex items-center justify-center">
          <span className="text-gray-500">£{row.original.loanFine.fineAmount.toFixed(2)}</span>
        </div>
      )
    },
    {
      header: "Days Overdue",
      cell: ({ row }) => (
        <>
          <div className="flex items-center justify-center">
            <DaysOverdueBadge daysOverdue={moment(row.original.returnedAt).diff(moment(row.original.loanedAt), "days") - 14} />
          </div>
        </>
      )
    },
    {
      accessorKey: "paidAt",
      header: "Paid At",
      cell: ({ row }) => (
        <>
          <div className="flex items-center justify-center">
            {/* If 'row.original.paidAt' is null, user has to pay fine - display button, else display paidAt date */}
            {
              row.original.loanFine.paidAt == null ? (
                <>
                  <button onClick={() => void handlePayFine(row.original.loanedBookId)} className="inline-flex items-center w-fit px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-red-500 hover:bg-red-600 focus:outline-none" disabled={payFineIsLoading}>
                    {
                      payFineIsLoading ? (
                        <div className="flex flex-row space-x-2">
                          <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white my-auto"></div>
                          <span>Paying Fine</span>
                        </div>
                      ) : (
                        <span>Pay Fine</span>
                      )
                    }
                  </button>
                </>
              ) : (
                <>
                  <span className="text-gray-500">{moment(row.original.loanFine.paidAt).format("DD MMM YYYY")}</span>
                </>
              )
            }
          </div>
        </>
      )
    }
  ];

  const table = useReactTable({
    data: myFines.data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel()
  });

  const { pageSize, pageIndex } = table.getState().pagination;

  return (
    <>
      <div className="w-full lg:max-w-[42rem] shadow border-b border-gray-200 sm:rounded-lg overflow-x-auto">
        <DateRangePickerComponent date={date} onDateChange={setDate} />
        {
          myFines.isLoading ? (
            <div className="flex flex-col items-center justify-center h-[5.813rem]">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#545F71]"></div>
            </div>
          ) : myFines.isError ? (
            <div>Error: {myFines.error.message}</div>
          ) : (
            <>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 table-auto">
                  {
                    table.getHeaderGroups().map(headerGroup => (
                      <tr key={headerGroup.id}>
                        {headerGroup.headers.map(header => (
                          <th key={header.id} colSpan={header.colSpan} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            {
                              header.isPlaceholder ? null : (
                                flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )
                              )
                            }
                          </th>
                        ))}
                      </tr>
                    ))
                  }
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {
                    table.getRowModel().rows.length > 0 ? (table.getRowModel().rows.map(row => (
                      <tr key={row.id}>
                        {
                          row.getVisibleCells().map(cell => (
                            <td key={cell.id} className="px-4 py-3 whitespace-nowrap">
                              <div className="text-sm text-gray-900 truncate overflow-hidden max-w-[10rem]">
                                {
                                  flexRender(
                                    cell.column.columnDef.cell,
                                    cell.getContext(),
                                  )
                                }
                              </div>
                            </td>
                          ))
                        }
                      </tr>
                    ))) : (
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium" colSpan={columns.length}>
                          No fines found.
                        </td>
                      </tr>
                    )
                  }
                </tbody>
              </table>
            </>
          )
        }
      </div>
      <PaginationComponent className="mt-3" pageSize={pageSize} pageIndex={pageIndex} totalItems={table.getFilteredRowModel().rows.length} callbackFn={table} />
    </>
  )

  function handlePayFine(loanedBookId: string) {
    payFineMutate(loanedBookId);
  }
}

export default MyFinesTable;