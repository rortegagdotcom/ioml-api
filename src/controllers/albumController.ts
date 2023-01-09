import { createConnection } from "../config/database";

const connection = createConnection();

export async function getAlbums() {
  const [rows] = await (await connection).execute("SELECT * FROM albums");
  const albums = JSON.stringify(rows);
  console.log(albums);

  return albums;
}

export async function getAlbum(albumId: number) {
  const [rows] = await (await connection).execute("SELECT * FROM albums WHERE id = ?", [
    albumId,
  ]);
  const album = JSON.stringify(rows);
  console.log(album);
  
  return album;
}

export async function insertAlbum(name: string) {
  const [result] = await (await connection).execute(
    "INSERT INTO albums (name) VALUES (?)",
    [name]
  );
  return result;
}

export async function updateAlbum(name: string, albumId: number) {
  const [result] = await (await connection).execute(
    "UPDATE albums SET name = ? WHERE id = ?",
    [name, albumId]
  );
  return result;
}

export async function deleteAlbum(albumId: number) {
  const [result] = await (await connection).execute("DELETE FROM albums WHERE id = ?", [
    albumId,
  ]);
  return result;
}

(await connection).end();
