import API from "./api";

// Get users
export const getUsers = async (params = {}) => {
  const response = await API.get("/admin/users", {
    params,
  });

  return response.data;
};

// Get single user
export const getUser = async (id) => {
  const response = await API.get(
    `/admin/users/${id}`
  );

  return response.data;
};

// Create user
export const createUser = async (userData) => {
  const response = await API.post(
    "/admin/users",
    userData
  );

  return response.data;
};

// Update user
export const updateUser = async (
  id,
  userData
) => {
  const response = await API.put(
    `/admin/users/${id}`,
    userData
  );

  return response.data;
};

// Delete user
export const deleteUser = async (id) => {
  const response = await API.delete(
    `/admin/users/${id}`
  );

  return response.data;
};