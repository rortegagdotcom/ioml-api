import { Photo } from "./Photo";

export class Album {
  id: number;
  name: string;
  photos: Photo[];

  constructor(id: number, name: string, photos: Photo[]) {
    this.id = id;
    this.name = name;
    this.photos = photos;
  }
}
