import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { ProductController } from './product/product.controller';
import { ReviewController } from './review/review.controller';
import { TopPageController } from './top-page/top-page.controller';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { ReviewModule } from './review/review.module';
import { TopPageModule } from './top-page/top-page.module';

@Module({
  imports: [AuthModule, ProductModule, ReviewModule, TopPageModule],
  controllers: [AppController, AuthController, ProductController, ReviewController, TopPageController],
  providers: [AppService],
})
export class AppModule {}
