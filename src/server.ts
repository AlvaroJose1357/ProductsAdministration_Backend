import express from "express";
import cors, { CorsOptions } from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerSpec, { swaggerUIOptions } from "./config/swagger";
import router from "./routes/router";
import { connectBD } from "./config/BD";
import { FRONTEND_URL } from "./config/Process";
const app = express();
// conexion a la base de datos
connectBD();

// cors para permitir peticiones de otros servidores
const corsOptions: CorsOptions = {
  // origin: "*", // permitir desde cualquier origen
  // origin: "http://localhost:3000", // permitir solo desde el front
  // origin: ["http://localhost:3000", "http://localhost:8080"], // permitir desde varios origenes
  origin: function (origin, callback) {
    // permitir desde varios origenes, origin es el origen de la peticion, y callback es una funcion que se ejecuta para validar si se acepta o no la peticion
    if (origin === FRONTEND_URL) {
      // callback recibe 2 parametros, el primero es un error, si no hay error se pasa null, y el segundo es un booleano que indica si se acepta o no la peticion
      callback(null, true);
    } else {
      callback(new Error("No permitido por CORS"), false);
    }
  },
};

app.use(cors(corsOptions));

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
