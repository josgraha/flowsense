const path = require("path");
const fs = require("fs");
const { createReport, fromCsv } = require("../index");

const DEFAULT_SYMBOL = "EURAUD";
const MAX_ROWS = 1500;

describe("report", () => {
  let rows;
  let reportBuilder;
  let symbol;

  beforeEach(() => {
    const contents = fs.readFileSync(path.resolve(__dirname, "./adata.csv"), "utf8");
    rows = fromCsv(contents);
    reportBuilder = createReport(rows.slice(0));
    symbol = DEFAULT_SYMBOL;
  });

  test("should have a non-empty report", () => {
    const results = reportBuilder(symbol);
    console.log(JSON.stringify(results));
    expect(results).toBeDefined();
  });
});
