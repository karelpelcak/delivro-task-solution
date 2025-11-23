import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { companies, invoiceHistory, invoices, shipments } from './schema';
export const db = drizzle({ 
  connection: { 
    connectionString: process.env.DATABASE_URL!,
    ssl: false
  }
});

export { companies, shipments, invoices, invoiceHistory };