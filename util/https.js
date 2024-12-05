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
    await axios.post(`${backendurl}/invoices.json`, invoiceData);
  } catch (error) {
    console.error("Error storing invoice:", error);
  }
}

export async function fetchInvoices() {

  try {
    console.log("starting")
    const response = await axios.get(backendurl + "/invoices.json");
    console.log("response =>", response);
    
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
      if (invoiceData.invoiceelements && Array.isArray(invoiceData.invoiceelements)) {
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
    console.log(invoices);
    return invoices;
  } catch (error) {
    console.error("Error fetching invoices:", error);
    return [];
  }
}


/* clients http function */
export async function storeClient(clientData) {
  try {
    await axios.post(`${backendurl}/clients.json`, clientData);
  } catch (error) {
    console.error("Error storing client:", error);
  }
}

export async function fetchClients() {
  try {
    const response = await axios.get(`${backendurl}/clients.json`);
    console.log(response.data);
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

export async function storeCompany(companyData) {
  try {
    await axios.post(`${backendurl}/company.json`, companyData);
  } catch (error) {
    console.error("Error storing company:", error);
  }
}

export async function fetchCompany() {
  try {
    const response = await axios.get(`${backendurl}/company.json`);
    return mapFirebaseResponse(response.data, (key, companyData) => ({
      id: key,
      ...companyData,
    }));
  } catch (error) {
    console.error("Error fetching company:", error);
    return [];
  }
}
