import WebSocket from "ws";

import { javascriptQuiz } from "../data";
import { GAME_QUESTIONS, messageFormat } from "../types";
import { broadcastToPlayer } from "../utils/socketUtils";
import { playerSocket } from "../ws.server";

class GameManager {
  currentQuestionId = 0;
  adminSocket: WebSocket | null = null;
  gameData = javascriptQuiz;

  // constructor({ adminSocket }: { adminSocket: WebSocket }) {
  //   this.adminSocket = adminSocket;
  // }

  setAdminSocket({ ws }: { ws: WebSocket }) {
    this.adminSocket = ws;
  }

  broadcastQuestion<T>({ message }: { message: messageFormat<T> }) {
    const { action } = message;

    if (action === GAME_QUESTIONS.SEND_QUESTION && this.adminSocket) {
      const messageData = {
        action: GAME_QUESTIONS.QUESTION_ITEM,
        payload: this.gameData.questions[this.currentQuestionId],
      };
      this.adminSocket.send(JSON.stringify(messageData));
      broadcastToPlayer(messageData);
    }
  }
}

const gameManager = new GameManager();

export default gameManager;
