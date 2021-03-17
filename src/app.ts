import express from 'express';
import { UserRouter } from './user/UserRouter';
const app = express();

app.use(express.json());

const userRouter = new UserRouter();

app.all('/users*', userRouter.router);

export default app;
