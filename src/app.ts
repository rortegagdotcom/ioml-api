import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import config from './config/config'

const app = express();
app.set('port', config.PORT);

app.use(morgan('dev'));
app.use(cors());
app.use(express.json);
app.use(express.urlencoded({ extended: false}));

export default app;