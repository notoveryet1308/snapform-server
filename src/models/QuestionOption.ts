import mongoose from "mongoose";

const QuestionOptionSchema = new mongoose.Schema({
  order: { type: String, required: true },
  label: { type: String, required: true },
  isCorrectChoice: { type: Boolean, required: true, default: false },
});

// const QuestionOptionModel = mongoose.model(
//   "QuestionOption",
//   QuestionOptionSchema
// );

export {  QuestionOptionSchema };
