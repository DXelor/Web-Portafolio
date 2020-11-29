'use strict'

const { Router } = require('express');
var express = require('express');
var ProjectController = require('../controllers/project');

var router = express.Router();


//MIDDLEWARE
var multipart = require('connect-multiparty');
const { getImageFile } = require('../controllers/project');
var multipartMiddleware = multipart({ uploadDir: './uploads' })

router.get('/home', ProjectController.home);
router.post('/test', ProjectController.test);
router.post('/save-project', ProjectController.saveProject);
router.get('/project/:id?', ProjectController.getProject);
router.get('/projects', ProjectController.getProjects);
router.put('/project/:id', ProjectController.updateProject);
router.delete('/project/:id', ProjectController.deleteProject);
router.post('/upload-image/:id', multipartMiddleware, ProjectController.uploadImage);
router.get('/get-image/:image', ProjectController.getImageFile);
router.get("/detalle-proyecto/:id", ProjectController.detailProject);

module.exports = router;