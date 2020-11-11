/**
 * importa o express para do typescript
 * Sempre que usarmos typescript, quando usamos o express precisamos adicionar
 * a biblioteca do expres do typescript
 *
 * comando: yarn add @types/express
 */
import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import routes from './routes';
import uploadConfig from './config/upload';
import AppError from './errors/AppError';

import './database';

// Cria a aplicação para conexão com o server na porta especificada
const app = express();

app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
    if (err instanceof AppError) {
        return response.status(err.statusCode).json({
            status: 'error',
            message: err.message,
        });
    }
    console.error(err);

    return response.status(500).json({
        status: 'error',
        message: 'Internal Server error',
    });
});

app.listen(3333, () => {
    console.log('🚀 Server Started on port 3333');
});
