const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("../../JSONS/db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

server.listen(3000, "0.0.0.0", () => {
  console.log("JSON Server is running on http://0.0.0.0:3000");
});
