import { NotesService } from './../addnote/notes.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-family',
  templateUrl: './family.component.html',
  styleUrls: ['./family.component.css']
})
export class FamilyComponent implements OnInit {

  overlay;

  constructor(private notesService: NotesService) { }

  ngOnInit(): void {
  }

  logOut()
  {
    this.notesService.logOut();
  }

}
