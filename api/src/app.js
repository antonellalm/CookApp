const express = require("express");
//importa el módulo 'express' en tu proyecto, acilita la creación de servidores y el manejo de solicitudes y respuestas HTTP
const cookieParser = require("cookie-parser");
//importa el módulo 'cookie-parser'. 'cookie-parser' es un middleware de Express que analiza las cookies adjuntas a las solicitudes HTTP. Proporciona una forma conveniente de trabajar con cookies en tu aplicación.
const bodyParser = require("body-parser");
//el módulo 'body-parser'. 'body-parser' es otro middleware de Express que analiza el cuerpo de las solicitudes HTTP y lo convierte en un objeto JSON utilizable. Permite acceder a los datos enviados en el cuerpo de la solicitud, como formularios HTML o datos JSON.
const morgan = require("morgan");
const routes = require("./routes/index.js");

require("./db.js");

const server = express();

// server.use(express.json());
// server.use(morgan("dev"));
// server.use(nocache());

server.name = "API";

server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));
server.use(cookieParser());
server.use(morgan("dev"));
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

server.use("/", routes);
//: Aquí se utiliza el middleware routes para manejar las rutas de la aplicación. El parámetro "/" indica que estas rutas estarán disponibles en la raíz del servidor.

// Error catching endware.
server.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});
// Esta línea define un middleware personalizado que se ejecutará antes de que se maneje cualquier ruta. Este middleware establece encabezados de respuesta para permitir el acceso desde un dominio específico (http://localhost:3000 en este caso). También configura otros encabezados y métodos permitidos para las solicitudes.

module.exports = server;
