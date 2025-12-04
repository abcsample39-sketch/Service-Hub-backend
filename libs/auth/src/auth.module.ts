import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { RegisterModule } from './register/register.module';
import { LoginModule } from './login/login.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { DatabaseModule } from '@app/database';

@Module({
  imports: [
    DatabaseModule,
    RegisterModule,
    LoginModule,
    PassportModule,
  ],
  providers: [JwtStrategy],
  exports: [RegisterModule, LoginModule, JwtStrategy],
})
export class AuthModule {}
