// types/invoice.ts
import dayjs from "dayjs";

export type Client = {
  name: string;
  email: string;
  phone: string;
}

export type InvoiceElement= {
  id?: string;
  description: string;
  units: number;
  costperitem: number;
}

export type Invoice ={
  clientname: Client;
  invoicenumber: string;
  invoicestatus: "paid" | "unpaid" | "";
  invoicedate: dayjs.Dayjs;
  invoiceelements: InvoiceElement[];
  discount: string;
  tax: string;
  balancedue?: string;
  user?: any; // replace with a User type if available
}
