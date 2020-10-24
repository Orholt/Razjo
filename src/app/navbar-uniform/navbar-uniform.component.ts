import { NotesService } from './../addnote/notes.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar-uniform',
  templateUrl: './navbar-uniform.component.html',
  styleUrls: ['./navbar-uniform.component.scss']
})
export class NavbarUniformComponent implements OnInit {

  constructor(private noteService: NotesService) { }

  ngOnInit() {
  }

  logOut()
  {
    this.noteService.logOut();
  }

}
