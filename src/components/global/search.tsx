import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

type SearchComponentProps = {
}

const SearchComponent: React.FC<SearchComponentProps> = (props) => {

  // React Query - https://jsonplaceholder.typicode.com/users
  const [searchQuery, setSearchQuery] = useState("");

  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: [`searchBook/results/${searchQuery}`],
    queryFn: async (arg) => {

      console.log("arg: ", arg, "searchQuery: ", searchQuery);

      const cache = queryClient.getQueryData(["searchBook/results"]);
      if (cache) return cache;

      const response = await axios.get("https://jsonplaceholder.typicode.com/users");

      return response.data;
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
      <>
        {
          query.isLoading && (
            <div className="flex items-center justify-center">
              <p>Loading...</p>
            </div>
          )
        }
        {
          query.isSuccess && (
            <div className="flex items-center justify-center">
              <p>Success!</p>
              <p></p>
            </div>
          )
        }
        {
          query.isError && (
            <div className="flex items-center justify-center">
              <p>Error!</p>
            </div>
          )
        }
      </>
    </>
  )

}

export default SearchComponent;