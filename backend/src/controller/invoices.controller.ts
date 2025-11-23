import { FastifyReply, FastifyRequest } from 'fastify';
import { db, companies, shipments, invoices, invoiceHistory } from '../db/db';
import { eq } from 'drizzle-orm';

export const uploadInvoices = async (req: FastifyRequest, reply: FastifyReply) => {
    const data: any[] = req.body as any[];

    for (const item of data) {
        const company = item.shipment.company;

        await db
            .insert(companies)
            .values({
                id: company.id,
                name: company.name,
            })
            .onConflictDoNothing();

        const shipment = item.shipment;

        await db
            .insert(shipments)
            .values({
                id: shipment.id,
                companyId: company.id,
                createdAt: new Date(shipment.createdAt),
                trackingNumber: shipment.trackingNumber,
                provider: shipment.provider,
                mode: shipment.mode,
                originCountry: shipment.originCountry,
                destinationCountry: shipment.destinationCountry,
            })
            .onConflictDoNothing();

        const invoice = item;

        const existingInvoice = await db.select()
            .from(invoices)
            .where(eq(invoices.id, invoice.id))
            .execute();

        if (existingInvoice.length > 0) {
            await db
                .update(invoices)
                .set({
                    invoicedWeight: invoice.invoicedWeight,
                    invoicedPrice: invoice.invoicedPrice,
                })
                .where(eq(invoices.id, invoice.id));
        } else {
            await db.insert(invoices).values({
                id: invoice.id,
                shipmentId: shipment.id,
                invoicedWeight: invoice.invoicedWeight,
                invoicedPrice: invoice.invoicedPrice,
            });
        }

        await db.insert(invoiceHistory).values({
            id: crypto.randomUUID(),
            invoiceId: invoice.id,
            price: invoice.invoicedPrice,
            weight: invoice.invoicedWeight,
            createdAt: new Date(),
        });
    }

    return reply.send({ success: true, count: data.length });
};

export const getShipments = async (req: FastifyRequest, reply: FastifyReply) => {
    const companyId = (req.query as any).companyId;

    const baseQuery = db
        .select({
            invoiceId: invoices.id,
            shipmentId: shipments.id,
            trackingNumber: shipments.trackingNumber,
            provider: shipments.provider,
            mode: shipments.mode,
            originCountry: shipments.originCountry,
            destinationCountry: shipments.destinationCountry,
            createdAt: shipments.createdAt,
            companyId: companies.id,
            companyName: companies.name,
            invoicedPrice: invoices.invoicedPrice,
            invoicedWeight: invoices.invoicedWeight,
        })
        .from(shipments)
        .leftJoin(companies, eq(companies.id, shipments.companyId))
        .leftJoin(invoices, eq(invoices.shipmentId, shipments.id));

    const rows = companyId
        ? await baseQuery.where(eq(shipments.companyId, companyId))
            .execute()
        : await baseQuery.execute();

    const formatted = rows.map((row) => ({
        id: row.invoiceId,
        shipment: {
            id: row.shipmentId,
            createdAt: row.createdAt.toISOString(),
            trackingNumber: row.trackingNumber,
            provider: row.provider,
            mode: row.mode,
            originCountry: row.originCountry,
            destinationCountry: row.destinationCountry,
            company: {
                id: row.companyId,
                name: row.companyName,
            },
        },
        invoicedPrice: Number(row.invoicedPrice),
        invoicedWeight: Number(row.invoicedWeight),
    }));

    return reply.send(formatted);
};
