import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import { convertCSVtoJSON } from "@/util/convertCSVtoJson";

export async function POST(request: NextRequest) {
    const data = await request.formData();
    const file: File | null = data.get("file") as unknown as File;

    if (!file) {
        return NextResponse.json({ success: false });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const csvFilePath = path.join(process.cwd(), "public/data.csv");
    await writeFile(csvFilePath, buffer);

    // Convert CSV to JSON
    const jsonData = await convertCSVtoJSON(csvFilePath)

    const jsonFilePath = path.join(
        process.cwd(),
        "public",
        `data.json`
    );
    await writeFile(jsonFilePath, JSON.stringify(jsonData));

    return NextResponse.json({ success: true });
}
