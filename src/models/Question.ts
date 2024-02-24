import mongoose from "mongoose";
import { QuestionOptionSchema } from "./QuestionOption";

const QuestionSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: false },
  options: [QuestionOptionSchema],
  questionType: { type: String, required: true, default: "MULTI_SELECT" },
});

// const QuestionModel = mongoose.model("Question", QuestionSchema);

export { QuestionSchema };
