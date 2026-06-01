import { Router } from "express";
import * as productoraController from "../controllers/productora.controller.js";
import { verificarToken } from "../middlewares/auth.middleware.js";
import { permitirRoles } from "../middlewares/role.middleware.js";

const router = Router();

router.post(
  "/",
  verificarToken,
  permitirRoles("administrador"),
  productoraController.crear
);

router.get(
  "/",
  verificarToken,
  productoraController.listar
);

router.get(
  "/:id",
  verificarToken,
  productoraController.obtenerPorId
);

router.put(
  "/:id",
  verificarToken,
  permitirRoles("administrador"),
  productoraController.actualizar
);

router.delete(
  "/:id",
  verificarToken,
  permitirRoles("administrador"),
  productoraController.eliminar
);

export default router;