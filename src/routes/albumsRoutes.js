import { Router } from "express";

import { methods as albumsCtrl } from "../controllers/albumController";

const routerAlbums = Router();

routerAlbums.get("/albums", albumsCtrl.getAlbums);

routerAlbums.get("/albums/:albumId", albumsCtrl.getAlbum);

routerAlbums.post("/albums", albumsCtrl.addAlbum);

routerAlbums.put("/albums/:albumId", albumsCtrl.updateAlbum);

routerAlbums.delete("/albums/:albumId", albumsCtrl.deleteAlbum);

export default routerAlbums;
