type Book = {
  bookId?: string,
  bookCategory?: BookCategory,
  bookAuthor?: BookAuthor,
  bookCategoryId: number,
  bookAuthorId: number,
  bookName: string,
  bookISBN: string,
  bookDescription: string,
  bookQuantity: number,
  bookPublishedDate: Date,
}

type BookCategory = {
  bookCategoryId: number,
  categoryName: string,
  categoryDescription: string
}

type BookAuthor = {
  bookAuthorId: number,
  authorFirstName: string,
  authorLastName: string
}