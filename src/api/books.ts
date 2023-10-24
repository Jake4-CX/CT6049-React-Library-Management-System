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

// ToDo: Add Books