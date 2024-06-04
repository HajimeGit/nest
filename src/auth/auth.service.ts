import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../users/users.entity';

@Injectable()
export class AuthService {
  /**
   * Intialize the AuthService.
   * @param {UsersService} usersService
   * @param {JwtService} jwtService
   */
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

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

  /**
   * Login a user and return an access token.
   * @param {any} user
   */
  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  /**
   * Register a new user.
   * @param {any} user
   */
  async register(user: any) {
    const { username, password } = user;

    if (!username || !password) {
      return {
        message: 'Please provide a username and password',
      };
    }

    const result = await this.usersService.create(user);

    if (result) {
      return {
        message: 'User created successfully',
      };
    }
  }
}
