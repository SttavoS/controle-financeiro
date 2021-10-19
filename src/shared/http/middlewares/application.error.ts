import { AppError } from '@/shared/errors/AppError';
import { Request, Response } from 'express';

interface InternalServerError {
  status: string;
  message: string;
}

export default function applicationError(
  error: Error,
  request: Request,
  response: Response,
): Response<AppError | InternalServerError> {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    });
  }

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
}
