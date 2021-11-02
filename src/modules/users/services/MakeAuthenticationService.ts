import { AppError } from '@/shared/errors/AppError';
import { Secret, sign } from 'jsonwebtoken';
import User from '../entities/User';
import { UserRecord, UsersRepository } from '../repositories/UsersRepository';
import jwtConfig from '@/config/jwt.config';

interface authenticationDto {
  email: string;
  password: string;
}

interface authenticatedUserDto {
  user: UserRecord;
  token: string;
}

export default class MakeAuthenticationService {
  usersRepository: UsersRepository;

  constructor() {
    this.usersRepository = new UsersRepository();
  }

  async execute({ email, password }: authenticationDto): Promise<authenticatedUserDto> {
    const userExists = await this.usersRepository.findByEmail(email);

    if (!userExists) {
      throw new AppError('User not found', 404);
    }

    const user = new User(userExists.name, userExists.email, userExists.password);

    const userPasswordComparison = await user.passwordComparison(password);

    if (!userPasswordComparison) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const token = this.generateToken(userExists);

    return {
      user: userExists,
      token,
    };
  }

  // TODO: Refact to Facade Class
  private generateToken(user: UserRecord): string {
    return sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET as Secret,
      {
        expiresIn: jwtConfig.jwt.expireIn,
      },
    );
  }
}
