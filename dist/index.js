"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_1 = __importDefault(require("koa"));
const error_1 = __importDefault(require("./middleware/error"));
const app = new koa_1.default();
app.use(error_1.default);
const port = process.env.PORT ? process.env.PORT : 3200;
const server = app.listen(port);
server.on('listening', () => {
    const addr = server.address();
    const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
    console.log(`Listening on ${bind}`);
});
//# sourceMappingURL=index.js.map