import WebSocket from "ws";
import {
  GAME_QUESTIONS,
  LiveQuizDataType,
  messageFormat,
  PlayerDataType,
  GameResponseDataType,
} from "../types";
import { broadcastToPlayer } from "../utils/socketUtils";

class GameManager {
  currentQuestionId = null;
  adminSocket: WebSocket | null = null;
  liveQuizData: LiveQuizDataType;
  joinedPlayer: PlayerDataType[] = [];
  liverPlayer: PlayerDataType[] = [];
  gameData: GameResponseDataType = {
    quizId: null,
    questions: [],
    livePlayer: this.liverPlayer,
    joinedPlayer: this.joinedPlayer,
  };

  setAdminSocket({ ws }: { ws: WebSocket }) {
    this.adminSocket = ws;
  }

  broadcastQuestion() {
    if (this.currentQuestionId) this.currentQuestionId = 0;
    else this.currentQuestionId++;

    if (this.adminSocket) {
      const messageData = {
        action: GAME_QUESTIONS.QUESTION_ITEM,
        payload: this.liveQuizData.questions[this.currentQuestionId],
      };
      this.adminSocket.send(JSON.stringify(messageData));
      broadcastToPlayer(messageData);
    }
  }

  setLiveQuizData(data: LiveQuizDataType) {
    this.liveQuizData = data;
    this.gameData.quizId = data.id;
  }

  updateJoinedPlayerData(data: PlayerDataType) {
    this.joinedPlayer.push(data);
    this.liverPlayer.push(data);
    this.gameData.livePlayer = this.liverPlayer;
    this.gameData.joinedPlayer = this.joinedPlayer;
  }
  updatedLivePlayerData(data: PlayerDataType[]) {
    this.liverPlayer = data;
    this.gameData.livePlayer = this.liverPlayer;
  }
}

const gameManager = new GameManager();

export default gameManager;
