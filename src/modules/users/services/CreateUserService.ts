import { AppError } from '@/shared/errors/AppError';
import CreateUserDto from '../interfaces/CreateUserDto';
import User from '../entities/User';
import { UserRecord, UsersRepository } from '../repositories/UsersRepository';

export default class CreateUserService {
  usersRepository: UsersRepository;

  constructor() {
    this.usersRepository = new UsersRepository();
  }

  async execute({ name, email, password }: CreateUserDto): Promise<UserRecord> {
    const userExistsWithThisEmail = await this.usersRepository.findByEmail(email);

    if (userExistsWithThisEmail) {
      throw new AppError('This email is already be taken', 422);
    }

    const user = new User(name, email, password);

    await this.usersRepository.create({
      name: user.name,
      email: user.email,
      password: await user.hashPassword(),
    });

    const userRecord = await this.usersRepository.findByEmail(user.email);

    return userRecord;
  }
}
