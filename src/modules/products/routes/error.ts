import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import routes from './products.routes';

const app = express();

app.use(express.json());
app.use(routes); // Use suas rotas

// Middleware de erro
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack); // Log do erro no console
  if (err instanceof Error) {
    return res.status(500).json({
      status: 'error',
      message: err.message,
    });
  }
  return res.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  });
});

app.listen(3333, () => {
  console.log('Servidor rodando na porta 3333!🏆');
});
