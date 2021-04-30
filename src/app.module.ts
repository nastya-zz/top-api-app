import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { ProductController } from './product/product.controller';
import { ProductModule } from './product/product.module';
import { ReviewController } from './review/review.controller';
import { ReviewModule } from './review/review.module';
import { TopPageController } from './top-page/top-page.controller';
import { TopPageModule } from './top-page/top-page.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
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
export class AppModule {}
