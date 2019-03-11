const { head, keys, last, lensPath, set, values } = require("ramda");
const fs = require("fs");
const { createReport, fromCsv, list } = require("./core-data");

describe("ReportBuilder", () => {
  let report;
  let reportBuilder;
  const symbol = "EURUSD";

  beforeAll(() => {
    const contents = fs.readFileSync("./data/adata.csv", "utf8");
    const rows = fromCsv(contents);
    const listPager = list(rows);
    reportBuilder = createReport(rows);
  });

  it("is defined and has a date entry", () => {
    report = reportBuilder(symbol);
    const date = head(keys(report));
    expect(report).toBeDefined();
    expect(keys(report).length).toBe(1);
    expect(date).toBe("2018/12/06");
  });

  it("has hours, minutes, and seconds", () => {
    const date = head(keys(report));
    const dateCtx = report[date];
    const hours = keys(head(values(values(dateCtx))));
    const hoursCtx = head(values(dateCtx));
    const minutes = keys(head(values(hoursCtx)));
    console.log(`HMS`, { date, hours, minutes });
    expect(hours.length).toBe(20);
    expect(minutes.length).toBe(58);
  });
});
