import { useEffect, useState } from "react";
import "../index.css";
import { Link, useParams } from "react-router-dom";

import { getDepartment } from "../services/departmentService";

function DepartmentDetails() {
  const { id } = useParams();

  const [department, setDepartment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDepartment = async () => {
      try {
        const data = await getDepartment(id);
        setDepartment(data);
      } catch (error) {
        console.error(error);
        alert("Failed to load department");
      } finally {
        setLoading(false);
      }
    };

    loadDepartment();
  }, [id]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (!department) {
    return <h2>Department not found</h2>;
  }

  return (
    <div>
      <h1>Department Details</h1>

      <p>
        <strong>Department ID:</strong>{" "}
        {department.departmentId}
      </p>

      <p>
        <strong>Name:</strong>{" "}
        {department.departmentName}
      </p>

      <p>
        <strong>Code:</strong>{" "}
        {department.departmentCode}
      </p>

      <p>
        <strong>Head of Department:</strong>{" "}
        {department.headOfDepartment || "-"}
      </p>

      <p>
        <strong>Established Year:</strong>{" "}
        {department.establishedYear || "-"}
      </p>

      <p>
        <strong>Description:</strong>{" "}
        {department.description || "-"}
      </p>

      <p>
        <strong>Status:</strong>{" "}
        {department.status}
      </p>

      <Link to="/departments">
        <button>Back</button>
      </Link>
    </div>
  );
}

export default DepartmentDetails;