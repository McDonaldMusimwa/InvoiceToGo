import * as FileSystem from "expo-file-system";
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



  export async function getBase64Image(fileUri) {
    try {
      const base64Image = await FileSystem.readAsStringAsync(fileUri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      return `data:image/jpeg;base64,${base64Image}`;
    } catch (error) {
      console.error("Error converting image to Base64:", error);
      return null;
    }
  }
  


  export default generateInvoiceItems