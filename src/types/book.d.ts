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
  bookCategoryId?: string,
  categoryName: string,
  categoryDescription: string
}

type BookAuthor = {
  bookAuthorId?: string,
  authorFirstName: string,
  authorLastName: string
}

type LoanedBook = {
  loanedBookId?: string,
  loanedAt: Date,
  returnedAt?: Date,
  book: Book,
  user: UserDataType,
  finePaid?: FinePaid
}

type FinePaid = {
  paidAt: Date,
  paidAmount: number
}