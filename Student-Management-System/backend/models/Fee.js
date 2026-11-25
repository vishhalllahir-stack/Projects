import mongoose from "mongoose";

const feeSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },

    academicYear: {
      type: String,
      required: true,
      trim: true,
    },

    semester: {
      type: Number,
      required: true,
      min: 1,
    },

    totalFees: {
      type: Number,
      required: true,
      min: 0,
    },

    paidAmount: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },

    paymentDate: {
      type: Date,
    },

    paymentMethod: {
      type: String,
      enum: [
        "Cash",
        "UPI",
        "Card",
        "Bank Transfer",
        "Cheque",
      ],
      default: "Cash",
    },

    transactionId: {
      type: String,
      trim: true,
    },

    remarks: {
      type: String,
      trim: true,
    },

    status: {
      type: String,
      enum: [
        "Pending",
        "Partial",
        "Paid",
      ],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

// Calculate remaining fees
feeSchema.virtual("remainingAmount").get(function () {
  return Math.max(
    this.totalFees - this.paidAmount,
    0
  );
});

feeSchema.set("toJSON", {
  virtuals: true,
});

const Fee = mongoose.model("Fee", feeSchema);

export default Fee;