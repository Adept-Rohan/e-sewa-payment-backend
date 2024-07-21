import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { HandleEsewaSuccess } from './middleware/handleEsewaSuccess';

@Module({
  controllers: [AppController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(HandleEsewaSuccess)
      .forRoutes({ path: 'esewa/success', method: RequestMethod.GET });
  }
}
