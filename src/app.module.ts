import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypegooseModule } from 'nestjs-typegoose';
import { AuthModule } from './auth/auth.module';
import { getMongoConfig } from './configs/mongo.config';
import { ProductModule } from './product/product.module';
import { ReviewModule } from './review/review.module';
import { TopPageModule } from './top-page/top-page.module';
import { FilesModule } from './files/files.module';

const ENV = process.env.NODE_ENV;
@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: !ENV ? '.env' : `.env.${ENV}`,
		}),
		TypegooseModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getMongoConfig
		}),
		AuthModule,
		ProductModule,
		TopPageModule,
		ReviewModule,
		FilesModule
	],
})
export class AppModule { }
