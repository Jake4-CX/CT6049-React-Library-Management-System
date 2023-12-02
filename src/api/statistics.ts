import api from "../axios";

export function getAdminStatisticsOverview() {
  return api.get(`/statistics/admin/overview`);
}