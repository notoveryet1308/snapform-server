import WebSocket from "ws";
import { v4 as uuidv4 } from "uuid";
import { Server } from "http";
import { broadcastToAdmin } from "./utils/socketUtils";
import {
  ADMIN_ACTION,
  PLAYER_ACTION,
  bulkPlayerOnboarded,
  playerOnboarded,
  playerOnboarding,
} from "./types";

const onboardedPlayer = new Map();

const wssOnlineUser = new WebSocket.Server({ noServer: true });
const wssAdmin = new WebSocket.Server({ noServer: true });

function wssOnlineUserInit() {
  wssOnlineUser.on("connection", (ws, request) => {
    const urlPath = request.url;
    console.log({ urlPath });

    if (urlPath !== "/live-player") {
      ws.close(1002, "Unsupported path");
    }

    ws.on("message", function (data) {
      const parsedMessage = JSON.parse(data.toString("utf-8"));

      switch (parsedMessage.action) {
        case PLAYER_ACTION.playerOnboarding:
          const userId = uuidv4();
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
      const { payload, action } = JSON.parse(data.toString("utf-8"));
      if (
        action === ADMIN_ACTION.adminOnboarding &&
        payload === "ok" &&
        onboardedPlayer.size > 0
      ) {
        const allOnboardedPlayers = Array.from(onboardedPlayer.values());
        const allOnboardedPlayerMessage: bulkPlayerOnboarded = {
          action: PLAYER_ACTION.bulkPlayerOnboarded,
          payload: allOnboardedPlayers,
        };

        ws.send(JSON.stringify(allOnboardedPlayerMessage));
      }
    });

    ws.on("close", () => {
      console.log("Connection closed");
    });
  });
}

function upgradeWsServer(httpServer: Server) {
  httpServer.on("upgrade", (request, socket, head) => {
    const pathname = request.url;

    if (pathname === "/live-player") {
      wssOnlineUser.handleUpgrade(request, socket, head, (ws) => {
        wssOnlineUser.emit("connection", ws, request);
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
  wssOnlineUser,
  wssAdmin,
  wssAdminInit,
  upgradeWsServer,
};
