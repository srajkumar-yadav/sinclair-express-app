import { Router } from 'express';
import { validate } from 'express-validation';
import { GameController } from 'server/controllers';
import { gameValidation, options } from 'server/validations';

const router = Router();

router.get('/', validate(gameValidation.getAll, options), GameController.getAll);

router.get('/:id', GameController.get);

router.post('/', validate(gameValidation.create, options), GameController.create);

router.put('/:id', validate(gameValidation.update, options), GameController.update);

router.patch('/:id', validate(gameValidation.partialUpdate, options), GameController.partialUpdate);

router.delete('/:id', validate(gameValidation.destroy, options), GameController.destroy);

export { router as gameRouter };
