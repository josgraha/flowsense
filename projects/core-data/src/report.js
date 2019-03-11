import { format, getHours, getMinutes, getSeconds } from "date-fns";
import { lensPath, reduce, set, view } from "ramda";
import { findSymbol } from "./find";

const BAR = { high: null, low: null, open: null, close: null, openTs: null, closeTs: null };

const DATE_FORMAT = "YYYY/MM/DD";

const SUMMARY_KEY = "summary";

const intervalFromTs = ts => ({
  date: format(ts, DATE_FORMAT),
  hour: getHours(ts),
  minute: getMinutes(ts),
  second: getSeconds(ts)
});

const createQuote = () => ({ bar: { ...BAR } });

const createSummary = () => ({ bid: createQuote(), ask: createQuote(), lp: {} });

const tickToBar = (ts, price, quantity) => ({
  closeTs: ts,
  openTs: ts,
  close: price,
  open: price,
  high: price,
  low: price,
  quantity
});

const tickToSummary = tickData => {
  const { ts, bid_price, bid_quantity, ask_price, ask_quantity } = tickData;
  const bidPrice = parseFloat(bid_price);
  const bidQuantity = parseInt(bid_quantity, 10);
  const askPrice = parseFloat(ask_price);
  const askQuantity = parseInt(ask_quantity, 10);
  return {
    bid: { bar: tickToBar(ts, bidPrice, bidQuantity) },
    ask: { bar: tickToBar(ts, askPrice, askQuantity) }
  };
};

const updateBar = (rollup, summary) => {
  const { openTs, closeTs, close, open, high, low, quantity } = summary.bar;
  const { bar } = rollup;
  bar.openTs = bar.openTs || openTs;
  bar.closeTs = bar.closeTs || closeTs;
  bar.open = bar.open || open;
  bar.close = bar.close || close;
  bar.high = bar.high || high;
  bar.low = bar.low || low;

  if (bar.openTs >= openTs) {
    bar.openTs = openTs;
    bar.open = open;
    bar.quantity = quantity;
  }
  if (bar.closeTs <= closeTs) {
    bar.closeTs = closeTs;
    bar.close = close;
  }
  bar.high = Math.max(bar.high, high);
  bar.low = Math.min(bar.low, low);
  return { bar: { ...bar } };
};

const updateSummary = (rollup, summary) => {
  const { bid, ask } = rollup;
  return {
    bid: { ...updateBar(bid, summary.bid) },
    ask: { ...updateBar(ask, summary.ask) }
  };
};

const initSummaries = (grouping, keys) => {
  keys.forEach((key, index) => {
    const path = [...keys.slice(0, index + 1), SUMMARY_KEY];
    const tsLens = lensPath(path);
    const lensVal = view(tsLens, grouping);
    grouping = set(tsLens, lensVal || createSummary(), grouping);
  });
  return grouping;
};

const sumWithKeysAndValues = (grouping, keys = [], summary) => {
  if (keys.length === 0) {
    return grouping;
  }
  const path = [...keys, SUMMARY_KEY];
  const lens = lensPath(path);
  const rollup = view(lens, grouping);
  const updated = updateSummary(rollup, summary);
  const nextGrouping = set(lens, updated, grouping);
  const nextSummary = view(lens, grouping);
  const nextKeys = keys.slice(0, keys.length - 1);
  return sumWithKeysAndValues(nextGrouping, nextKeys, nextSummary);
};

const appendTickGrouping = ({ grouping, ts, tickData }) => {
  const { date, hour, minute, second } = intervalFromTs(ts);
  const keys = [date, hour, minute, second];
  grouping = initSummaries(grouping, keys);
  return sumWithKeysAndValues(grouping, keys, tickToSummary(tickData));
};

const groupByTimeseries = (grouping, row) => {
  const { sym, ts, ...rest } = row;
  const tickData = { ts, ...rest };
  return appendTickGrouping({ grouping, sym, ts, tickData });
};

const groupByDateHourLpCount = (acc, row) => {
  const { ts, lp } = row;
  const { date, hour, minute } = intervalFromTs(ts);
  acc[date] = acc[date] || {};
  acc[date][SUMMARY_KEY] = acc[date][SUMMARY_KEY] || {};
  const count = acc[date][SUMMARY_KEY][lp] || 0;
  acc[date][SUMMARY_KEY][lp] = count + 1;
  acc[date][hour] = acc[date][hour] || {};
  acc[date][hour][lp] = acc[date][hour][lp] || 0;
  acc[date][hour][lp] = acc[date][hour][lp] + 1;
  acc[date][hour][lp][minute] = acc[date][hour][lp][minute] || 0;
  acc[date][hour][lp][minute] = acc[date][hour][lp][minute] + 1;
  return acc;
};

const createLpSummary = rows => reduce(groupByDateHourLpCount, {}, rows);

const createTimeseries = (symbol, rows) => reduce(groupByTimeseries, {}, findSymbol(rows, symbol));

const createReport = (rows = []) => symbol => ({
  lp: createLpSummary(rows),
  timeseries: createTimeseries(symbol, rows)
});

export default createReport;
