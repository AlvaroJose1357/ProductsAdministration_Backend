import express from "express";
import router from "./routes/router";
import { connectBD } from "./config/BD";
const app = express();
// conexion a la base de datos
connectBD();

//middleware para aceptar json
app.use(express.json());

app.use("/api/products", router);

app.get("/api", (req, res) => {
  res.json({ message: "API con express y typescript" });
});

export default app;
