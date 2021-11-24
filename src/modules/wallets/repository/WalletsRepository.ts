import connection from '@/shared/database/connection';
import { Knex } from 'knex';

export interface WalletRecord {
  id: number;
  name: string;
  balance: number;
  type: string;
  created_at: Date;
  updated_at: Date;
}

export default class WalletsRepository {
  private queryBuilder: Knex;

  constructor() {
    this.queryBuilder = connection;
  }
}
