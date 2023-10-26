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