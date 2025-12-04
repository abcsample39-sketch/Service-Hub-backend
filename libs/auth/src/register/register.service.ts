// libs/auth/src/register/register.service.ts

import { ConflictException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
// Import DrizzleService and schema from our established libraries
import { DrizzleService } from '@app/database/drizzle/drizzle.service';
import { users } from '@app/database/schema/users';
import { RegisterUserDto } from './dto/register-user.dto';
import { eq } from 'drizzle-orm';

@Injectable()
export class RegisterService {
  // Inject the DrizzleService to access the database client
  constructor(private readonly drizzleService: DrizzleService) {}

  async signup(dto: RegisterUserDto) {
    const db = this.drizzleService.client;
    const saltRounds = 10;

    // 1. Check if user already exists
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, dto.email),
    });

    if (existingUser) {
      // Throw a standard HTTP conflict error (409) if email is taken
      throw new ConflictException('User with this email already exists.');
    }

    // 2. Hash the password securely
    const passwordHash = await bcrypt.hash(dto.password, saltRounds);

    // 3. Insert the new user into the database
    const [newUser] = await db
      .insert(users)
      .values({
        email: dto.email,
        password: passwordHash,
        name: dto.fullname,
      })
      .returning({ id: users.id, email: users.email }); // Return only public fields

    // Return the newly created user (excluding the password hash)
    return { id: newUser.id, email: newUser.email };
  }
}
