import { Router } from "express";
import * as usuarioController from "../controllers/usuario.controller.js";
import { verificarToken } from "../middlewares/auth.middleware.js";
import { permitirRoles } from "../middlewares/role.middleware.js";

const router = Router();

router.post(
  "/",
  verificarToken,
  permitirRoles("administrador"),
  usuarioController.crear
);

router.get(
  "/",
  verificarToken,
  permitirRoles("administrador"),
  usuarioController.listar
);

export default router;