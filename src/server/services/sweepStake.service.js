import { SweepStakeRepository } from 'data/repositories';

class SweepStakeService {
  static create(startDate, endDate, status, type, totalTickets) {
    return SweepStakeRepository.create(startDate, endDate, status, type, totalTickets);
  }

  static get(id) {
    return SweepStakeRepository.get(id);
  }

  static getAll(args) {
    return SweepStakeRepository.getAll(args);
  }

  static update(id, startDate, endDate, status, type, totalTickets) {
    return SweepStakeRepository.update(id, startDate, endDate, status, type, totalTickets);
  }

  static partialUpdate(id, startDate, endDate, status, type, totalTickets) {
    return SweepStakeRepository.partialUpdate({
      id,
      startDate,
      endDate,
      status,
      type,
      totalTickets,
    });
  }

  static destroy(id) {
    return SweepStakeRepository.destroy(id);
  }
}

export { SweepStakeService };
