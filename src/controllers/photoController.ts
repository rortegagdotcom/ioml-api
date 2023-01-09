import { createConnection } from '../config/database'

const connection = createConnection();

export async function getPhotos(albumId: number) {
    const [rows] = await (await connection).execute(
        'SELECT * FROM photos WHERE album_id = ?',
        [albumId]
    );
    const photos = JSON.stringify(rows);
    console.log(photos);
    
    return photos;
}

 export async function getPhoto(albumId: number, photoId: number) {
    const [rows] = await (await connection).execute(
        'SELECT * FROM photos WHERE album_id = ? AND id = ?',
        [albumId, photoId]
    );
    const photo = JSON.stringify(rows);
    console.log(photo);
    
    return photo;
}

export async function insertPhoto(albumId: number, link: string, name?: string) {
    const [result] = await (await connection).execute(
        'INSERT INTO photos (album_id, link, name) VALUES (?, ?, ?)',
        [albumId, link, name]
    );
    return result;
}

export async function updatePhoto(photoId: number, link: string, name?: string) {
    const [result] = await (await connection).execute(
        'UPDATE photos SET link = ?, name = ? WHERE id = ?',
        [link, name, photoId]
    );
    return result;
}

export async function deletePhoto(photoId: number) {
    const [result] = await (await connection).execute(
        'DELETE FROM photos WHERE id = ?',
        [photoId]
    );
    return result;
}

(await connection).end();