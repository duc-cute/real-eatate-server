/** @format */

const { networkInterfaces } = require("os");
const getIpAddress = () => {
  const nets = networkInterfaces();
  const results = {}; // Or just '{}', an empty object
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      const familyV4Value = typeof net.family === "string" ? "IPv4" : 4;
      if (net.family === familyV4Value && !net.internal) {
        if (!results[name]) {
          results[name] = [];
        }
        results[name].push(net.address);
      }
    }
  }
  return results["Wi-Fi"][0];
};

const generateKeyRedis = (filter) => {
  const filterString = JSON.stringify(filter)
    .replace(/\W/g, "")
    .split("")
    .sort((a, b) => a.localeCompare(b))
    .join("");
  console.log(filterString);
  const ipAddress = getIpAddress();
  return filterString + ipAddress;
};

module.exports = generateKeyRedis;
