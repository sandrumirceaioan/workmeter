import { Controller, Get, Post, Put, Delete, Body, Param, HttpCode, UseGuards, UseInterceptors } from '@nestjs/common';
import { ListsService } from './lists.service';
import { CreateListDto } from './dto/create-list.dto';
import { AuthGuard } from '../common/guards/auth.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Sign } from '../common/interceptors/sign.interceptor';

@Controller('lists')
@UseGuards(AuthGuard)
export class ListsController {
    constructor(private readonly listsService: ListsService){}

    @Post('/add')
    @Roles('admin', 'manager')
    @UseInterceptors(Sign)
    async add(@Body() createProjectDto: CreateListDto){
        return this.listsService.addProject(createProjectDto);
    }
    
    // @Post('/all')
    // async all(){
    //     return this.projectsService.allProjects();
    // }

    // @Post('/one')
    // async one(@Body() id: string){
    //     return this.projectsService.oneProject(id);
    // }

    // @Put('/update')
    // @Roles('admin')
    // async update(@Body() data: CreateProjectDto){
    //     return this.projectsService.updateProject(data);
    // }

    // @Post('/delete')
    // @Roles('admin')
    // async delete(@Body() params){
    //     return this.projectsService.deleteProject(params);
    // }

}