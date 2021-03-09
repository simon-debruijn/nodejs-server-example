import express from 'express';
import { handleUsersRequests } from './api/users/handleUsersRequests';
const app = express();

app.use(express.json());

app.all('/users', handleUsersRequests);
app.all('/users/:id', handleUsersRequests);

export default app;
