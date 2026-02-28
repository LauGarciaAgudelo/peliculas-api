import { Router } from "express";
import * as directorController from "./director.controller.js";

const router = Router();

// Base: /api/directores
router.post("/", directorController.crear);
router.get("/", directorController.listar);
router.get("/:id", directorController.obtenerPorId);
router.put("/:id", directorController.actualizar);
router.delete("/:id", directorController.eliminar);

export default router;