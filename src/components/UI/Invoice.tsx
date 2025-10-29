import { View, Text, StyleSheet, Pressable } from "react-native";
import colors from "../../const/Colors";
import Card from "./Card";
import type { Invoice } from "../../types/Invoice";
import React from "react";

function Invoice({ invoicenumber, status, subTotal, customer, onPressAction,onLongPressAction }:Invoice):React.JSX.Element {
  let statusFontStyle;

  if (status === "paid") {

    statusFontStyle = { color: colors.green };
  } else {
    statusFontStyle = { color: colors.red };
  }


  return (
    <Card>
      <Pressable style={styles.buttonStyle} onPress={onPressAction} onLongPress={onLongPressAction}>
        <View style={styles.spacing}>
          <View style={styles.status}>
            <Text style={[styles.fontweight, styles.fontsize]}>
              Inv {invoicenumber}
            </Text>
            <Text style={styles.fontsize}>{customer}</Text>
          </View>
          <View style={styles.status}>
            <Text style={statusFontStyle}>{status}</Text>
            <Text style={[styles.fontsize, styles.fontweight]}>
              $ {subTotal}
            </Text>
          </View>
        </View>
      </Pressable>
    </Card>
  );
}

const styles = StyleSheet.create({
  status: {
    margin: 5,
  },
  spacing: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 5,
  },
  fontsize: {
    fontSize: 18,
    marginTop:5
  },
  fontweight: {
    fontWeight: "bold",
  },
  buttonStyle: {
    flex: 1,
  },
  invName: {},
  invStatus: {},
});

export default Invoice;
