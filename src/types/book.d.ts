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
  bookThumbnailURL?: string,
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
  loanFine: LoanFine
}

type LoanFine = {
  id: string
  paidAt?: Date,
  fineAmount: number,
  book?: Book,
  loan?: LoanedBook
}