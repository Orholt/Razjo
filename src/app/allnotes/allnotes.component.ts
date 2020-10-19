import { Component, OnInit } from '@angular/core';
import { INote } from '../addnote/Note';
import { NotesService } from '../addnote/notes.service';

@Component({
  selector: 'app-allnotes',
  templateUrl: './allnotes.component.html',
  styleUrls: ['./allnotes.component.css']
})
export class AllnotesComponent implements OnInit {

  constructor(private notes: NotesService) { }

  $response: INote[];
  overlay;

  ngOnInit(): void {
    this.overlay = false;
  }

}
