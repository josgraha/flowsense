const fromCsv = csv => {
  const rows = csv.split("\n");
  const keys = rows[0].split(",");
  return rows.slice(1).map(row =>
    row.split(",").reduce((cols, value, index) => {
      const key = keys[index];
      if (key === "ts") {
        value = Date.parse(value);
      }
      cols[key] = value;
      return cols;
    }, {})
  );
};

export default fromCsv;
