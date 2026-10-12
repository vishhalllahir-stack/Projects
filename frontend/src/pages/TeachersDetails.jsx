import { useEffect, useState } from "react";
import "../index.css";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

import { getTeacher } from "../services/teacherService";

function TeacherDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTeacher = async () => {
      try {
        const response = await getTeacher(id);

        setTeacher(response);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadTeacher();
  }, [id]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (!teacher) {
    return <h2>Teacher not found</h2>;
  }

  return (
    <div className="teacher-details">

      <h1>Teacher Details</h1>

      <p>
        <strong>Teacher ID:</strong>{" "}
        {teacher.teacherId}
      </p>

      <p>
        <strong>Name:</strong>{" "}
        {teacher.firstName}{" "}
        {teacher.lastName}
      </p>

      <p>
        <strong>Email:</strong>{" "}
        {teacher.email}
      </p>

      <p>
        <strong>Phone:</strong>{" "}
        {teacher.phone}
      </p>

      <p>
        <strong>Gender:</strong>{" "}
        {teacher.gender}
      </p>

      <p>
        <strong>Qualification:</strong>{" "}
        {teacher.qualification}
      </p>

      <p>
        <strong>Experience:</strong>{" "}
        {teacher.experience} years
      </p>

      <p>
        <strong>Department:</strong>{" "}
        {teacher.department}
      </p>

      <p>
        <strong>Subject:</strong>{" "}
        {teacher.subject}
      </p>

      <p>
        <strong>City:</strong>{" "}
        {teacher.city}
      </p>

      <p>
        <strong>Salary:</strong>{" "}
        ₹{teacher.salary}
      </p>

      <p>
        <strong>Status:</strong>{" "}
        {teacher.status}
      </p>

      <button
        onClick={() =>
          navigate(
            `/teachers/edit/${teacher.id || teacher._id}`
          )
        }
      >
        Edit
      </button>

      <button
        onClick={() =>
          navigate("/teachers")
        }
      >
        Back
      </button>

    </div>
  );
}

export default TeacherDetails;