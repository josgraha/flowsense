import { sort } from "ramda";

export const DEFAULT_PAGE_SIZE = 10;

export const Sort = {
  ASC: "asc",
  DESC: "desc"
};

const colComparatorAsc = col => (a, b) => a[col] < b[col];

const colComparatorDesc = col => (a, b) => a[col] > b[col];

export const paginate = (rows = [], offset, limit, sortDir, sortCol) => {
  const colOrDefault = sortCol || Object.keys(rows[0])[0];
  const comparator = sortDir === Sort.ASC ? colComparatorAsc : colComparatorDesc;
  const sorted = sort(comparator, rows); // TODO: sort list by key
  return offset + limit >= sorted.length ? sorted : sorted.slice(offset, limit);
};
