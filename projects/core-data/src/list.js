import { DEFAULT_PAGE_SIZE, Sort, paginate } from "./paginate";

const toSymbolColumn = symbol => {
  const [base, target] = [symbol.slice(0, symbol.length / 2), symbol.slice(symbol.length / 2)];
  return `${base}/${target}`;
};

const list = (rows = []) => ({
  offset = 0,
  limit = DEFAULT_PAGE_SIZE,
  sortCol = "ts",
  sortDir = Sort.DESC,
  symbol
}) => {
  const hasSymbol = symbol && symbol && symbol.length >= 6 ? true : false;
  const sym = hasSymbol === true ? toSymbolColumn(symbol) : "";
  const rowData = hasSymbol ? rows.filter(row => row["sym"] === sym) : rows;
  console.log(`list: `, { sym, symbol, hasSymbol, numRows: rowData.length });
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
