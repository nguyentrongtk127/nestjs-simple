import { Module } from '@nestjs/common';
import * as controllers from './adapter/controllers';
import { DatabaseModule } from './infrastructure/data/database';
import * as services from './services';
import * as wsEvents from './adapter/websocket/events'
@Module({
  imports: [
    // TelegrafModule.forRoot({
    //   token: APP_CONFIG.TELEGRAM_TOKEN,
    // }),
    DatabaseModule,
  ],
  controllers: [...Object.values(controllers)],
  providers: [
    ...Object.values(services),
    ...Object.values(wsEvents)
  ],
})
export class AppModule {}
