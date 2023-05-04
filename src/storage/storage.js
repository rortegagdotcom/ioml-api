import multer from 'multer';
import path from 'path';

const diskStorage = multer.diskStorage({
  destination: path.join(__dirname, '../../public/photos'),
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-ioml' + path.extname(file.originalname));
  },
});

const fileUpload = multer({ storage: diskStorage }).single('photo');

export const methods = {
  fileUpload,
};
