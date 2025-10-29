import axios from "axios";
function mapFirebaseResponse(data, mapper) {
  const result = [];
  for (const key in data) {
    result.push(mapper(key, data[key]));
  }
  return result;
}
const backendurl = " https://invoicetogo-54bf5-default-rtdb.firebaseio.com";
/* invoices http function */
export async function storeInvoice(invoiceData) {
  try {
    const response = await axios.post(
      "https://invoicetogo-54bf5-default-rtdb.firebaseio.com/invoices.json",
      invoiceData
    );
    const id = response.data.name;
    console.log(response.data.name);
    return id;
  } catch (error) {
    console.error("Error storing invoice:", error);
  }
}

export async function fetchInvoices(token) {
  //console.log("user token =>" +token);
  try {
    const response = await axios.get(
      "https://invoicetogo-54bf5-default-rtdb.firebaseio.com/invoices.json?auth="+token
    );

    const invoices = [];
    // Loop over each invoice in the response data
    for (const key in response.data) {
      const invoiceData = response.data[key];

      // Create an invoice object with the main invoice data
      const invoiceObject = {
        id: key,
        invoicedate: new Date(invoiceData.invoicedate),
        invoicenumber: invoiceData.invoicenumber,
        invoicestatus: invoiceData.invoicestatus,
        clientname: invoiceData.clientname,
        balancedue: invoiceData.balancedue,
        discount: invoiceData.discount,
        tax: invoiceData.tax,
        invoiceelements: [], // Initialize as an empty array to store invoice elements
      };

      // Loop over the elements within each invoice if there are any
      if (
        invoiceData.invoiceelements &&
        Array.isArray(invoiceData.invoiceelements)
      ) {
        for (const elementKey in invoiceData.invoiceelements) {
          const element = invoiceData.invoiceelements[elementKey];

          // Create an element object for each invoice element
          const elementObj = {
            id: elementKey,
            item: element.item,
            costperitem: element.costperitem,
            units: element.units,
          };

          // Push the element object into the invoice's elements array
          invoiceObject.invoiceelements.push(elementObj);
        }
      }

      // Push the invoice object into the invoices array
      invoices.push(invoiceObject);
    }

    // Return the array of invoices with their elements

    return invoices;
  } catch (error) {
    console.error("Error fetching invoices:", error);
    return [];
  }
}

export function updateInvoice(invoiceid, invoiceData) {
  try {
    return axios.put(
      `https://invoicetogo-54bf5-default-rtdb.firebaseio.com/invoices/${invoiceid}.json`,
      invoiceData
    );
  } catch (error) {
    console.error("error modifying", error);
  }
}

export async function deleteExpense(invoiceid) {
  try {
    return axios.delete(
      `https://invoicetogo-54bf5-default-rtdb.firebaseio.com/invoices/${invoiceid}.json`
    );
  } catch (error) {
    console.error("error deleting", error);
  }
}

/* clients http function */
export async function storeClient(clientData) {
  try {
    await axios.post(
      "https://invoicetogo-54bf5-default-rtdb.firebaseio.com/clients.json",
      clientData
    );
  } catch (error) {
    console.error("Error storing client:", error);
  }
}
export async function updateClient(clientid, clientData) {
  try {
    return axios.put(
      `https://invoicetogo-54bf5-default-rtdb.firebaseio.com/clients/${clientid}.json`,
      clientData
    );
  } catch (error) {
    console.error("error modifying", error);
  }
}
export async function deleteClient(clientid) {
  try {
    return axios.delete(
      `https://invoicetogo-54bf5-default-rtdb.firebaseio.com/clients/${clientid}.json`
    );
  } catch (error) {
    console.error("error delete", error);
  }
}
export async function fetchClients() {
  try {
    const response = await axios.get(
      "https://invoicetogo-54bf5-default-rtdb.firebaseio.com/clients.json"
    );

    return mapFirebaseResponse(response.data, (key, clientData) => ({
      id: key,
      clientname: clientData.clientname,
      clientphone: clientData.clientphone,
      clientemail: clientData.clientemail,
      comments: clientData.comments,
    }));
  } catch (error) {
    console.error("Error fetching clients:", error);
    return [];
  }
}
/* Company Logic */

export async function updateCompany(companyId, companyData) {
  try {
    return axios.put(
      `https://invoicetogo-54bf5-default-rtdb.firebaseio.com/companies/${companyId}.json`,
      companyData
    );
  } catch (error) {
    console.error("error modifying", error);
  }
}
export async function deleteCompany(companyid) {
  try {
    return axios.delete(
      `https://invoicetogo-54bf5-default-rtdb.firebaseio.com/invoices/${companyid}.json`
    );
  } catch (error) {
    console.error("error deleting", error);
  }
}
export async function storeCompany(companyData) {
  try {
    await axios.post(
      "https://invoicetogo-54bf5-default-rtdb.firebaseio.com/companies.json",
      companyData
    );
  } catch (error) {
    console.error("Error storing company:", error);
  }
}

export async function fetchCompany(token) {
  try {
    const response = await axios.get(
      "https://invoicetogo-54bf5-default-rtdb.firebaseio.com/companies.json?auth="+token
    );
    console.log("companies" + JSON.stringify(response.data[0]))
    return mapFirebaseResponse(response.data, (key, companyData) => ({
      id: key,
      ...companyData,
    }));
  } catch (error) {
    console.error("Error fetching company:", error);
    return [];
  }
}
