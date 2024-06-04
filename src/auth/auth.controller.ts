import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  /**
   * Initialize the AuthController class.
   * @param {AuthService} authService
   */
  constructor(private readonly authService: AuthService) {}

  /**
   * This route will be used to log in the user.
   * @param {Request} req
   */
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
