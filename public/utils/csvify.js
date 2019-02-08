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
    return text.toString()
        .replace(/\\/, "\\\\")
        .replace(/,/g, "\\,")
        .replace(/\n/g, "\\n")
        .replace(/\x08/g, "\\b");
}
export default function CSVify(objs) {
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
