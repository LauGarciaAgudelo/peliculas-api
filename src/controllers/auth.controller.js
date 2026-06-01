import * as authService from
  "../services/auth.service.js";

export async function login(
  req,
  res,
  next
) {
  try {
    const { email, password } =
      req.body;

    const token =
      await authService.login(
        email,
        password
      );

    return res.json({
      token,
    });
  } catch (error) {
    return res.status(401).json({
      message:
        "Credenciales inválidas",
    });
  }
}