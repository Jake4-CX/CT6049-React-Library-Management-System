import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table";
import moment from "moment";
import PaginationComponent from "../../global/pagination";
import { getAllUserFines } from "../../../api/loanFines";


const MyFinesTable: React.FC = () => {

  const navigate = useNavigate();

  const myFines = useQuery({
    queryKey: ["myFines"],
    cacheTime: 1000 * 60 * 5, // 5 minutes
    staleTime: 1000 * 60 * 5,
    queryFn: async () => {

      return await ((await getAllUserFines()).data).loanFines as LoanFine[];
    }
  });

  const columns: ColumnDef<LoanFine>[] = [
    {
      accessorKey: "id",
      header: "ID"
    },
    {
      accessorKey: "book.bookName",
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
      accessorKey: "loan.returnedAt",
      header: "Returned At",
      cell: ({ row }) => (
        <div className="flex items-center justify-center">
          {moment(row.original.loan?.returnedAt).format("DD/MM/YY")}
        </div>
      )
    },
    {
      accessorKey: "fineAmount",
      header: "Fine Amount",
      cell: ({ row }) => (
        <>
          <div className="flex items-center justify-center">
            <span className="text-red-500">£ {row.original.fineAmount}</span>
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
            <span className="text-gray-500">{row.original.paidAt ? moment(row.original.paidAt).format("DD MMM YYYY") : "Not Paid"}</span>
          </div>
        </>
      )
    }
  ]

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
        {
          myFines.isLoading ? (
            <div className="flex flex-col items-center justify-center h-[5.813rem]">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#545F71]"></div>
            </div>
          ) : myFines.isError ? (
            <div>Error: {myFines.error.message}</div>
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
                        No fines found.
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

export default MyFinesTable;