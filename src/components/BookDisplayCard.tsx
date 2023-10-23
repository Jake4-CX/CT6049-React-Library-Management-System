import moment from "moment";

type BookDisplayCardProps = {
  book: Book
}

const BookDisplayCard: React.FC<BookDisplayCardProps> = ({ book }) => {

  return (
    <div className="relative w-full lg:w-fit bg-gray-200 flex justify-center rounded-xl">
      <div className="flex flex-col sm:flex-row lg:flex-col lg:w-52 lg:pb-2 bg-white rounded-xl shadow-xl">
        <div className="relative w-full sm:w-2/3 md:w-1/2 lg:w-full">
          {/* Book Image */}
          <img
            src="/image-placeholder_3x2.svg"
            className="min-h-full md:max-h-60 object-cover select-none rounded-t-xl sm:rounded-tr-none sm:rounded-l-xl lg:rounded-bl-none lg:rounded-t-xl"
            alt="book-card"
          />
          {/* Book Category Tag */}
          <div className="bottom-0 right-0 mb-2 mr-2 px-2 rounded-lg absolute bg-yellow-500 text-gray-100 text-xs font-medium">
            { book.bookQuantity } left
          </div>
        </div>
        <div className="w-full h-[12rem] px-2 py-1">
          <h2 className="text-lg font-bold line-clamp-2 pr-2">{book.bookName}</h2>

          <div className="flex justify-between py-2">
            {/* Book publisher */}
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M2 4a2 2 0 012-2h12a2 2 0 012 2v2H2V4zm0 4h16v8a2 2 0 01-2 2H4a2 2 0 01-2-2V8zm6 2a1 1 0 100 2h4a1 1 0 100-2h-4z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-gray-500 text-sm">{book.bookAuthor.authorFirstName + " " + book.bookAuthor.authorLastName}</p>
            </div>

            {/* Book Published */}
            <div className="flex items-center ml-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M2 4a2 2 0 012-2h12a2 2 0 012 2v2H2V4zm0 4h16v8a2 2 0 01-2 2H4a2 2 0 01-2-2V8zm6 2a1 1 0 100 2h4a1 1 0 100-2h-4z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-gray-500 text-sm">{moment(book.bookPublishedDate).format("MMM YYYY")}</p>
            </div>
          </div>

          <div className="mb-1 text-xs lg:text-sm text-gray-500 line-clamp-3 pr-2">
            {book.bookDescription}
          </div>

          <div className="absolute bottom-0 right-0 mb-3 mr-3">
            <button className="bg-green-500 text-gray-100 px-2 py-1 rounded-lg text-xs md:text-sm font-medium ml-2">View More</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookDisplayCard;