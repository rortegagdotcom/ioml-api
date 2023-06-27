import { getConnection } from '../config/database';
import { methods as storage } from '../storage/storage';

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
    const connection = await getConnection();
    const result = await connection.query(
      'SELECT * FROM photos WHERE album_id = ? AND id = ?',
      [albumId, photoId]
    );
    res.json(result);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

const addPhoto = async (req, res) => {
  try {
    const { albumId } = req.body;

    if (albumId === undefined || !req.files || req.files.length === 0) {
      res.status(400).json({ message: 'Bad Request: Please fill all fields.' });
    }

    const connection = await getConnection();

    for (const file of req.files) {
      const originalFilename = file.filename;
      const webpFilename = originalFilename.replace(/\.(jpe?g|png)$/i, '.webp');
      const filename = `/public/photos/${webpFilename}`;

      await connection.query(
        'INSERT INTO photos (album_id, filename) VALUES (?, ?)',
        [albumId, filename]
      );
    }

    res.json({ message: 'Photos added' });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

const updatePhoto = async (req, res) => {
  try {
    const { photoId } = req.params;

    if (photoId === undefined || !req.files || req.files.length === 0) {
      res.status(400).json({ message: 'Bad Request: Please fill all fields.' });
    }

    const connection = await getConnection();
    const [photoFile] = await connection.query(
      'SELECT * FROM photos WHERE id = ?',
      photoId
    );

    for (const file of req.files) {
      storage.deleteFile(photoFile);
      const originalFilename = file.filename;
      const webpFilename = originalFilename.replace(/\.(jpe?g|png)$/i, '.webp');
      const filename = `/public/photos/${webpFilename}`;

      await connection.query('UPDATE photos SET filename = ? WHERE id = ?', [
        filename,
        photoId,
      ]);
    }

    res.json({ message: 'Photo updated' });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

const deletePhoto = async (req, res) => {
  try {
    const { photoId } = req.params;
    const connection = await getConnection();
    const [photoFile] = await connection.query(
      'SELECT * FROM photos WHERE id = ?',
      photoId
    );
    storage.deleteFile(photoFile);
    await connection.query('DELETE FROM photos WHERE id = ?', photoId);

    res.json({ message: 'Photo deleted' });
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
