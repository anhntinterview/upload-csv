import fs from "fs";
import { readFile } from "fs/promises";

export async function convertCSVtoJSON(filePath: fs.PathLike) {
    const csvData = await readFile(filePath);
    // split line based on dropdown "\n"
    const rows = csvData.toString().split("\n");

    // get headers
    const headers = rows[0].split(",").map((header) => header.trim());

    // implement initial JSON
    const jsonData = [];

    for (let i = 1; i < rows.length; i++) {
        const row = rows[i].split(",").map((item) => item.trim());

        // if property has empty with all of key value then ignore
        const hasValue = row.some((cellValue) => cellValue !== "");

        if (hasValue) {
            // JSON item
            const rowData: Record<string, unknown> = {};

            for (let j = 0; j < headers.length; j++) {
                // remove double quote
                const key = headers[j].replace(/"/g, "");
                const value = row[j].replace(/"/g, "");

                // recheck value before push value to json item
                if (value !== "") {
                    rowData[key] = value;
                }
            }

            jsonData.push(rowData);
        }
    }

    return jsonData;
}
