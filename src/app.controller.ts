import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('api')
export class AppController {
  /**
   * Initialize the AppController class.
   * @param {AppService} appService
   */
  constructor(private readonly appService: AppService) {}

  /**
   * Get the user's profile.
   * @param {Request} req
   */
  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  async getProfile(@Request() req) {
    return req.user;
  }
}
