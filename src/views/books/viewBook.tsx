import { useParams } from "react-router-dom";
import DefaultLayout from "../../layouts/defaultLayout";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getBook, borrowBook } from "../../api/books";

import { BsFillCalendarDateFill, BsPersonFill } from "react-icons/bs";
import toast from "react-hot-toast";
import moment from "moment";
import BookCategoryBadge from "../../components/global/badges/bookCategoryBadge";
import { AxiosError } from "axios";
import { returnBookLoan } from "../../api/bookLoans";
import MoreFromAuthor from "../../components/books/moreFromAuthor";
import MoreFromCategory from "../../components/books/moreFromCategory";

const BookPage: React.FC = () => {

  const { bookId } = useParams<{ bookId: string }>();

  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: [`book/${bookId}`],
    cacheTime: 1000 * 60 * 5, // 5 minutes
    staleTime: 1000 * 60 * 5,
    queryFn: async () => {
      if (!bookId) {
        return;
      }

      const bookResponse = await getBook(bookId);
      const book = bookResponse.data as { book: Book, loanedBook?: LoanedBook, booksLoaned: number };

      return book;
    }
  });

  const { mutate: borrowBookMutate, isLoading: isBorrowBookLoading } = useMutation({
    mutationFn: borrowBook,
    mutationKey: "borrowBook",
    onSuccess: () => {
      toast.success("Successfully borrowed book!");

      queryClient.invalidateQueries([`book/${bookId}`]);
      queryClient.invalidateQueries(['books/landingBooks']);
      queryClient.invalidateQueries(['myLoans']);
      queryClient.invalidateQueries(['myFines']);
      queryClient.invalidateQueries(['myCurrentLoans']);
    },
    onError: (error: AxiosError) => {
      const errorData = error.response?.data as { error: { message: string } } | undefined;
      const errorMessage = errorData?.error.message ?? "Failed to borrow book.";

      toast.error(errorMessage);
    }
  });

  const { mutate: returnBookMutate, isLoading: isReturnBookLoading } = useMutation({
    mutationFn: returnBookLoan,
    mutationKey: "returnBook",
    onSuccess: () => {
      toast.success("Successfully returned book!");

      queryClient.invalidateQueries([`book/${bookId}`]);
      queryClient.invalidateQueries(['books/landingBooks']);
      queryClient.invalidateQueries(['myLoans']);
      queryClient.invalidateQueries(['myFines']);
      queryClient.invalidateQueries(['myCurrentLoans']);
    },
    onError: (error: AxiosError) => {
      const errorData = error.response?.data as { error: { message: string } } | undefined;
      const errorMessage = errorData?.error.message ?? "Failed to return book.";

      toast.error(errorMessage);
    }
  });

  return (
    <DefaultLayout className="mt-3">
      <div className="w-full md:w-[44rem] xl:w-[56rem] space-y-3">
        {
          query.data && query.data.loanedBook && (
            moment().diff(query.data.loanedBook.loanedAt, "days") - 14 >= 0 ? (
              <div className="w-full h-[4rem] flex items-center justify-center rounded-lg bg-red-500 p-4">
                <h2 className="text-white font-medium">This book is {moment().diff(query.data.loanedBook.loanedAt, "days") - 14} days late. Return now!</h2>
              </div>
            ) : (
              <div className="w-full h-[4rem] flex items-center justify-center rounded-lg bg-amber-500 p-4">
                <h2 className="text-white font-medium">You have currently loaned this book for {moment().diff(query.data.loanedBook.loanedAt, "days")} days.</h2>
              </div>
            )
          )
        }
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">

          <div className="relative w-full sm:w-2/3 h-[21rem]">
            <img
              src={query.data?.book.bookThumbnailURL || "/image-placeholder_3x2.svg"}
              className="w-full h-full sm:max-h-fit object-cover select-none rounded-lg"
              alt="book-card"
            />
            <div className="absolute top-0 right-0 mt-2 mr-2 px-2 rounded-lg bg-yellow-500 text-gray-100 text-xs font-medium">
              {query.data ? (query.data.book.bookQuantity - query.data.booksLoaned) : 0} left
            </div>
          </div>

          <div className="w-full bg-gray-200 rounded-lg p-4">
            <div className="flex flex-col">
              <h1 className="text-xl font-bold line-clamp-1">{query.data?.book.bookName}</h1>
              <div className="flex flex-col sm:flex-row w-full justify-between">
                <div className="flex flex-row space-x-1">
                  <BsPersonFill className="w-4 h-4 text-gray-500 my-auto" />
                  <span className="text-gray-500 text-sm font-medium tracking-tight">{query.data?.book.bookAuthor?.authorFirstName + " " + query.data?.book.bookAuthor?.authorLastName}</span>
                </div>

                <div className="flex flex-row space-x-1">
                  <BsFillCalendarDateFill className="w-4 h-4 text-gray-500 my-auto" />
                  <span className="text-gray-500 text-sm font-medium tracking-tight">{moment(query.data?.book.bookPublishedDate).format("dddd Do MMMM YYYY")}</span>
                </div>
              </div>

              <hr className="my-2 border-x-[1px] border-gray-300" />
              {/* Assigned Categories to book */}

              <div className="flex flex-row flex-wrap gap-2">
                <BookCategoryBadge bookCategory={query.data?.book.bookCategory} />
              </div>

              <hr className="my-2 border-x-[1px] border-gray-300" />

              <div className="flex flex-row justify-end space-x-2">
                {
                  query.data ? (
                    query.data.loanedBook ? (
                      (moment().diff(query.data.loanedBook.loanedAt, "days") - 14) >= 0) ? (
                      <>
                        <button onClick={returnLateButton} className="bg-red-500 hover:bg-red-600 duration-300 text-gray-100 px-3 py-1 rounded-lg text-xs md:text-sm font-medium ml-2" disabled={isReturnBookLoading ?? query.isLoading}>
                          {
                            isReturnBookLoading ? (
                              <div className="flex flex-row space-x-2">
                                <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white my-auto"></div>
                                <span>Returning late</span>
                              </div>
                            ) : (
                              <span>Return late</span>
                            )
                          }
                        </button>
                      </>
                    ) : (
                      <>
                        <button onClick={returnBookButton} className="bg-gray-500 hover:bg-gray-600 duration-300 text-gray-100 px-3 py-1 rounded-lg text-xs md:text-sm font-medium ml-2" disabled={isReturnBookLoading ?? query.isLoading}>
                          {
                            isReturnBookLoading ? (
                              <div className="flex flex-row space-x-2">
                                <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white my-auto"></div>
                                <span>Returning</span>
                              </div>
                            ) : (
                              <span>Return</span>
                            )
                          }
                        </button>
                      </>
                    ) : (
                      query.data.booksLoaned < query.data.book.bookQuantity ? (
                        <>
                          <button onClick={borrowBookButton} className="bg-green-500 hover:bg-green-600 duration-300 text-gray-100 px-3 py-1 rounded-lg text-xs md:text-sm font-medium ml-2" disabled={isBorrowBookLoading ?? query.isLoading}>
                            {
                              isBorrowBookLoading ? (
                                <div className="flex flex-row space-x-2">
                                  <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white my-auto"></div>
                                  <span>Borrowing</span>
                                </div>
                              ) : (
                                <span>Borrow</span>
                              )
                            }
                          </button>
                        </>
                      ) : (
                        <button className="bg-gray-500 hover:bg-gray-600 duration-300 text-gray-100 px-3 py-1 rounded-lg text-xs md:text-sm font-medium ml-2" disabled={true}>
                          <span>Out of stock</span>
                        </button>
                      )
                    )
                  ) : (
                    <>
                    </>
                  )
                }
              </div>

            </div>
          </div>
        </div >
        <div className="h-[12rem] w-full bg-gray-200 rounded-lg p-4">
          <p>{query.data?.book.bookDescription}</p>

          <hr className="my-2 border-x-[1px] border-gray-300" />

          <div className="text-gray-500 text-sm font-medium tracking-tight">
            <span className="font-semibold">ISBN: </span>
            <span>{query.data?.book.bookISBN}</span>
          </div>

          <div className="text-gray-500 text-sm font-medium tracking-tight">
            <span className="font-semibold">Author: </span>
            <span>{query.data?.book.bookAuthor?.authorFirstName + " " + query.data?.book.bookAuthor?.authorLastName}</span>
          </div>

        </div>

        <MoreFromAuthor author={query.data?.book.bookAuthor} />
        <MoreFromCategory category={query.data?.book.bookCategory} />
      </div>
    </DefaultLayout >
  )

  function borrowBookButton() {
    if (query.data?.book.bookQuantity === 0) {
      toast.error("There are no books left to borrow.");
      return;
    }

    borrowBookMutate(query.data?.book.bookId as string);
  }

  function returnBookButton() {

    if (query.data && query.data.loanedBook) {

      if (query.data.loanedBook.returnedAt == undefined) {

        if ((moment().diff(query.data.loanedBook.loanedAt, "days") - 14) < 0) {
          returnBookMutate(query.data.loanedBook.loanedBookId as string);
        } else {
          toast.error("You have to return this book late.");
          return;
        }

      } else {
        toast.error("You have already returned this book.");
        return;
      }

    }

  }

  function returnLateButton() {

    if (query.data && query.data.loanedBook) {

      if (query.data.loanedBook.returnedAt == undefined) {

        if ((moment().diff(query.data.loanedBook.loanedAt, "days") - 14) > 0) {
          returnBookMutate(query.data.loanedBook.loanedBookId as string);
        } else {
          toast.error("This book is not late.");
          return;
        }
      } else {
        toast.error("You have already returned this book.");
        return;
      }
    }
  }

}

export default BookPage;