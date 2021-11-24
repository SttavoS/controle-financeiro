export default class Wallet {
  name: string;
  private balance: number;
  type: string;

  constructor(name: string, amount: number, type: string) {
    this.name = name.trim();
    this.balance = amount;
    this.type = type.trim();
  }
}
