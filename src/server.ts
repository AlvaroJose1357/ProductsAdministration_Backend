import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerSpec, { swaggerUIOptions } from "./config/swagger";
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

app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, swaggerUIOptions)
);

export default app;
