import { useEffect, useState } from "react";
import "../index.css";
import { useNavigate } from "react-router-dom";

import { getStudents } from "../services/studentService";
import { createFee } from "../services/feeService";

function AddFee() {
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);

  const [formData, setFormData] = useState({
    studentId: "",
    academicYear: "2026-2027",
    semester: "",
    totalFees: "",
    paidAmount: "0",
    paymentDate: "",
    paymentMethod: "Cash",
    transactionId: "",
    remarks: "",
  });

  useEffect(() => {
    const loadStudents = async () => {
      try {
        const data = await getStudents();
        setStudents(data);
      } catch (error) {
        console.error(error);
        alert("Failed to load students");
      }
    };

    loadStudents();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const total = Number(formData.totalFees);
    const paid = Number(formData.paidAmount);

    if (paid > total) {
      alert(
        "Paid amount cannot be greater than total fees"
      );
      return;
    }

    try {
      await createFee({
        ...formData,
        semester: Number(formData.semester),
        totalFees: total,
        paidAmount: paid,
      });

      alert("Fee record created successfully");

      navigate("/fees");
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.error ||
          error.response?.data?.message ||
          "Failed to create fee"
      );
    }
  };

  return (
    <div>
      <h1>Add Fee</h1>

      <form onSubmit={handleSubmit}>
        <label>Student</label>
        <br />

        <select
          name="studentId"
          value={formData.studentId}
          onChange={handleChange}
          required
        >
          <option value="">Select Student</option>

          {students.map((student) => (
            <option
              key={student._id}
              value={student._id}
            >
              {student.studentId} - {student.firstName}{" "}
              {student.lastName}
            </option>
          ))}
        </select>

        <br />
        <br />

        <label>Academic Year</label>
        <br />

        <input
          type="text"
          name="academicYear"
          value={formData.academicYear}
          onChange={handleChange}
          required
        />

        <br />
        <br />

        <label>Semester</label>
        <br />

        <input
          type="number"
          name="semester"
          min="1"
          max="12"
          value={formData.semester}
          onChange={handleChange}
          required
        />

        <br />
        <br />

        <label>Total Fees</label>
        <br />

        <input
          type="number"
          name="totalFees"
          min="0"
          value={formData.totalFees}
          onChange={handleChange}
          required
        />

        <br />
        <br />

        <label>Paid Amount</label>
        <br />

        <input
          type="number"
          name="paidAmount"
          min="0"
          value={formData.paidAmount}
          onChange={handleChange}
          required
        />

        <br />
        <br />

        <label>Payment Date</label>
        <br />

        <input
          type="date"
          name="paymentDate"
          value={formData.paymentDate}
          onChange={handleChange}
        />

        <br />
        <br />

        <label>Payment Method</label>
        <br />

        <select
          name="paymentMethod"
          value={formData.paymentMethod}
          onChange={handleChange}
        >
          <option value="Cash">Cash</option>
          <option value="UPI">UPI</option>
          <option value="Card">Card</option>
          <option value="Bank Transfer">
            Bank Transfer
          </option>
          <option value="Cheque">Cheque</option>
        </select>

        <br />
        <br />

        <label>Transaction ID</label>
        <br />

        <input
          type="text"
          name="transactionId"
          placeholder="Transaction ID"
          value={formData.transactionId}
          onChange={handleChange}
        />

        <br />
        <br />

        <label>Remarks</label>
        <br />

        <textarea
          name="remarks"
          placeholder="Remarks"
          value={formData.remarks}
          onChange={handleChange}
        />

        <br />
        <br />

        <button type="submit">
          Add Fee
        </button>

        {" "}

        <button
          type="button"
          onClick={() => navigate("/fees")}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default AddFee;