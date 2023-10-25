import { useParams } from "react-router-dom";
import DefaultLayout from "../layouts/defaultLayout";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBook, borrowBook } from "../api/books";

import { BsFillCalendarDateFill, BsPersonFill } from "react-icons/bs";
import toast from "react-hot-toast";

const BookPage: React.FC = () => {

  const { bookId } = useParams<{ bookId: string }>();

  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: [`book/${bookId}`],
    queryFn: async () => {

      const cache: Book | undefined = queryClient.getQueryData([`book/${bookId}`]);

      if (cache) {
        return cache;
      }

      if (!bookId) {
        return;
      }

      const book = ((await getBook(bookId)).data).book as Book;

      return book;
    }
  })

  return (
    <DefaultLayout>
      <div className="w-full md:w-[44rem] xl:w-[56rem] space-y-3">
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">

          <div className="relative w-full sm:w-2/3 h-[21rem]">
            <div className="w-full h-full bg-[#353535] rounded-lg"></div>
            <div className="absolute top-0 right-0 mt-2 mr-2 px-2 rounded-lg bg-yellow-500 text-gray-100 text-xs font-medium">
              {query.data?.bookQuantity} left
            </div>
          </div>

          <div className="w-full bg-gray-200 rounded-lg p-4">
            <div className="flex flex-col">
              <h1 className="text-xl font-bold line-clamp-1">{query.data?.bookName}</h1>
              <div className="flex flex-col sm:flex-row w-full justify-between">
                <div className="flex flex-row space-x-1">
                  <BsPersonFill className="w-4 h-4 text-gray-500 my-auto" />
                  <span className="text-gray-500 text-sm font-medium tracking-tight">{query.data?.bookAuthor.authorFirstName + " " + query.data?.bookAuthor.authorLastName}</span>
                </div>

                <div className="flex flex-row space-x-1">
                  <BsFillCalendarDateFill className="w-4 h-4 text-gray-500 my-auto" />
                  <span className="text-gray-500 text-sm font-medium tracking-tight">{query.data?.bookPublishedDate}</span>
                </div>
              </div>

              <hr className="my-2 border-x-[1px] border-gray-300" />
              {/* Assigned Categories to book */}

              <div className="flex flex-row flex-wrap gap-2">
                <div className="bg-gray-300 rounded-lg px-2 py-1">
                  <span className="text-xs font-semibold tracking-tight">{query.data?.bookCategory.categoryName}</span>
                </div>
              </div>

              <hr className="my-2 border-x-[1px] border-gray-300" />

              <div className="flex flex-row justify-end space-x-2">
                <button onClick={borrowBookButton} className="bg-green-500 hover:bg-green-600 duration-300 text-gray-100 px-3 py-1 rounded-lg text-xs md:text-sm font-medium ml-2">Borrow</button>
                <button className="bg-yellow-500 hover:bg-yellow-600 duration-300 text-gray-100 px-3 py-1 rounded-lg text-xs md:text-sm font-medium ml-2">Reserve</button>
              </div>

            </div>
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-lg p-4">
          <p>{query.data?.bookDescription}</p>

          <hr className="my-2 border-x-[1px] border-gray-300" />

          <div className="text-gray-500 text-sm font-medium tracking-tight">
            <span className="font-semibold">ISBN: </span>
            <span>{query.data?.bookISBN}</span>
          </div>

          <div className="text-gray-500 text-sm font-medium tracking-tight">
            <span className="font-semibold">Author: </span>
            <span>{query.data?.bookAuthor.authorFirstName + " " + query.data?.bookAuthor.authorLastName}</span>
          </div>

        </div>
      </div>
    </DefaultLayout>
  )

  function borrowBookButton() {
    if (query.data?.bookQuantity === 0) {
      toast.error("There are no books left to borrow.");
      return;
    }

    toast.promise(
      borrowBook(query.data?.bookId as string),
      {
        loading: "Borrowing book...",
        success: "Book borrowed successfully.",
        error: "Failed to borrow book."
      }
    );
  }

}

export default BookPage;