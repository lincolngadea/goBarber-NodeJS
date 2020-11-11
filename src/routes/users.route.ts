import { Router } from 'express';
import multer from 'multer';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import CreateUserService from '../services/CreateUserService';

import uploadConfig from '../config/upload';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

const usersRouter = Router();
const upload = multer(uploadConfig);

// Cria Rota POST
usersRouter.post('/', async (request, response) => {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
        name,
        email,
        password,
    });

    return response.json({ ...user, password: undefined });
});

usersRouter.patch(
    '/avatar',
    ensureAuthenticated,
    upload.single('avatar'),
    async (request, response) => {
        // console.log(request.file);

        const updateUserAvatar = new UpdateUserAvatarService();

        const user = await updateUserAvatar.execute({
            user_id: request.user.id,
            avatarFileName: request.file.filename,
        });
        return response.json({ ...user, password: undefined });
    },
);
export default usersRouter;
