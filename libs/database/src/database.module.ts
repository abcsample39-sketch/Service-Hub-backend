// libs/database/src/database.module.ts

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; // Required for DrizzleService
import { DrizzleService } from './drizzle/drizzle.service'; // Our Drizzle connection manager

@Module({
  // Imports ConfigModule so DrizzleService can access environment variables
  imports: [ConfigModule],

  // Register DrizzleService as a provider
  providers: [DrizzleService],

  // CRUCIAL: Export DrizzleService so other libraries (like 'auth') can use the Drizzle client
  exports: [DrizzleService],
})
export class DatabaseModule {}
