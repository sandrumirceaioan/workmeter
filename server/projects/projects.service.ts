import { Component, HttpException, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ProjectsSchema } from "./schema/projects.schema";
import { CreateProjectDto } from "./dto/create-project.dto";
import { Project } from "./interfaces/projects.interface";
const ObjectId = require('mongoose').Types.ObjectId;

@Component()
export class ProjectsService {
    constructor(@InjectModel(ProjectsSchema) private readonly projectModel: Model<Project>){}

    async addProject(createProjectDto: CreateProjectDto): Promise<Project>{
        let filter = {projectName: createProjectDto.projectName};
        let checkProject = await this.projectModel.findOne(filter);
        if (checkProject) throw new HttpException('Project already exists!', HttpStatus.BAD_REQUEST);
        let newProject = new this.projectModel(createProjectDto);
        try {
            let project = await newProject.save();
            return project;
        } catch(e){
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async allProjects(): Promise<Project[]>{
        let projects = await this.projectModel.find().sort({projectCreated: -1});
        return projects;
    }

    async oneProject(params): Promise<Project>{
        let query = {_id: new ObjectId(params.id)};
        return;
    } 


}


// //----------------------------------------------------------------------------------------------------
// // add project
// //----------------------------------------------------------------------------------------------------
// router.post('/add', function (req, res) {
//     let params = _.merge(req.body, req.query);
  
//     let filter = {
//       projectName: {$regex: new RegExp("^" + params.projectName + "$", "i")}
//     };
  
//     projects.findOne(filter).then(function(user){
//       if (user) throw {message:'Project already exist!'};
//       return;
//     }).then(function(token){
//       let project = new projects(params);
//       return project.save();
//     }).then(function(added){
//       res.status(200).json(added);
//     }).catch(function(error){
//       res.status(500).json(error);
//     });
//   });
  
//   //----------------------------------------------------------------------------------------------------
//   // get all projects 
//   //----------------------------------------------------------------------------------------------------
//   router.post('/getAll', function (req, res) {
//     let params = _.merge(req.body, req.query);
//     projects.find({}).sort({projectCreated: -1}).then(function(projects){
//       return projects;   
//     }).then(function(dbprojects){
//       res.status(200).json(dbprojects);
//     }).catch(function(error){
//       console.log(error);
//       res.status(401).json(error);
//     });
//   });
  
//   //----------------------------------------------------------------------------------------------------
//   // get one project 
//   //----------------------------------------------------------------------------------------------------
//   router.post('/getOne', function (req, res) {
//     let params = _.merge(req.body, req.query);
//     let query = { _id: new ObjectId(params.id) };
//     projects.findOne(query).then(function(project){
//       if (project === null) throw {message:'Project not found!'};
//       return project;   
//     }).then(function(dbproject){
//       res.status(200).json(dbproject);
//     }).catch(function(error){
//       console.log(error);
//       res.status(500).json(error);
//     });
//   });