import fs from 'fs/promises';
import path from 'path';
import url, { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
//get filePath
const filePath = path.join(__dirname, '../db/users.json');

export const readUsersFile = async () => {
    try {
        //Read file (using fs)
        const data = await fs.readFile(filePath, "utf-8");
        return JSON.parse(data);
    } catch (error) {
        console.log('Error', error);
        return [];
    }
}

export const writeUsersFile = async(users) => {
    try {
        //we convert data to string
        const stringified = JSON.stringify(users, null, 2);
        //Write file (using fs)
        await fs.writeFile(filePath, stringified, "utf-8");
    } catch (error) {
        console.log('Error', error);
    }
}
