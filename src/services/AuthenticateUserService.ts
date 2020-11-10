import { getRepository } from 'typeorm';

import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import User from '../models/User';

interface Request {
    email: string;
    password: string;
}
// Bloco de autenticação de usuário
class AuthenticateUserService {
    public async execute({
        email,
        password,
    }: Request): Promise<{ user: User }> {
        const usersRepository = getRepository(User);

        const user = await usersRepository.findOne({ where: { email } });

        if (!user) {
            throw new Error('Incorrect email/password combination.');
        }

        // user.password - Senha não criptografada
        // password - Senha Criptografada

        const passwordMatched = await compare(password, user.password);

        if (!passwordMatched) {
            throw new Error('Incorrect email/password combination.');
        }

        return {
            user,
        };
    }
}

export default AuthenticateUserService;
