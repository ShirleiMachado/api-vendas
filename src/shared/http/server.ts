import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';
import { errors } from 'celebrate';
import routes from './routes';
import AppError from '@shared/errors/AppError';
import '@shared/typeorm'; // Certifique-se de que a conexão com o banco de dados é estabelecida
import { celebrate } from 'celebrate';
import uploadConfig from '@config/upload';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));

app.use(routes);

app.use(errors());

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });
    }
    console.error(error);
    return response.status(500).json({
      status: 'error',
      message: 'Erro interno no servidor',
    });
  },
);

app.listen(3333, () => {
  console.log('Servidor rodando na porta 3333!🏆');
});
