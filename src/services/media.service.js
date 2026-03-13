import { Media } from "../models/media.model.js";
import { Genero } from "../models/genero.model.js";
import { Director } from "../models/director.model.js";
import { Productora } from "../models/productora.model.js";
import { Tipo } from "../models/tipo.model.js";

async function validarReferencias({ generoId, directorId, productoraId, tipoId }) {
  const genero = await Genero.findById(generoId);
  if (!genero) return { ok: false, message: "Género no existe" };
  if (genero.estado !== "ACTIVO") return { ok: false, message: "Género debe estar ACTIVO" };

  const director = await Director.findById(directorId);
  if (!director) return { ok: false, message: "Director no existe" };
  if (director.estado !== "ACTIVO") return { ok: false, message: "Director debe estar ACTIVO" };

  const productora = await Productora.findById(productoraId);
  if (!productora) return { ok: false, message: "Productora no existe" };
  if (productora.estado !== "ACTIVO") return { ok: false, message: "Productora debe estar ACTIVO" };

  const tipo = await Tipo.findById(tipoId);
  if (!tipo) return { ok: false, message: "Tipo no existe" };

  return { ok: true };
}

async function generarSerial(tipoId) {
  const tipo = await Tipo.findById(tipoId);

  if (!tipo) {
    return { error: true, status: 400, message: "Tipo no existe" };
  }

  let prefijo = "MED";
  const nombreTipo = String(tipo.nombre).toLowerCase().trim();

  if (nombreTipo === "película" || nombreTipo === "pelicula") {
    prefijo = "MOV";
  } else if (nombreTipo === "serie") {
    prefijo = "SER";
  } else if (nombreTipo === "miniserie") {
    prefijo = "MINS";
  } else if (nombreTipo === "cortometraje") {
    prefijo = "CORT";
  } else if (nombreTipo === "documental") {
    prefijo = "DOC";
  } else if (nombreTipo === "animacion") {
    prefijo = "ANIM";
  } else if (nombreTipo === "reality") {
    prefijo = "REAL";
  } else if (nombreTipo === "especial") {
    prefijo = "ESP";
  } 

  const cantidad = await Media.countDocuments({ tipoId });
  const consecutivo = String(cantidad + 1).padStart(4, "0");
  const serial = `${prefijo}-${consecutivo}`;

  return { error: false, serial };
}

export async function crearMedia(data) {
  const validacion = await validarReferencias(data);
  if (!validacion.ok) {
    return { error: true, status: 400, message: validacion.message };
  }

  const serialResult = await generarSerial(data.tipoId);
  if (serialResult.error) {
    return serialResult;
  }

  const media = await Media.create({
    ...data,
    serial: serialResult.serial,
  });

  return { error: false, media };
}

export async function listarMedias() {
  return Media.find()
    .sort({ createdAt: -1 })
    .populate("generoId", "nombre estado")
    .populate("directorId", "nombres estado")
    .populate("productoraId", "nombre estado")
    .populate("tipoId", "nombre");
}

export async function obtenerMediaPorId(id) {
  return Media.findById(id)
    .populate("generoId", "nombre estado")
    .populate("directorId", "nombres estado")
    .populate("productoraId", "nombre estado")
    .populate("tipoId", "nombre");
}

export async function actualizarMedia(id, data) {
  // Si el usuario intenta cambiar relaciones, validamos
  const traeRelaciones =
    data.generoId || data.directorId || data.productoraId || data.tipoId;

  if (traeRelaciones) {
    const actual = await Media.findById(id);
    if (!actual) return { error: true, status: 404, message: "Media no encontrada" };

    const validacion = await validarReferencias({
      generoId: data.generoId || actual.generoId,
      directorId: data.directorId || actual.directorId,
      productoraId: data.productoraId || actual.productoraId,
      tipoId: data.tipoId || actual.tipoId,
    });

    if (!validacion.ok) {
      return { error: true, status: 400, message: validacion.message };
    }
  }

  const updated = await Media.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

  if (!updated) return { error: true, status: 404, message: "Media no encontrada" };
  return { error: false, media: updated };
}

export async function eliminarMedia(id) {
  const deleted = await Media.findByIdAndDelete(id);
  if (!deleted) return { error: true, status: 404, message: "Media no encontrada" };
  return { error: false, media: deleted };
}