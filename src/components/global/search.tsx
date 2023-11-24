import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { searchBooks } from "../../api/books";
import { useNavigate } from "react-router-dom";

const SearchComponent: React.FC = () => {

  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<{ book: Book, loanedBook?: LoanedBook, booksLoaned: number }[]>([]);

  useQuery({
    queryKey: [`searchBook/results/${searchQuery}`],
    cacheTime: 1000 * 60 * 5, // 5 minutes
    queryFn: async () => {

      const searchResults = (await searchBooks(searchQuery)).data.books as { book: Book, loanedBook?: LoanedBook, booksLoaned: number }[];
      setSearchResults(searchResults);
      return searchResults;
    }
  });

  return (
    <>
      <div className="relative">
        <div className="h-10 flex items-center justify-center my-2 lg:my-auto">
          <input
            type="text"
            placeholder="Search for books..."
            className="w-full lg:max-w-[12rem] h-full px-4 py-2 rounded-l-lg bg-[#353535] text-white focus:outline-none"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="h-full flex items-center justify-center bg-[#353535] hover:bg-[#3f3f3f] text-white duration-300 rounded-r-lg space-x-3 px-4 py-2 lg:px-6">
            <MagnifyingGlassIcon className="text-[#f8f8f9] hover:text-[#6d6f71] h-3 w-3 cursor-pointer transition-colors duration-300" />
          </button>
        </div>

        {
          searchResults.length > 0 && (
            <div className="z-10 absolute w-full h-fit bg-gray-50/95 rounded-b-lg p-3 gap-y-3 mt-1">
              {
                searchResults.map((book, index) => {
                  return (
                    <div key={index} onClick={() => viewBook(book.book.bookId!)} className="flex flex-row gap-x-3 hover:bg-gray-100 rounded-xl cursor-pointer p-2">
                      <div className="w-[3rem] h-[3rem] bg-[#353535] rounded-lg">
                        <img
                          src={book.book.bookThumbnailURL || "/image-placeholder_3x2.svg"}
                          className="w-full h-full object-cover rounded-lg"
                          alt="book-card"
                        />
                      </div>
                      <div className="w-full flex flex-col">
                        <h1 className="text-xl font-bold line-clamp-1">{book.book.bookName}</h1>
                        <h2 className="text-sm font-medium tracking-tight">{book.book.bookAuthor?.authorFirstName + " " + book.book.bookAuthor?.authorLastName}</h2>
                      </div>
                    </div>
                  )
                })
              }
            </div>
          )
        }
      </div>
    </>
  )

  function viewBook(bookId: string) {
    navigate(`/book/${bookId}`);
  }

}

export default SearchComponent;