import multer from 'multer';
import path from 'path';

const diskStorage = multer.diskStorage({
  destination: path.join(__dirname, '../../storage/images'),
  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() +
        '-ioml-' +
        file.originalname +
        path.extname(file.originalname)
    );
  },
});

const fileUpload = multer({
  storage: diskStorage,
}).single('filename');

export const methods = {
  fileUpload,
};
