import mongoose from "mongoose";

const ESTADOS = ["ACTIVO", "INACTIVO"];

const generoSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      minlength: 2,
      maxlength: 60,
    },
    estado: {
      type: String,
      enum: ESTADOS,
      default: "ACTIVO",
    },
    descripcion: {
      type: String,
      trim: true,
      maxlength: 300,
      default: "",
    },
  },
  {
    timestamps: true, // crea createdAt y updatedAt automáticamente
    versionKey: false,
  }
);

export const Genero = mongoose.model("Genero", generoSchema);