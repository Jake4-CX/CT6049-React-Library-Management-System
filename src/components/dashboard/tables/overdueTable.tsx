import { useReactTable, type ColumnDef, getCoreRowModel, flexRender, getPaginationRowModel } from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";
import { HiLink } from "react-icons/hi";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getOverdueBooks } from "../../../api/books";
import moment from "moment";
import BookCategoryBadge from "../../global/badges/bookCategoryBadge";
import DaysOverdueBadge from "../../global/badges/daysOverdueBadge";
import PaginationComponent from "../../global/pagination";

const OverdueTable: React.FC = () => {

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const overdueBooks = useQuery({
    queryKey: ["overdueBooks"],
    queryFn: async () => {

      const cache: LoanedBook[] | undefined = queryClient.getQueryData(["overdueBooks"]);

      if (cache) {
        return cache;
      }

      return await ((await getOverdueBooks()).data).overdueBooks as LoanedBook[];
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
    }, {
      accessorKey: "book.bookCategory.categoryName",
      header: "Book Category",
      cell: ({ row }) => (
        <div className="flex items-center justify-center">
          <BookCategoryBadge bookCategory={row.original.book.bookCategory} />
        </div>
      )
    }, {
      header: "Days Overdue",
      cell: ({ row }) => (
        <div className="flex items-center justify-center">
          <DaysOverdueBadge daysOverdue={moment().diff(moment(row.original.loanedAt), "days") - 14} />
        </div>
      )
    }, {
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex items-center justify-center space-x-2">
          <button onClick={() => void navigate("/book/" + row.original.book.bookId)} className="flex items-center justify-center w-[40px] h-[40px] rounded-full bg-[#f5f5f5] hover:bg-[#e5e5e5] transition-colors duration-300">
            <HiLink className="text-[#545F71] text-2xl" />
          </button>
        </div>
      )
    }
  ]

  const table = useReactTable({
    data: overdueBooks.data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel()
  });

  const { pageSize, pageIndex } = table.getState().pagination;

  return (
    <>
      <div className="w-full lg:max-w-[42rem] shadow border-b border-gray-200 sm:rounded-lg overflow-x-auto">
        {
          overdueBooks.isLoading ? (
            <div className="flex flex-col items-center justify-center h-[5.813rem]">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#545F71]"></div>
            </div>
          ) : overdueBooks.isError ? (
            <div>Error: {overdueBooks.error.message}</div>
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
                        No overdue books found.
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

export default OverdueTable;