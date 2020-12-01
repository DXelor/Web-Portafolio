import { Component, OnInit } from '@angular/core';

import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { UploadService } from '../../services/upload.service';
import { Global } from '../../services/global';
import { Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: '../create/create.component',
  styleUrls: ['../create/create.component.css'],
  providers: [ProjectService, UploadService]
})
export class EditComponent implements OnInit {

  public title: string;
	public project: Project;
	public save_project;
	public status: string;
	public filesToUpload: Array<File>;

	constructor(
		private _projectService: ProjectService,
    private _uploadService: UploadService,
    private _router: Router,
    private _route: ActivatedRoute
	){
		this.title = "Editar proyecto";
	}

  ngOnInit(){
    this._route.params.subscribe(params=>{
      let id = params.id;

      this.getProject(id);
    })
  }

  getProject(id){
    this._projectService.getProject(id).subscribe(
      response =>{
        this.project = response.project[0
        ];
      },error=> console.log(<any>error)
    );
  }

}
