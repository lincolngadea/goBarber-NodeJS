import { getRepository } from 'typeorm';

import { hash } from 'bcryptjs';
import User from '../models/User';
import AppError from '../errors/AppError';

interface Request {
    name: string;
    email: string;
    password: string;
}
class CreateUserService {
    public async execute({ name, email, password }: Request): Promise<User> {
        const userRepository = getRepository(User);

        // Verifica se já existe um usuário com o mesmo nome no banco
        const checkUserExists = await userRepository.findOne({
            where: { email },
        });

        if (checkUserExists) {
            throw new AppError('Email address already used');
        }
        // Finaliza bloco de Verificação de duplicidade

        // Bloco para Criptografar o Password
        const hashedPassword = await hash(password, 8);
        // Cria uma instância do usuário para salvar no banco
        const user = userRepository.create({
            name,
            email,
            password: hashedPassword,
        });
        // Finaliza instânda de usuário

        await userRepository.save(user); // Salva o repositório com base na instância criada

        return user;
    }
}

export default CreateUserService;
