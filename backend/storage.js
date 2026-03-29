const fs = require("fs");

function isNewRota(shifts) {
  if (!fs.existsSync("rota.json")) return true;

  const old = JSON.parse(fs.readFileSync("rota.json"));
  return JSON.stringify(old) !== JSON.stringify(shifts);
}

function saveRota(shifts) {
  fs.writeFileSync("rota.json", JSON.stringify(shifts, null, 2));
}

module.exports = { isNewRota, saveRota };
