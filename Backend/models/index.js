const fs = require("fs");
const path = require("path");

const modelsDir = __dirname;

function loadModels() {
  fs.readdirSync(modelsDir)
    .filter((file) => file.endsWith(".js") && file !== "index.js")
    .forEach((file) => {
      // eslint-disable-next-line global-require, import/no-dynamic-require
      require(path.join(modelsDir, file));
      // console.log(`📦 Model loaded: ${file}`);
    });
}

module.exports = loadModels;
