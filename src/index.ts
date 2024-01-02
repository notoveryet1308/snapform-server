import "dotenv/config";
import express, { Express } from "express";
import http, { Server } from "http";

import { wssOnlineUserInit, wssAdminInit, upgradeWsServer } from "./ws.server";

const app: Express = express();
const server: Server = http.createServer(app);

wssOnlineUserInit();
wssAdminInit();
upgradeWsServer(server);

server.listen(process.env.PORT, () => {
  console.log("Server listening on port", process.env.PORT);
});
