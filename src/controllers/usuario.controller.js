import * as usuarioService from "../services/usuario.service.js";

export async function crear(req, res, next) {
  try {
    const {
      nombre,
      email,
      password,
      rol,
    } = req.body;

    if (
      !nombre ||
      !email ||
      !password ||
      !rol
    ) {
      return res.status(400).json({
        message:
          "nombre, email, password y rol son obligatorios",
      });
    }

    const usuario =
      await usuarioService.crearUsuario({
        nombre,
        email,
        password,
        rol,
      });

    return res.status(201).json({
      id: usuario._id,
      nombre: usuario.nombre,
      email: usuario.email,
      rol: usuario.rol,
    });
  } catch (error) {
    next(error);
  }
}

export async function listar(
  req,
  res,
  next
) {
  try {
    const usuarios =
      await usuarioService.listarUsuarios();

    return res.json(usuarios);
  } catch (error) {
    next(error);
  }
}