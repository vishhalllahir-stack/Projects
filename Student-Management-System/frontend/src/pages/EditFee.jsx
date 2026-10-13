import { useEffect, useState } from "react";
import "../index.css";
import { useNavigate, useParams } from "react-router-dom";

import {
  getFee,
  updateFee,
} from "../services/feeService";

function EditFee() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    academicYear: "",
    semester: "",
    totalFees: "",
    paidAmount: "",
    paymentDate: "",
    paymentMethod: "Cash",
    transactionId: "",
    remarks: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFee = async () => {
      try {
        const data = await getFee(id);

        setFormData({
          academicYear: data.academicYear || "",
          semester: data.semester || "",
          totalFees: data.totalFees || "",
          paidAmount: data.paidAmount || "",
          paymentDate: data.paymentDate
            ? new Date(data.paymentDate)
                .toISOString()
                .split("T")[0]
            : "",
          paymentMethod:
            data.paymentMethod || "Cash",
          transactionId:
            data.transactionId || "",
          remarks: data.remarks || "",
        });
      } catch (error) {
        console.error(error);
        alert("Failed to load fee");
      } finally {
        setLoading(false);
      }
    };

    loadFee();
  }, [id]);

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
      await updateFee(id, {
        ...formData,
        semester: Number(formData.semester),
        totalFees: total,
        paidAmount: paid,
      });

      alert("Fee updated successfully");

      navigate("/fees");
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.error ||
          error.response?.data?.message ||
          "Failed to update fee"
      );
    }
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <h1>Edit Fee</h1>

      <form onSubmit={handleSubmit}>
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
          value={formData.transactionId}
          onChange={handleChange}
        />

        <br />
        <br />

        <label>Remarks</label>
        <br />

        <textarea
          name="remarks"
          value={formData.remarks}
          onChange={handleChange}
        />

        <br />
        <br />

        <button type="submit">
          Update Fee
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

export default EditFee;