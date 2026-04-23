import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import router from "./routes/auth.routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();

const PORT = process.env.MAIN_PORT || 8080;

//middleware
app.use(express.json());
app.use(cors());

app.use("/", router);

app.listen(PORT, () => console.log(`Server running in ${PORT}`));
