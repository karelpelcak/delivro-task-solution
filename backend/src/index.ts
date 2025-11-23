import fastify from 'fastify';
import { invoicesRouter } from './router/invoices.router';

const PORT = 8080;
const app = fastify();

app.register(require('@fastify/formbody'));
app.register(require('@fastify/cors'));

app.register(invoicesRouter, { prefix: '/api' });

app.listen({ port: PORT }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`);
});
