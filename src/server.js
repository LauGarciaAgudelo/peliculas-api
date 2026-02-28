import "dotenv/config";
import app from "./app.js";
import { env } from "./config/env.js";
import { connectDB } from "./db/mongo.js";

async function bootstrap() {
  await connectDB();

  app.listen(env.port, () => {
    console.log(`🚀 Server running on http://localhost:${env.port}`);
  });
}

bootstrap().catch((err) => {
  console.error("❌ Failed to start server:", err);
  process.exit(1);
});