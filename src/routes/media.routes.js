import { Router } from "express";
import * as mediaController from "../controllers/media.controller.js";
import { verificarToken } from "../middlewares/auth.middleware.js";
import { permitirRoles } from "../middlewares/role.middleware.js";

const router = Router();

// Base: /api/medias

router.post(
  "/",
  verificarToken,
  permitirRoles("administrador"),
  mediaController.crear
);

router.get(
  "/",
  verificarToken,
  mediaController.listar
);

router.get(
  "/:id",
  verificarToken,
  mediaController.obtenerPorId
);

router.put(
  "/:id",
  verificarToken,
  permitirRoles("administrador"),
  mediaController.actualizar
);

router.delete(
  "/:id",
  verificarToken,
  permitirRoles("administrador"),
  mediaController.eliminar
);

export default router;