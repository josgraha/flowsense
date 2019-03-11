import { DEFAULT_PAGE_SIZE, Sort, paginate } from "./paginate";
import { findSymbol } from "./find";

const withoutSlash = sym => sym.split("/").join("");

const list = (rows = []) => ({
  offset = 0,
  limit = DEFAULT_PAGE_SIZE,
  sortCol = "ts",
  sortDir = Sort.DESC,
  symbol
}) => {
  const hasSymbol = symbol && symbol && symbol.length >= 6 ? true : false;
  const rowData = hasSymbol ? findSymbol(rows, symbol) : rows;
  return {
    data: paginate(rowData, offset, limit, sortDir, sortCol),
    page: parseInt(offset / limit) + 1,
    pageSize: limit,
    rowCount: rowData.length,
    sortColumn: sortCol,
    sortDirection: sortDir === Sort.ASC ? "ascending" : "descending",
    totalPages: Math.ceil(rowData.length / limit)
  };
};

export default list;
