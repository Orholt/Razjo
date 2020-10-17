export interface IUserObj {
    families:
    {
        familyId: string,
        familyName: string,
        psyId: string,
        psychologistNames: string,
        usrId: string,
        userNames: string,
        invitiationCode: string,
        calendarNotes: {
            userId: string,
            userRole: string,
            day: number,
            month: number,
            year: number,
            message: string
        }
    };
    privateNotes:
    {
        messages: string,
        creationDate: Date
    };
    token: string;
    userInfo: {
        id: string,
        email: string,
        firstName: string,
        surname: string,
        role: string
    };
}
