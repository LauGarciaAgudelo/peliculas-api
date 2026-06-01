import { Router } from "express";
import * as generoController from "../controllers/genero.controller.js";
import { verificarToken } from "../middlewares/auth.middleware.js";
import { permitirRoles } from "../middlewares/role.middleware.js";

const router = Router();

router.post(
  "/",
  verificarToken,
  permitirRoles("administrador"),
  generoController.crear
);

router.get(
  "/",
  verificarToken,
  generoController.listar
);

router.get(
  "/:id",
  verificarToken,
  generoController.obtenerPorId
);

router.put(
  "/:id",
  verificarToken,
  permitirRoles("administrador"),
  generoController.actualizar
);

router.delete(
  "/:id",
  verificarToken,
  permitirRoles("administrador"),
  generoController.eliminar
);

export default router;