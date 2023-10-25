import { useQuery, useQueryClient } from "@tanstack/react-query";
import BookDisplayCard from "../components/BookDisplayCard";
import DefaultLayout from "../layouts/defaultLayout";
import { getBooks } from "../api/books";

const LandingPage: React.FC = () => {

  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["books/landingBooks"],
    queryFn: async () => {

      const cache: { books: Book[] } | undefined = queryClient.getQueryData(["books/landingBooks"]);

      if (cache) {
        return cache;
      }
      const books = ((await getBooks()).data).books as Book[];


      return {books};
    }
  });

  return (
    <DefaultLayout className="px-[4%]">
      <div className="w-fit h-full lg:h-[58rem] 2xl:max-w-[96rem] bg-white p-[4%]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
          {
            query.data && query.data.books.map((book, index) => (
              <BookDisplayCard book={book} key={index} />
            ))
          }
        </div>
      </div>
    </DefaultLayout>
  )
}

export default LandingPage;