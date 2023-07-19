"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var body_parser_1 = __importDefault(require("body-parser"));
var ngrok_1 = __importDefault(require("@ngrok/ngrok"));
dotenv_1.default.config();
var app = (0, express_1.default)();
var port = process.env.PORT;
app.use((0, morgan_1.default)("dev"));
app.use(body_parser_1.default.json());
// app.use(bodyParser.urlencoded({ extended: false}))
app.get("/", function (req, res) {
    res.send("OK");
});
app.post("/webhook", function (req, res) {
    var request = req.body;
    console.log(request);
    res.send("ok");
});
ngrok_1.default.connect({ addr: port, authtoken_from_env: true }).then(function (url) {
    console.log("Ingress established at: ".concat(url, "  "));
});
app.listen(port, function () {
    console.log("\u26A1\uFE0F[server]: Server is running at http://localhost:".concat(port, "  "));
});
