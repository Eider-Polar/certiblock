import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import usuarioRoutes from "./routes/usuario.routes.js";
import conectarDB from "./config/db.js";
import Blockchain from "./src/blockchain.js";
import P2Pserver from "./app/p2pServer.js"
import bodyParser from "body-parser";
import minadorouter from "./routes/minado.router.js"
import datarouter from "./routes/data.router.js"

const bc = new Blockchain();
const p2pserver=new P2Pserver(bc);
const app = express();
app.use(express.json());

dotenv.config();
conectarDB();

const corsOptions = {
  origin: 'http://localhost:5173', // Origen permitido (el frontend)
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos HTTP permitidos
  allowedHeaders: ['Content-Type', 'Authorization', 'x-localization'], // Encabezados permitidos
  credentials: false, // Permitir el envío de credenciales
};
 
app.use(cors(corsOptions));
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/minado",minadorouter)
app.use("/api/data",datarouter)
app.use(bodyParser.json())


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

p2pserver.listen()