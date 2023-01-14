import { Router } from "express";
import { methods as photosCtrl } from "../controllers/photoController";

const routerPhotos = Router();

routerPhotos.get("/albums/:albumId/photos", photosCtrl.getPhotos);
routerPhotos.get("/albums/:albumId/photo/:photoId", photosCtrl.getPhoto);
routerPhotos.post("/photos", photosCtrl.addPhoto);
routerPhotos.put("/photos/:photoId", photosCtrl.updatePhoto);
routerPhotos.delete("/photos/:photoId", photosCtrl.deletePhoto);

export default routerPhotos;