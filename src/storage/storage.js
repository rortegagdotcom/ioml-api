import multer from 'multer';
import path from 'path';
import fs from 'fs';

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
  fileUpload,
  deleteFile,
};
