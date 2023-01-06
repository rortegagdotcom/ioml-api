import { Router } from "express";

import * as photosCtrl from "../controllers/photoController";

const router = Router();

router.get("/photos/:albumId", async (req, res) => {
  const albumId = parseInt(req.params.albumId);
  const photos = await photosCtrl.getPhotos(albumId);
  res.send(photos);
});

router.get("/photos/:albumId/photo/:photoId", async (req, res) => {
  const albumId = parseInt(req.params.albumId);
  const photoId = parseInt(req.params.photoId);
  const photo = await photosCtrl.getPhoto(albumId, photoId);
  res.send(photo);
});

router.post("/photos", async (req, res) => {
  const albumId = parseInt(req.body.albumId);
  const link = req.body.link;
  const name = req.body.name;
  const id = await photosCtrl.insertPhoto(
    albumId,
    link.toString(),
    name.toString()
  );
  res.send({ id });
});

router.put("/photos/:photoId", async (req, res) => {
  const photoId = parseInt(req.params.photoId);
  const link = req.body.link;
  const name = req.body.name;
  const affectedRows = await photosCtrl.updatePhoto(
    photoId,
    link.toString(),
    name.toString()
  );
  res.send({ affectedRows });
});

router.delete("/photos/:photoId", async (req, res) => {
  const photoId = parseInt(req.params.photoId);
  const affectedRows = await photosCtrl.deletePhoto(photoId);
  res.send({ affectedRows });
});
