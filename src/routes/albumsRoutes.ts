import { Router } from "express";

import * as albumsCtrl from "../controllers/albumController";

const routerAlbums = Router();

routerAlbums.get("/albums", async (req, res) => {
  const albums = await albumsCtrl.getAlbums();
  res.send(albums);
});

routerAlbums.get("/albums/:albumId", async (req, res) => {
  const albumId = parseInt(req.params.albumId);
  const album = await albumsCtrl.getAlbum(albumId);
  res.send(album);
});

routerAlbums.post("/albums", async (req, res) => {
  const name = req.body.name;
  const id = await albumsCtrl.insertAlbum(name.toString());
  res.send({ id });
});

routerAlbums.put("/albums/:albumId", async (req, res) => {
  const name = req.body.name;
  const albumId = parseInt(req.params.albumId);
  const affectedRows = await albumsCtrl.updateAlbum(name.toString(), albumId);
  res.send({ affectedRows });
});

routerAlbums.delete("/albums/:albumId", async (req, res) => {
  const albumId = parseInt(req.params.albumId);
  const affectedRows = await albumsCtrl.deleteAlbum(albumId);
  res.send({ affectedRows });
});

export default routerAlbums;