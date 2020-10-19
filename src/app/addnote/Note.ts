export interface INote
{
    message: string;
    creationDate: {
        year: number,
        month: number,
        day: number,
        hour: number,
        minute: number
    };
}
