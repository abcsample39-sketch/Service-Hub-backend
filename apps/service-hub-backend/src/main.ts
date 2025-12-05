import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

let cachedApp: any;

async function bootstrap() {
  if (!cachedApp) {
    const app = await NestFactory.create(AppModule);
    await app.init();
    cachedApp = app.getHttpAdapter().getInstance();
  }

  return cachedApp;
}

// Export for Vercel serverless functions
export default async (req: any, res: any) => {
  const app = await bootstrap();
  return app(req, res);
};

// For local development
if (require.main === module) {
  bootstrap().then((app) => {
    app.listen(process.env.PORT ?? 5432);
  });
}
