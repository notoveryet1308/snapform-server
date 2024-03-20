import WebSocket from "ws";
import {
  GAME_QUESTIONS,
  LiveQuizDataType,
  messageFormat,
  PlayerDataType,
  GameResponseDataType,
  PlayerQuizQuestionResponseDataType,
} from "../types";
import { broadcastToAdmin, broadcastToPlayer } from "../utils/socketUtils";

class GameManager {
  currentQuestionId = null;
  adminSocket: WebSocket | null = null;
  liveQuizData: LiveQuizDataType;
  joinedPlayer: PlayerDataType[] = [];
  liverPlayer: PlayerDataType[] = [];
  currentQuestionResponse: {
    [key: string]: PlayerQuizQuestionResponseDataType[];
  } = {};
  gameData: GameResponseDataType = {
    quizId: null,
    questions: [],
    livePlayer: this.liverPlayer,
    joinedPlayer: this.joinedPlayer,
    result: [],
  };

  setAdminSocket({ ws }: { ws: WebSocket }) {
    this.adminSocket = ws;
  }

  broadcastQuestion() {
    if (this.currentQuestionId) this.currentQuestionId = 0;
    else this.currentQuestionId++;

    const messageData = {
      action: GAME_QUESTIONS.QUESTION_ITEM,
      payload: this.liveQuizData.questions[this.currentQuestionId],
    };
    // this.adminSocket.send(JSON.stringify(messageData));
    this.currentQuestionResponse[
      this.liveQuizData.questions[this.currentQuestionId].id
    ] = [];
    broadcastToAdmin(messageData);
    broadcastToPlayer(messageData);
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

  updateGameResponseData(data: PlayerQuizQuestionResponseDataType) {
    if (
      this.gameData.quizId === data.quizId &&
      this.currentQuestionResponse[data.questionId]
    ) {
      const scored = data.point + data.responseTime * 100;
      if (
        !this.gameData.result.some((res) => res.player.id === data.player.id)
      ) {
        this.gameData.result.push({ player: data.player, score: scored });
      } else {
        this.gameData.result.forEach((res) => {
          if (res.player.id === data.player.id) {
            res.score = res.score + scored;
          }
        });
      }
      this.currentQuestionResponse[data.questionId].push(data);
    }
  }
}

const gameManager = new GameManager();

export default gameManager;
