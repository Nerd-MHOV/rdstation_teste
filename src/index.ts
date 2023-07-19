import dotenv from 'dotenv'
import express, {Express} from 'express'
import morgan from "morgan"
import bodyParser from "body-parser";
import ngrok from "@ngrok/ngrok"

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(morgan("dev"))
app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: false}))


app.get("/", (req, res) => {
    res.send("OK")
})

app.post("/webhook", (req, res) => {
    const request = req.body
    console.log(request)
    res.send("ok")
})

ngrok.connect({addr: port, authtoken_from_env: true}).then((url) => {
    console.log(`Ingress established at: ${url}  `);
});

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}  `)
})