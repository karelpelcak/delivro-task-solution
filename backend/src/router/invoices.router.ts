import { FastifyInstance } from "fastify";
import { uploadInvoices, getShipments } from "../controller/invoices.controller";

export const invoicesRouter = async (fastify: FastifyInstance) => {
  fastify.post("/upload", uploadInvoices);
  fastify.get("/shipments", getShipments);
};
