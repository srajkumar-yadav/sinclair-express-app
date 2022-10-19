import { Router } from 'express';
import { validate } from 'express-validation';
import { GameSweepStakeController } from 'server/controllers';
import { gameSweepStakeValidation, options } from 'server/validations';

const router = Router();

router.get(
  '/',
  validate(gameSweepStakeValidation.getAll, options),
  GameSweepStakeController.getAll
);

router.get('/:id', GameSweepStakeController.get);

router.post(
  '/',
  validate(gameSweepStakeValidation.create, options),
  GameSweepStakeController.create
);

router.put(
  '/:id',
  validate(gameSweepStakeValidation.update, options),
  GameSweepStakeController.update
);

router.patch(
  '/:id',
  validate(gameSweepStakeValidation.partialUpdate, options),
  GameSweepStakeController.partialUpdate
);

router.delete(
  '/:id',
  validate(gameSweepStakeValidation.destroy, options),
  GameSweepStakeController.destroy
);

export { router as gameSweepStakeRouter };
