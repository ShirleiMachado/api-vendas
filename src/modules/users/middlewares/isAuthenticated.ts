import AppError from '@shared/errors/AppError';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '@config/auth';

export default function isAuthenticated(
  request: Request,
  reponse: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT Token is missing.');
  }
  const [, token] = authHeader.split(' ');

  try {
    const decoderToken = verify(token, authConfig.jwt.secret);

    return next();
  } catch {
    throw new AppError('token JWT invalido.');
  }
}
