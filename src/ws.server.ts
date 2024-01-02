import WebSocket, { WebSocketServer } from "ws";
import { v4 as uuidv4 } from "uuid";
import { Server } from "http";
import { broadcastToAdmin } from "./utils/socketUtils";
import {
  USER_ACTION,
  bulkUserOnboarded,
  userOnboarded,
  userOnboarding,
} from "./types";

const onboardedUser = new Map();

const wssOnlineUser = new WebSocket.Server({ noServer: true });
const wssAdmin = new WebSocket.Server({ noServer: true });

function wssOnlineUserInit() {
  wssOnlineUser.on("connection", (ws, request) => {
    const urlPath = request.url;

    if (urlPath !== "/live-user") {
      ws.close(1002, "Unsupported path");
    }

    ws.on("message", function (data) {
      const parsedMessage = JSON.parse(data.toString("utf-8"));

      switch (parsedMessage.action) {
        case USER_ACTION.userOnboarding:
          const userId = uuidv4();
          const {
            payload: { name },
          }: userOnboarding = parsedMessage;
          const userData = { id: userId, name: name };
          onboardedUser.set(ws, userData);
          const onBoardedUser: userOnboarded = {
            action: USER_ACTION.userOnboarded,
            payload: userData,
          };

          ws.send(JSON.stringify(onBoardedUser));
          broadcastToAdmin(onBoardedUser);
      }
    });

    ws.on("close", () => {
      console.log(`Connection closed ${onboardedUser.get(ws)?.name}`);
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

    if (ws.readyState === WebSocket.OPEN && onboardedUser.size > 0) {
      const allOnboardedUsers = [...onboardedUser.keys()].map((userWS) =>
        onboardedUser.get(userWS)
      );
      const allOnboardedUsersMessage: bulkUserOnboarded = {
        action: USER_ACTION.userOnboarded,
        payload: allOnboardedUsers,
      };
      ws.send(JSON.stringify(allOnboardedUsersMessage));
    }

    ws.on("message", function (data) {
      const parsedMessage = JSON.parse(JSON.stringify(data));

      console.log({ parsedMessage });
    });

    ws.on("close", () => {
      console.log("Connection closed");
    });
  });
}

function upgradeWsServer(httpServer: Server) {
  httpServer.on("upgrade", (request, socket, head) => {
    const pathname = request.url;

    if (pathname === "/live-user") {
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
