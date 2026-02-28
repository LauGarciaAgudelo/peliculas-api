import { Router } from "express";
import * as tipoController from "../controllers/tipo.controller.js";

const router = Router();

// Base: /api/tipos
router.post("/", tipoController.crear);
router.get("/", tipoController.listar);
router.get("/:id", tipoController.obtenerPorId);
router.put("/:id", tipoController.actualizar);
router.delete("/:id", tipoController.eliminar);

export default router;