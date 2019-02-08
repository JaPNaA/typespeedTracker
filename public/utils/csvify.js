function tableToString(rows) {
    const rowsString = [];
    for (let row of rows) {
        const rowStr = [];
        for (let col of row) {
            rowStr.push(sanitizeText(col));
        }
        rowsString.push(rowStr.join(","));
    }
    return rowsString.join("\n");
}
function sanitizeText(text) {
    if (typeof text === "string") {
        return '"' +
            text
                .replace(/\\/, "\\\\")
                .replace(/"/g, "\"\"")
                .replace(/\n/g, "\\n")
                .replace(/\x08/g, "\\b")
            + '"';
    }
    else if (typeof text === "boolean") {
        return text ? "TRUE" : "FALSE";
    }
    else if (typeof text === "number") {
        // to 3 decimal points
        return text.toString().replace(/(.+)\.(\d{3})\d+/, "$1.$2");
    }
    else {
        return "NULL";
    }
}
export default function CSVify(objs) {
    if (!objs[0]) {
        return "";
    }
    const rows = [];
    const headings = Object.keys(objs[0]);
    rows.push(headings);
    for (let obj of objs) {
        const row = [];
        for (let heading of headings) {
            row.push(obj[heading]);
        }
        rows.push(row);
    }
    return tableToString(rows);
}
;
