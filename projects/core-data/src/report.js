import { format, getHours, getMinutes } from "date-fns";

const DATE_COLUMN = "ts";

const DATE_FORMAT = "YYYY/MM/DD";

const groupByTime = (grouping, row) => {
  const ts = row[DATE_COLUMN];
  const dateKey = format(ts);
  const hourKey = getHours(ts);
  const minuteKey = getMinutes(ts);
  grouping[dateKey] = grouping[dateKey] || {};
  grouping[dateKey][hourKey] = grouping[dateKey][hourKey] || {};
  grouping[dateKey][hourKey][minuteKey] = row;
  return grouping;
};

const report = (rows = []) => rows.reduce(groupByTime, {});

export default report;
