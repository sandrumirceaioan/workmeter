import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { ProjectsSchema } from './schema/projects.schema';

@Module({
    imports: [MongooseModule.forFeature([{name: 'projects', schema: ProjectsSchema}])],
    controllers: [ProjectsController],
    components: [ProjectsService]
})
export class ProjectsModule {}