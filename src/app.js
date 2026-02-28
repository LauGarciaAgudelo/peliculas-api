import express from "express";
import cors from "cors";
import morgan from "morgan";
import generoRoutes from "./routes/genero.routes.js";
import directorRoutes from "./routes/director.routes.js";
import productoraRoutes from "./routes/productora.routes.js";
import tipoRoutes from "./routes/tipo.routes.js";
import mediaRoutes from "./routes/media.routes.js";

import { notFound } from "./middlewares/notFound.middleware.js";
import { errorHandler } from "./middlewares/error.middleware.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "API running" });
});

app.use("/api/generos", generoRoutes);
app.use("/api/directores", directorRoutes); 
app.use("/api/productoras", productoraRoutes);   
app.use("/api/tipos", tipoRoutes); 
app.use("/api/medias", mediaRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;