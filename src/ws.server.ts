import WebSocket from "ws";
import { v4 as uuidv4 } from "uuid";
import { Server } from "http";
import {
  broadcastToAdmin,
  sendGameActionToAdmin,
  sendPlayerListInBulKToAdmin,
} from "./utils/socketUtils";
import {
  ADMIN_ACTION,
  ADMIN_GAME_ACTION,
  PLAYER_ACTION,
  bulkPlayerOnboarded,
  playerOnboarded,
  playerOnboarding,
  playerProfile,
} from "./types";

const onboardedPlayer = new Map<WebSocket, playerProfile>();

const playerSocket = new WebSocket.Server({ noServer: true });
const wssAdmin = new WebSocket.Server({ noServer: true });

function wssOnlineUserInit() {
  playerSocket.on("connection", (ws, request) => {
    const urlPath = request.url;
    console.log({ urlPath });

    if (urlPath !== "/live-player") {
      ws.close(1002, "Unsupported path");
    }

    ws.on("message", function (data) {
      const parsedMessage = JSON.parse(data.toString("utf-8"));

      switch (parsedMessage.action) {
        case PLAYER_ACTION.playerOnboarding:
          const { payload }: playerOnboarding = parsedMessage;

          onboardedPlayer.set(ws, payload);
          const onBoardedPlayer: playerOnboarded = {
            action: PLAYER_ACTION.playerOnboarded,
            payload,
          };

          ws.send(JSON.stringify(onBoardedPlayer));
          broadcastToAdmin(onBoardedPlayer);
      }
    });

    ws.on("close", () => {
      console.log(`Connection closed ${onboardedPlayer.get(ws)?.name}`);
    });
  });
}

function wssAdminInit() {
  wssAdmin.on("connection", (ws, request) => {
    const urlPath = request.url;
    console.log({ urlPath });

    if (urlPath !== "/admin") {
      ws.close(1002, "Unsupported path");
    }

    ws.on("message", function (data) {
      const message = JSON.parse(data.toString("utf-8"));

      sendPlayerListInBulKToAdmin({
        adminSocket: ws,
        message,
        onboardedPlayer,
      });
      sendGameActionToAdmin({ adminSocket: ws, message });
    });

    ws.on("close", () => {
      console.log("Connection closed !");
    });
  });
}

function upgradeWsServer(httpServer: Server) {
  httpServer.on("upgrade", (request, socket, head) => {
    const pathname = request.url;

    if (pathname === "/live-player") {
      playerSocket.handleUpgrade(request, socket, head, (ws) => {
        playerSocket.emit("connection", ws, request);
      });
    }

    if (pathname === "/admin") {
      wssAdmin.handleUpgrade(request, socket, head, (ws) => {
        wssAdmin.emit("connection", ws, request);
      });
    }
  });
}

export {
  wssOnlineUserInit,
  playerSocket,
  wssAdmin,
  wssAdminInit,
  upgradeWsServer,
};
