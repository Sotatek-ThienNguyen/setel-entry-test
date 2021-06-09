import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { LoginStatus } from './interfaces/login-status.interface';
import { LoginUserDto } from '../users/dto/user-login.dto';
import { JwtPayload } from './interfaces/payload.interface';
import { JwtService } from '@nestjs/jwt';
import { dataLogin } from './dataLogin.fixture';
import { checkExistUsername } from './utils/common';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async login(loginUserDto: LoginUserDto): Promise<LoginStatus> {
    let correctUser = false;
    dataLogin.forEach(data => {
      if (data.username === loginUserDto.username && data.password === loginUserDto.password) {
        correctUser = true
      }
    })
    if (!correctUser) {
      throw new HttpException('Username or password is incorrect.', HttpStatus.UNAUTHORIZED);
    };
    const user = { username: loginUserDto.username };
    // generate and sign token
    const token = this._createToken(user);

    return {
      username: user.username,
      ...token,
    };
  }

  async validateUser(payload: JwtPayload): Promise<Object> {
    const user = { username: payload.username };
    if (!checkExistUsername(user.username)) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }

  private _createToken({ username }): any {
    const expiresIn = process.env.EXPIRESIN;
    const user: JwtPayload = { username };
    const accessToken = this.jwtService.sign(user);
    return {
      expiresIn,
      accessToken,
    };
  }
}
