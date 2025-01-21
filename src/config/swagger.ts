import swaggerJSDoc from "swagger-jsdoc";
import { SwaggerUiOptions } from "swagger-ui-express";

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

export const swaggerUIOptions: SwaggerUiOptions = {
  customCss: `
    .topbar-wrapper .link {
      content: url('https://cdn-icons-png.flaticon.com/512/2982/2982808.png');
      height: 80px;
      width: 80px;
    }
  `,
  customSiteTitle: "Documentacion REST API Express y Typescript",
};

export default swaggerSpec;
