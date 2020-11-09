/**
 * importa o express para do typescript
 * Sempre que usarmos typescript, quando usamos o express precisamos adicionar
 * a biblioteca do expres do typescript
 *
 * comando: yarn add @types/express
 */
import 'reflect-metadata';
import express from 'express';
import routes from './routes';

import './database'

//Cria a aplicação para conexão com o server na porta especificada
const app = express();

app.use(express.json());
app.use(routes);

app.listen(3333,()=>{
    console.log('🚀 Server Started on port 3333');
});
