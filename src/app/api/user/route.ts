import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { readFile } from "fs/promises";
import { convertArrayToObject } from "@/util/convertArrayToObject";

export async function GET(request: NextRequest) {
    const data = request.url.split("?")[1];
    const splitParam = data.includes("&") ? data.split("&") : undefined;
    const obj = splitParam ? convertArrayToObject(splitParam) : undefined;
    const page = parseInt(obj._page);
    const limit = parseInt(obj._limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    const jsonFilePath = path.join(process.cwd(), "public", `data.json`);

    try {
        const jsonData = await readFile(jsonFilePath, "utf8");
        const jsonObject = JSON.parse(jsonData);

        const pageData = jsonObject.slice(startIndex, endIndex);

        if (jsonObject.length > 0) {
            return NextResponse.json({
                users: pageData,
                page: page,
                total_pages: jsonObject.length / limit,
            });
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
