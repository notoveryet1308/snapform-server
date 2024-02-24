import { createLiveQuiz } from "../controller/liveQuiz";
import express from "express";

export default (router: express.Router) => {
  router.post("/live-quiz", createLiveQuiz);
};
