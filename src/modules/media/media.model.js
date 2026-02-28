import mongoose from "mongoose";

const mediaSchema = new mongoose.Schema(
  {
    serial: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      minlength: 2,
      maxlength: 50,
    },
    titulo: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 120,
    },
    sinopsis: {
      type: String,
      trim: true,
      maxlength: 1000,
      default: "",
    },
    url: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      maxlength: 300,
    },
    imagenPortada: {
      type: String,
      trim: true,
      maxlength: 300,
      default: "",
    },
    anioEstreno: {
      type: Number,
      required: true,
      min: 1888,
      max: 2100,
    },

    // Relaciones
    generoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Genero",
      required: true,
    },
    directorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Director",
      required: true,
    },
    productoraId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Productora",
      required: true,
    },
    tipoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tipo",
      required: true,
    },
  },
  {
    timestamps: true, // createdAt y updatedAt
    versionKey: false,
  }
);

export const Media = mongoose.model("Media", mediaSchema);