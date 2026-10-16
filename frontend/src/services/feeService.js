import API from "./api";

// Get all fees with search, filter and pagination
export const getFees = async (params = {}) => {
  const response = await API.get("/fees", {
    params,
  });

  return response.data;
};

// Get single fee
export const getFee = async (id) => {
  const response = await API.get(`/fees/${id}`);

  return response.data;
};

// Create fee
export const createFee = async (feeData) => {
  const response = await API.post("/fees", feeData);

  return response.data;
};

// Update fee
export const updateFee = async (id, feeData) => {
  const response = await API.put(`/fees/${id}`, feeData);

  return response.data;
};

// Delete fee
export const deleteFee = async (id) => {
  const response = await API.delete(`/fees/${id}`);

  return response.data;
};

// Get fees by student
export const getStudentFees = async (studentId) => {
  const response = await API.get(
    `/fees/student/${studentId}`
  );

  return response.data;
};