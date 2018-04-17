import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'
import { HistoryService } from './history.service';
import { HistorySchema } from './schema/history.schema';

@Module({
    imports: [MongooseModule.forFeature([{name: 'histories', schema: HistorySchema}])],
    controllers: [],
    components: [HistoryService],
    exports: [HistoryService]
})
export class HistoryModule {}