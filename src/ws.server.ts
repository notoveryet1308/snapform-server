import WebSocket from "ws";
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
  playerOnboarded,
  PlayerDataType,
  ADMIN_ACTION,
  ADMIN_GAME_ACTION,
  QUIZ_DATA_ACTION,
  GAME_COUNT_DOWN,
  GAME_QUESTIONS,
} from "./types";
import gameManager from "./socketResolvers/GameManager";

const onboardedPlayer = new Map<WebSocket, PlayerDataType>();

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
      const { action, payload } = JSON.parse(data.toString("utf-8"));

      if (action === PLAYER_ACTION.playerOnboarding) {
        gameManager.updateJoinedPlayerData(payload);
        const onBoardedPlayer: playerOnboarded = {
          action: PLAYER_ACTION.playerOnboarded,
          payload,
        };

        broadcastToAdmin(onBoardedPlayer);
        broadcastToPlayer(onBoardedPlayer);
        onboardedPlayer.set(ws, payload);
      }

      if (action === PLAYER_ACTION.playerQuestionResponse) {
        console.log(payload);
      }

      if (action === QUIZ_DATA_ACTION.LIVE_QUIZ_ID) {
        const message = {
          action: QUIZ_DATA_ACTION.IS_QUIZ_LIVE,
          payload: gameManager.gameData.quizId === payload,
        };
        ws.send(JSON.stringify(message));
      }
    });

    ws.on("close", () => {
      const disconnectedPlayer = onboardedPlayer.get(ws);
      const message = {
        action: "PLAYER_DISCONNECTED",
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

      if (action === ADMIN_ACTION.adminOnboarding) {
        sendPlayerListInBulKToAdmin({
          adminSocket: ws,
          message,
        });
      }

      if (
        ADMIN_GAME_ACTION.PLAY_GAME ||
        ADMIN_GAME_ACTION.PAUSE_GAME ||
        ADMIN_GAME_ACTION.SKIP_QUESTION
      ) {
        sendGameActionToAdmin({ adminSocket: ws, message });
      }

      if (action === "SEND_QUIZ_DATA") {
        gameManager.setLiveQuizData(payload);
      }

      if (action === GAME_COUNT_DOWN.START) {
        broadcastGameCountdown({ adminSocket: ws, message });
      }

      if (action === GAME_QUESTIONS.QUESTION_ITEM) {
        gameManager.broadcastQuestion();
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
