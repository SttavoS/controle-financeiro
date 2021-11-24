import User from '@/modules/users/entities/User';

export default class Wallet {
  name: string;
  private balance: number;
  type: string;
  user: User;

  constructor(name: string, amount: number, type: string, user: User) {
    this.name = name.trim();
    this.balance = amount;
    this.type = type.trim();
    this.user = user;
  }
}
