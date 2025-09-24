import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

// Rutas (usando named exports)
import { authRouter } from "./routes/auth.js";
import { horarioRouter } from "./routes/horario.js";
import { profesoresRouter } from "./routes/profesores.js";

dotenv.config();
const app = express();

// ----------------- MIDDLEWARE -----------------
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos (fotos subidas)
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// ----------------- RUTAS -----------------
app.use("/auth", authRouter);         // Registro, login, reset password y administración de usuarios/profesores
app.use("/horario", horarioRouter);   // Módulo de horario
app.use("/profesores", profesoresRouter); // Administración de profesores y edición de perfil

// ----------------- FALLBACK 404 -----------------
app.use((req, res) => {
  res.status(404).json({ msg: "Ruta no encontrada" });
});

// ----------------- MONGODB -----------------
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("✅ MongoDB conectado"))
  .catch((err) => console.log("❌ Error MongoDB:", err));

// ----------------- SERVIDOR -----------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en puerto ${PORT}`));

export default app;
