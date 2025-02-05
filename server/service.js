const { Service } = require("node-windows");

const svc = new Service({
  name: "JSON Server",
  description: "JSON Server as a Windows service",
  script: require("path").join(__dirname, "server.js"),
  nodeOptions: ["--harmony", "--max_old_space_size=4096"],
});

svc.on("install", function () {
  svc.start();
  console.log("Service installed and started");
});

svc.on("error", function (error) {
  console.error("Service error:", error);
});

svc.install();
