import { NextFunction, Request, Response } from 'express';
import HTTP_STATUS from 'http-status';
import { AnyZodObject, ZodError } from 'zod';

export const validateBody =
  (schema: AnyZodObject) =>
  async (req: Request, response: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.body);

      return next();
    } catch (error) {
      if (error instanceof ZodError) {
        response.status(HTTP_STATUS.BAD_REQUEST).json({
          message: 'Validation Error',
          errors: error.errors
        });
      }
    }
  };
