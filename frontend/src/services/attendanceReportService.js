import API from "./api";

export const getAttendanceReport = async (params = {}) => {
  const response = await API.get("/attendance-reports", { params });
  return response.data;
};
