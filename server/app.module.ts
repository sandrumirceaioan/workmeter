import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forRoot('mongodb://admin:rappac33!@ds247357.mlab.com:47357/tmwm')
  ],
  controllers: [AppController]
})
export class ApplicationModule {}