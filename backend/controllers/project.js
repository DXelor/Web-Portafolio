'use strict'

const project = require('../models/project');
var Project = require('../models/project');
var fs = require('fs');

var controller = {
    home: function(req, res){
        return res.status(200).send({
            message: 'Soy la home'
        });
    },
    test: function(req, res){
        return res.status(200).send({
            message:'test del controlador de project'
        });
    },

    saveProject: function(req, res){
        var project = new Project();
        var params = req.body;

        project.name = params.name;
        project.description = params.description;
        project.category = params.category;
        project.year = params.year;
        project.langs = params.langs;
        project.image = null;

        project.save((err, projectStored) =>{
            if(err) return res.status(500).send({message: 'error al guardar'});
            if(!projectStored) return res.status(404).send({message: 'no se ah guardado el proyecto'});
            return res.status(200).send({project: projectStored});
        });
    },

    getProject: function(req, res){
        var projectId = req.params.id;

        if(projectId == null) return res.status(404).send({message: 'el proyecto no existe'});

        Project.findById(projectId, (err, project)=>{
            if(err) return res.status(500).send({message: 'error al devolver los datos'});
            if(!project) return res.status(404).send({message: 'el proyecto no existe'});
            return res.status(200).send({project});
        });
    },
    getProjects: function(req, res){
        Project.find({}).sort('-year').exec((err, projects)=>{
            if(err) return res.status(500).send({message: 'error al devolver los datos'});
            if(!projects) return res.status(404).send({message: 'no hay proyectos para mostrar'});
            return res.status(200).send({projects});
        })
    },
    updateProject: function(req, res){
        var projectId = req.params.id;
        var update = req.body;

        Project.findByIdAndUpdate(projectId, update,{new:true}, (err, projectUpdate)=>{
            if(err) return res.status(500).send({message: 'error al actualizar los datos'});
            if(!projectUpdate) return res.status(404).send({message: 'no existe el proyecto'});
            return res.status(200).send({project: projectUpdate});
        })
    },
    deleteProject: function(req, res){
        var projectId = req.params.id;

        Project.findByIdAndRemove(projectId,(err, projectRemove)=>{
            if(err) return res.status(500).send({message: 'error al borrar el proyecto'});
            if(!projectRemove) return res.status(404).send({message: 'no existe el proyecto'});
            return res.status(200).send({project: projectRemove});
        })
    },
    uploadImage: function(req, res){
        var projectId = req.params.id;
        var fileName = 'imagen no subida...';

        if(req.files) {
            var filePath= req.files.image.path;
            var fileSplit = filePath.split('\\');
            var fileName = fileSplit[1];
            var extSplit = fileName.split('\.');
            var fileExt = extSplit[1];

            if(fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif'){
                Project.findByIdAndUpdate(projectId, {image: fileName}, (err, projectUpdate)=>{
                    if(err) return res.status(500).send({message: 'la imagen no se ah subido'});
                    if(!projectUpdate) return res.status(404).send({message: 'la imagen no existe'});
                    return res.status(200).send({project: projectUpdate});
                });
            }else{
                fs.unlink(filePath, (err)=>{return res.status(200).send({message:'la extencion no es válida'})});
            }
        }else{
            return res.status(200).send({message: fileName})
        };
    },
};

module.exports = controller;