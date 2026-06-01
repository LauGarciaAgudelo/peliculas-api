import mongoose from "mongoose";

const ROLES = ["administrador", "usuario"];

const usuarioSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    rol: {
      type: String,
      enum: ROLES,
      default: "usuario",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Usuario = mongoose.model(
  "Usuario",
  usuarioSchema
);