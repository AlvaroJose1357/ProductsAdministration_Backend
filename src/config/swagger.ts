import swaggerJSDoc from "swagger-jsdoc";

// const swaggerOptions = {
//   swaggerDefinition: {
//     info: {
//       title: "API Documentation",
//       version: "1.0.0",
//       description: "API Documentation",
//     },
//     basePath: "/",
//   },
//   apis: ["./src/routes/*.ts"],
// };

const options: swaggerJSDoc.Options = {
  swaggerDefinition: {
    openapi: "3.0.2",
    tags: [
      {
        name: "Products",
        description: "API operations related to products",
      },
    ],
    info: {
      title: "API Documentation",
      version: "1.0.0",
      description: "API Documentation",
      // contact: {
      //   name: "Equipo técnico de Pick&Shop",
      //   email: "",
      // },
    },
    servers: [
      {
        url: "http://localhost:5000/api",
        description: "Despliegue del servidor",
      },
    ],
  },
  apis: ["./src/routes/*.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
