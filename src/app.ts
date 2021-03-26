import * as dotenv from 'dotenv';
import express from 'express';
const app = express();
import cors from 'cors';
import helmet from 'helmet';

import { v1Router } from './api/v1/v1.router';
import { errorHandler } from './api/v1/middleware/error.middleware';
import { notFoundHandler } from './api/v1/middleware/not-found.middleware';

dotenv.config();

// middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use(errorHandler);
app.use(notFoundHandler);

// routers
app.use('/api/v1', v1Router);

export default app;
