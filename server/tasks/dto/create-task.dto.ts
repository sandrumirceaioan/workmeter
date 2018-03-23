import { IsString, IsInt, IsArray, MinLength, IsEmail, IsDate, IsBoolean, IsNumber } from 'class-validator';

export class CreateTaskDto  {
  @IsString() readonly taskName: string;
  @IsString() readonly taskDescription: string;
  @IsString() readonly taskList: string;
  @IsString() readonly taskProject: string;
  @IsDate() taskDeadline: Date;
  @IsBoolean() readonly taskStarted: boolean;
  @IsString() readonly taskStatus: string;
  @IsNumber() readonly taskDifficulty: number;
  @IsBoolean() readonly taskScored: boolean;
  @IsBoolean() readonly taskDraft: boolean;
  @IsString() readonly taskAttachments?: string[];
  @IsString() readonly taskAssignedBy: string;
  @IsString() readonly taskAssignedTo: string;
  @IsDate() readonly created?: Date;
  @IsString() readonly createdBy?: string;
}