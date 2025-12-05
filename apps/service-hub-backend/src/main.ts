import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.init();

  return app.getHttpAdapter().getInstance();
}

// Export for Vercel serverless functions
export default bootstrap();

// For local development
if (require.main === module) {
  bootstrap().then((app) => {
    app.listen(process.env.PORT ?? 5432);
  });
}
