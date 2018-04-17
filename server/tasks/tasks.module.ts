import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TasksSchema } from './schema/tasks.schema';
import { CommentsModule } from '../comments/comments.module';
import { HistoryModule } from '../history/history.module';

@Module({
    imports: [
        MongooseModule.forFeature([{name: 'tasks', schema: TasksSchema}]), CommentsModule, HistoryModule],
    controllers: [TasksController],
    components: [TasksService],
    exports: [TasksService]
})
export class TasksModule {}