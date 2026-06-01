import jwt from "jsonwebtoken";

import { env } from "../config/env.js";

export function verificarToken(
  req,
  res,
  next
) {
  const authHeader =
    req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: "Token requerido",
    });
  }

  const token =
    authHeader.replace(
      "Bearer ",
      ""
    );

  try {
    const payload = jwt.verify(
      token,
      env.jwtSecret
    );

    req.usuario = payload;

    next();
  } catch {
    return res.status(401).json({
      message: "Token inválido",
    });
  }
}