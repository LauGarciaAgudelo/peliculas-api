import * as mediaService from "../services/media.service.js";

export async function crear(req, res, next) {
  try {
    const {
      serial,
      titulo,
      sinopsis,
      url,
      imagenPortada,
      anioEstreno,
      generoId,
      directorId,
      productoraId,
      tipoId,
    } = req.body;

    // Validaciones mínimas para campos obligatorios
    if (!serial || String(serial).trim().length < 2) {
      return res.status(400).json({ message: "serial es obligatorio" });
    }
    if (!titulo || String(titulo).trim().length < 2) {
      return res.status(400).json({ message: "titulo es obligatorio" });
    }
    if (!url || String(url).trim().length < 5) {
      return res.status(400).json({ message: "url es obligatoria" });
    }
    if (!anioEstreno || Number.isNaN(Number(anioEstreno))) {
      return res.status(400).json({ message: "anioEstreno es obligatorio y numérico" });
    }
    if (!generoId || !directorId || !productoraId || !tipoId) {
      return res.status(400).json({
        message: "generoId, directorId, productoraId y tipoId son obligatorios",
      });
    }

    const result = await mediaService.crearMedia({
      serial: String(serial).trim(),
      titulo: String(titulo).trim(),
      sinopsis: sinopsis ? String(sinopsis).trim() : "",
      url: String(url).trim(),
      imagenPortada: imagenPortada ? String(imagenPortada).trim() : "",
      anioEstreno: Number(anioEstreno),
      generoId,
      directorId,
      productoraId,
      tipoId,
    });

    if (result.error) {
      return res.status(result.status).json({ message: result.message });
    }

    return res.status(201).json(result.media);
  } catch (error) {
    // control para serial y url únicos
    if (error.code === 11000) {
      return res.status(409).json({ message: "serial o url ya existen" });
    }
    next(error);
  }
}

export async function listar(req, res, next) {
  try {
    const medias = await mediaService.listarMedias();
    return res.json(medias);
  } catch (error) {
    next(error);
  }
}

export async function obtenerPorId(req, res, next) {
  try {
    const { id } = req.params;

    const media = await mediaService.obtenerMediaPorId(id);
    if (!media) return res.status(404).json({ message: "Media no encontrada" });

    return res.json(media);
  } catch (error) {
    next(error);
  }
}

export async function actualizar(req, res, next) {
  try {
    const { id } = req.params;

    const data = {};
    const campos = [
      "serial",
      "titulo",
      "sinopsis",
      "url",
      "imagenPortada",
      "anioEstreno",
      "generoId",
      "directorId",
      "productoraId",
      "tipoId",
    ];

    for (const c of campos) {
      if (req.body[c] !== undefined) data[c] = req.body[c];
    }

    if (data.serial !== undefined) data.serial = String(data.serial).trim();
    if (data.titulo !== undefined) data.titulo = String(data.titulo).trim();
    if (data.sinopsis !== undefined) data.sinopsis = String(data.sinopsis).trim();
    if (data.url !== undefined) data.url = String(data.url).trim();
    if (data.imagenPortada !== undefined) data.imagenPortada = String(data.imagenPortada).trim();
    if (data.anioEstreno !== undefined) data.anioEstreno = Number(data.anioEstreno);

    const result = await mediaService.actualizarMedia(id, data);

    if (result.error) {
      return res.status(result.status).json({ message: result.message });
    }

    return res.json(result.media);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: "serial o url ya existen" });
    }
    next(error);
  }
}

export async function eliminar(req, res, next) {
  try {
    const { id } = req.params;

    const eliminado = await mediaService.eliminarMedia(id);
    if (!eliminado) return res.status(404).json({ message: "Media no encontrada" });

    return res.status(204).send();
  } catch (error) {
    next(error);
  }
}