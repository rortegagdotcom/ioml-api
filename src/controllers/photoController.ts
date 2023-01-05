import { connection } from '../config/database'

export async function getPhotos(albumId: number) {
    const [rows] = await connection.execute(
        'SELECT * FROM photos WHERE album_id = ?',
        [albumId]
    );
    const photos = JSON.stringify(rows);
    console.log(photos);
    
    return photos;
}

 export async function getPhoto(albumId: number, photoId: number) {
    const [rows] = await connection.execute(
        'SELECT * FROM photos WHERE album_id = ? AND id = ?',
        [albumId, photoId]
    );
    return rows[0];
}

export async function insertPhoto(albumId: number, link: string, name?: string) {
    const [result] = await connection.execute(
        'INSERT INTO photos (album_id, link, name) VALUES (?, ?, ?)',
        [albumId, link, name]
    );
    return result;
}

export async function updatePhoto(photoId: number, link: string, name?: string) {
    const [result] = await connection.execute(
        'UPDATE photos SET link = ?, name = ? WHERE id = ?',
        [link, name, photoId]
    );
    return result;
}

async function deletePhoto(photoId: number) {
    const [result] = await connection.execute(
        'DELETE FROM photos WHERE id = ?',
        [photoId]
    );
    return result;
}

connection.end();