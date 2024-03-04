import { Request, Response, NextFunction } from "express";
import LiveQuizModel from "../models/LiveQuiz";
import { withAsyncErrorController } from "./withErrorController";

const createLiveQuiz = withAsyncErrorController(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;
    const newQuiz = await LiveQuizModel.create(data);

    res.status(200).json({
      status: "success",
      data: newQuiz,
    });
  }
);

const getAllLiveQuiz = withAsyncErrorController(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = await LiveQuizModel.find();

    res.status(200).json({
      status: "success",
      data: data,
    });
  }
);

export { createLiveQuiz, getAllLiveQuiz };
