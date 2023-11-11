import { useQuery } from "@tanstack/react-query";
import BookDisplayCard from "../components/BookDisplayCard";
import DefaultLayout from "../layouts/defaultLayout";
import { getBooks } from "../api/books";
import HeroSection from "../components/landing/hero";

const LandingPage: React.FC = () => {

  const query = useQuery({
    queryKey: ["books/landingBooks"],
    cacheTime: 1000 * 60 * 5, // 5 minutes
    staleTime: 1000 * 60 * 5,
    queryFn: async () => {

      const books = ((await getBooks()).data).books as { book: Book, booksLoaned: number }[];

      return {books};
    }
  });

  return (
    <DefaultLayout>
      <HeroSection />
      <div className="w-fit h-full lg:h-[58rem] bg-white p-[4%]">
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