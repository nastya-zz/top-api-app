import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypegooseModule } from 'nestjs-typegoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { getMongoConfig } from './configs/mongo.config';
import { ProductController } from './product/product.controller';
import { ProductModule } from './product/product.module';
import { ReviewController } from './review/review.controller';
import { ReviewModule } from './review/review.module';
import { TopPageController } from './top-page/top-page.controller';
import { TopPageModule } from './top-page/top-page.module';

@Module({
	imports: [
		ConfigModule.forRoot(),
		TypegooseModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getMongoConfig
		}),
		AuthModule,
		ProductModule,
		TopPageModule,
		ReviewModule
	],
	controllers: [
		AppController,
		AuthController,
		ProductController,
		ReviewController,
		TopPageController
	],
	providers: [AppService],
})
export class AppModule { }
