import { getConnection, closeConnection } from '../config/database';
import { methods as storage } from '../storage/storage';

const getPhotos = async (req, res) => {
  const { albumId } = req.params;

  const connection = await getConnection();

  try {
    const result = await connection.query(
      'SELECT * FROM photos WHERE album_id = ?',
      albumId
    );

    res.json(result);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }

  closeConnection();
};

const getPhoto = async (req, res) => {
  const { albumId, photoId } = req.params;

  const connection = await getConnection();

  try {
    const result = await connection.query(
      'SELECT * FROM photos WHERE album_id = ? AND id = ?',
      [albumId, photoId]
    );

    res.json(result);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }

  closeConnection();
};

const addPhoto = async (req, res) => {
  const { albumId } = req.body;

  const connection = await getConnection();

  try {
    if (albumId === undefined || !req.files || req.files.length === 0) {
      res.status(400).json({ message: 'Bad Request: Please fill all fields.' });
    }

    for (const file of req.files) {
      const originalFilename = file.filename;
      const webPFilename = originalFilename.replace(/\.(jpe?g|png)$/i, '.webp');
      const filename = `/public/photos/${webPFilename}`;

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

  closeConnection();
};

const updatePhoto = async (req, res) => {
  const { photoId } = req.params;

  const connection = await getConnection();

  try {
    if (photoId === undefined || !req.files || req.files.length === 0) {
      res.status(400).json({ message: 'Bad Request: Please fill all fields.' });
    }

    const [photoFile] = await connection.query(
      'SELECT * FROM photos WHERE id = ?',
      photoId
    );

    for (const file of req.files) {
      storage.deleteFile(photoFile);

      const originalFilename = file.filename;
      const webPFilename = originalFilename.replace(/\.(jpe?g|png)$/i, '.webp');
      const filename = `/public/photos/${webPFilename}`;

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

  closeConnection();
};

const deletePhoto = async (req, res) => {
  const { photoId } = req.params;

  const connection = await getConnection();

  try {
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

  closeConnection();
};

export const methods = {
  getPhotos,
  getPhoto,
  addPhoto,
  updatePhoto,
  deletePhoto,
};
