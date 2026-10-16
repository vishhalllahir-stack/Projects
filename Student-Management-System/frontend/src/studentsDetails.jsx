import { useEffect, useState } from "react";
import "./index.css";
import { useParams, useNavigate } from "react-router-dom";
import { getStudent } from "./services/studentService";

function StudentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStudent = async () => {
      try {
        const response = await getStudent(id);
        setStudent(response);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadStudent();
  }, [id]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (!student) {
    return <h2>Student not found</h2>;
  }

  return (
    <div className="student-details">
      <h1>Student Details</h1>

      <div>
        <strong>Student ID:</strong> {student.studentId}
      </div>

      <div>
        <strong>Name:</strong>{" "}
        {student.firstName} {student.lastName}
      </div>

      <div>
        <strong>Email:</strong> {student.email}
      </div>

      <div>
        <strong>Phone:</strong> {student.phone}
      </div>

      <div>
        <strong>Gender:</strong> {student.gender}
      </div>

      <div>
        <strong>Course:</strong> {student.course}
      </div>

      <div>
        <strong>Department:</strong> {student.department}
      </div>

      <div>
        <strong>Semester:</strong> {student.semester}
      </div>

      <div>
        <strong>City:</strong> {student.city}
      </div>

      <div>
        <strong>Status:</strong> {student.status}
      </div>

      <br />

      <button onClick={() => navigate(`/students/edit/${student._id}`)}>
        Edit
      </button>

      <button onClick={() => navigate("/students")}>
        Back
      </button>
    </div>
  );
}

export default StudentDetails;