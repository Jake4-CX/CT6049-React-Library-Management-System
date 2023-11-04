import { type Table } from "@tanstack/react-table";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi2";

type PaginationComponentProps = {
  className?: string,
  pageSize: number,
  pageIndex: number,
  totalItems: number,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  callbackFn: Table<any>,
}

const PaginationComponent: React.FC<PaginationComponentProps> = (props) => {

  const entityClass = "relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 cursor-pointer";
  const selectedEntityClass = "relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600";
  const disabledEntityClass = "relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 cursor-not-allowed";

  return (
    <>
      <div className={`fisolate inline-flex -space-x-px rounded-md shadow-sm bg-white ${props.className}`} aria-label="Pagination">
        <button className={(isNatvigatable(props.pageIndex - 1) ? entityClass : disabledEntityClass) + ` rounded-l-md`} onClick={() => props.callbackFn.setPageIndex(props.pageIndex - 1)} disabled={!(isNatvigatable(props.pageIndex - 1))}>
          <HiOutlineChevronLeft className="text-xl" />
        </button>
        <button className={`${props.pageIndex === 0 ? selectedEntityClass : (isNatvigatable(0) ? entityClass : disabledEntityClass)}`} onClick={() => props.callbackFn.setPageIndex(0)} disabled={!(isNatvigatable(0))}>
          1
        </button>
        <button className={`${props.pageIndex === 1 ? selectedEntityClass : (isNatvigatable(1) ? entityClass : disabledEntityClass)}`} onClick={() => props.callbackFn.setPageIndex(1)} disabled={!(isNatvigatable(1))}>
          2
        </button>
        <button className={`${props.pageIndex === 2 ? selectedEntityClass : (isNatvigatable(2) ? entityClass : disabledEntityClass)}`} onClick={() => props.callbackFn.setPageIndex(2)} disabled={!(isNatvigatable(2))}>
          3
        </button>
        <span className={`${disabledEntityClass} bg-gray-50`}>
          ...
        </span>
        {/* Upperbound page numbers */}
        <button className={(isNatvigatable(props.pageIndex + 1) ? entityClass : disabledEntityClass) + ` rounded-r-md`} onClick={() => props.callbackFn.setPageIndex(props.pageIndex + 1)} disabled={!(isNatvigatable(props.pageIndex + 1))}>
          <HiOutlineChevronRight className="text-xl" />
        </button>
      </div>
      {
        props.totalItems > props.pageSize ? (
          <div className="text-xs text-gray-500 mt-2">
            Showing {props.pageIndex * props.pageSize + 1} to {props.pageIndex * props.pageSize + props.pageSize} of {props.totalItems} results
          </div>
        ) : null
      }
    </>
  )

  function isNatvigatable(nextPage: number) {
    return nextPage >= 0 && nextPage <= Math.floor(props.totalItems / props.pageSize);
  }
}

export default PaginationComponent;