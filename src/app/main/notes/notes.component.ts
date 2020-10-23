import { INote } from './../../addnote/Note';
import { NotesService } from './../../addnote/notes.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  $res: INote[];
  overlay: boolean;
  areThereAnyNotes: boolean;
  constructor(private notesService: NotesService) { }

  ngOnInit(): void {
    this.getNotes();
  }

  getNotes()
  {
    this.overlay = true;
    this.notesService.getNotes().subscribe({
      next: data => {
        this.$res = data;
        this.overlay = false;
        if (this.$res.length > 0)
        {
          this.areThereAnyNotes = true;
        }
        else
        {
          this.areThereAnyNotes = false;
        }
        this.notesService.areThereAnyNotes = this.areThereAnyNotes;
      },
      error: err => {
        Swal.fire({
          title: 'Wystąpił błąd!',
          text: 'Wystąpił błąd podczas edycji notatki!',
          footer: err.error.errors,
          icon: 'error'
        });
      }
    });
  }

}
