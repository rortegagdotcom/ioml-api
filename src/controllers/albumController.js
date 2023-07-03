import { getConnection, closeConnection } from '../config/database';
import { methods as storage } from '../storage/storage';

const getAlbums = async (req, res) => {
  const connection = await getConnection();

  try {
    const result = await connection.query('SELECT * FROM albums');

    res.json(result);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }

  closeConnection();
};

const getAlbum = async (req, res) => {
  const { albumId } = req.params;

  const connection = await getConnection();

  try {
    const result = await connection.query(
      'SELECT * FROM albums WHERE id = ?',
      albumId
    );

    res.json(result);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }

  closeConnection();
};

const addAlbum = async (req, res) => {
  const { name, cover } = req.body;

  const connection = await getConnection();

  try {
    if (name === undefined || cover === undefined) {
      res.status(400), json({ message: 'Bad Request. Please fill all field.' });
    }

    await connection.query('INSERT INTO albums (name, cover) VALUES (?, ?)', [
      name,
      cover,
    ]);

    res.json({ message: 'Album added' });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }

  closeConnection();
};

const updateAlbum = async (req, res) => {
  const { albumId } = req.params;
  const { name, cover } = req.body;

  const connection = await getConnection();

  try {
    if (albumId === undefined || name === undefined || cover === undefined) {
      res.status(400).json({ message: 'Bad Request. Please fill all field.' });
    }

    await connection.query(
      'UPDATE albums SET name = ?, cover = ? WHERE id = ?',
      [name, cover, albumId]
    );

    res.json({ message: 'Album updated' });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }

  closeConnection();
};

const deleteAlbum = async (req, res) => {
  const { albumId } = req.params;

  const connection = await getConnection();

  try {
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

  closeConnection();
};

export const methods = {
  getAlbums,
  getAlbum,
  addAlbum,
  updateAlbum,
  deleteAlbum,
};
