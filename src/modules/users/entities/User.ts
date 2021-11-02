import { compare, hash } from 'bcryptjs';

export default class User {
  name: string;
  email: string;
  password: string;

  constructor(name: string, email: string, password: string) {
    this.name = name.trim();
    this.email = email.trim();
    this.password = password.trim();
  }

  async hashPassword(): Promise<string> {
    return await hash(this.password, 8);
  }

  async passwordComparison(password: string): Promise<boolean> {
    return await compare(password, this.password);
  }
}
