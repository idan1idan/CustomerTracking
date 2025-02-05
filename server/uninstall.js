const { Service } = require("node-windows");

const svc = new Service({
  name: "JSON Server",
  script: require("path").join(__dirname, "server.js"),
});

svc.on("uninstall", function () {
  console.log("Service uninstalled");
});

svc.uninstall();
