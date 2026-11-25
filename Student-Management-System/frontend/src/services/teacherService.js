import API from "./api";

export const getTeachers = async (params = {}) => {
  const response = await API.get("/teachers", {
    params,
  });

  return response.data;
};

export const getTeacher = async (id) => {
  const response = await API.get(`/teachers/${id}`);
  return response.data;
};

export const createTeacher = async (data) => {
  const response = await API.post("/teachers", data);
  return response.data;
};

export const updateTeacher = async (id, data) => {
  const response = await API.put(`/teachers/${id}`, data);
  return response.data;
};

export const deleteTeacher = async (id) => {
  const response = await API.delete(`/teachers/${id}`);
  return response.data;
};