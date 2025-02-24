import type { NextFunction, Request, Response } from "express";
import { ZodError, type ZodType } from "zod";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";

class Validator<T> {
  private schema: ZodType<T>;

  constructor(schema: ZodType<T>) {
    this.schema = schema;
  }
  validate = (req: Request, res: Response, next: NextFunction) => {
    try {
      this.schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorDetail = error.errors?.map((issue) => ({
          path: issue.path.join("."),
          message: issue.message,
        }));
        res
          .status(200)
          .json(new ApiResponse(200, "Validation Failed", [error]));
      } else {
        res
          .status(500)
          .json(new ApiError(500, "something went wrong", [error]));
      }
    }
  };
}

export { Validator };
