import express, { Express } from "express";
import http, { Server } from "http";

import { wssOnlineUserInit, wssAdminInit, upgradeWsServer } from "./ws.server";

const app: Express = express();
const server: Server = http.createServer(app);

wssOnlineUserInit();
wssAdminInit();
upgradeWsServer(server);


export { app, server };
