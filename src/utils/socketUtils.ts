import WebSocket from "ws";

import { wssAdmin, playerSocket } from "../ws.server";

import {
  ADMIN_ACTION,
  GAME_COUNT_DOWN,
  PLAYER_ACTION,
  PlayerDataType,
  messageFormat,
} from "../types";
import gameManager from "../socketResolvers/GameManager";

export function broadcastToPlayer<T>(data: messageFormat<T> | null) {
  playerSocket.clients.forEach((player) => {
    if (player.readyState === WebSocket.OPEN && data) {
      player.send(JSON.stringify(data));
    }
  });
}

export function broadcastToAdmin<T>(data: messageFormat<T> | null) {
  wssAdmin.clients.forEach((admin) => {
    if (admin.readyState === WebSocket.OPEN && data) {
      admin.send(JSON.stringify(data));
    }
  });
}

export function sendPlayerListInBulKToAdmin<T>({
  adminSocket,
  payload,
}: {
  adminSocket: WebSocket;
  payload: PlayerDataType;
}) {
  if (!gameManager.liverPlayer.some((player) => player.id === payload.id)) {
    gameManager.updateJoinedPlayerData(payload as PlayerDataType);
  }

  if (gameManager.liverPlayer.length > 0) {
    const allOnboardedPlayers = gameManager.liverPlayer;
    adminSocket.send(
      JSON.stringify({
        action: ADMIN_ACTION.PLAYER_BULK_ONBOARDING_TO_ADMIN,
        payload: allOnboardedPlayers,
      })
    );
  }
}

export function sendGameActionToAdmin<T>({
  adminSocket,
  message,
}: {
  adminSocket: WebSocket;
  message: messageFormat<T>;
}) {
  adminSocket.send(JSON.stringify(message));
  playerSocket.clients.forEach((player) => {
    if (player.readyState === WebSocket.OPEN && message) {
      player.send(JSON.stringify(message));
    }
  });
}

export function broadcastGameCountdown<T>({
  adminSocket,
  message,
}: {
  adminSocket: WebSocket;
  message: messageFormat<T>;
}) {
  let { payload } = message;

  let countdown = +payload;
  let countDownTimer = setInterval(() => {
    if (countdown > 0) {
      const message = {
        action: GAME_COUNT_DOWN.IN_PROGRESS,
        payload: countdown,
      };
      adminSocket.send(JSON.stringify(message));
      broadcastToPlayer<number>(message);
    } else {
      const message = {
        action: GAME_COUNT_DOWN.DONE,
        payload: GAME_COUNT_DOWN.DONE,
      };
      broadcastToPlayer<string>(message);
      adminSocket.send(JSON.stringify(message));
      clearInterval(countDownTimer);
    }
    countdown = countdown - 1;
  }, 1000);
}

// export const broadcastGameQuestion = <T>({
//   socket,
//   message,
// }: {
//   socket: WebSocket;
//   message: messageFormat<T>;
// }) => {
//   const { action, payload } = message;
//   let gameQuestionTimer;
//   let currentQuestionIndex = 0;

//   if (action === GAME_QUESTIONS.SEND) {
//     gameQuestionTimer = setInterval(() => {
//       socket.send(
//         JSON.stringify({
//           action: GAME_QUESTIONS.QUESTION_ITEM,
//           payload: javascriptQuiz.questions[currentQuestionIndex],
//         })
//       );
//       currentQuestionIndex++;
//     }, (javascriptQuiz.metaInfo.inboundTime + 10) * 1000);
//   }
// };
