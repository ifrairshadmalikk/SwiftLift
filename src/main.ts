import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { VersioningType } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { AllExceptionsFilter } from './common/filter/http-exception.filter';

async function bootstrap() {
  //  1. Create app with Winston logger
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json(),
          ),
        }),
      ],
    }),
  });

  //  2. Global exception filter (for clean error handling)
  app.useGlobalFilters(new AllExceptionsFilter());

  //  3. Enable API Versioning (/v1/...)
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  //  4. Swagger setup
  const config = new DocumentBuilder()
    .setTitle('SwiftLift REST API')
    .setDescription('MVP API documentation for SwiftLift')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  //  5. Start the app after all configuration
  const port = process.env.PORT ?? 3000;
  await app.listen(port);

  console.log(`Server running at http://localhost:${port}`);
  console.log(`Swagger UI: http://localhost:${port}/api/docs`);
}

bootstrap();
