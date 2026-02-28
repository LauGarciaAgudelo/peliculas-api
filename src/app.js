import express from "express";
import cors from "cors";
import morgan from "morgan";
import generoRoutes from "./modules/genero/genero.routes.js";
import directorRoutes from "./modules/director/director.routes.js";
import productoraRoutes from "./modules/productora/productora.routes.js";

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

app.use(notFound);
app.use(errorHandler);

export default app;