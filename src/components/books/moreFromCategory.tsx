import { useQuery } from "@tanstack/react-query"
import SmallBookDisplayCard from "../cards/smallBookDisplayCard"

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { getBooksFromCategory } from "../../api/categories";

type MoreFromCategoryProps = {
  category: BookCategory | undefined
}

const MoreFromCategory: React.FC<MoreFromCategoryProps> = (props) => {

  const query = useQuery({
    queryKey: [`authors/${props.category?.bookCategoryId}`],
    cacheTime: 1000 * 60 * 60 * 5,
    staleTime: 1000 * 60 * 60 * 5,
    queryFn: async () => {
      if (!(props.category) || !(props.category.bookCategoryId)) {
        return;
      }

      const authorBooksResponse = await getBooksFromCategory(props.category.bookCategoryId);
      return authorBooksResponse.data as { books: Book[] };
    }
  })

  return (
    <>
      <div className="w-full bg-gray-200 rounded-lg p-4">
        <h2 className="text-xl font-semibold">More {props.category?.categoryName} Books</h2>
        <hr className="my-2 border-x-[1px] border-gray-300" />
        <div className="flex flex-row justify-center bg-gray-300 rounded-lg p-4">
          {
            query.isLoading || query.data === undefined ? (
              <>
                <div className="h-[9rem] p-4">
                  <h2 className="text-lg font-semibold">Loading...</h2>
                </div>
              </>
            ) : (query.data.books.length === 0) ? (
              <>
                <h2 className="text-lg font-semibold">No books found</h2>
              </>
            ) : (
              <>
                <Swiper
                  slidesPerView={3}
                  centeredSlides={true}
                  pagination={{
                    clickable: true,
                  }}
                  modules={[Pagination]}
                  className="h-full w-full"
                >
                  {
                    query.data?.books.map((book, index) => {
                      return (
                        <SwiperSlide style={{ minWidth: 194, maxWidth: 194 }} key={index}>
                          <SmallBookDisplayCard book={book} />
                        </SwiperSlide>
                      )
                    })
                  }
                </Swiper>
              </>
            )
          }
        </div >
      </div >
    </>
  )
}

export default MoreFromCategory;