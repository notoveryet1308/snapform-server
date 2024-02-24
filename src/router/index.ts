import express from "express";
import liveQuiz from "./liveQuiz";

const router = express.Router();


export default (): express.Router => {
    liveQuiz(router)
  return router;
};
