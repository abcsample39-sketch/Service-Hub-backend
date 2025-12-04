import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from '../schema';

@Injectable()
export class DrizzleService implements OnModuleInit {
  public client: ReturnType<typeof drizzle<typeof schema>>;

  constructor(private configService: ConfigService) {}

  onModuleInit() {
    const connectionString = this.configService.get<string>('DATABASE_URL');
    if (!connectionString) {
      throw new Error('DATABASE_URL environment variable is not set');
    }

    const pool = new Pool({
      connectionString,
    });
    this.client = drizzle(pool, { schema });
  }
}
