import fs from "fs/promises";
import path from "path";
import axios from "axios";

// yarn ts-node .\practice-4\task3.ts .\practice-4\list.json

async function parseWepPagesFromFile() {
  const args = process.argv;
  const filePath = args[2];

  const data = await fs.readFile(filePath);
  const urls: string[] = JSON.parse(data.toString());

  const directoryName =
    path.basename(filePath, path.extname(filePath)) + "_pages";

  await fs.mkdir(directoryName, { recursive: true });

  for (let i = 0; i < urls.length; i++) {
    const { data } = await axios.get(urls[i]);
    await fs.writeFile(path.join(directoryName, `page${i}.html`), data);
  }
}

parseWepPagesFromFile().catch(console.error);
