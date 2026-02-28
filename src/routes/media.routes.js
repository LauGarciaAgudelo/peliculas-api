import { Router } from "express";
import * as mediaController from "../controllers/media.controller.js";
import { validarObjectId } from "../helpers/validarObjectId.js";

const router = Router();

// Base: /api/media
router.post("/", mediaController.crear);
router.get("/", mediaController.listar);
router.get("/:id", validarObjectId("id"), mediaController.obtenerPorId);
router.put("/:id", validarObjectId("id"), mediaController.actualizar);
router.delete("/:id", validarObjectId("id"), mediaController.eliminar);

export default router;