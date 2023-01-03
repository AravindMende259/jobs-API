const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "Please enter company name"],
      maxLength: 50,
    },

    position: {
      type: String,
      required: [true, "Please enter the position"],
    },
    status: {
      //   required: true,
      type: String,
      enum: ["pending", "interview", "rejected"],
      default: "pending",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Job", JobSchema);
