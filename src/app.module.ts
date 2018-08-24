import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {OrdersController} from './api/v1/orders.controller';
import {TypeOrmModule} from '@nestjs/typeorm';

@Module({
  imports: [
      TypeOrmModule.forRoot({
          type: 'mysql',
          host: process.env.DB_HOST,
          port: +process.env.DB_PORT,
          username: process.env.DB_USERNAME,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_DATABASE,
          entities: [`${__dirname}/models/*.entity{.ts,.js}`],
      }),
  ],
  controllers: [AppController, OrdersController],
  providers: [AppService],
})
export class AppModule {}
