import { pgTable, varchar, numeric, timestamp, text } from "drizzle-orm/pg-core";

export const companies = pgTable("companies", {
  id: varchar("id", { length: 50 }).primaryKey(),
  name: text("name").notNull(),
});

export const shipments = pgTable("shipments", {
  id: varchar("id", { length: 50 }).primaryKey(),
  companyId: varchar("company_id", { length: 50 }).notNull().references(() => companies.id),
  createdAt: timestamp("created_at").notNull(),
  trackingNumber: varchar("tracking_number", { length: 50 }).notNull(),
  provider: varchar("provider", { length: 20 }).notNull(),
  mode: varchar("mode", { length: 10 }).notNull(),
  originCountry: varchar("origin_country", { length: 2 }).notNull(),
  destinationCountry: varchar("destination_country", { length: 2 }).notNull(),
});

export const invoices = pgTable("invoices", {
  id: varchar("id", { length: 50 }).primaryKey(),
  shipmentId: varchar("shipment_id", { length: 50 }).notNull().references(() => shipments.id),
  invoicedWeight: numeric("invoiced_weight").notNull(),
  invoicedPrice: numeric("invoiced_price").notNull(),
});

export const invoiceHistory = pgTable("invoice_history", {
  id: varchar("id", { length: 50 }).primaryKey(),
  invoiceId: varchar("invoice_id", { length: 50 }).notNull().references(() => invoices.id),
  price: numeric("price").notNull(),
  weight: numeric("weight").notNull(),
  createdAt: timestamp("created_at").notNull(),
});
