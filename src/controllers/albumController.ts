import { connection } from '../config/database'

export async function getAlbums() {
    const [rows] = await connection.execute(
        'SELECT * FROM albums',
    );
    const albums = JSON.stringify(rows);
    console.log(albums);
    
    return albums;
}

export async function getAlbum(albumId: number) {
    const [rows] = await connection.execute(
        'SELECT * FROM albums WHERE id = ?',
        [albumId]
    );
    return rows[0];
}

export async function insertAlbum(name: string) {
    const [result] = await connection.execute(
        'INSERT INTO albums (name) VALUES (?)',
        [name]
    );
    return result;
}

export async function updateAlbum(name: string, albumId: number) {
    const [result] = await connection.execute(
        'UPDATE albums SET name = ? WHERE id = ?',
        [name, albumId]
    );
    return result;
}

export async function deleteAlbum(albumId: number) {
    const [result] = await connection.execute(
        'DELETE FROM albums WHERE id = ?',
        [albumId]
    );
    return result;
}

connection.end();