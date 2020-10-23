export interface INote
{
    id: string;
    message: string;
    creationDate: {
        year: string,
        month: string,
        day: string,
        hour: string,
        minute: string
    };
}
