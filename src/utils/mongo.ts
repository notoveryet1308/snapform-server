import config from "config";
import mongoose from "mongoose";

mongoose.Promise = Promise;
mongoose.connect(config.get("dbURI"));
mongoose.connection.on("connected", () => {
  console.log(`connected to mongodb database ⚡⚡`);
});
mongoose.connection.on("error", (error: Error) => {
  console.log("Error while connecting to DB: ", error.message);
});
