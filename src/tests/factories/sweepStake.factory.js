import { datatype, random, date } from 'faker';
import { SweepStake } from 'data/models';
import { dateToUTC } from 'server/utils/functions';

const buildSweepStake = async (sweepStakeFks) => {
  const resSweepStake = {};

  resSweepStake.startDate = dateToUTC(date.past()).format('YYYY-MM-DD');
  resSweepStake.endDate = dateToUTC(date.past()).format('YYYY-MM-DD');
  resSweepStake.status = random.word().slice(0, 255);
  resSweepStake.type = random.word().slice(0, 255);
  resSweepStake.totalTickets = datatype.number();

  return resSweepStake;
};

const createSweepStake = async (fakeSweepStake) => {
  const sweepStake = await SweepStake.create(fakeSweepStake);
  return sweepStake;
};

export { buildSweepStake, createSweepStake };
