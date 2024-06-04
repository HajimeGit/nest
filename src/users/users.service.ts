import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './users.entity';

@Injectable()
export class UsersService {
  /**
   * Initialize this service.
   * @param {Repository} usersRepository
   */
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  /**
   * Get a user by username.
   *
   * @param {string} username
   * @returns {Promise<UserEntity[]>}
   */
  async findOne(username: string): Promise<UserEntity> {
    return await this.usersRepository.findOne({
      where: { username },
    });
  }

  /**
   * Create a new user.
   *
   * @param {UserEntity} user
   * @returns {Promise<UserEntity>}
   */
  async create(user: UserEntity): Promise<UserEntity> {
    return await this.usersRepository.save(user);
  }
}
