import { getConnection } from '../config/database';
import { methods as storage } from '../storage/storage';

const getAlbums = async (req, res) => {
  try {
    const connection = await getConnection();
    const result = await connection.query('SELECT * FROM albums');
    res.json(result);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

const getAlbum = async (req, res) => {
  try {
    const { albumId } = req.params;
    const connection = await getConnection();
    const result = await connection.query(
      'SELECT * FROM albums WHERE id = ?',
      albumId
    );
    res.json(result);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

const addAlbum = async (req, res) => {
  try {
    const { name } = req.body;
    const { cover } = req.body;
    if (name === undefined || cover === undefined) {
      res.status(400), json({ message: 'Bad Request. Please fill all field.' });
    }
    const connection = await getConnection();
    await connection.query('INSERT INTO albums (name, cover) VALUES (?, ?)', [
      name,
      cover,
    ]);
    res.json({ message: 'Album added' });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

const updateAlbum = async (req, res) => {
  try {
    const { albumId } = req.params;
    const { name } = req.body;
    const { cover } = req.body;

    if (albumId === undefined || name === undefined || cover === undefined) {
      res.status(400).json({ message: 'Bad Request. Please fill all field.' });
    }

    const connection = await getConnection();
    await connection.query(
      'UPDATE albums SET name = ?, cover = ? WHERE id = ?',
      [name, cover, albumId]
    );
    res.json({ message: 'Album updated' });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

const deleteAlbum = async (req, res) => {
  try {
    const { albumId } = req.params;
    const connection = await getConnection();
    const [photoFile] = await connection.query(
      'SELECT * FROM photos WHERE album_id = ?',
      albumId
    );
    storage.deleteFile(photoFile);
    await connection.query('DELETE FROM albums WHERE id = ?', albumId);
    res.json({ message: 'Album deleted' });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const methods = {
  getAlbums,
  getAlbum,
  addAlbum,
  updateAlbum,
  deleteAlbum,
};
