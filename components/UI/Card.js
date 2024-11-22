import {View,StyleSheet } from "react-native";
import colors from "../../const/Colors";
function Card({ children, styles }) {
  return <View style={[cardstyles.invoiceContainer,styles]}>{children}</View>;
}
const cardstyles = StyleSheet.create({
  invoiceContainer: {
    margin: 10,
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 10,
  },
});

export default Card;
