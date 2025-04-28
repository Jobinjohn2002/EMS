import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Add this CORS configuration
  app.enableCors({
    origin: 'http://localhost:5173',  // your React frontend URL
    credentials: true,                // allow cookies/headers if needed
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
