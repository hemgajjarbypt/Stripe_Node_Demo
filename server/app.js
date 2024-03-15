import dotenv from 'dotenv';
import express from 'express';
import stripe from 'stripe';
import route from './routers/index.js';

dotenv.config();

const app = express();

app.use(express.json());

app.route('/v1', route);