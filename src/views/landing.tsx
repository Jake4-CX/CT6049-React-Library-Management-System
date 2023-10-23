import BookDisplayCard from "../components/BookDisplayCard";
import DefaultLayout from "../layouts/defaultLayout";

const LandingPage: React.FC = () => {

  const book: Book = {
    bookAuthor: {
      id: 1,
      authorFirstName: "John",
      authorLastName: "Doe"
    },
    bookCategory: {
      id: 1,
      categoryName: "Fantasy",
      categoryDescription: "Fantasy books"
    },
    bookName: "The Lord of the Rings",
    bookDescription: "condimentum mattis pellentesque id nibh tortor id aliquet lectus proin nibh nisl condimentum id venenatis a condimentum vitae sapien pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas sed tempus urna et",
    bookISBN: "1234567890",
    bookQuantity: 10,
    bookPublishedDate: new Date(),
  }

  return (
    <DefaultLayout className="px-[4%]">
      <div className="w-fit h-full lg:h-[58rem] 2xl:max-w-[96rem] bg-white p-[4%]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
          {
            Array(10).fill(book).map((book, index) => (
              <BookDisplayCard book={book} key={index} />
            ))
          }
        </div>
      </div>
    </DefaultLayout>
  )
}

export default LandingPage;