import { createContext, useReducer } from "react";
import invoices from "../const/Data";
export const InvoicesContext = createContext({
  invoices: [],
  addInvoice: ({
    clientname,
    invoicenumber,
    invoicestatus,
    invoicedate,
    invoiceelements,
    discount,
    tax,
    payments,
    balancedue,
    paymentinfo,
    signature,
  }) => {},
  deleteInvoice: (id) => {},
  updateInvoice: (
    id,
    {
      clientname,
      invoicenumber,
      invoicestatus,
      invoicedate,
      invoiceelements,
      discount,
      tax,
      payments,
      balancedue,
      paymentinfo,
      signature,
    }
  ) => {},
});

function invoicesReducer(state, action) {
  switch (action.type) {
    case "ADD":
      const id = new Date().toString() + Math.random().toString();
      return [{ ...action.payload, id: id }, ...state];
    case "DELETE":
      return state.filter((invoice) => invoice.id !== action.payload);
    case "UPDATE":
      const updateDatableInvoiceIndex = state.findIndex(
        (invoice) => invoice.id === action.payload.id
      );
      const updatableInvoice = state[updateDatableInvoiceIndex];
      const updatedInvoice = { ...updatableInvoice, ...action.payload.data };
      const updatedInvoices = [...state];
      updatedInvoices[updateDatableInvoiceIndex] = updatedInvoice;
      return updatedInvoices;
    default:
      return state;
  }
}

function InvoicesContectProvider({ children }) {
  const [invoicesState, dispatch] = useReducer(invoicesReducer, invoices);
  function addInvoice(invoiceData) {
    dispatch({ type: "ADD", payload: invoiceData });
  }

  function deleteInvoice(id) {
    dispatch({ type: "DELETE", payload: id });
  }

  function updateInvoice(id, invoiceData) {
    dispatch({ type: "UPDATE", payload: { id: id, data: invoiceData } });
  }
const value = {
    invoices:invoicesState,
    addInvoice:addInvoice,
    deleteInvoice:deleteInvoice,
    updateInvoice:updateInvoice

}

  return <InvoicesContext.Provider value={value}>{children}</InvoicesContext.Provider>;
}

export default InvoicesContectProvider;
