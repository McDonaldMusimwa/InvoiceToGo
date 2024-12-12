import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Dimensions,
  Image,
} from "react-native";
import { useContext, useState,useEffect } from "react";
import { InvoicesContext } from "../../../store/invoices-context";
//import RNHTMLtoPDF from "react-native-html-to-pdf";
import { shareAsync } from "expo-sharing";
import { printToFileAsync } from "expo-print";
import colors from "../../../const/Colors";
import Feather from "@expo/vector-icons/Feather";
import generateInvoiceItems from "../../../util/generateInvoicehtml";
import { taxRate } from "../../../const/Data";
import LoadingOverLay from "../../UI/LoadingOverLay";
import { fetchCompany } from "../../../util/https";
import { getBase64Image } from "../../../util/generateInvoicehtml";
const width = Dimensions.get("window").width;

//import { useRoute } from '@react-navigation/native';
function Invoicetemplate({ route, navigation }) {
const [logoBase64,setBase64Logo] = useState()
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(1);
  const invoiceCtx = useContext(InvoicesContext);
  const fetchedCompany = invoiceCtx.company
    ? invoiceCtx.company
    : async () => await fetchCompany();
  const company = fetchedCompany[0];
  console.log("company data" + JSON.stringify(company));
  const invId = route.params.invoiceid;

  const invoiceData = invoiceCtx.invoices.find(
    (invoice) => (invoice.id = invId)
  );


  // UseEffect hook to fetch base64 image when company data is available
  useEffect(() => {
    const fetchLogo = async () => {
      if (invoiceCtx.company && invoiceCtx.company.companylogo) {
        const logoBase64 = await getBase64Image(invoiceCtx.company.companylogo);
        setBase64Logo(logoBase64);
      }
    };
    
    fetchLogo();
  }, [invoiceCtx.company]);
  const htmlContent = `
  <html lang="en">
<head>
 <meta charset="UTF-8" />
 <meta name="viewport" content="width=device-width, initial-scale=1.0" />
 <title>Invoice</title>
</head>
<body style="font-family: Arial, sans-serif; margin: 20px; color: #000;">
 <!-- Container -->
 <div style="padding: 20px; margin-top: 80px; background-color: #fff;">
   <!-- Header -->
   <div
     style="text-align: center; background-color:"#000000"; padding: 10px; color: white; border-radius: 8px;"
   >
     
     <img src=${logoBase64} alt=${
    invoiceCtx.company.companyname
  } 
    style="height: 60px; width: auto; object-fit: cover; border-radius: 4px;"
    />
   </div>

   <!-- Invoice Info -->
   <div
     style="display: flex; justify-content: space-between; margin-top: 20px;"
   >
     <div style="display: flex;">
       <p style="font-weight: bold; margin: 0;">Tax Invoice Number:</p>
       <p style="margin-left: 5px; margin: 0;">${invoiceData.invoicenumber}</p>
     </div>
     <div style="display: flex;">
       <p style="font-weight: bold; margin: 0;">Invoice Date:</p>
       <p style="margin-left: 5px; margin: 0;">
         ${new Date(invoiceData.invoicedate).toDateString()}
       </p>
     </div>
   </div>

   <!-- Divider -->
   <div
     style="border-bottom: 1px solid #ccc; margin: 20px 0; width: 100%;"
   ></div>

   <!-- Customer Info -->
<div style="display: flex; flex-direction: row; justify-content: space-between; margin-top: 20px;">
   <div style="margin-top: 20px;">
     <h2
       style="font-size: 18px; font-weight: bold; margin-bottom: 10px;"
     >
       Customer Information
     </h2>
     <div style="display: flex; margin-bottom: 5px;">
       <p style="font-weight: bold; margin: 0;">Name:</p>
       <p style="margin-left: 5px; margin: 0;">${
         invoiceData.clientname.name
       }</p>
     </div>
     <div style="display: flex; margin-bottom: 5px;">
       <p style="font-weight: bold; margin: 0;">Email:</p>
       <p style="margin-left: 5px; margin: 0;">${
         invoiceData.clientname.email
       }</p>
     </div>
     <div style="display: flex; margin-bottom: 5px;">
       <p style="font-weight: bold; margin: 0;">Address:</p>
       <p style="margin-left: 5px; margin: 0;">
         ${invoiceData.clientname.phone}
       </p>
     </div>
   </div>

   <div style="margin-top: 20px;">
     <h2
       style="font-size: 18px; font-weight: bold; margin-bottom: 10px;"
     >
       Company information
     </h2>
     <div style="display: flex; margin-bottom: 5px;">
      
       <p style="margin-left: 5px; margin: 0;">${
         invoiceCtx.company.companyname
       }</p>
     </div>
     <div style="display: flex; margin-bottom: 5px;">
       
       <p style="margin-left: 5px; margin: 0;">${invoiceCtx.company.phone}</p>
     </div>
     <div style="display: flex; margin-bottom: 5px;">
      
       <p style="margin-left: 5px; margin: 0;">
         ${invoiceCtx.company.email}
       </p>
     </div>
   </div>


   </div>
   <!-- Divider -->
   <div
     style="border-bottom: 1px solid #ccc; margin: 20px 0; width: 100%;"
   ></div>

   <!-- Invoice Items -->
   <div style="margin-top: 20px;">
     <h2
       style="font-size: 18px; font-weight: bold; margin-bottom: 10px;"
     >
       Summary
     </h2>
      ${generateInvoiceItems(invoiceData.invoiceelements)}
   </div>

   <!-- Divider -->
   <div
     style="border-bottom: 1px solid #ccc; margin: 20px 0; width: 100%;"
   ></div>

   <!-- Total -->
   <div
     style="display: flex; justify-content: flex-end; margin-top: 20px;"
   >
     <p style="font-weight: bold; margin: 0;">Tax:</p>
     
     <p style="font-size: 18px; font-weight: bold; margin-left: 10px; margin: 0;">
       ${(invoiceData.balancedue * taxRate) / (taxRate + 100)}
     </p>
   </div>
   <!-- Total -->
   <div
     style="display: flex; justify-content: flex-end; margin-top: 20px;"
   >
     <p style="font-weight: bold; margin: 0;">Total:</p>
     
     <p style="font-size: 18px; font-weight: bold; margin-left: 10px; margin: 0;">
       ${invoiceData.balancedue}
     </p>
   </div>
 </div>

</body>
</html>`;
  const generatePDF = async () => {
    setLoading(true);
    try {
      const file = await printToFileAsync({ html: htmlContent, base64: false });

      await shareAsync(file.uri);
      setCount(count + 1);
      setLoading(false);
    } catch (error) {
      Alert.alert("Error", "An error occurred while generating the PDF.");
      console.error("PDF Generation Error:", error);
    }
  };

  if (loading) {
    <LoadingOverLay />;
  }

  //console.log(invoice)
  return (
    <View>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Invoice</Text>
        </View>
        <View style={styles.invoiceInfoContainer}>
          <View style={styles.invoiceInfo}>
            <Text style={styles.label}>Invoice Number:</Text>
            <Text style={styles.text}>{invoiceData.invoicenumber}</Text>
          </View>
          <View style={styles.invoiceInfo}>
            <Text style={styles.label}>Invoice Date:</Text>
            <Text style={styles.text}>
              {invoiceData.invoicedate.toDateString()}
            </Text>
          </View>
        </View>
        <View style={styles.divider} />
        <View style={styles.customerInfoContainer}>
          <Text style={styles.subtitle}>Customer Information</Text>
          <View style={styles.customerInfo}>
            <Text style={styles.label}>Name:</Text>
            <Text style={styles.text}>{invoiceData.clientname.name}</Text>
          </View>
          <View style={styles.customerInfo}>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.text}>{invoiceData.clientname.email}</Text>
          </View>
          <View style={styles.customerInfo}>
            <Text style={styles.label}>Phone:</Text>
            <Text style={styles.text}>{invoiceData.clientname.phone}</Text>
          </View>
        </View>
        <View style={styles.divider} />
        <View style={styles.itemsContainer}>
          <Text style={styles.subtitle}>Invoice Items</Text>
          {invoiceData.invoiceelements.map((item) => (
            <View style={styles.item} key={item.id}>
              <Text style={styles.itemName}>{item.item}</Text>
              <Text style={styles.itemDetails}>
                {item.units} x ${item.costperitem}
              </Text>
              <Text style={styles.itemTotal}>
                ${item.units * item.costperitem}
              </Text>
            </View>
          ))}
        </View>
        <View style={styles.divider} />
        <View style={styles.totalContainer}>
          <Text style={styles.label}>Tax:</Text>
          <Text style={styles.total}>
            ${(invoiceData.balancedue * 15) / 115}
          </Text>
        </View>
        <View style={styles.totalContainer}>
          <Text style={styles.label}>Total:</Text>
          <Text style={styles.total}>${invoiceData.balancedue}</Text>
        </View>
      </View>
      <View style={styles.sendButton}>
        <Pressable onPress={() => generatePDF()}>
          <Feather name="send" size={36} color="black" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sendButton: {
    borderWidth: 1,
    borderRadius: 80,
    width: 50,
    padding: 5,
    marginTop: 20,
    position: "absolute",
    bottom: -120,
    left: width / 1.5,
    zIndex: 100,
    alignContent: "right",
    // Shadow for iOS
    shadowColor: colors.black,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Elevation for Android
    elevation: 5,
  },
  container: {
    padding: 20,
    marginTop: 80,
    padding: 10,
  },
  header: {
    alignItems: "center",
    backgroundColor: colors.black,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.white,
    padding: 10,
  },
  invoiceInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  invoiceInfo: {
    flexDirection: "row",
  },
  label: {
    fontWeight: "bold",
  },
  text: {
    marginLeft: 5,
  },
  divider: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginVertical: 20,
  },
  customerInfoContainer: {
    marginTop: 20,
  },
  customerInfo: {
    flexDirection: "row",
    marginVertical: 5,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  itemsContainer: {
    marginTop: 20,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  itemName: {
    fontSize: 16,
  },
  itemDetails: {},
  itemTotal: {
    fontWeight: "bold",
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 20,
  },
  total: {
    fontSize: 18,
    fontWeight: "bold",
  },
  loadingImage: {
    width: 10,
  },
});

export default Invoicetemplate;
