import { Tipo } from "../models/tipo.model.js";

export async function crearTipo(data) {
  return Tipo.create(data);
}

export async function listarTipos() {
  return Tipo.find().sort({ nombre: 1 });
}

export async function obtenerTipoPorId(id) {
  return Tipo.findById(id);
}

export async function actualizarTipo(id, data) {
  return Tipo.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
}

export async function eliminarTipo(id) {
  return Tipo.findByIdAndDelete(id);
}