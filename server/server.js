const jsonServer = require("json-server");
const fs = require("fs");
const path = require("path");

// Define the path to db.json
const dbPath = path.resolve(__dirname, "../../JSONS/db.json");
const dbDirectory = path.dirname(dbPath);

// Check if the JSONS directory exists, if not create it
if (!fs.existsSync(dbDirectory)) {
  fs.mkdirSync(dbDirectory, { recursive: true });
  console.log(`Created directory: ${dbDirectory}`);
}

// Check if db.json exists, if not create it with default data
if (!fs.existsSync(dbPath)) {
  // Default empty database structure
  const defaultDb = {
    customers: [],
    // Add any other default collections you need
  };

  // Create the file with default structure
  fs.writeFileSync(dbPath, JSON.stringify(defaultDb, null, 2), "utf8");
  console.log(`Created new db.json at: ${dbPath}`);
}

// Create and start the server
const server = jsonServer.create();
const router = jsonServer.router(dbPath);
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

server.listen(3000, "0.0.0.0", () => {
  console.log("JSON Server is running on http://0.0.0.0:3000");
  console.log(`Using database at: ${dbPath}`);
});
