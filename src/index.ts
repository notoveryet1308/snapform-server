import "dotenv/config";
import { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import compression from "compression";

import "./utils/mongo";

import { app, server } from "./server";
import router from "./router";
import { CustomErrorType } from "types";
import CustomError from "./utils/CustomError";
import { withGlobalErrorController } from "./controller/withErrorController";

const init = () => {
  app.use(
    cors({
      credentials: true,
    })
  );
  app.use(compression());
  app.use(cookieParser());
  app.use(bodyParser.json());

  server.listen(process.env.PORT, () => {
    console.log("Server 🎶 on", `http://localhost:${process.env.PORT}`);
  });
};

init();

app.use("/", router());
app.all("*", (req, res, next) => {
  const err: CustomErrorType = new CustomError({
    message: `Can't find ${req.originalUrl} on the server`,
    statusCode: 404,
  });
  next(err);
});

app.use(withGlobalErrorController);
