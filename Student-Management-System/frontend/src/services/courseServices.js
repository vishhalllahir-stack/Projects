import API from "./api";

export const getCourses = async (params = {}) => {
  const response = await API.get("/courses", {
    params,
  });

  return response.data;
};

export const getCourse = async (id) => {
  const response = await API.get(`/courses/${id}`);
  return response.data;
};

export const createCourse = async (data) => {
  const response = await API.post("/courses", data);
  return response.data;
};

export const updateCourse = async (id, data) => {
  const response = await API.put(`/courses/${id}`, data);
  return response.data;
};

export const deleteCourse = async (id) => {
  const response = await API.delete(`/courses/${id}`);
  return response.data;
};