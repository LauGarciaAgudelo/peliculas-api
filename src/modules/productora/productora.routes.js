import { Router } from "express";
import * as productoraController from "./productora.controller.js";

const router = Router();

// Base: /api/productoras
router.post("/", productoraController.crear);
router.get("/", productoraController.listar);
router.get("/:id", productoraController.obtenerPorId);
router.put("/:id", productoraController.actualizar);
router.delete("/:id", productoraController.eliminar);

export default router;