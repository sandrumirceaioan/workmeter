import { Controller, Get, Post, Put, Delete, Body, Param, HttpCode, UseGuards, UseInterceptors } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { AuthGuard } from '../common/guards/auth.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Sign } from '../common/interceptors/sign.interceptor';

@Controller('tasks')
@UseGuards(AuthGuard)
export class TasksController {
    constructor(private readonly tasksService: TasksService){}

    @Post('/add')
    @Roles('admin', 'manager', 'user')
    @UseInterceptors(Sign)
    async add(@Body() CreateTaskDto: CreateTaskDto){
        return this.tasksService.addTask(CreateTaskDto);
    }
    
    @Post('/all')
    async all(@Body() params: any){
        return this.tasksService.allTasks(params);
    }

    // @Post('/one')
    // async one(@Body() id: string){
    //     return this.tasksService.oneList(id);
    // }

    // @Put('/update')
    // @Roles('admin','manager')
    // async update(@Body() data: CreateTaskDto){
    //     return this.tasksService.updateList(data);
    // }

    // @Post('/delete')
    // @Roles('admin')
    // async delete(@Body() params){
    //     return this.projectsService.deleteProject(params);
    // }

}
