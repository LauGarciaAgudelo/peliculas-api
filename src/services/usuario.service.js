import bcrypt from "bcryptjs";
import { Usuario } from "../models/usuario.model.js";

export async function crearUsuario(data) {
  const passwordHash = await bcrypt.hash(
    data.password,
    10
  );

  return Usuario.create({
    nombre: data.nombre,
    email: data.email,
    password: passwordHash,
    rol: data.rol,
  });
}

export async function obtenerPorEmail(email) {
  return Usuario.findOne({
    email: email.toLowerCase(),
  });
}

export async function listarUsuarios() {
  return Usuario.find().select("-password");
}