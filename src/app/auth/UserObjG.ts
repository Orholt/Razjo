export interface IUserObj {
    token: string;
    userInfo: UserInfo;
    privateNotes: PrivateNote[];
    families: Family[];
}

export interface Family {
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
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
}

export interface Visit {
    familyId: string;
    date: DateClass;
    message: string;
}

export interface PrivateNote {
    message: string;
    creationDate: Date;
}

export interface UserInfo {
    id: string;
    email: string;
    firstName: string;
    surname: string;
    role: string;
}
