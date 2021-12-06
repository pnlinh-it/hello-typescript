import { Router } from 'express';
import { getAll, getDetail } from '../controller/user.controller';
const routes = Router();

routes.get('/', getAll);

routes.get('/detail', getDetail);

export default routes;