import { copyFile } from 'fs/promises';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const sourcePath = resolve(__dirname, 'dist/db/config/config.js');
const destPath = resolve(__dirname, 'dist/db/config/config.mjs');

async function copyConfig() {
    try {
        await copyFile(sourcePath, destPath);
        console.log('Config file was copied and renamed to config.mjs');
    } catch (err) {
        console.error('Error copying config file:', err);
    }
}

copyConfig();
