import mongoose from "mongoose";
import { QuestionOptionSchema } from "./QuestionOption";
import { ALL_QUESTION_TYPES } from "../types";

const QuestionSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: false },
  options: [QuestionOptionSchema],
  questionType: {
    type: String,
    required: true,
    default: ALL_QUESTION_TYPES.MULTI_SELECT,
  },
});

// const QuestionModel = mongoose.model("Question", QuestionSchema);

export { QuestionSchema };
