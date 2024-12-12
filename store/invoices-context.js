import { createContext, useReducer } from "react";
import { v4 as uuidv4 } from "uuid";
export const InvoicesContext = createContext({
  /* Invoice */
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
  setInvoices: (invoices) => {},
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
  /* Client */
  clients: [],
  addClient: ({ clientname, clientphone, clientemail, comments }) => {},
  updateClient: (id, { clientname, clientphone, clientemail, comments }) => {},
  deleteClient: ({ id }) => {},
  setClients: (clients) => {},
  /* Company */
  company: {},
  addCompany: ({
    companylogo,
    companyname,
    email,
    phone,
    address1,
    address2,
    taxRate,
  }) => {},
  updateCompany: (
    id,
    { companylogo, companyname, email, phone, address1, address2, taxRate }
  ) => {},
  deleteCompany: ({ id }) => {},
  setCompany: (company) => {},
});

function invoicesReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [action.payload, ...state];
    case "DELETE":
      return state.filter((invoice) => invoice.id !== action.payload);

    case "SET":
      return action.payload;

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
      const id = uuidv4();
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

    case "SET":
      const reversedInvoices = action.payload.reverse();
      return reversedInvoices;

    default:
      return state;
  }
}

/* Company reducer */

function companyReducer(state, action) {
  switch (action.type) {
    case "ADD":
      const id = uuidv4();
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

    case "SET":
 
      return action.payload

    default:
      return state;
  }
}

function InvoicesContextProvider({ children }) {
  const [invoicesState, dispatch] = useReducer(invoicesReducer, []);
  const [clientsState, release] = useReducer(clientsReducer, []);
  const [companyState, dismis] = useReducer(companyReducer, {});
  function addInvoice(invoiceData) {
    dispatch({ type: "ADD", payload: invoiceData });
  }

  function setInvoices(invoices) {
    dispatch({ type: "SET", payload: invoices });
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

  function setClients(clients) {
    release({
      type: "SET",
      payload: clients,
    });
  }

  function deleteClient(id) {
    release({ type: "DELETE", payload: id });
  }

  function updateClient(id, clientData) {
    release({ type: "UPDATE", payload: { id: id, data: clientData } });
  }
  /* company */
  function addCompany(companyData) {
    dismis({ type: "ADD", payload: companyData });
  }

  function setCompany(company) {
    dismis({
      type: "SET",
      payload: company,
    });
  }

  function deleteCompany(id) {
    dismis({ type: "DELETE", payload: id });
  }

  function updateCompany(id, companyData) {
    dismis({ type: "UPDATE", payload: { id: id, data: companyData } });
  }

  const value = {
    invoices: invoicesState,
    addInvoice: addInvoice,
    deleteInvoice: deleteInvoice,
    updateInvoice: updateInvoice,
    setInvoices: setInvoices,
    clients: clientsState,
    addClient: addClient,
    deleteClient: deleteClient,
    updateClient: updateClient,
    setClients: setClients,
    company: companyState,
    addCompany: addCompany,
    deleteCompany: deleteCompany,
    updateCompany: updateCompany,
    setCompany: setCompany,
  };

  return (
    <InvoicesContext.Provider value={value}>
      {children}
    </InvoicesContext.Provider>
  );
}

export default InvoicesContextProvider;
