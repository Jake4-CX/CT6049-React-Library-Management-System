type Book = {
  bookCategory: BookCategory,
  bookAuthor: BookAuthor,
  bookName: string,
  bookISBN: string,
  bookDescription: string,
  bookQuantity: number,
  bookPublishedDate: Date,
}

type BookCategory = {
  id: number,
  categoryName: string,
  categoryDescription: string
}

type BookAuthor = {
  id: number,
  authorFirstName: string,
  authorLastName: string
}