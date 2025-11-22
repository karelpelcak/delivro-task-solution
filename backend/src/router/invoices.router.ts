import type { FastifyPluginAsync } from 'fastify';
import { getInvoices, createInvoice } from '../controller/invoices.controller';

const invoicesRouter: FastifyPluginAsync = async (fastify) => {
};

export default invoicesRouter;
