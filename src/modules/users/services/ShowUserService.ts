import { AppError } from '@/shared/errors/AppError';
import { UserRecord, UsersRepository } from '../repositories/UsersRepository';

export default class ShowUserService {
  usersRepository: UsersRepository;

  constructor() {
    this.usersRepository = new UsersRepository();
  }

  async execute(user_id: number): Promise<UserRecord> {
    const userRecord = await this.usersRepository.findById(user_id);

    if (!userRecord) {
      throw new AppError('User not found', 404);
    }

    return userRecord;
  }
}
