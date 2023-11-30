import api from "../axios";

export function getOverdueBooks() {
  return api.get(`/loans/overdue`);
}

export function getBorrowedBooks() {
  return api.get(`/loans/borrowed`);
}

export function getAllCurrentUsersLoans() {
  return api.get(`/users/me/loans`);
}

export function getAllUsersLoans() {
  return api.get(`/users/me/loans/all`);
}

export function getAllUsersLoansBetween(startDate: string, endDate: string) {
  return api.get(`/users/me/loans/all/between?startDate=${startDate}&endDate=${endDate}`);
}

export function getAllUsersBorrowedLoans() {
  return api.get(`/users/me/loans/borrowed`);
}

export function getAllUsersOverdueLoans() {
  return api.get(`/users/me/loans/overdue`);
}

export function getAllUsersHistoricLoans() {
  return api.get(`/users/me/loans/historic`);
}

export function returnBookLoan(id: string) {
  return api.get(`/loans/${id}/return`);
}