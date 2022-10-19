import { Router } from 'express';
import { validate } from 'express-validation';
import { AwardsController } from 'server/controllers';
import { awardsValidation, options } from 'server/validations';

const router = Router();

router.get('/', validate(awardsValidation.getAll, options), AwardsController.getAll);

router.get('/:id', AwardsController.get);

router.post('/', validate(awardsValidation.create, options), AwardsController.create);

router.put('/:id', validate(awardsValidation.update, options), AwardsController.update);

router.patch(
  '/:id',
  validate(awardsValidation.partialUpdate, options),
  AwardsController.partialUpdate
);

router.delete('/:id', validate(awardsValidation.destroy, options), AwardsController.destroy);

export { router as awardsRouter };
