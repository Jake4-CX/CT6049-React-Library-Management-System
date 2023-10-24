import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { searchBooks } from "../../api/books";

type SearchComponentProps = {
}

const SearchComponent: React.FC<SearchComponentProps> = (props) => {

  const [searchQuery, setSearchQuery] = useState("");

  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: [`searchBook/results/${searchQuery}`],
    queryFn: async () => {

      const cache = queryClient.getQueryData([`searchBook/results/${searchQuery}`]);
      if (cache) return cache;

      return (await searchBooks(searchQuery)).data;
    }
  });

  return (
    <>
      <div className="h-10 flex items-center justify-center my-2 lg:my-auto">
        <input
          type="text"
          placeholder="Search for books..."
          className="w-full h-full px-4 py-2 rounded-l-lg bg-[#353535] text-white focus:outline-none"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="h-full flex items-center justify-center bg-[#353535] hover:bg-[#3f3f3f] text-white duration-300 rounded-r-lg space-x-3 px-4 py-2 lg:px-6">
          <MagnifyingGlassIcon className="text-[#f8f8f9] hover:text-[#6d6f71] h-3 w-3 cursor-pointer transition-colors duration-300" />
        </button>
      </div>
      <div className="z-10 absolute w-full h-fit bg-white p-3 gap-y-3">  
      {
        query.data?.books.map((book: Book) => {
          return (
            <div className="flex flex-row gap-x-3 hover:bg-gray-100 rouned-xl cursor-pointer">
              <div className="w-[4rem] h-[4rem] bg-[#353535] rounded-lg"></div>
              <div className="flex flex-col">
                <h1 className="text-xl font-bold line-clamp-1">{ book.bookName }</h1>
                <h2 className="text-sm font-medium tracking-tight">{ book.bookAuthor.authorFirstName + " " + book.bookAuthor.authorLastName }</h2>
              </div>
            </div>
          )
        })
      }
      </div>
    </>
  )

}

export default SearchComponent;