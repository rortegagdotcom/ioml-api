export class Photo {
    id: number;
    name?: string;
    link: string;

    constructor(id: number, link: string, name?: string) {
        this.id = id;
        this.link = link;
        this.name = name;
    }
}