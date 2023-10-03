"use client";
import React, { useState } from "react";

interface IFileUploadProps {}

const FileUploadComponent: React.FunctionComponent<IFileUploadProps> = ({}) => {
    const [file, setFile] = useState<File>();

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!file) return;

        try {
            const data = new FormData();
            data.set("file", file);

            const res = await fetch("/api/upload", {
                method: "POST",
                body: data,
            });
            if (!res.ok) throw new Error(await res.text());
        } catch (e: any) {
            console.error(e);
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <input
                type="file"
                name="file"
                onChange={(e) => setFile(e.target.files?.[0])}
            />
            <input
                className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                type="submit"
                value="Upload"
            />
        </form>
    );
};

export default FileUploadComponent;
