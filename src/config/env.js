export const env = {
  port: process.env.PORT || 3000,
  mongoUri: process.env.MONGO_URI,

  jwtSecret:
    process.env.JWT_SECRET || "media_manager_secret_2026",

  jwtExpiresIn:
    process.env.JWT_EXPIRES_IN || "2h",
};