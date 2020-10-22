export interface IAddVisit {
    familyId: string;
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
