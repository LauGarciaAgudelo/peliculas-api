import mongoose from "mongoose";

const ESTADOS = ["ACTIVO", "INACTIVO"];

const directorSchema = new mongoose.Schema(
  {
    nombres: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 80,
    },
    estado: {
      type: String,
      enum: ESTADOS,
      default: "ACTIVO",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Director = mongoose.model("Director", directorSchema);