import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  /**
   * Intialize the AuthService.
   * @param {UsersService} usersService
   */
  constructor(private readonly usersService: UsersService) {}

  /**
   * Validate a user by username and password.
   *
   * @param {string} username
   * @param {string} password
   * @returns {Promise<any>}
   */
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === password) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }

    return null;
  }
}
