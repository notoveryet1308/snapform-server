import { createLiveQuiz, getAllLiveQuiz, getLiveQuizById } from "../controller/liveQuiz";
import express from "express";

export default (router: express.Router) => {
  router.post("/live-quiz", createLiveQuiz);
  router.get("/live-quiz", getAllLiveQuiz);
  router.get("/live-quiz/id/:quizId", getLiveQuizById);
};
