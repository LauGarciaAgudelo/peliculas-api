import { Router } from "express";
import * as directorController from "../controllers/director.controller.js";
import { verificarToken } from "../middlewares/auth.middleware.js";
import { permitirRoles } from "../middlewares/role.middleware.js";

const router = Router();

router.post(
  "/",
  verificarToken,
  permitirRoles("administrador"),
  directorController.crear
);

router.get(
  "/",
  verificarToken,
  directorController.listar
);

router.get(
  "/:id",
  verificarToken,
  directorController.obtenerPorId
);

router.put(
  "/:id",
  verificarToken,
  permitirRoles("administrador"),
  directorController.actualizar
);

router.delete(
  "/:id",
  verificarToken,
  permitirRoles("administrador"),
  directorController.eliminar
);

export default router;