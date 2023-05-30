import multer from 'multer';
import path from 'path';
import fs from 'fs';
import webp from 'webp-converter';

const convertImageToWebP = async (req, res, next) => {
  const originalImagePath = req.file.path;
  const webPImagePath = originalImagePath.replace(/\.(jpe?g|png)$/i, '.webp');

  webp.grant_permission();

  const result = await webp.cwebp(originalImagePath, webPImagePath, {
    quality: 80,
  });

  if (result.error) {
    return res.status(500).json({ error: 'Error converting image to WebP' });
  }

  fs.unlink(originalImagePath, (error) => {
    if (error)
      console.error(`Error deleting original file: ${originalImagePath}`);
  });

  req.file.path = webPImagePath;
  next();
};

const diskStorage = multer.diskStorage({
  destination: path.join(__dirname, '../../public/photos'),
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-ioml' + path.extname(file.originalname));
  },
});

const fileUpload = multer({ storage: diskStorage }).single('photo');

const deleteFile = (photoFile) => {
  if (photoFile.length > 0) {
    for (let i = 0; i < photoFile.length; i++) {
      const filePath = path.join(__dirname, '../../', photoFile[i].filename);
      fs.unlink(filePath, (error) => {
        if (error) console.error(error);
        else console.log(`File eliminated: ${filePath}`);
      });
    }
  }
};

export const methods = {
  convertImageToWebP,
  fileUpload,
  deleteFile,
};
