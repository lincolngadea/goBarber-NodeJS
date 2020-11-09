// src/routes/index.ts
import { Router } from 'express'; // Router é uma função dentro do express
import appointmentsRouter from './appointments.routes';
import usersRouter from './users.route';

const routes = Router();

/**
 * O routes.use para o appointements, garante que sempre que na url, houver o /appointments,
 * essa fota será direcionada para o appointments.routes.ts, onde poderá ser tratada
 * a partir de '/' como se fosse a raiz do projeto, poŕem iniciando a partir do appointments.
 */
routes.use('/appointments', appointmentsRouter);
routes.use('/users', usersRouter);

export default routes;
