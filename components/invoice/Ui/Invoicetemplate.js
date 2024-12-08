import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Dimensions,
} from "react-native";
import { useContext } from "react";
import { InvoicesContext } from "../../../store/invoices-context";
import RNHTMLtoPDF from "react-native-html-to-pdf";
import * as Sharing from "expo-sharing";
import colors from "../../../const/Colors";
import Feather from "@expo/vector-icons/Feather";
const width = Dimensions.get("window").width;
//import { useRoute } from '@react-navigation/native';
function Invoicetemplate({ route, navigation }) {
  const invoiceCtx = useContext(InvoicesContext);
  const invId = route.params;
  const invoiceData = invoiceCtx.invoices.find(
    (invoice) => (invoice.id = invId)
  );

  const generatePDF = async () => {
    const htmlContent = `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 20px;
              padding: 0;
              background-color: #f9f9f9;
            }
            .header {
              text-align: center;
              background-color: #4A90E2;
              color: white;
              padding: 15px 0;
              font-size: 20px;
              font-weight: bold;
            }
            .section {
              background-color: white;
              margin: 15px 0;
              padding: 15px;
              border-radius: 8px;
              box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
            }
            .section-title {
              font-size: 18px;
              font-weight: bold;
              margin-bottom: 10px;
            }
            .item-row {
              display: flex;
              justify-content: space-between;
              margin-bottom: 5px;
            }
            .summary {
              text-align: right;
              font-weight: bold;
              margin-top: 10px;
            }
          </style>
        </head>
        <body>
          <div class="header">Invoice #${invoiceData.invoicenumber}</div>
          <div class="section">
            <h2 class="section-title">Client Information</h2>
            <p>Name: ${invoiceData.clientname}</p>
            <p>Date: ${new Date(invoiceData.invoicedate).toLocaleDateString()}</p>
            <p>Status: ${invoiceData.invoicestatus}</p>
          </div>
          <div class="section">
            <h2 class="section-title">Items</h2>
            ${invoiceData.invoiceelements
              .map(
                (item) => `
                <div class="item-row">
                  <span>${item.item}</span>
                  <span>Cost/Unit: $${item.costperitem}</span>
                  <span>Units: ${item.units}</span>
                  <span>Total: $${item.costperitem * item.units}</span>
                </div>
              `
              )
              .join("")}
          </div>
          <div class="section">
            <h2 class="section-title">Summary</h2>
            <p>Discount: ${invoiceData.discount}%</p>
            <p>Tax: $${invoiceData.tax}</p>
            <p class="summary">Total Due: $${invoiceData.balancedue}</p>
          </div>
        </body>
      </html>
    `;

    try {
      const file = await RNHTMLtoPDF.convert({
        html: htmlContent,
        fileName: `Invoice_${invoiceData.invoicenumber}`,
        base64: false,
      });

      if (file.filePath) {
        Alert.alert("PDF Generated", "Your invoice is ready to share.", [
          {
            text: "Share",
            onPress: async () => {
              if (await Sharing.isAvailableAsync()) {
                await Sharing.shareAsync(file.filePath);
              }
            },
          },
          { text: "OK", style: "cancel" },
        ]);
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred while generating the PDF.");
      console.error("PDF Generation Error:", error);
    }
  };

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
            <Text style={styles.text}>{invoiceData.clientname}</Text>
          </View>
          <View style={styles.customerInfo}>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.text}>{invoiceData.clientemail}</Text>
          </View>
          <View style={styles.customerInfo}>
            <Text style={styles.label}>Address:</Text>
            <Text style={styles.text}>{invoiceData.customerAddress}</Text>
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
          <Text style={styles.label}>Total:</Text>
          <Text style={styles.total}>${invoiceData.balancedue}</Text>
        </View>
      </View>
      <View style={styles.sendButton}>
        <Pressable onPress={generatePDF}>
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
    bottom:-120,
    left: width / 1.5,
    zIndex: 100,
    alignContent:"right",
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
});

export default Invoicetemplate;
