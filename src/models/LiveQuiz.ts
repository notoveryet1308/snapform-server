import mongoose from "mongoose";
import { QuestionSchema } from "./Question";

const LiveQuizSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  questions: [QuestionSchema],
  configuration: {
    type: Map,
    of: new mongoose.Schema({
      timeLimit: {
        type: Number,
        required: true,
        default: 20,
      },
      point: {
        type: Number,
        required: true,
        default: 1000,
      },
    }),
  },
  createdAt: { type: Date, required: true, default: new Date() },
});

const LiveQuizModel = mongoose.model("liveQuiz", LiveQuizSchema);

export default LiveQuizModel;
