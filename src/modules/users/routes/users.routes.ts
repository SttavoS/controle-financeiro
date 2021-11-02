import authenticated from '@/shared/http/middlewares/authenticated';
import { Router } from 'express';
import AuthController from '../controllers/AuthController';
import UsersController from '../controllers/UsersController';

const usersRoutes = Router();
const usersController = new UsersController();
const authController = new AuthController();

usersRoutes.post('/', usersController.create);
usersRoutes.get('/:id', authenticated, usersController.show);

usersRoutes.post('/tokens', authController.login);

export default usersRoutes;
