import moment from "moment";
import { BsFillCalendarDateFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

type SmallBookDisplayCardProps = {
  book: Book
}

const SmallBookDisplayCard: React.FC<SmallBookDisplayCardProps> = (props) => {

  const navigate = useNavigate();

  return (
    <div className="relative w-44 flex justify-center rounded-xl shadow-xl">
      <div className="flex flex-col w-full">
        <div className="relative w-full lg:w-full">
          {/* Book Image */}
          <img
            src={props.book.bookThumbnailURL || "/image-placeholder_3x2.svg"}
            className="w-full min-h-full h-36 object-cover select-none rounded-t-xl cursor-pointer"
            alt="book-card"
            onClick={() => navigate("/book/" + props.book.bookId)}
          />

          <div className="bottom-0 right-0 mb-2 mr-2 px-2 rounded-lg absolute bg-gray-500 text-gray-100 text-xs font-medium">
            <div className="flex flex-row space-x-1 text-gray-100">
              <BsFillCalendarDateFill className="w-3 h-3 my-auto" />
              <span className="text-xs font-medium tracking-tight">{moment(props.book.bookPublishedDate).format("Do MMM YY")}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col w-full h-[4rem] px-2 py-1 bg-white rounded-b-xl">
          <h2 onClick={() => navigate("/book/" + props.book.bookId)} className="text-lg font-bold line-clamp-1 pr-2 cursor-pointer">{props.book.bookName}</h2>
          <p className="text-gray-500 text-sm line-clamp-1">
            <span className="font-semibold">Category: </span>
            <span>{props.book.bookCategory?.categoryName}</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SmallBookDisplayCard;