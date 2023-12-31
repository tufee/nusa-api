import { Router } from 'express';
import ensureAuthenticated from '../../middlewares/ensureAuthenticated';
import { receitaController } from './receita-factory';

const receitaRouter = Router();

receitaRouter.post(
  '/create/receita',
  ensureAuthenticated,
  (request, response) => {
    receitaController.create(request, response);
  }
);

receitaRouter.get('/receita', ensureAuthenticated, (request, response) => {
  receitaController.findAll(request, response);
});

export { receitaRouter };
