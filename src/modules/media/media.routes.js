import { Router } from "express";
import * as mediaController from "./media.controller.js";
import { validarObjectId } from "../../middlewares/validarObjectId.middleware.js";

const router = Router();

// Base: /api/media
router.post("/", mediaController.crear);
router.get("/", mediaController.listar);
router.get("/:id", validarObjectId("id"), mediaController.obtenerPorId);
router.put("/:id", validarObjectId("id"), mediaController.actualizar);
router.delete("/:id", validarObjectId("id"), mediaController.eliminar);

export default router;