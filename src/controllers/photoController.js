import { getConnection } from '../config/database';
import path from 'path';
import fs from 'fs';

const getPhotos = async (req, res) => {
  try {
    const { albumId } = req.params;
    const connection = await getConnection();
    const result = await connection.query(
      'SELECT * FROM photos WHERE album_id = ?',
      albumId
    );
    res.json(result);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

const getPhoto = async (req, res) => {
  try {
    const { albumId, photoId } = req.params;
    const photo = { albumId, photoId };
    const connection = await getConnection();
    const result = await connection.query(
      'SELECT * FROM photos WHERE album_id = ? AND id = ?',
      photo
    );
    res.json(result);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

const addPhoto = async (req, res) => {
  try {
    const { albumId } = req.params;
    const { name } = req.body;

    const filename = req.file.originalname;
    const data = fs.readFileSync(
      path.join(__dirname, '../images/' + req.file.filename)
    );

    if (albumId === undefined || link === undefined || name === undefined) {
      res.status(400).json({ message: 'Bad Request: Please fill all fields.' });
    }

    const photo = { albumId, name, filename, data };
    const connection = await getConnection();
    await connection.query(
      'INSERT INTO photos (album_id, name, filename, data) VALUES (?, ?, ?, ?)',
      photo
    );
    res.json({ message: 'Photo added' });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

const updatePhoto = async (req, res) => {
  try {
    const { photoId } = req.params;
    const { link, name } = req.body;

    if (photoId === undefined || link === undefined || name === undefined) {
      res.status(400).json({ message: 'Bad Request: Please fill all fields.' });
    }

    const photo = { link, name, photoId };
    const connection = await getConnection();
    await connection.query(
      'UPDATE photos SET link = ?, name = ? WHERE id = ?',
      photo
    );
    res.json(result);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

const deletePhoto = async (req, res) => {
  try {
    const { photoId } = req.params;
    const connection = await getConnection();
    const result = await connection.query(
      'DELETE FROM photos WHERE id = ?',
      photoId
    );
    res.json(result);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const methods = {
  getPhotos,
  getPhoto,
  addPhoto,
  updatePhoto,
  deletePhoto,
};
