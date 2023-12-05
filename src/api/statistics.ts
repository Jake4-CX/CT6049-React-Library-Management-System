import api from "../axios";

export function getAdminStatisticsOverview() {
  return api.get(`/statistics/admin/overview`);
}

export function getAdminBookCirculationStatistics() {
  return api.get(`/statistics/admin/book-circulation`);
}

export function getAdminBookCategoryStatistics() {
  return api.get(`/statistics/admin/book-category`);
}