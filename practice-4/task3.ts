import * as fs from "node:fs/promises";
import path from "node:path";
import { fetch } from "undici";

// yarn ts-node .\practice-4\task3.ts .\practice-4\list.json

async function parseWebPagesFromFile() {
  const args = process.argv;
  const filePath = args[2];

  if (!filePath) {
    console.error("File path not provided");
    return;
  }

  try {
    const data = await fs.readFile(filePath);
    const urls: string[] = JSON.parse(data.toString());

    const directoryName =
      path.basename(filePath, path.extname(filePath)) + "_pages";

    await fs.mkdir(directoryName, { recursive: true });

    await Promise.all(
      urls.map(async (url, index) => {
        const response = await fetch(url);
        const body = await response.text();

        await fs.writeFile(path.join(directoryName, `page${index}.html`), body);
      })
    );
  } catch (e) {
    const error = e instanceof Error ? e.message : "Unknown error";
    console.error(error);
  }
}

parseWebPagesFromFile();
