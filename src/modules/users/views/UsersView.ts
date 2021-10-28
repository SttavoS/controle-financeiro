import { UserRecord } from '../repositories/UsersRepository';

interface UserView {
  id: number;
  name: string;
  email: string;
  created_at: Date;
  updated_at: Date;
}

export default class UsersView {
  static render(user: UserRecord): UserView {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };
  }

  static renderMany(users: UserRecord[]): UserView[] {
    return users.map(user => this.render(user));
  }
}
