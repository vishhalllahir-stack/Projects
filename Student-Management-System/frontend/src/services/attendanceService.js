import API from "./api";

export const getAttendance = async (params = {}) => {
  const response = await API.get("/attendance", {
    params,
  });

  return response.data;
};

export const getAttendanceById = async (id) => {
  const response = await API.get(
    `/attendance/${id}`
  );

  return response.data;
};

export const getStudentAttendance = async (
  studentId
) => {
  const response = await API.get(
    `/attendance/student/${studentId}`
  );

  return response.data;
};

export const createAttendance = async (data) => {
  const response = await API.post(
    "/attendance",
    data
  );

  return response.data;
};

export const updateAttendance = async (
  id,
  data
) => {
  const response = await API.put(
    `/attendance/${id}`,
    data
  );

  return response.data;
};

export const deleteAttendance = async (id) => {
  const response = await API.delete(
    `/attendance/${id}`
  );

  return response.data;
};