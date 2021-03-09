import express from 'express';
import { handleUsersRequests } from './users/handleUsersRequests';
const app = express();

app.use(express.json());

app.all('/users', handleUsersRequests);

export default app;
