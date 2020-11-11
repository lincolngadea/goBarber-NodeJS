import { Router } from 'express';

import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionsRouter = Router();

// Cria Rota POST
sessionsRouter.post('/', async (request, response) => {
    try {
        const { email, password } = request.body;

        const authenticateUser = new AuthenticateUserService();

        const { user, token } = await authenticateUser.execute({
            email,
            password,
        });

        /**
         * Retorna o Objeto user e dá um undefined no passwor
         * para que não seja mostrado a senha no retorno
         * Retorna tb o token
         */
        return response.json({ ...user, password: undefined, token });
    } catch (err) {
        return response.status(err.statusCode).json({ error: err.message });
    }
});

export default sessionsRouter;
