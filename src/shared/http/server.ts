import 'dotenv/config';
import 'reflect-metadata';
import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import applicationError from './middlewares/application.error';
import '@/shared/typeorm';

const server = express();
server.use(cors());
server.use(express.json());

server.use(applicationError);

server.listen(process.env.APP_PORT || 3333);
