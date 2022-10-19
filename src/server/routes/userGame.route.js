import { Router } from 'express';
import { validate } from 'express-validation';
import { UserGameController } from 'server/controllers';
import { userGameValidation, options } from 'server/validations';

const router = Router();

router.get('/', validate(userGameValidation.getAll, options), UserGameController.getAll);

router.get('/:id', UserGameController.get);

router.post('/', validate(userGameValidation.create, options), UserGameController.create);

router.put('/:id', validate(userGameValidation.update, options), UserGameController.update);

router.patch(
  '/:id',
  validate(userGameValidation.partialUpdate, options),
  UserGameController.partialUpdate
);

router.delete('/:id', validate(userGameValidation.destroy, options), UserGameController.destroy);

export { router as userGameRouter };
