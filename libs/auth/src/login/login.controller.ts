import { Controller, Post, Body } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginUserDto } from './dto/login-user.dto';

@Controller()
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post('login')
  async login(@Body() dto: LoginUserDto) {
    return this.loginService.login(dto);
  }
}