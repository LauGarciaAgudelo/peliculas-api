export function permitirRoles(
  ...roles
) {
  return (
    req,
    res,
    next
  ) => {
    if (
      !roles.includes(
        req.usuario.rol
      )
    ) {
      return res.status(403).json({
        message:
          "Acceso denegado",
      });
    }

    next();
  };
}