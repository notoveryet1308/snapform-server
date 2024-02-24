import { Request, Response, NextFunction } from "express";
import { CustomErrorType } from "../types";

type ControllerFunc = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;

const withAsyncErrorController = (func: ControllerFunc) => {
  return function (req: Request, res: Response, next: NextFunction) {
    func(req, res, next).catch((err) => next(err));
  };
};

const withGlobalErrorController = (
  error: CustomErrorType,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  error.statusCode = error.statusCode || 500;

  error.status = error.status || "error";
  res.status(error.statusCode).json({
    status: error.status,
    message: error.message,
  });
};
export { withAsyncErrorController, withGlobalErrorController };
