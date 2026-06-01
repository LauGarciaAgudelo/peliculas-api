import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { env } from "../config/env.js";

import {
  obtenerPorEmail,
} from "./usuario.service.js";

export async function login(
  email,
  password
) {
  const usuario =
    await obtenerPorEmail(email);

  if (!usuario) {
    throw new Error(
      "Credenciales inválidas"
    );
  }

  const coincide =
    await bcrypt.compare(
      password,
      usuario.password
    );

  if (!coincide) {
    throw new Error(
      "Credenciales inválidas"
    );
  }

  const token = jwt.sign(
    {
      id: usuario._id,
      email: usuario.email,
      rol: usuario.rol,
    },
    env.jwtSecret,
    {
      expiresIn: env.jwtExpiresIn,
    }
  );

  return token;
}