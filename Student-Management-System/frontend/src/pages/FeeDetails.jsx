import { useEffect, useState } from "react";
import "../index.css";
import { Link, useParams } from "react-router-dom";

import { getFee } from "../services/feeService";

function FeeDetails() {
  const { id } = useParams();

  const [fee, setFee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFee = async () => {
      try {
        const data = await getFee(id);
        setFee(data);
      } catch (error) {
        console.error(error);
        alert("Failed to load fee");
      } finally {
        setLoading(false);
      }
    };

    loadFee();
  }, [id]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (!fee) {
    return <h2>Fee record not found</h2>;
  }

  return (
    <div>
      <h1>Fee Details</h1>

      <p>
        <strong>Student:</strong>{" "}
        {fee.studentId
          ? `${fee.studentId.firstName} ${fee.studentId.lastName}`
          : "Unknown"}
      </p>

      <p>
        <strong>Student ID:</strong>{" "}
        {fee.studentId?.studentId || "-"}
      </p>

      <p>
        <strong>Academic Year:</strong>{" "}
        {fee.academicYear}
      </p>

      <p>
        <strong>Semester:</strong>{" "}
        {fee.semester}
      </p>

      <p>
        <strong>Total Fees:</strong>{" "}
        ₹{fee.totalFees}
      </p>

      <p>
        <strong>Paid Amount:</strong>{" "}
        ₹{fee.paidAmount}
      </p>

      <p>
        <strong>Remaining:</strong>{" "}
        ₹{fee.remainingAmount}
      </p>

      <p>
        <strong>Status:</strong>{" "}
        {fee.status}
      </p>

      <p>
        <strong>Payment Date:</strong>{" "}
        {fee.paymentDate
          ? new Date(
              fee.paymentDate
            ).toLocaleDateString()
          : "-"}
      </p>

      <p>
        <strong>Payment Method:</strong>{" "}
        {fee.paymentMethod}
      </p>

      <p>
        <strong>Transaction ID:</strong>{" "}
        {fee.transactionId || "-"}
      </p>

      <p>
        <strong>Remarks:</strong>{" "}
        {fee.remarks || "-"}
      </p>

      <Link to="/fees">
        <button>Back</button>
      </Link>
    </div>
  );
}

export default FeeDetails;