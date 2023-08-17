import { Module } from '@nestjs/common';
import { ProductUpdate } from './products/product.update';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from './entities/product.entity';
import * as dotenv from 'dotenv';
import { TelegrafModule } from 'nestjs-telegraf';
import * as process from 'process';
import { ProductService } from './products/product.serivce';
import { Cart } from './entities/cart.entity';
import { CartService } from './cart/cart.service';
import { CartUpdate } from './cart/cart.update';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

dotenv.config();

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'static'),
    }),
    TelegrafModule.forRoot({
      token: process.env.TOKEN,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Products, Cart],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Products, Cart]),
  ],
  controllers: [AppController],
  providers: [ProductService, 
              ProductUpdate,
              CartService,
              CartUpdate,
              AppService],
})
export class AppModule {}
