import api from "../axios";

export function getCategories() {
  return api.get(`/categories`);
}

export function getCategory(id: string) {
  return api.get(`/categories/${id}`);
}

export function searchCategories(search: string) {
  return api.get(`/categories/search/${search}`);
}

export function createCategory(data: BookCategory) {
  return api.post(`/categories`, data);
}

export function getBooksFromCategory(id: string) {
  return api.get(`/categories/${id}/books`);
}