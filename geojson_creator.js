const geojson = require("./app_coverage.geo.json");
const util = require("util");
const fs = require("fs");

let coordinates = [];
geojson.features.forEach((feature) => {
  if (feature.geometry.type === "Polygon") {
    console.log(feature.geometry.coordinates[0].length);

    coordinates.push(feature.geometry.coordinates);
  } else if (feature.geometry.type === "MultiPolygon") {
    coordinates = coordinates.concat(feature.geometry.coordinates);
  }
});

const geom = { type: "MultiPolygon", coordinates };
// console.log(util.inspect(geom, { depth: null }));
fs.writeFile("./geo2.geojson", JSON.stringify(geom), (err) => {
  if (err) throw err;
  console.log("The file has been saved!");
});
