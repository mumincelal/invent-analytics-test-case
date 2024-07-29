import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import HTTP_STATUS from 'http-status';
import { PostgresError } from 'postgres';

export type GenericError = Partial<Error> & {
  status: number;
  errors?: unknown[];
};

export const errorMiddleware = (
  error: unknown,
  req: Request,
  res: Response,
  _: NextFunction
) => {
  const newError: GenericError = {
    status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    message: 'Internal Server Error'
  };

  if (error instanceof ZodError) {
    newError.status = HTTP_STATUS.BAD_REQUEST;
    newError.message = 'Validation Error';
  } else if (error instanceof PostgresError) {
    newError.status = HTTP_STATUS.BAD_REQUEST;
    newError.message = error.message;
  } else if (error instanceof Error) {
    newError.status = HTTP_STATUS.BAD_REQUEST;
    newError.message = error.message;
  }

  const { status, ...rest } = newError;

  res.status(newError.status).json(rest);
};
