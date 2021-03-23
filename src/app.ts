import express from 'express';
import { UserRouter } from './user/UserRouter';
const app = express();

app.use(express.json());

const userRouter = new UserRouter().router;

app.all('/users*', userRouter);

export default app;
