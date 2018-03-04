import { IsString, IsInt, IsArray, MinLength, IsEmail } from 'class-validator';

export class CreateProjectDto  {
  @IsString() readonly projectName: string;
  @IsString() readonly projectDescription: string;
  @IsString() readonly projectCategory: string;
  @IsString() readonly projectTags: string;
  @IsString() readonly projectOwner: string;
  @IsString() readonly projectCreated: string;
  }