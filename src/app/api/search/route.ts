import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { readFile } from "fs/promises";

export async function GET(request: NextRequest) {
    const data = request.url.split("?")[1].split("=")[1];
    const cleanData = data.includes("%20") ? data.replaceAll("%20", " ") : data;
    const jsonFilePath = path.join(process.cwd(), "public", `data.json`);
    try {
        const jsonData = await readFile(jsonFilePath, "utf8");
        const jsonObject = JSON.parse(jsonData);

        const results = jsonObject.filter((item: Record<string, any>) => {
            for (const key in item) {
                const value = item[key].toString().toLowerCase();
                if (cleanData && value.includes(cleanData.toLowerCase())) {
                    return true;
                }
            }
            return false;
        });

        if (results.length > 0) {
            return NextResponse.json({ success: true, result: results });
        } else {
            return NextResponse.json({ success: false, message: "No result." });
        }
    } catch (err) {
        return NextResponse.json({
            success: false,
            message: "Error reading file",
        });
    }
}
