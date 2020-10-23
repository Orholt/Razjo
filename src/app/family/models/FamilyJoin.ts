export interface FamilyJoin
{
  familyId: string;
  familyName: string;
  psyId: string;
  psychologistNames: string;
  usrId: string;
  userNames: string;
  invitationCode: string;
  calendarNotes: CalendarNote[];
  visits: Visit[];
}

export interface CalendarNote {
  userId: string;
  userRole: string;
  date: DateClass;
  message: string;
}

export interface DateClass {
  year: string;
  month: string;
  day: string;
  hour: string;
  minute: string;
}

export interface Visit {
  familyId: string;
  date: DateClass;
  message: string;
}
