import type { FastifyRequest, FastifyReply } from 'fastify';

export async function getInvoices(req: FastifyRequest, rep: FastifyReply) {
    return [
        { id: 1, total: 100 },
        { id: 2, total: 200 },
    ];
}

export async function createInvoice(req: FastifyRequest, rep: FastifyReply) {
    const body = req.body;
    return { message: 'Invoice created', body };
}
