const admin = require("firebase-admin");
const functions = require("firebase-functions");
const next = require("next");
const fs = require("fs");

const { createReport, fromCsv, list } = require("./core-data");

const serviceAccount = require("./secrets/key.json");
const { projectId, storageBucket, storageUrl } = require("./secrets/config");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://${projectId}.firebaseio.com`,
  storageBucket
});

var dev = process.env.NODE_ENV !== "production";
var app = next({ dev, conf: { distDir: "next" } });
var handle = app.getRequestHandler();

const contents = fs.readFileSync("./data/adata.csv", "utf8");
const rows = fromCsv(contents);
const listPager = list(rows);
const reportBuilder = createReport(rows);

exports.report = functions.https.onRequest((req, res) => {
  const { symbol } = req.query;
  const results = reportBuilder(symbol);
  res.set("Content-Type", "application/json");
  res.send(JSON.stringify(results, null, 2));
});

exports.list = functions.https.onRequest((req, res) => {
  // const url = storageUrl;
  // const storage = admin.storage();
  // const bucketName = url.slice(0, url.lastIndexOf("/"));
  // const fileName = url.slice(url.lastIndexOf("/") + 1);
  // await storage
  //   .bucket(bucketName)
  //   .file(fileName)
  //   .download((err, contents) => {
  //      results = fromCsv(contents);
  //   });
  const { offset, limit, sortDir, sortCol, symbol } = req.query;
  const results = listPager({ offset, limit, sortDir, sortCol, symbol });
  res.set("Content-Type", "application/json");
  res.send(JSON.stringify(results, null, 2));
});

exports.next = functions.https.onRequest((req, res) => {
  return app.prepare().then(() => handle(req, res));
});
