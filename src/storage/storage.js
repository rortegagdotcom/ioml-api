import multer from 'multer';
import path from 'path';
import fs from 'fs';
import webp from 'webp-converter';

const convertImagesToWebP = async (req, res, next) => {
  if (!req.files) {
    return res.status(400).json({ error: 'No files provided' });
  }

  webp.grant_permission();

  await Promise.all(
    req.files.map(async (file) => {
      const originalImagePath = file.path;
      const webpImagePath = originalImagePath.replace(
        /\.(jpe?g|png)$/i,
        '.webp'
      );

      const result = await webp.cwebp(originalImagePath, webpImagePath, {
        quality: 50,
      });

      if (result.error) {
        return res.status(500).json({ error: 'Error coverting iamge to WebP' });
      }

      fs.unlink(originalImagePath, (error) => {
        if (error)
          console.error(`Error deleting original file: ${originalImagePath}`);
      });

      file.path = webpImagePath;
    })
  );

  next();
};

const diskStorage = multer.diskStorage({
  destination: path.join(__dirname, '../../public/photos'),
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-ioml' + path.extname(file.originalname));
  },
});

const fileUpload = multer({ storage: diskStorage }).array('photo', 5);

const deleteFile = (photoFiles) => {
  if (photoFiles.length > 0) {
    for (let i = 0; i < photoFiles.length; i++) {
      const filePath = path.join(__dirname, '../../', photoFiles[i].filename);
      fs.unlink(filePath, (error) => {
        if (error) console.error(error);
        else console.log(`File eliminated: ${filePath}`);
      });
    }
  }
};

export const methods = {
  convertImagesToWebP,
  fileUpload,
  deleteFile,
};
