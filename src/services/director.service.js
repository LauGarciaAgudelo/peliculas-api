import { Director } from "../models/director.model.js";

export async function crearDirector(data) {
  return Director.create(data);
}

export async function listarDirectores({ estado } = {}) {
  const filtro = {};
  if (estado) filtro.estado = estado;

  return Director.find(filtro).sort({ nombres: 1 });
}

export async function obtenerDirectorPorId(id) {
  return Director.findById(id);
}

export async function actualizarDirector(id, data) {
  return Director.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
}

export async function eliminarDirector(id) {
  return Director.findByIdAndDelete(id);
}