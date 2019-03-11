const withoutSlash = sym => sym.split("/").join("");

export const findSymbol = (rows, symbol) => rows.filter(({ sym }) => withoutSlash(sym) === symbol);
