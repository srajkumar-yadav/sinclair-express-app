import { Router } from 'express';
import { validate } from 'express-validation';
import { SweepStakeController } from 'server/controllers';
import { sweepStakeValidation, options } from 'server/validations';

const router = Router();

router.get('/', validate(sweepStakeValidation.getAll, options), SweepStakeController.getAll);

router.get('/:id', SweepStakeController.get);

router.post('/', validate(sweepStakeValidation.create, options), SweepStakeController.create);

router.put('/:id', validate(sweepStakeValidation.update, options), SweepStakeController.update);

router.patch(
  '/:id',
  validate(sweepStakeValidation.partialUpdate, options),
  SweepStakeController.partialUpdate
);

router.delete(
  '/:id',
  validate(sweepStakeValidation.destroy, options),
  SweepStakeController.destroy
);

export { router as sweepStakeRouter };
