import api from "../axios";

export function getBooks() {
  return api.get(`/books`);
}

export function getBook(id: string) {
  return api.get(`/books/${id}`);
}

export function searchBooks(search: string) {
  return api.get(`/books/search/${search}`);
}

export function borrowBook(id: string) {
  return api.post(`/books/${id}/borrow`);
}

export function createBook(book: Book) {
  return api.post(`/books`, book);
}

// ToDo: Add Books