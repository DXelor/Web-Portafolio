import { Component, OnInit, ViewChild } from '@angular/core';
declare var $:any;

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  public widthSlider: number;
  public anchuraToSlider: any;
  public captions: boolean;
  public autor: any;

  @ViewChild('textos') textos;

  constructor() {
  	this.captions = true;
   }

  ngOnInit() {
    $(document).ready(function(){
      $('.slider').bxSlider();
    });
  }

}
