import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err, user, info) {
    console.log('err', user);
    console.log('err', info);
    console.log('err', err);
    // Don't throw an error if the user is not found
    if (err || !user) {
      return null;
    }
    return user;
  }
}
