import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { APP_CONFIG } from './config';
import { ENVIRONMENT } from './config/types';
import { ExceptionsUtil } from './utils/exceptions';
import {
  NestFastifyApplication,
  FastifyAdapter,
} from '@nestjs/platform-fastify';
import { WebSocketAdapter } from './adapter/websocket/websocket.adapter';
import { join } from 'path';
async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: false, forbidNonWhitelisted: true }),
  );
  app.useGlobalFilters(new ExceptionsUtil());

  app.useStaticAssets({
    root: join(__dirname, '..', 'public'),
    prefix: '/public/',
  });
  app.setViewEngine({
    engine: {
      handlebars: require('handlebars'),
    },
    templates: join(__dirname, '..', 'views'),
  });

  if (APP_CONFIG.ENVIRONMENT !== ENVIRONMENT.PRODUCTION) {
    const merchantSwaggerConfig = new DocumentBuilder()
      .setTitle('8X Trading Document')
      .setDescription('This is user roles API document')
      .setVersion('1.0')
      .addBearerAuth()
      .addServer(APP_CONFIG.BASE_URL)
      .build();
    const userRolesAppDocument = SwaggerModule.createDocument(
      app,
      merchantSwaggerConfig,
    );
    SwaggerModule.setup('api/v1/swagger', app, userRolesAppDocument);
  }
  // const wss = new BinanceWebsocket(app);
  // wss.init();

  const appWss = new WebSocketAdapter(app)
  appWss.init()
  await app.listen(3000);
}
bootstrap();
