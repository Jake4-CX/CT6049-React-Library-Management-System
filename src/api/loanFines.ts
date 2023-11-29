import api from "../axios";

export function getAllUserFinesPaid() {
  return api.get(`/users/me/fines/paid`);
}

export function getAllUserFines() {
  return api.get(`/users/me/fines`);
}

export function getAllUserFinesPaidBetweenDates(startDate: string, endDate: string) {
  return api.get(`/users/me/fines/paid/between?startDate=${startDate}&endDate=${endDate}`);
}