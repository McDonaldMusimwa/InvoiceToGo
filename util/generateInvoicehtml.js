const generateInvoiceItems = (invoiceElements) => {
    return invoiceElements
      .map(
        (item) => `
          <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
            <p style="margin: 0;">${item.item}</p>
            <p style="margin: 0;">${item.units} x $${item.costperitem}</p>
            <p style="margin: 0; font-weight: bold;">$${item.units * item.costperitem}</p>
          </div>
        `
      )
      .join('');
  };

  export default generateInvoiceItems