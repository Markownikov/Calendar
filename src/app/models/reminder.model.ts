export class Reminder {
    id: number;
    title: string;
    description: string;
    date: Date;

    constructor(id: number, title: string, description: string, date: Date) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.date = date;
    }
}
