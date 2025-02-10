const { Service } = require("node-windows");

const svc = new Service({
  name: "JSON Server",
  description: "JSON Server as a Windows service",
  script: require("path").join(__dirname, "server.js"),
  nodeOptions: ["--harmony", "--max_old_space_size=4096"],
});

svc.on("stop", function () {
  console.log("Service stopped");
  svc.start();
});

svc.on("start", function () {
  console.log("Service started");
});

svc.on("error", function (error) {
  console.error("Service error:", error);
});

// Check if service exists and restart it
if (svc.exists) {
  console.log("Stopping service for restart...");
  svc.stop();
} else {
  console.error("Service is not installed. Please run install script first.");
}
