import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { ProjectsModule } from './projects/projects.module';
import { ListsModule } from './lists/lists.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksModule } from './tasks/tasks.module';
import { CommentsModule } from './comments/comments.module';
import { HistoryModule } from './history/history.module';

@Module({
  imports: [
    UsersModule,
    ProjectsModule,
    ListsModule,
    TasksModule,
    CommentsModule,
    HistoryModule,
    //MongooseModule.forRoot('mongodb://localhost:27017/tmwm')
    MongooseModule.forRoot('mongodb://admin:rappac33!@ds247357.mlab.com:47357/tmwm')
    // MongooseModule.forRoot('mongodb://sandrumirceaioan:rappac33!@cluster0-shard-00-00-xpraq.mongodb.net:27017,cluster0-shard-00-01-xpraq.mongodb.net:27017,cluster0-shard-00-02-xpraq.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin')
  
  ],
  controllers: [AppController]
})
export class ApplicationModule {}