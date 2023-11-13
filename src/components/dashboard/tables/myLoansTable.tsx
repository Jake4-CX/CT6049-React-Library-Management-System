import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { getAllUsersLoans } from "../../../api/bookLoans";
import { ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table";
import BookCategoryBadge from "../../global/badges/bookCategoryBadge";
import moment from "moment";
import PaginationComponent from "../../global/pagination";


const MyLoansTable: React.FC = () => {

  const navigate = useNavigate();

  const myLoans = useQuery({
    queryKey: ["myLoans"],
    cacheTime: 1000 * 60 * 5, // 5 minutes
    staleTime: 1000 * 60 * 5,
    queryFn: async () => {

      return await ((await getAllUsersLoans()).data).loanedBooks as LoanedBook[];
    }
  });

  const columns: ColumnDef<LoanedBook>[] = [
    {
      accessorKey: "book.bookName",
      header: "Book Name",
      cell: ({ row }) => (
        <>
          <a onClick={() => void navigate("/book/" + row.original.book.bookId)} className="text-blue-500 hover:underline cursor-pointer">
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
          {moment(row.original.loanedAt).format("DD/MM/YYYY")}
        </div>
      )
    },
    {
      accessorKey: "dueDate",
      header: "Due Date",
      cell: ({ row }) => (
        <div className="flex items-center justify-center">
          {moment(row.original.loanedAt).add(14, "days").format("DD/MM/YYYY")}
        </div>
      )
    },
    {
      accessorKey: "returnedAt",
      header: "Returned At",
      cell: ({ row }) => (
        <div className="flex items-center justify-center">
          {row.original.returnedAt ? moment(row.original.returnedAt).format("DD/MM/YYYY") : "Not returned"}
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
                          <td key={cell.id} className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
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

export default MyLoansTable;