import connection from '@/shared/database/connection';
import { Knex } from 'knex';
import CreateUserDto from '../interfaces/CreateUserDto';
import UpdateUserDto from '../interfaces/UpdateUserDto';

export interface UserRecord {
  id: number;
  name: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
}

export class UsersRepository {
  queryBuilder: Knex;

  constructor() {
    this.queryBuilder = connection;
  }

  async findAll(): Promise<UserRecord[]> {
    const users: UserRecord[] = await this.queryBuilder('users').select('*');

    return users;
  }

  async findById(id: number): Promise<UserRecord | undefined> {
    const user: UserRecord = await this.queryBuilder('users').select('*').where({ id }).first();

    return user;
  }

  async findByEmail(email: string): Promise<UserRecord> {
    const user: UserRecord = await this.queryBuilder('users').select('*').where({ email }).first();

    return user;
  }

  async create({ name, email, password }: CreateUserDto): Promise<void> {
    await this.queryBuilder('users').insert({
      name,
      email,
      password,
      created_at: new Date(),
    });
  }

  async update({ id, name, email, password }: UpdateUserDto): Promise<void> {
    await this.queryBuilder('users').where({ id }).update({
      name,
      email,
      password,
      updated_at: new Date(),
    });
  }

  async delete(id: number): Promise<void> {
    await this.queryBuilder('users').where({ id }).delete();
  }
}
