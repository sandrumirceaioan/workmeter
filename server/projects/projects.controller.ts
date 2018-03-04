import { Controller, Get, Post, Put, Body, HttpCode, UseGuards } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { AuthGuard } from '../common/guards/auth.guard';


@Controller('projects')
@UseGuards(AuthGuard)
export class ProjectsController {
    constructor(private readonly projectsService: ProjectsService){}

    @Post('/add')
    async add(@Body() createProjectDto: CreateProjectDto){
        return this.projectsService.addProject(createProjectDto);
    }

    @Post('/all')
    async all(){
        return this.projectsService.allProjects();
    }

    @Post('/one')
    async one(@Body() id: String){
        return this.projectsService.oneProject(id);
    }

    @Put('/update')
    async update(@Body() data: CreateProjectDto){
        return this.projectsService.updateProject(data);
    }
    
}
