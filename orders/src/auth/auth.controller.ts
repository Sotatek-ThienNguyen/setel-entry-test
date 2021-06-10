import {
    Controller,
    Body,
    Post,
    Get,
    UseGuards,
  } from '@nestjs/common';
  import { AuthService } from './auth.service';
  import { LoginStatus } from './interfaces/login-status.interface';
  import { LoginUserDto } from '../users/dto/user-login.dto';
  import { JwtPayload } from './interfaces/payload.interface';
  import { AuthGuard } from '@nestjs/passport';
  import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { User } from './dto/user.decorator';

@Controller('auth')
@ApiTags('auths')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  public async login(@Body() loginUserDto: LoginUserDto): Promise<LoginStatus> {
    
    return await this.authService.login(loginUserDto);
  }

  @Get('whoami')
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  public async testAuth(@User() user: any): Promise<JwtPayload> {
    return user;
  }
}
