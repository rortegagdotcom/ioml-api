import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import config from './config/config';
import albumsRoutes from './routes/albumsRoutes';
import photosRoutes from './routes/photosRoutes';

const app = express();
app.set('port', config.PORT);

app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());

app.use('/api', albumsRoutes);
app.use('/api', photosRoutes);
app.use('/public/photos', express.static('public/photos'));

export default app;
