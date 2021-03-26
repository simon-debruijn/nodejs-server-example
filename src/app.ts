import * as dotenv from 'dotenv';
import express from 'express';
const app = express();
import cors from 'cors';
import helmet from 'helmet';

import { v1Router } from './api/v1/v1.router';
import { handleHttpException } from './api/v1/middleware/handle-http-exception.middleware';
import { handleNotFound } from './api/v1/middleware/handle-not-found.middleware';

dotenv.config();

// middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use(handleHttpException);
app.use(handleNotFound);

// routers
app.use('/api/v1', v1Router);

export default app;
