import fastify from 'fastify'
import invoicesRouter from './router/invoices.router';

const PORT = 8080;
const app = fastify();

//register invoices
app.register(invoicesRouter)

app.listen({ port: PORT }, (err, address) => {
    if (err) {
        console.error(err)
        process.exit(1)
    }
    console.log(`Server listening at ${address}`)
})