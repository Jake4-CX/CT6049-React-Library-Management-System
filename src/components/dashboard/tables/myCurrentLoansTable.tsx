import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { getAllCurrentUsersLoans } from "../../../api/bookLoans";
import { ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table";
import BookCategoryBadge from "../../global/badges/bookCategoryBadge";
import moment from "moment";
import PaginationComponent from "../../global/pagination";
import DaysOverdueBadge from "../../global/badges/daysOverdueBadge";


const MyCurrentLoansTable: React.FC = () => {

  const navigate = useNavigate();

  const myLoans = useQuery({
    queryKey: ["myCurrentLoans"],
    cacheTime: 1000 * 60 * 5, // 5 minutes
    staleTime: 1000 * 60 * 5,
    queryFn: async () => {

      return await ((await getAllCurrentUsersLoans()).data).loanedBooks as LoanedBook[];
    }
  });

  const columns: ColumnDef<LoanedBook>[] = [
    {
      accessorKey: "book.bookName",
      header: "Book Name",
      cell: ({ row }) => (
        <>
          <a onClick={() => void navigate("/book/" + row.original.book.bookId)} title={row.original.book.bookName} className="text-blue-500 hover:underline cursor-pointer">
            {row.original.book.bookName}
          </a>
        </>
      )
    },
    {
      accessorKey: "book.bookCategory.categoryName",
      header: "Book Category",
      cell: ({ row }) => (
        <div className="flex items-center justify-center">
          <BookCategoryBadge bookCategory={row.original.book.bookCategory} />
        </div>
      )
    },
    {
      accessorKey: "loanedAt",
      header: "Loaned At",
      cell: ({ row }) => (
        <div className="flex items-center justify-center">
          {moment(row.original.loanedAt).format("DD/MM/YY")}
        </div>
      )
    },
    {
      accessorKey: "dueDate",
      header: "Due Date",
      cell: ({ row }) => (
        <div className="flex items-center justify-center">
          {moment(row.original.loanedAt).add(14, "days").format("DD/MM/YY")}
        </div>
      )
    },
    {
      accessorKey: "daysOverdue",
      header: "Days Overdue",
      cell: ({ row }) => (
        <div className="flex items-center justify-center">
          {
            moment().diff(moment(row.original.loanedAt), "days") - 14 > 0 ? (
              <div className="flex items-center justify-center">
                <DaysOverdueBadge daysOverdue={moment().diff(moment(row.original.loanedAt), "days") - 14} />
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <span className="text-green-500">0</span>
              </div>
            )
          }
        </div>
      )
    }
  ]

  const table = useReactTable({
    data: myLoans.data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel()
  });

  const { pageSize, pageIndex } = table.getState().pagination;

  return (
    <>
      <div className="w-full lg:max-w-[42rem] shadow border-b border-gray-200 sm:rounded-lg overflow-x-auto">
        {
          myLoans.isLoading ? (
            <div className="flex flex-col items-center justify-center h-[5.813rem]">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#545F71]"></div>
            </div>
          ) : myLoans.isError ? (
            <div>Error: {myLoans.error.message}</div>
          ) : (
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
                        No active loans found.
                      </td>
                    </tr>
                  )
                }
              </tbody>
            </table>
          )
        }
      </div>
      <PaginationComponent className="mt-3" pageSize={pageSize} pageIndex={pageIndex} totalItems={table.getFilteredRowModel().rows.length} callbackFn={table} />
    </>
  )
}

export default MyCurrentLoansTable;