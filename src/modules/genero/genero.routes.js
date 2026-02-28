import { Router } from "express";
import * as generoController from "./genero.controller.js";

const router = Router();

router.post("/", generoController.crear);
router.get("/", generoController.listar);
router.get("/:id", generoController.obtenerPorId);
router.put("/:id", generoController.actualizar);
router.delete("/:id", generoController.eliminar);

export default router;