import swaggerJsDoc from "swagger-jsdoc";

const options: swaggerJsDoc.Options = {
  definition: {
    // openapi: "3.0.0",
    info: {
      title: "First Express Documentation",
      version: "1.0.0",
      description: "NET template | Documentation",
    },
  },
  apis: ["../src/app/**/*.ts"],
};

export const swaggerSpec = swaggerJsDoc(options);

// {
//   "openapi": "3.0.0",
//   "info": {
//     "title": "My Express API",
//     "version": "1.0.0",
//     "description": "Manual Swagger setup without swagger-jsdoc"
//   },
//   "paths": {
//     "/api/v1/users": {
//       "get": {
//         "summary": "Get all users",
//         "responses": {
//           "200": {
//             "description": "Successful response"
//           }
//         }
//       }
//     }
//   }
// }
