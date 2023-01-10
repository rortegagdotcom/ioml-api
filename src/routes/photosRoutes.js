import { Router } from "express";

import { methods as photosCtrl } from "../controllers/photoController";

const routerPhotos = Router();

routerPhotos.get("/photos/:albumId", photosCtrl.getPhotos);

routerPhotos.get("/photos/:albumId/photo/:photoId", photosCtrl.getPhoto);

routerPhotos.post("/photos", photosCtrl.addPhoto);

routerPhotos.put("/photos/:photoId", photosCtrl.updatePhoto);

routerPhotos.delete("/photos/:photoId", photosCtrl.deletePhoto);

export default routerPhotos;