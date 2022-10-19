import { Awards } from 'data/models';
import { buildSweepStake, createSweepStake } from './sweepStake.factory';
import { buildUser, createUser } from './user.factory';

const buildAwards = async (awardsFks) => {
  const resAwards = {};
  let { user } = awardsFks;
  let { sweepstake } = awardsFks;

  if (awardsFks.user === null || typeof awardsFks.user === 'undefined') {
    const fakeUser = await buildUser({});
    const createdFakeUser = await createUser(fakeUser);
    user = createdFakeUser.id;
  }
  if (awardsFks.sweepstake === null || typeof awardsFks.sweepstake === 'undefined') {
    const fakeSweepstake = await buildSweepStake({});
    const createdFakeSweepstake = await createSweepStake(fakeSweepstake);
    sweepstake = createdFakeSweepstake.id;
  }
  resAwards.user = user;
  resAwards.sweepstake = sweepstake;

  return resAwards;
};

const createAwards = async (fakeAwards) => {
  const awards = await Awards.create(fakeAwards);
  return awards;
};

export { buildAwards, createAwards };
