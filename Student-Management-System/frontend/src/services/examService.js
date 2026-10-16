import API from "./api";

// Get all exams with search, filters and pagination
export const getExams = async (params = {}) => {
  const response = await API.get("/exams", {
    params,
  });

  return response.data;
};

// Get single exam
export const getExam = async (id) => {
  const response = await API.get(`/exams/${id}`);

  return response.data;
};

// Create exam
export const createExam = async (examData) => {
  const response = await API.post(
    "/exams",
    examData
  );

  return response.data;
};

// Update exam
export const updateExam = async (id, examData) => {
  const response = await API.put(
    `/exams/${id}`,
    examData
  );

  return response.data;
};

// Delete exam
export const deleteExam = async (id) => {
  const response = await API.delete(
    `/exams/${id}`
  );

  return response.data;
};

// Get exams by student
export const getStudentExams = async (
  studentId
) => {
  const response = await API.get(
    `/exams/student/${studentId}`
  );

  return response.data;
};