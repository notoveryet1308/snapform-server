import WebSocket, { WebSocketServer } from "ws";
import { Server } from "http";
import {
  broadcastGameCountdown,
  broadcastToAdmin,
  broadcastToPlayer,
  sendGameActionToAdmin,
  sendPlayerListInBulKToAdmin,
} from "./utils/socketUtils";
import {
  PLAYER_ACTION,
  PlayerOnboardedType,
  PlayerDataType,
  ADMIN_ACTION,
  ADMIN_GAME_ACTION,
  QUIZ_DATA_ACTION,
  GAME_COUNT_DOWN,
  GAME_QUESTIONS,
} from "./types";
import gameManager from "./socketResolvers/GameManager";

const onboardedPlayer = new Map<WebSocket, PlayerDataType>();

const playerSocket = new WebSocketServer({ noServer: true });
const wssAdmin = new WebSocketServer({ noServer: true });

function wssOnlineUserInit() {
  playerSocket.on("connection", (ws, request) => {
    const urlPath = request.url;
    console.log({ urlPath });

    if (urlPath !== "/live-player") {
      ws.close(1002, "Unsupported path");
    }

    ws.on("message", function (data) {
      const { action, payload } = JSON.parse(data.toString("utf-8"));

      if (action === PLAYER_ACTION.PLAYER_ONBOARDING) {
        gameManager.updateJoinedPlayerData(payload);
        const onBoardedPlayer: PlayerOnboardedType = {
          action: PLAYER_ACTION.PLAYER_ONBOARDED,
          payload,
        };

        broadcastToAdmin(onBoardedPlayer);
        ws.send(JSON.stringify(onBoardedPlayer));
        onboardedPlayer.set(ws, payload);

        broadcastToPlayer({
          action: QUIZ_DATA_ACTION.JOINED_PLAYER,
          payload: gameManager.liverPlayer,
        });
      }

      if (action === QUIZ_DATA_ACTION.LIVE_QUIZ_ID) {
        const message = {
          action: QUIZ_DATA_ACTION.IS_QUIZ_LIVE,
          payload: gameManager.gameData.quizId === payload,
        };
        ws.send(JSON.stringify(message));
      }

      if (action === PLAYER_ACTION.PLAYER_QUESTION_RESPONSE) {
        gameManager.updateGameResponseData(payload);
      }
    });

    ws.on("close", () => {
      const disconnectedPlayer = onboardedPlayer.get(ws);
      const message = {
        action: PLAYER_ACTION.PLAYER_DISCONNECTED,
        payload: disconnectedPlayer,
      };
      onboardedPlayer.delete(ws);
      gameManager.updatedLivePlayerData(Array.from(onboardedPlayer.values()));
      broadcastToAdmin(message);
      broadcastToPlayer(message);
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
      const { action, payload } = message;

      if (!gameManager.adminSocket) gameManager.setAdminSocket({ ws });

      if (action === ADMIN_ACTION.ADMIN_ONBOARDING) {
        ws.send(
          JSON.stringify({
            action: ADMIN_ACTION.ADMIN_ONBOARDED,
            payload: payload,
          })
        );

        sendPlayerListInBulKToAdmin({
          adminSocket: ws,
          payload,
        });
      }

      if (
        ADMIN_GAME_ACTION.PLAY_GAME ||
        ADMIN_GAME_ACTION.PAUSE_GAME ||
        ADMIN_GAME_ACTION.SKIP_QUESTION
      ) {
        sendGameActionToAdmin({ adminSocket: ws, message });
      }

      if (action === QUIZ_DATA_ACTION.SEND_QUIZ_DATA) {
        console.log({ payload });

        gameManager.setLiveQuizData(payload);
      }

      if (action === GAME_COUNT_DOWN.START) {
        broadcastGameCountdown({ adminSocket: ws, message });
      }

      if (action === GAME_QUESTIONS.SEND_QUESTION) {
        gameManager.broadcastQuestion();
      }

      if (action === ADMIN_ACTION.ADMIN_QUESTION_RESPONSE) {
        gameManager.updateGameResponseData(payload);
      }
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
    } else if (pathname === "/admin") {
      wssAdmin.handleUpgrade(request, socket, head, (ws) => {
        wssAdmin.emit("connection", ws, request);
      });
    } else {
      socket.destroy();
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
