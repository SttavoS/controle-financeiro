import usersRoutes from '@/modules/users/routes/users.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/users', usersRoutes);

export default routes;
