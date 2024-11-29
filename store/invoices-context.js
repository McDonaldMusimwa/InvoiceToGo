import { createContext, useReducer } from "react";
import invoices, { clients } from "../const/Data";
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
  clients: [],
  addClient: ({ clientname, clientphone, clientemail, comments }) => {},
  updateClient: (id, { clientname, clientphone, clientemail, comments }) => {},
  deleteCleint: ({ id }) => {},
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
/* Clients reducer */
function clientsReducer(state, action) {
  switch (action.type) {
    case "ADD":
      const id = new Date().toString() + Math.random().toString();
      return [{ ...action.payload, id: id }, ...state];
    case "DELETE":
      return state.filter((client) => client.id !== action.payload);
    case "UPDATE":
      const updateDatableClientIndex = state.findIndex(
        (client) => client.id === action.payload.id
      );
      const updatableClient = state[updateDatableClientIndex];
      const updatedClient = { ...updatableClient, ...action.payload.data };
      const updatedClients = [...state];
      updatedClients[updateDatableClientIndex] = updatedClient;
      return updatedClients;
    default:
      return state;
  }
}
function InvoicesContectProvider({ children }) {
  const [invoicesState, dispatch] = useReducer(invoicesReducer, invoices);
  const [clientsState, release] = useReducer(clientsReducer, clients);
  function addInvoice(invoiceData) {
    dispatch({ type: "ADD", payload: invoiceData });
  }

  function deleteInvoice(id) {
    dispatch({ type: "DELETE", payload: id });
  }

  function updateInvoice(id, invoiceData) {
    dispatch({ type: "UPDATE", payload: { id: id, data: invoiceData } });
  }

  /* Client Logic */
  function addClient(clientData) {
    release({ type: "ADD", payload: clientData });
  }

  function deleteClient(id) {
    release({ type: "DELETE", payload: id });
  }

  function updateClient(id, clientData) {
    release({ type: "UPDATE", payload: { id: id, data: clientData } });
  }

  const value = {
    invoices: invoicesState,
    addInvoice: addInvoice,
    deleteInvoice: deleteInvoice,
    updateInvoice: updateInvoice,
    clients:clientsState,
    addClient,
    deleteClient,
    updateClient,
  };

  return (
    <InvoicesContext.Provider value={value}>
      {children}
    </InvoicesContext.Provider>
  );
}

export default InvoicesContectProvider;
