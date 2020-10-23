export interface NoteUpdate {
  id: string;
  message: string;
  creationDate: CreationDate;
}

export interface CreationDate {
  year: string;
  month: string;
  day: string;
  hour: string;
  minute: string;
}
