import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { QuestionPlugin } from "@/types/plugin";

export async function GET() {
  try {
    const pluginsDir = path.join(process.cwd(), "plugins");
    const entries = await fs.readdir(pluginsDir, { withFileTypes: true });

    const plugins: QuestionPlugin[] = [];

    for (const entry of entries) {
      if (entry.isDirectory()) {
        const manifestPath = path.join(pluginsDir, entry.name, "manifest.json");
        try {
          const manifestContent = await fs.readFile(manifestPath, "utf-8");
          const plugin = JSON.parse(manifestContent);
          plugins.push(plugin);
        } catch (error) {
          console.error(`Error loading plugin ${entry.name}:`, error);
        }
      }
    }

    return NextResponse.json({ plugins });
  } catch (error) {
    console.error("Error loading plugins:", error);
    return NextResponse.json(
      { error: "Failed to load plugins" },
      { status: 500 }
    );
  }
}
