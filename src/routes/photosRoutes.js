import { Router } from 'express';
import { methods as photosCtrl } from '../controllers/photoController';
import { methods as storage } from '../storage/storage';

const routerPhotos = Router();

routerPhotos.get('/albums/:albumId/photos', photosCtrl.getPhotos);
routerPhotos.get('/albums/:albumId/photo/:photoId', photosCtrl.getPhoto);
routerPhotos.post('/photos', storage.fileUpload, photosCtrl.addPhoto);
routerPhotos.put('/photos/:photoId', storage.fileUpload, photosCtrl.updatePhoto);
routerPhotos.delete('/photos/:photoId', photosCtrl.deletePhoto);

export default routerPhotos;
