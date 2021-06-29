import dotenv from 'dotenv';

dotenv.config();

import cors from 'cors';
import express from 'express';
import helmet from 'helmet';

import { handleHttpException } from './api/v1/middleware/handleHttpException';
import { handleNotFound } from './api/v1/middleware/handleNotFound';
import { v1Router } from './api/v1/v1Router';

const app = express();

// middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// routers
app.use('/api/v1', v1Router);

// middleware
app.use(handleHttpException);
app.use(handleNotFound);

export { app };
