import API from "./api";

export const getReportSummary = async () => {
  const response = await API.get("/reports/summary");
  return response.data;
};

export const getStudentReport = async (params = {}) => {
  const response = await API.get("/reports/students", { params });
  return response.data;
};

export const getTeacherReport = async (params = {}) => {
  const response = await API.get("/reports/teachers", { params });
  return response.data;
};

export const getFeeReport = async (params = {}) => {
  const response = await API.get("/reports/fees", { params });
  return response.data;
};

export const getExamReport = async (params = {}) => {
  const response = await API.get("/reports/exams", { params });
  return response.data;
};
