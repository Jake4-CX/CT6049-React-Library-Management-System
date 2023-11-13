import api from "../axios";

export function getAuthors() {
  return api.get(`/authors`);
}

export function getAuthor(id: string) {
  return api.get(`/authors/${id}`);
}

export function searchAuthors(search: string) {
  return api.get(`/authors/search/${search}`);
}

export function createAuthor(data: BookAuthor) {
  return api.post(`/authors`, data);
}

export function getBooksFromAuthor(id: string) {
  return api.get(`/authors/${id}/books`);
}