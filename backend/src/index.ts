import fastify from 'fastify';
import cors from '@fastify/cors';
import rateLimit from '@fastify/rate-limit';
import { invoicesRouter } from './router/invoices.router';

const PORT = 8080;
const app = fastify();

app.register(cors, {
    origin: (origin, cb) => {
        if (!origin) return cb(null, true);

        const allowed = ['http://localhost:3000', 'http://127.0.0.1:3000'];
        if (allowed.includes(origin)) {
            cb(null, true);
        } else {
            cb(new Error('Not allowed by CORS'), false);
        }
    }
});

app.register(rateLimit, {
    max: 100,
    timeWindow: '1 minute'
});

app.register(require('@fastify/formbody'));

app.register(invoicesRouter, { prefix: '/api' });

app.listen({ port: PORT }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`);
});
