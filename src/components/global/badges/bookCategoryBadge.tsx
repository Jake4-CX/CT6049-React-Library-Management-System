
type BookCategoryBadgeProps = {
  bookCategory?: BookCategory
}

const BookCategoryBadge: React.FC<BookCategoryBadgeProps> = (props) => {

  return (
    <>
      {
        props.bookCategory !== undefined ? (
          <div className="bg-gray-300 rounded-lg px-2 py-1">
            <span className="text-xs font-semibold tracking-tight">{props.bookCategory.categoryName}</span>
          </div>
        ) : (
          <>
          </>
        )
      }
    </>
  )
}

export default BookCategoryBadge;