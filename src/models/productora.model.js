import mongoose from "mongoose";

const ESTADOS = ["ACTIVO", "INACTIVO"];

const productoraSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      minlength: 2,
      maxlength: 80,
    },
    estado: {
      type: String,
      enum: ESTADOS,
      default: "ACTIVO",
    },
    slogan: {
      type: String,
      trim: true,
      maxlength: 120,
      default: "",
    },
    descripcion: {
      type: String,
      trim: true,
      maxlength: 300,
      default: "",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Productora = mongoose.model("Productora", productoraSchema);