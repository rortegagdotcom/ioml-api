import { getConnection } from '../config/database';

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
    if (name === undefined) {
      res.status(400), json({ message: 'Bad Request. Please fill all field.' });
    }
    const album = name;
    const connection = await getConnection();
    await connection.query('INSERT INTO albums (name) VALUES (?)', album);
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

    if (albumId === undefined || name === undefined) {
      res.status(400).json({ message: 'Bad Request. Please fill all field.' });
    }

    const album = name;
    const connection = await getConnection();
    const result = await connection.query(
      'UPDATE albums SET name = ? WHERE id = ?',
      [album, albumId]
    );
    res.json(result);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

const deleteAlbum = async (req, res) => {
  try {
    const { albumId } = req.params;
    const connection = await getConnection();
    const result = await connection.query(
      'DELETE FROM albums WHERE id = ?',
      albumId
    );
    res.json(result);
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
