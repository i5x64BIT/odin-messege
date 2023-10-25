import router from "./routes/API.js";
import express from 'express';
import path from 'path'
import cors from 'cors'
import * as url from 'url';
import { configDotenv } from "dotenv";
configDotenv({
  path: '../.env'
})

const app = express();
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
const port = process.env.PORT || 8080;

console.log(process.env.PORT)

app.use(express.static(path.join(__dirname, "/build/")));
app.use(cors());

app.use(router);
app.get("/", (req, res) => {
  res.send("index.html");
});

app.listen(port, console.log('Listening on port ' + port));
