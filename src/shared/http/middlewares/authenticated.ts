import jwtConfig from '@/config/jwt.config';
import { AppError } from '@/shared/errors/AppError';
import { NextFunction, Request, Response } from 'express';
import { Secret, verify } from 'jsonwebtoken';

export default function authenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT Token is missing.', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    verify(token, jwtConfig.jwt.secret as Secret);

    return next();
  } catch {
    throw new AppError('Invalid JWT Token.');
  }
}
